import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Loader2, CheckCircle2, Mail, Phone } from "lucide-react";
import { CountryDropdown } from "./CountryDropdown";
import { validatePhone } from "@/lib/validation";

type Mode = "login" | "signup";
type AuthCtx = { open: (mode?: Mode) => void; close: () => void };
const Ctx = createContext<AuthCtx>({ open: () => {}, close: () => {} });
export const useAuthModal = () => useContext(Ctx);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("login");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Ctx.Provider value={{
      open: (m: Mode = "login") => { setMode(m); setIsOpen(true); },
      close: () => setIsOpen(false),
    }}>
      {children}
      <AnimatePresence>
        {isOpen && <AuthModal mode={mode} setMode={setMode} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function AuthModal({ mode, setMode, onClose }: { mode: Mode; setMode: (m: Mode) => void; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "CH",
  });

  const handleClose = () => {
    if (loading) return;
    onClose();
    setTimeout(() => {
      setMode("login");
      setError("");
      setSuccess("");
      setFormData({ name: "", email: "", phone: "", country: "CH" });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "signup") {
      const phoneError = validatePhone(formData.phone, formData.country);
      if (phoneError) {
        setError(phoneError);
        setLoading(false);
        return;
      }
    }

    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json().catch(()=>({}));
        
        if (res.ok) {
          localStorage.setItem("sessionToken", data.token);
          window.location.href = "/dashboard";
        } else {
          const errMsg = data.message || data.error || "An unexpected error occurred during login.";
          setError(errMsg);
        }
      } else {
        const parts = formData.name.trim().split(" ");
        const firstName = parts[0];
        const lastName = parts.slice(1).join(" ");
        
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            firstName,
            lastName,
            phone: formData.phone,
            countryName: formData.country,
          }),
        });
        
        const data = await res.json().catch(()=>({}));
        
        if (res.ok) {
          if (data.token) localStorage.setItem("sessionToken", data.token);
          setSubmitted(true);
          setTimeout(() => window.location.href = "/dashboard", 4500);
        } else {
          const errMsg = data.message || data.error || "An unexpected error occurred.";
          setError(errMsg);
        }
      }
    } catch (err: any) {
      const rawMsg = (err?.message || err?.toString() || "");
      setError(rawMsg || "Si è verificato un errore imprevisto durante la connessione al server.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full rounded-[20px] border border-border bg-background/50 px-5 py-3.5 text-[15px] text-foreground transition-colors focus:border-primary/40 focus:outline-none placeholder:text-muted-foreground";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
        onClick={!submitted ? handleClose : undefined}
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md overflow-visible rounded-[32px] pointer-events-auto shadow-lift border border-border bg-card"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center px-8 py-12"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="relative mb-6"
                >
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150" />
                  <div className="relative h-24 w-24 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-12 w-12 text-primary-foreground" strokeWidth={1.8} />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-[1.75rem] font-bold tracking-tight mb-3"
                >
                  Abbiamo ricevuto la tua richiesta!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  className="text-muted-foreground text-[15px] leading-relaxed mb-8 max-w-sm"
                >
                  Grazie per averci contattato. Il nostro team di esperti esaminerà le tue informazioni e
                  <span className="text-foreground font-medium"> ti contatterà entro 24 ore</span>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.54 }}
                  className="flex flex-wrap justify-center gap-3 mb-8"
                >
                  <span className="flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-2 text-xs text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    Conferma inviata alla tua email
                  </span>
                </motion.div>
                
                <button
                  onClick={() => window.location.href = "/dashboard"}
                  className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-[24px] bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary-hover"
                >
                  Vai alla Dashboard
                </button>
                <p className="mt-3 text-xs text-muted-foreground">Reindirizzamento automatico...</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-9">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-[1.75rem] font-bold tracking-tight">
                    {mode === "login" ? "Bentornato" : "Crea un account"}
                  </h2>
                  <button
                    onClick={handleClose}
                    disabled={loading}
                    className="grid h-9 w-9 place-items-center rounded-full bg-accent text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
                  >
                    <X className="h-[18px] w-[18px]" />
                  </button>
                </div>

                {error && (
                  <div className="mb-6 rounded-[16px] bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 text-center font-medium">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-6 rounded-[16px] bg-green-500/10 p-4 text-sm text-green-500 border border-green-500/20 text-center font-medium">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <input
                        required
                        type="text"
                        disabled={loading}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={inputBase}
                        placeholder="Nome e cognome"
                      />
                    </div>
                  )}

                  <div>
                    <input
                      required
                      type="email"
                      disabled={loading}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={inputBase}
                      placeholder="Indirizzo email"
                    />
                  </div>

                  {mode === "signup" && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <CountryDropdown
                            value={formData.country}
                            onChange={(v) => setFormData({ ...formData, country: v })}
                          />
                        </div>
                        <div>
                          <input
                            required
                            type="tel"
                            disabled={loading}
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className={inputBase}
                            placeholder="Numero di telefono"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-[24px] bg-primary px-6 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-300 hover:bg-primary-hover hover:shadow-lift disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : mode === "login" ? "Accedi" : "Crea un account"}
                    {!loading && <ArrowUpRight className="h-[18px] w-[18px]" />}
                  </button>
                </form>

                <div className="mt-8 text-center text-[14px] text-muted-foreground">
                  {mode === "login" ? (
                    <p>Non hai un account? <button type="button" onClick={() => {setMode("signup"); setError("")}} className="text-primary font-medium hover:underline">Registrati qui</button></p>
                  ) : (
                    <p>Sei già un investitore? <button type="button" onClick={() => {setMode("login"); setError("")}} className="text-primary font-medium hover:underline">Accedi</button></p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}