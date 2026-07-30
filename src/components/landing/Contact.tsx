import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { EASE, Reveal, SectionHeading } from "./primitives";

const details = [
  { icon: Mail, label: "Email", value: "advisors@northvault.com" },
  { icon: Phone, label: "Phone", value: "+44 20 7946 0112" },
  { icon: MapPin, label: "Office", value: "12 Finsbury Circus, London" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (!name || name.length > 100) next.name = "Please enter your name (max 100 characters).";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 255)
      next.email = "Please enter a valid email address.";
    if (!message || message.length > 1000)
      next.message = "Please enter a message (max 1000 characters).";
    setErrors(next);
    if (Object.keys(next).length) return;
    e.currentTarget.reset();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Speak with an advisor"
        description="Tell us about your allocation and we will reply within one business day."
      />
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="h-full">
          <div className="flex h-full flex-col justify-between gap-10 rounded-[40px] border border-border bg-card p-10 shadow-float">
            <div className="space-y-7">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <d.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{d.label}</p>
                    <p className="mt-0.5 font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Prefer a call? Advisors are available Monday to Friday, 8am–7pm GMT.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[40px] border border-border bg-card p-10 shadow-lift"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField name="name" label="Full name" placeholder="Amelia Hart" error={errors.name} />
              <FormField
                name="email"
                type="email"
                label="Email"
                placeholder="you@company.com"
                error={errors.email}
              />
            </div>
            <div className="mt-4">
              <FormField
                name="message"
                label="Message"
                placeholder="I'd like to discuss a $250k allocation…"
                textarea
                error={errors.message}
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-[24px] bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-500 hover:bg-primary-hover hover:shadow-lift"
              >
                Send message
                <ArrowRight
                  size={17}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    <Check size={16} /> Thank you — we'll be in touch shortly.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FormField({
  name,
  label,
  placeholder,
  type = "text",
  textarea = false,
  error,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  error?: string;
}) {
  const base =
    "mt-2 w-full rounded-[24px] border border-border bg-background px-5 py-3.5 text-[15px] outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-primary/40";
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} rows={5} maxLength={1000} placeholder={placeholder} className={base} />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          maxLength={255}
          placeholder={placeholder}
          className={base}
        />
      )}
      {error && <p className="mt-2 text-sm text-primary">{error}</p>}
    </div>
  );
}