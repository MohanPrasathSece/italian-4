import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2, Send, Zap } from "lucide-react";
import { useState } from "react";
import { submitLead } from "@/lib/crmApi";
import { validatePhone } from "@/lib/validation";

// ─── Constants ─────────────────────────────────────────────────────

const INVESTMENT_OPTIONS = [
  { value: "", label: "Select amount…" },
  { value: "under_1000", label: "Under $1,000" },
  { value: "1000", label: "$1,000 – $4,999" },
  { value: "5000", label: "$5,000 – $9,999" },
  { value: "10000", label: "$10,000 – $24,999" },
  { value: "25000", label: "$25,000 – $49,999" },
  { value: "50000", label: "$50,000 – $99,999" },
  { value: "100000", label: "$100,000+" },
];

const COUNTRY_OPTIONS = [
  { value: "cy", label: "Cipro" },
  { value: "gb", label: "Regno Unito" },
  { value: "us", label: "Stati Uniti" },
  { value: "de", label: "Germania" },
  { value: "fr", label: "Francia" },
  { value: "ae", label: "EAU" },
  { value: "sg", label: "Singapore" },
  { value: "au", label: "Australia" },
  { value: "other", label: "Altro" },
];

// ─── Types ─────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  countryCode: "CH",
  message: "",
};

// ─── Component ─────────────────────────────────────────────────────

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [apiError, setApiError] = useState("");

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const setCountryCode = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm((f) => ({ ...f, countryCode: e.target.value }));

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Richiesto";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email valida richiesta";
    
    const phoneError = validatePhone(form.phone, form.countryCode.toUpperCase());
    if (phoneError) {
      e.phone = phoneError;
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setApiError("");
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        countryCode: form.countryCode,
        message: form.message,
        leadType: "contact",
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      const rawMsg = (err instanceof Error ? err.message : "").toLowerCase();
      if (rawMsg.includes("already") || rawMsg.includes("exist") || rawMsg.includes("existe") || rawMsg.includes("contacted") || rawMsg.includes("500") || rawMsg.includes("internal server")) {
        setApiError("Questo account esiste già. Effettua l'accesso.");
      } else {
        setApiError("Si è verificato un problema. Riprova o inviaci un'e-mail direttamente.");
      }
      setStatus("error");
    }
  };

  const ic = (field: keyof FormState) =>
    `w-full rounded-[24px] border ${errors[field] ? "border-destructive focus:border-destructive shadow-sm" : "border-border focus:border-primary/40"} bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300`;

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32 bg-background scroll-mt-28">
      {/* Ambient glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.15)_0%,transparent_70%)]" 
      />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6 lg:px-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[12px] text-primary font-bold shadow-sm">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-primary" />
              Inizializza la connessione
            </div>
            <h2 className="text-[26px] sm:text-[36px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground">
              Connettiti alla rete
            </h2>
            <p className="mt-4 text-[15px] sm:text-[17px] text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Condividi i tuoi parametri di investimento e i nostri protocolli genereranno una strategia crypto su misura per te.
            </p>
          </div>

          {/* Card */}
          <div className="relative rounded-[40px] border border-border bg-card p-6 sm:p-10 shadow-lift">
            <AnimatePresence mode="wait">
              {/* ── Success ── */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center gap-4 py-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                    <CheckCircle className="h-16 w-16 text-green-500 relative z-10 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" strokeWidth={2} />
                  </motion.div>
                  <h3 className="text-[24px] font-bold tracking-tight text-foreground mt-4">Transazione Confermata</h3>
                  <p className="text-[15px] text-muted-foreground max-w-xs leading-relaxed">
                    Il tuo messaggio è stato ricevuto e trasmesso. Un operatore di rete ti contatterà a breve.
                  </p>
                  <button
                    onClick={() => { setForm(EMPTY); setStatus("idle"); setErrors({}); setApiError(""); }}
                    className="mt-6 inline-flex h-11 items-center rounded-[24px] border border-border bg-background px-6 text-[14px] font-bold text-foreground hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    Nuova Trasmissione
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Name */}
                  <div className="group">
                    <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">Nome completo *</label>
                    <input type="text" placeholder="Mario Rossi" value={form.name} onChange={set("name")} className={ic("name")} />
                    {errors.name && <p className="mt-1.5 text-sm text-destructive font-medium">{errors.name}</p>}
                  </div>

                  {/* Email + phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">Indirizzo email *</label>
                      <input type="email" placeholder="mario.rossi@email.com" value={form.email} onChange={set("email")} className={ic("email")} />
                      {errors.email && <p className="mt-1.5 text-sm text-destructive font-medium">{errors.email}</p>}
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">Numero di telefono *</label>
                      
<div className="flex gap-2 w-full">
    <select name="countryCode" value={form.countryCode} onChange={setCountryCode} className="country-dropdown">

        <option value="IE">🇮🇪 +353</option>
        <option value="GB">🇬🇧 +44</option>
        <option value="CH">🇨🇭 +41</option>
        <option value="FR">🇫🇷 +33</option>
        <option value="BE">🇧🇪 +32</option>
        <option value="CA">🇨🇦 +1</option>
        <option value="US">🇺🇸 +1</option>
        <option value="DE">🇩🇪 +49</option>
        <option value="ES">🇪🇸 +34</option>
        <option value="IT">🇮🇹 +39</option>
        <option value="NL">🇳🇱 +31</option>
        <option value="SE">🇸🇪 +46</option>
        <option value="AU">🇦🇺 +61</option>
        <option value="IN">🇮🇳 +91</option>
        <option value="AE">🇦🇪 +971</option>
        <option value="SG">🇸🇬 +65</option>
        <option value="ZA">🇿🇦 +27</option>
        <option value="BR">🇧🇷 +55</option>
        <option value="MX">🇲🇽 +52</option>
        <option value="JP">🇯🇵 +81</option>
        <option value="CY">🇨🇾 +357</option>
    </select>
<input type="tel" placeholder="+357 99 261 501" value={form.phone} onChange={set("phone")} className={`${ic("phone")} flex-1`} />
</div>
                      {errors.phone && <p className="mt-1.5 text-sm text-destructive font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">Messaggio</label>
                    <textarea
                      rows={5}
                      placeholder="Descrivi i tuoi obiettivi di rendimento, la tua tolleranza al rischio e gli asset target..."
                      value={form.message}
                      onChange={set("message")}
                      className={`${ic("message")} resize-none`}
                    />
                  </div>

                  {/* API error */}
                  {apiError && (
                    <div className="rounded-[24px] border border-destructive/50 bg-destructive/10 px-5 py-4 text-sm text-destructive font-medium shadow-sm">
                      {apiError}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border">
                    <p className="text-[13px] text-muted-foreground flex items-center gap-2">
                      <Zap size={14} className="text-primary" />
                      Crittografia end-to-end. Nessuna conservazione dei dati.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-[24px] bg-primary px-8 text-[15px] font-medium text-primary-foreground hover:bg-primary-hover transition-all shadow-lift disabled:opacity-60 whitespace-nowrap shrink-0"
                    >
                      {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin relative z-10" />
                      ) : (
                        <Send className="h-4 w-4 relative z-10" />
                      )}
                      <span className="relative z-10">{status === "loading" ? "Trasmissione..." : "Invia Richiesta"}</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
