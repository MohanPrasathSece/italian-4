import { put, head } from "@vercel/blob";
import crypto from "crypto";

export default async function handler(req: any, res: any) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, lastName, phone, countryName, description, sourceId, outlineCase } = req.body;

  if (!email || !firstName || !phone || !countryName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const crmToken = process.env.CRM_TOKEN || "";
  const crmUrl = process.env.CRM_URL || "https://api.myinvesttrade.com/api/lead_management/api/affiliates";

  console.log(`[Signup] Attempting CRM submission for ${email}`);

  const payload = {
    country_name: countryName,
    description: description || "",
    phone: phone, // Raw phone for CRM (e.g., 0041...)
    email: email,
    first_name: firstName,
    last_name: lastName || "",
    custom_fields: {
      Source_ID: sourceId || "Website",
      Outline_Your_Case: outlineCase || "",
    },
  };

  try {
    const crmResponse = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: crmToken,
        Authorization: `Bearer ${crmToken}`,
        "X-Affiliate-Token": crmToken,
        "x-token": crmToken,
      },
      body: JSON.stringify(payload),
    });

    const crmData = await crmResponse.text();
    console.log(`[Signup] CRM Response Status: ${crmResponse.status}, Body: ${crmData}`);

    let isSuccess = crmResponse.ok;
    let isDuplicate = false;
    let isInvalid = false;

    // Duplicate Detection
    const crmDataLower = crmData.toLowerCase();
    if (crmDataLower.includes("already exists") || crmDataLower.includes("duplicate entry") || crmDataLower.includes('"duplicate":true') || crmDataLower.includes('"duplicate": true')) {
      isDuplicate = true;
      isSuccess = true; // Proceed with auth if duplicate
    } else if (!crmResponse.ok && (crmDataLower.includes("invalid") || crmResponse.status === 400 || crmResponse.status === 422)) {
      isInvalid = true;
    }

    if (!isSuccess) {
      if (isInvalid) {
        return res.status(400).json({ error: "Lead is not valid", message: "We couldn't process your enquiry with the information provided. Please review your details and try again." });
      }
      return res.status(500).json({ error: "CRM Error", message: "You have already contacted us. Please wait while our team reviews your request. We'll get back to you soon." });
    }

    // CRM Accepted (or Duplicate). Proceed with Blob Storage.
    const userFileName = `users/${encodeURIComponent(email)}.json`;
    
    // Check if user exists in Blob
    let userExists = false;
    try {
      // Just check if we can head it
      await put(userFileName, JSON.stringify({
        email,
        firstName,
        lastName,
        phone,
        countryName,
        createdAt: new Date().toISOString()
      }), { access: "public", addRandomSuffix: false });
      userExists = true;
    } catch (e) {
      console.error("[Signup] Blob Error writing user:", e);
    }

    // Create session token
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const sessionFileName = `sessions/${sessionToken}.json`;

    await put(sessionFileName, JSON.stringify({
      email,
      createdAt: new Date().toISOString()
    }), { access: "public", addRandomSuffix: false });

    // Send payload to Lead Dashboard
    if (!isDuplicate) {
      console.log(`[Signup] Sending payload to Lead Dashboard for ${email}`);
      try {
        await fetch("https://lead-dashboard-orcin.vercel.app/api/increment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            website: "Lumera Markets", // As requested in requirements
            type: "signup",
            name: `${firstName} ${lastName || ""}`.trim(),
            email: email
          })
        });
      } catch (dashErr) {
        console.error("[Signup] Dashboard increment error:", dashErr);
      }
    }

    return res.status(200).json({
      success: true,
      token: sessionToken,
      message: isDuplicate ? "You have already contacted us. Please wait while our team reviews your request. We'll get back to you soon." : "Signup successful."
    });

  } catch (err: any) {
    console.error(`[Signup] Exception:`, err.message);
    return res.status(500).json({ error: "Internal Server Error", message: "You have already contacted us. Please wait while our team reviews your request. We'll get back to you soon." });
  }
}
