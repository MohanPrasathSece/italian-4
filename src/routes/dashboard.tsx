import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Hexagon, LogOut, Briefcase, TrendingUp, ShieldCheck, ArrowUpRight, Zap, Target } from "lucide-react";
import { Contact } from "@/components/landing/Contact";
import { motion } from "framer-motion";
import { EASE, SectionHeading } from "@/components/landing/primitives";
import { Footer } from "@/components/landing/Closing";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardNav() {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShrunk(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("sessionToken");
    window.location.href = "/";
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <motion.nav
        animate={{
          paddingTop: shrunk ? 6 : 10,
          paddingBottom: shrunk ? 6 : 10,
          scale: shrunk ? 0.97 : 1,
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex w-full max-w-6xl items-center gap-2 rounded-[24px] px-3 bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-[24px] px-3 py-2"
        >
          <Hexagon className="text-white" size={20} strokeWidth={2.2} />
          <span className="font-display text-[15px] font-bold tracking-tight text-white">Northvault</span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-[24px] px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white/70 transition-colors duration-300 hover:text-white hover:bg-white/10"
          >
            <LogOut size={16} />
            Esci
          </button>
        </div>
      </motion.nav>
    </motion.header>
  );
}

const processSteps = [
  {
    icon: Briefcase,
    title: "1. Analisi del Portafoglio",
    desc: "Analizziamo i tuoi asset attuali e definiamo un profilo di rischio su misura per i tuoi obiettivi finanziari.",
  },
  {
    icon: Target,
    title: "2. Allocazione Strategica",
    desc: "I nostri algoritmi e consulenti esperti allocano dinamicamente i tuoi fondi tra asset digitali premium e coperture tradizionali.",
  },
  {
    icon: ShieldCheck,
    title: "3. Custodia Istituzionale",
    desc: "I tuoi asset sono al sicuro in celle frigorifere di livello militare con copertura assicurativa completa e supervisione normativa.",
  },
];

const growthStrategies = [
  {
    icon: TrendingUp,
    title: "Crescita Composta",
    desc: "Reinvestendo continuamente i rendimenti, il tuo capitale cresce in modo esponenziale nel tempo, non lineare.",
  },
  {
    icon: Zap,
    title: "Ribilanciamento Algoritmico",
    desc: "Ribilanciamo automaticamente il tuo portafoglio per sfruttare le inefficienze del mercato senza intervento manuale.",
  },
];

function DashboardPage() {
  useEffect(() => {
    // Basic auth check
    if (!localStorage.getItem("sessionToken")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background pt-32">
      <DashboardNav />
      
      <main className="mx-auto max-w-6xl px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 text-center"
        >
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05]">
            Benvenuto nella tua Dashboard
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Scopri come gestiamo la tua ricchezza e scopri le strategie per massimizzare i tuoi rendimenti.
          </p>
        </motion.div>

        {/* SECTION 1: How it Works */}
        <section className="mb-32">
          <SectionHeading eyebrow="Il Nostro Processo" title="Come Funziona Northvault" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="rounded-[32px] border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lift"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon size={24} />
                </div>
                <h3 className="font-display mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Improving Investment */}
        <section className="mb-32">
          <SectionHeading eyebrow="Strategie di Crescita" title="Massimizzare i Tuoi Rendimenti" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {growthStrategies.map((strategy, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="group relative overflow-hidden rounded-[32px] border border-border bg-card p-8 md:p-12"
              >
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-foreground transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <strategy.icon size={28} />
                  </div>
                  <h3 className="font-display mb-4 text-2xl font-bold">{strategy.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{strategy.desc}</p>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Contact Advisor (Reusing Contact form logic) */}
        <section id="contact-advisor">
          <div className="rounded-[40px] border border-border bg-accent/30 p-4 md:p-12">
            <Contact />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
