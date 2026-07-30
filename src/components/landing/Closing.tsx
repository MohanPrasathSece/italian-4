import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, Minus, Plus, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CountUp, EASE, FloatCard, Magnetic, Reveal, SectionHeading } from "./primitives";

const testimonials = [
  {
    n: "Amelia Hart",
    r: "Founder, Halden Studio",
    q: "The first crypto product that felt like private banking. Calm, clear, and genuinely well advised.",
  },
  {
    n: "Daniel Osei",
    r: "CFO, Meridian Group",
    q: "Reporting is immaculate. Our auditors had zero questions, which has never happened before.",
  },
  {
    n: "Sofia Lindqvist",
    r: "Private investor",
    q: "I stopped watching charts at midnight. The strategy does the work and the updates are actually useful.",
  },
  {
    n: "Marcus Reid",
    r: "Partner, Blackpine",
    q: "Custody, compliance and performance in one place. It replaced three separate relationships for us.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <SectionHeading eyebrow="Clients" title="Trusted with serious capital" />
      <div className="group relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-6 group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <article
              key={t.n + i}
              className="w-[380px] shrink-0 rounded-[32px] border border-border bg-card p-9 shadow-float transition-transform duration-500 hover:-translate-y-2 hover:shadow-lift"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-6 text-[1.0625rem] leading-relaxed">"{t.q}"</p>
              <div className="mt-8 flex items-center gap-4">
                <span className="font-display flex size-12 items-center justify-center rounded-full bg-accent font-bold text-primary">
                  {t.n
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <div>
                  <p className="font-medium">{t.n}</p>
                  <p className="text-sm text-muted-foreground">{t.r}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { v: 4.2, suffix: "B", prefix: "$", d: 1, l: "Assets under management" },
  { v: 38, suffix: "", d: 0, l: "Countries served" },
  { v: 74000, suffix: "+", d: 0, l: "Clients invested" },
  { v: 21.4, suffix: "%", d: 1, l: "Avg. annualised return" },
];

export function Stats() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-[40px] border border-border bg-card p-10 shadow-lift sm:grid-cols-2 lg:grid-cols-4 md:p-14">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08} className="text-center">
            <p className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-bold text-primary">
              <CountUp to={s.v} decimals={s.d} prefix={s.prefix ?? ""} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const plans = [
  {
    n: "Core",
    p: "0.75",
    d: "For first allocations into digital assets.",
    f: ["Managed core portfolio", "Insured custody", "Quarterly reporting", "Email support"],
  },
  {
    n: "Private",
    p: "1.10",
    d: "For investors building a serious position.",
    f: [
      "All Core strategies",
      "Staking & yield sleeves",
      "Named advisor",
      "Tax-ready statements",
      "Priority settlement",
    ],
  },
  {
    n: "Institutional",
    p: "Custom",
    d: "For funds, family offices and treasuries.",
    f: ["Bespoke mandates", "Segregated accounts", "API & data feeds", "Dedicated desk"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-28 px-4 py-24">
      <SectionHeading
        eyebrow="Pricing"
        title="One transparent management fee"
        description="No performance fees, no spread games, no exit charges. Billed annually on assets managed."
      />
      <div className="mx-auto mt-16 grid max-w-6xl items-center gap-6 lg:grid-cols-3">
        {plans.map((pl, i) => {
          const featured = i === 1;
          return (
            <FloatCard
              key={pl.n}
              delay={i * 0.08}
              className={
                featured
                  ? "border-primary/20 p-10 shadow-lift lg:-my-8 lg:scale-[1.03]"
                  : ""
              }
            >
              {featured && (
                <span className="mb-5 inline-flex rounded-[24px] bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  Most chosen
                </span>
              )}
              <h3 className="text-[1.6rem] font-bold">{pl.n}</h3>
              <p className="mt-2 text-muted-foreground">{pl.d}</p>
              <p className="font-display mt-7 text-4xl font-bold">
                {pl.p === "Custom" ? "Custom" : `${pl.p}%`}
                {pl.p !== "Custom" && (
                  <span className="text-base font-medium text-muted-foreground"> / year</span>
                )}
              </p>
              <ul className="mt-8 space-y-3">
                {pl.f.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-muted-foreground">
                    <Check size={18} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-9 flex items-center justify-center gap-2 rounded-[24px] px-6 py-3.5 text-[15px] font-medium transition-all duration-500 ${
                  featured
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "border border-border hover:bg-accent"
                }`}
              >
                {pl.p === "Custom" ? "Talk to us" : "Get started"}
              </a>
            </FloatCard>
          );
        })}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Who holds my assets?",
    a: "Assets sit with regulated qualified custodians in segregated, multi-signature cold storage, insured against theft and key loss.",
  },
  {
    q: "What is the minimum investment?",
    a: "Core opens from $5,000. Private is designed for allocations from $100,000, and Institutional mandates are quoted individually.",
  },
  {
    q: "Can I withdraw at any time?",
    a: "Yes. There are no lock-ups or exit fees; withdrawals are typically settled to your bank within one business day.",
  },
  {
    q: "How are returns reported for tax?",
    a: "Every account produces tax-ready annual statements with realised gains, income and cost basis in your local currency.",
  },
  {
    q: "Is Northvault regulated?",
    a: "We operate under a licensed investment firm, audited quarterly, with client money and assets held separately from our own.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-28 px-4 py-24">
      <SectionHeading eyebrow="FAQ" title="Questions, answered plainly" />
      <div className="mx-auto mt-14 max-w-3xl space-y-4">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="overflow-hidden rounded-[32px] border border-border bg-card shadow-float">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 p-8 text-left"
              >
                <span className="font-display text-[1.15rem] font-bold">{f.q}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  {open === i ? <Minus size={17} /> : <Plus size={17} />}
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="px-8 pb-8 leading-relaxed text-muted-foreground">{f.a}</p>
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="cta" className="scroll-mt-28 px-4 py-24">
      <Reveal>
        <div className="mx-auto max-w-5xl rounded-[40px] border border-border bg-card px-8 py-20 text-center shadow-lift md:px-16">
          <h2 className="mx-auto max-w-2xl text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[1.05] font-bold">
            Start building wealth with digital assets today
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Open an account in four minutes. Speak to an advisor whenever you want one.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-[24px] bg-primary px-8 py-4 text-[15px] font-medium text-primary-foreground transition-all duration-500 hover:bg-primary-hover hover:shadow-lift"
              >
                Start Investing
                <ArrowRight
                  size={17}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pt-10 pb-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-border pt-10 sm:flex-row">
        <p className="font-display font-bold">Northvault</p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Northvault Capital. Capital at risk.
        </p>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-primary">
            Platform
          </a>
          <a href="#pricing" className="transition-colors hover:text-primary">
            Pricing
          </a>
          <a href="#faq" className="transition-colors hover:text-primary">
            Support
          </a>
          <Link to="/privacy" className="transition-colors hover:text-primary">
            Privacy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-primary">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}