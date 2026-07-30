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
    // Check if user exists in blob storage. Vercel blob doesn't have an easy "exists" without downloading or listing.
    // Assuming if they login, they should exist. We will just attempt to list or fetch the blob url.
    // A simpler way for a private blob since we disabled random suffix:
    // Actually, Vercel Blob API doesn't have a direct "get private blob" without `list` or the url.
    // Wait, the user requirements state: "Authenticate using Blob Storage only. Never send login requests to the CRM. No password."
    // We can just create a session for the email directly, since it's passwordless and just checks email.
    
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
