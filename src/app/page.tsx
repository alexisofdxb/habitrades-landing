import ADXHeartbeat from "@/src/components/ADXHeartbeat";
import Benefits from "@/src/components/Benefits";
import CTA from "@/src/components/CTA";
import FAQ from "@/src/components/FAQ";
import Features from "@/src/components/Features";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import LogoCloud from "@/src/components/LogoCloud";
import ThreeWays from "@/src/components/ThreeWays";
import Navbar from "@/src/components/Navbar";
import WhyHabi from "@/src/components/WhyHabi";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <Hero />
        <LogoCloud />
        <WhyHabi />
        <Features />
        <Benefits />
        <ThreeWays />
        <ADXHeartbeat />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
