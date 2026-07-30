import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Hexagon, Mail, Lock, User, X } from "lucide-react";
import { EASE } from "./primitives";

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
    <Ctx.Provider
      value={{
        open: (m: Mode = "login") => {
          setMode(m);
          setIsOpen(true);
        },
        close: () => setIsOpen(false),
      }}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <AuthModal mode={mode} setMode={setMode} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function Field({
  icon: Icon,
  ...props
}: { icon: typeof Mail } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group flex items-center gap-3 rounded-[24px] border border-border bg-background px-5 py-3.5 transition-colors duration-300 focus-within:border-primary/40">
      <Icon size={17} className="shrink-0 text-muted-foreground" />
      <input
        {...props}
        className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}

function AuthModal({
  mode,
  setMode,
  onClose,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  onClose: () => void;
}) {
  const isSignup = mode === "signup";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-md"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={isSignup ? "Create account" : "Sign in"}
        initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(6px)" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative w-full max-w-md rounded-[40px] border border-border bg-card p-9 shadow-lift"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X size={17} />
        </button>

        <Hexagon className="text-primary" size={26} strokeWidth={2.2} />
        <h2 className="font-display mt-5 text-[1.75rem] leading-tight font-bold">
          {isSignup ? "Create your account" : "Welcome back"}
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground">
          {isSignup
            ? "Open a Northvault account in four minutes."
            : "Sign in to your Northvault portfolio."}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-1 rounded-[24px] bg-accent p-1">
          {(["login", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="relative rounded-[20px] px-4 py-2 text-sm font-medium transition-colors duration-300"
            >
              {mode === m && (
                <motion.span
                  layoutId="auth-tab"
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-0 rounded-[20px] bg-card shadow-float"
                />
              )}
              <span
                className={`relative ${mode === m ? "text-foreground" : "text-muted-foreground"}`}
              >
                {m === "login" ? "Sign in" : "Sign up"}
              </span>
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence initial={false}>
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <Field icon={User} type="text" placeholder="Full name" autoComplete="name" />
              </motion.div>
            )}
          </AnimatePresence>
          <Field icon={Mail} type="email" placeholder="Email address" autoComplete="email" />
          <Field
            icon={Lock}
            type="password"
            placeholder="Password"
            autoComplete={isSignup ? "new-password" : "current-password"}
          />

          {!isSignup && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-[24px] bg-primary px-6 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-500 hover:bg-primary-hover hover:shadow-lift"
          >
            {isSignup ? "Create account" : "Sign in"}
            <ArrowRight
              size={17}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Protected by bank-grade encryption. Capital at risk.
        </p>
      </motion.div>
    </div>
  );
}