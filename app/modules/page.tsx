import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ModuleGrid } from "@/components/modules/ModuleGrid";

export const metadata: Metadata = {
  title: "Modules | The Prominent",
  description:
    "Explore The Prominent's full suite of ERP modules. Filter by industry and business size to find the right fit for your business.",
  openGraph: {
    title: "Modules | The Prominent",
    description:
      "12 enterprise-grade modules covering finance, HR, inventory, sales, CRM, and more.",
  },
};

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-bg-layout-purple text-white">
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-40 pb-16 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary-purple/15 blur-[120px] rounded-full -z-10" />
          <div className="container mx-auto text-center max-w-2xl">
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
              Enterprise Modules
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Everything you need to run your business.
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Pick the modules you need today. Add the rest as you grow. Tap
              any module to see what&apos;s inside.
            </p>
          </div>
        </section>

        {/* Module grid with filter */}
        <section className="pb-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <ModuleGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
