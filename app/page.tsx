import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoCloud } from "@/components/LogoCloud";
import { Features } from "@/components/Features";
import { BentoGrid } from "@/components/BentoGrid";
import { Pricing } from "@/components/Pricing";
import { CTA, Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <BentoGrid />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
