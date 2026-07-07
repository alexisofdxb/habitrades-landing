import Benefits from "@/src/components/Benefits";
import Features from "@/src/components/Features";
import CTA from "@/src/components/CTA";
import FAQ from "@/src/components/FAQ";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import HowItWorks from "@/src/components/HowItWorks";
import LogoCloud from "@/src/components/LogoCloud";
import MeetYourAgent from "@/src/components/MeetYourAgent";
import IntelligenceStack from "@/src/components/IntelligenceStack";
import ThreeWays from "@/src/components/ThreeWays";
import Navbar from "@/src/components/Navbar";
import { getLatestBlogPosts } from "@/src/lib/blog";

export const revalidate = 60;

export default async function Home() {
  const latestPosts = await getLatestBlogPosts(3);

  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <Hero />
        <LogoCloud />
        <MeetYourAgent />
        <Benefits />
        <HowItWorks />
        <IntelligenceStack />
        <ThreeWays posts={latestPosts} />
        <Features />
        {/* ADXHeartbeat ($HABI / Economy) — hidden until ready */}
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
