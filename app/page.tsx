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
import { faqs } from "@/lib/content";

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
