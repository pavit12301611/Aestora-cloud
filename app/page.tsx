import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Aurora from "@/components/Aurora";
import Cursor from "@/components/Cursor";
import Interactions from "@/components/Interactions";
import ScrollProgress from "@/components/ScrollProgress";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Aurora />
      <main id="main">
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
      <Cursor />
      <Reveal />
    </>
  );
}
