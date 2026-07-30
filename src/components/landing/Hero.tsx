import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import dashboardImg from "@/assets/dashboard.jpg";
import abstractImg from "@/assets/abstract.jpg";
import { EASE, Magnetic } from "./primitives";

const words = ["Invest", "Smarter.", "Build", "Wealth", "with", "Digital", "Assets."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pt-40 pb-24 md:pt-48 md:pb-32">
      <img
        src={abstractImg}
        alt=""
        aria-hidden="true"
        width={1408}
        height={1008}
        className="pointer-events-none absolute -top-32 left-1/2 w-[1400px] max-w-none -translate-x-1/2 opacity-[0.35] blur-[2px] select-none"
      />

      <motion.div
        style={{ y, scale, opacity: fade }}
        className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_1fr]"
      >
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-[24px] border border-border bg-card px-4 py-2 text-xs font-medium text-primary shadow-float"
          >
            <TrendingUp size={14} /> Regulated digital asset management
          </motion.span>

          <h1 className="mt-8 text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.98] font-bold">
            {words.map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.1 + i * 0.07, ease: EASE }}
                className="mr-[0.25em] inline-block"
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            A calm, institutional-grade platform for building long-term wealth across bitcoin,
            ethereum and curated digital asset portfolios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-[24px] bg-primary px-7 py-4 text-[15px] font-medium text-primary-foreground transition-all duration-500 hover:bg-primary-hover hover:shadow-lift"
              >
                Start Investing
                <ArrowRight
                  size={17}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-[24px] border border-border bg-card px-7 py-4 text-[15px] font-medium shadow-float transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Learn More
                <ArrowUpRight size={17} />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
          className="relative"
        >
          <div className="float-slow overflow-hidden rounded-[30px] border border-border bg-card shadow-lift">
            <img
              src={dashboardImg}
              alt="Northvault portfolio dashboard showing total value, allocation and holdings"
              width={1408}
              height={1008}
              className="w-full"
            />
          </div>

          <div className="float-slower absolute -top-8 -left-6 hidden w-52 rounded-[24px] border border-border bg-card p-5 shadow-float sm:block">
            <p className="text-xs text-muted-foreground">Portfolio value</p>
            <p className="mt-1 font-display text-2xl font-bold">$58,742.82</p>
            <p className="mt-1 text-xs font-medium text-primary">+8.47% this month</p>
          </div>

          <div
            className="float-slow absolute -right-4 -bottom-8 hidden w-44 rounded-[24px] border border-border bg-card p-5 shadow-float sm:block"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">BTC</span>
              <span className="text-xs text-primary">+2.35%</span>
            </div>
            <p className="mt-1 font-display text-lg font-bold">$67,842</p>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm font-medium">ETH</span>
              <span className="text-xs text-primary">+1.15%</span>
            </div>
            <p className="mt-1 font-display text-lg font-bold">$3,245</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}