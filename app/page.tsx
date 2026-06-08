import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { BusinessStats } from "@/components/home/BusinessStats";
import { AboutSection } from "@/components/home/AboutSection";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { ModulesSection } from "@/components/home/ModulesSection";
import { PlansSection } from "@/components/home/PlansSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />
      <HeroSection />
      <BusinessStats />
      <AboutSection />
      <TestimonialsPreview />
      <ModulesSection />
      <PlansSection />
      <CTASection />
      <Footer />
    </main>
  );
}
