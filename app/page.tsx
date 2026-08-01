import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import { faqs } from "@/lib/content";

// Lazy load below-the-fold content for faster initial load
const Marquee = dynamic(() => import("@/components/Marquee"), {
  loading: () => <div className="h-16 bg-[rgb(var(--surface))]" />,
});
const Features = dynamic(() => import("@/components/Features"), {
  loading: () => <div className="h-96 bg-[rgb(var(--surface))]" />,
});
const Stats = dynamic(() => import("@/components/Stats"), {
  loading: () => <div className="h-48 bg-[rgb(var(--surface))]" />,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="h-96 bg-[rgb(var(--surface))]" />,
});
const Faq = dynamic(() => import("@/components/Faq"), {
  loading: () => <div className="h-64 bg-[rgb(var(--surface))]" />,
});
const FinalCta = dynamic(() => import("@/components/FinalCta"), {
  loading: () => <div className="h-48 bg-[rgb(var(--surface))]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-32 bg-[rgb(var(--surface))]" />,
});
const Reveal = dynamic(() => import("@/components/Reveal"));
const Interactions = dynamic(() => import("@/components/Interactions"), {
  // Don't render on mobile - these are desktop-only effects
  ssr: false,
});

/**
 * The README claimed `FAQPage` structured data shipped, but no JSON-LD was
 * ever emitted. Generated from the same `faqs` array the UI renders, so the
 * markup and the structured data can't disagree.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function AestoraLanding() {
  return (
    <>
      <script
        type="application/ld+json"
        // Content is authored, not user input, and JSON.stringify escapes the
        // quotes; `</script>` is neutralised defensively all the same.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="relative">
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
