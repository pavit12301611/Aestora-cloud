import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Interactions from "@/components/Interactions";
import Reveal from "@/components/Reveal";

export default function AestoraLanding() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[18rem] h-[90rem] opacity-80"
          style={{
            background:
              "radial-gradient(42% 18% at 18% 12%, var(--glow-c), transparent 72%), radial-gradient(32% 14% at 82% 36%, var(--glow-a), transparent 72%), radial-gradient(38% 16% at 50% 82%, var(--glow-b), transparent 74%)",
          }}
        />
        <Hero />
        <Marquee />
        <Features />
        <Stats />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Reveal />
      <Interactions />
    </>
  );
}
