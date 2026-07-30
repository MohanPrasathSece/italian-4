import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marquee, Features, WhyUs, Dashboard, Process } from "@/components/landing/Sections";
import {
  Testimonials,
  Stats,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
} from "@/components/landing/Closing";

const title = "Northvault — Invest Smarter in Digital Assets";
const description =
  "Northvault is a calm, insured, institutional-grade platform for building long-term wealth across bitcoin, ethereum and managed digital asset portfolios.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis = instance;
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <WhyUs />
        <Dashboard />
        <Process />
        <Testimonials />
        <Stats />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
