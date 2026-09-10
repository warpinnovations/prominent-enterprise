import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ScrollProgress } from "@/components/Animations";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoCloud } from "@/components/LogoCloud";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { WhyProminent } from "@/components/WhyProminent";
import { HowItWorks } from "@/components/HowItWorks";
import { Integrations } from "@/components/Integrations";
import { SecurityCompliance } from "@/components/SecurityCompliance";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA, Footer } from "@/components/Footer";
import { PromoModal } from "@/components/PromoModal";

export default function EnterpriseHome() {
  return (
    <main className="min-h-screen mesh-gradient">
      <ScrollProgress />
      <header className="fixed top-0 inset-x-0 z-50">
        <AnnouncementBar />
        <Navbar embedded />
      </header>
      <Hero />
      <LogoCloud />
      <Stats
        heading="The Prominent Enterprise is a trusted system backed by real-world results and proven impact from the organizations that use it."
        stats={[
          { value: "1", label: "platform for accurate data" },
          { value: "95%+", label: "stock accuracy" },
          { value: "100%", label: "actions tracked" },
        ]}
      />
      <Features />
      <WhyProminent />
      <HowItWorks />
      <Integrations />
      <SecurityCompliance />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <PromoModal storageKey="hasSeenHomePromo" />
    </main>
  );
}
