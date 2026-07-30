import { head } from "@vercel/blob";
import crypto from "crypto";
import { put } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const userFileName = `users/${encodeURIComponent(email)}.json`;

  try {
    try {
      await head(userFileName);
    } catch (e: any) {
      // BlobNotFoundError will be thrown if it doesn't exist
      return res.status(401).json({ error: "User not found", message: "Email not found. Please sign up first." });
    }
    
    // Create session token
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const sessionFileName = `sessions/${sessionToken}.json`;

    await put(sessionFileName, JSON.stringify({
      email,
      createdAt: new Date().toISOString()
    }), { access: "public", addRandomSuffix: false });

    return res.status(200).json({
      success: true,
      token: sessionToken
    });

  } catch (err: any) {
    console.error(`[Login] Exception:`, err.message);
    return res.status(500).json({ error: "Internal Server Error", message: "You have already contacted us. Please wait while our team reviews your request. We'll get back to you soon." });
  }
}
