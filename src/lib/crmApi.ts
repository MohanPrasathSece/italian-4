export interface SubmitLeadInput {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  message?: string;
  leadType?: "signup" | "contact";
  sourceId?: string;
}

export async function submitLead(input: SubmitLeadInput): Promise<void> {
  const isSignup = input.leadType === "signup";
  const endpoint = isSignup ? "/api/auth/signup" : "/api/contact";
  
  const [firstName, ...lastNameParts] = (input.name || "Unknown").trim().split(" ");
  const lastName = lastNameParts.join(" ");

  const payload = {
    email: input.email.trim(),
    firstName,
    lastName,
    phone: input.phone || "0000000000",
    countryName: input.countryCode || "CH",
    description: input.message || (isSignup ? "Signup Lead" : ""),
    sourceId: input.sourceId || "Website",
    outlineCase: input.message || ""
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const rawMsg = text.toLowerCase();
    if (res.status === 500 || rawMsg.includes("already") || rawMsg.includes("exist") || rawMsg.includes("contacted")) {
      throw new Error("You have already contacted us. Please wait while our team reviews your request. We'll get back to you soon.");
    }
    throw new Error(`API error ${res.status}: ${text}`);
  }
}

export function incrementLeadCount() {
  fetch("/api/leads-count", { method: "POST" }).catch((err) =>
    console.warn("[leads-count] Failed to increment:", err)
  );
}
