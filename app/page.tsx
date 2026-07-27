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

export default function AestoraLanding() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Stats />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Interactions />
    </>
  );
}
