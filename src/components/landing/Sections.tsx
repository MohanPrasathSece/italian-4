import { motion } from "framer-motion";
import {
  ShieldCheck,
  LineChart,
  Wallet,
  Layers,
  Lock,
  Sparkles,
  Check,
} from "lucide-react";
import officeImg from "@/assets/office.jpg";
import { CountUp, EASE, FloatCard, Reveal, SectionHeading } from "./primitives";

const companies = [
  "Meridian",
  "Ashcroft",
  "Blackpine",
  "Orwell & Co",
  "Halden",
  "Nordisk",
  "Vantage",
  "Kestrel",
];

export function Marquee() {
  return (
    <section className="px-4 py-16">
      <p className="text-center text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Trusted by allocators at
      </p>
      <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-16">
          {[...companies, ...companies].map((c, i) => (
            <span
              key={c + i}
              className="font-display text-xl font-medium whitespace-nowrap text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: ShieldCheck,
    title: "Insured custody",
    body: "Assets held in segregated, multi-signature cold storage with institutional insurance cover.",
  },
  {
    icon: LineChart,
    title: "Managed strategies",
    body: "Research-led portfolios rebalanced automatically as market structure shifts.",
  },
  {
    icon: Wallet,
    title: "Effortless funding",
    body: "Fund by bank transfer or card and settle into your allocation within minutes.",
  },
  {
    icon: Layers,
    title: "Deep diversification",
    body: "Exposure across majors, staking yield and tokenised treasuries in one account.",
  },
  {
    icon: Lock,
    title: "Compliance first",
    body: "Fully licensed, audited quarterly and reported in a format your accountant will like.",
  },
  {
    icon: Sparkles,
    title: "Intelligent alerts",
    body: "Quiet, meaningful signals — never noise — the moment your thesis needs attention.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-28 px-4 py-24">
      <SectionHeading
        eyebrow="Capabilities"
        title="Everything you need to invest with conviction"
        description="A complete, quietly powerful platform designed around long-term outcomes rather than daily noise."
      />
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FloatCard
            key={f.title}
            delay={i * 0.06}
            tilt={i % 2 === 0 ? -2 : 2}
            className={i % 3 === 1 ? "lg:mt-10" : ""}
          >
            <div className="flex size-14 items-center justify-center rounded-[20px] bg-accent">
              <f.icon className="text-primary" size={26} strokeWidth={1.8} />
            </div>
            <h3 className="mt-7 text-[1.4rem] font-bold">{f.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{f.body}</p>
          </FloatCard>
        ))}
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <div className="float-slower overflow-hidden rounded-[30px] border border-border shadow-lift">
            <img
              src={officeImg}
              alt="Portfolio manager reviewing digital asset performance in a modern office"
              loading="lazy"
              width={1200}
              height={1408}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Northvault"
            title="Built by people who manage capital for a living"
            description="We combine private-bank discipline with the transparency digital assets should have had from the start."
          />
          <div className="mt-10 space-y-4">
            {[
              { n: 12, suffix: " yrs", label: "Average team experience in asset management" },
              { n: 100, suffix: "%", label: "Client assets held in insured cold storage" },
              { n: 24, suffix: "/7", label: "Monitoring, with a named advisor on every account" },
            ].map((s, i) => (
              <FloatCard key={s.label} delay={i * 0.08} className="flex items-center gap-6 p-7">
                <p className="font-display min-w-[104px] text-3xl font-bold text-primary">
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="text-muted-foreground">{s.label}</p>
              </FloatCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CHART_PATH =
  "M0 150 L60 132 L120 138 L180 104 L240 118 L300 74 L360 88 L420 46 L480 58 L540 20";

export function Dashboard() {
  return (
    <section id="dashboard" className="scroll-mt-28 px-4 py-24">
      <SectionHeading
        eyebrow="The platform"
        title="Your portfolio, beautifully understood"
        description="One calm surface for performance, profit and allocation — no dashboards you need a manual for."
      />

      <Reveal delay={0.1}>
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 rounded-[40px] border border-border bg-card p-6 shadow-lift md:p-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-[32px] border border-border p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total portfolio value</p>
                <p className="font-display mt-2 text-4xl font-bold">
                  $<CountUp to={58742.82} decimals={2} />
                </p>
              </div>
              <span className="rounded-[24px] bg-accent px-3 py-1.5 text-sm font-medium text-primary">
                +8.47%
              </span>
            </div>

            <svg viewBox="0 0 540 170" className="mt-8 w-full" role="img" aria-label="Portfolio growth chart">
              {[0, 42, 84, 126, 168].map((y) => (
                <line key={y} x1="0" x2="540" y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
              ))}
              <motion.path
                d={CHART_PATH}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 2, ease: EASE }}
              />
            </svg>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[32px] border border-border p-8">
              <p className="text-sm text-muted-foreground">Realised profit</p>
              <p className="font-display mt-2 text-3xl font-bold text-primary">
                +$<CountUp to={12480} />
              </p>
            </div>
            <div className="rounded-[32px] border border-border p-8">
              <p className="text-sm text-muted-foreground">Allocation</p>
              <div className="mt-5 space-y-4">
                {[
                  { k: "Bitcoin", v: 60 },
                  { k: "Ethereum", v: 25 },
                  { k: "Yield & treasuries", v: 15 },
                ].map((a, i) => (
                  <div key={a.k}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{a.k}</span>
                      <span className="text-muted-foreground">{a.v}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-[24px] bg-accent">
                      <motion.div
                        className="h-full rounded-[24px] bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${a.v}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const steps = [
  { t: "Open your account", d: "Verify in under four minutes with a passport or ID." },
  { t: "Choose a strategy", d: "Answer six questions and we model a portfolio around your horizon." },
  { t: "Fund securely", d: "Transfer from your bank; assets settle into insured custody." },
  { t: "Compound quietly", d: "We rebalance, report and stay available. You get on with life." },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-28 px-4 py-24">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps from curious to invested"
      />
      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute top-0 bottom-0 left-[27px] w-px bg-border md:left-1/2" />
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.08} className="relative mb-6 pl-16 md:pl-0">
            <div
              className={`md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}
            >
              <div className="rounded-[32px] border border-border bg-card p-8 shadow-float transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="font-display text-sm font-bold text-primary">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[1.35rem] font-bold">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </div>
            <span className="absolute top-10 left-[19px] flex size-4 items-center justify-center rounded-full border-4 border-background bg-primary md:left-[calc(50%-8px)]">
              <Check size={0} />
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}