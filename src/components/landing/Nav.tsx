import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Hexagon } from "lucide-react";
import { EASE, Magnetic } from "./primitives";
import { useAuthModal } from "./AuthModal";

const links = [
  { id: "features", label: "Features" },
  { id: "why-us", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const auth = useAuthModal();
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState("features");

  useMotionValueEvent(scrollY, "change", (v) => setShrunk(v > 40));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

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
        className="flex w-full max-w-4xl items-center gap-2 rounded-[24px] px-3 bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-[24px] px-3 py-2"
        >
          <Hexagon className="text-white" size={20} strokeWidth={2.2} />
          <span className="font-display text-[15px] font-bold tracking-tight text-white">Northvault</span>
        </button>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="relative rounded-[24px] px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 rounded-[24px] bg-accent"
                />
              )}
              <span className="relative">{l.label}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <button
            onClick={() => auth.open("login")}
            className="hidden rounded-[24px] px-4 py-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors duration-300 hover:text-foreground sm:block"
          >
            Sign in
          </button>
          <Magnetic strength={0.25}>
            <button
              onClick={() => auth.open("signup")}
              className="rounded-[24px] bg-primary px-5 py-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
            >
              Start Investing
            </button>
          </Magnetic>
        </div>
      </motion.nav>
    </motion.header>
  );
}