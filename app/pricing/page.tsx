import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/data/pricing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing | The Prominent",
  description:
    "Simple, transparent pricing. Start free for 30 days. Scale as you grow. No lock-in, no surprise fees.",
  openGraph: {
    title: "Pricing | The Prominent",
    description:
      "Start free, scale with confidence. Three plans for every stage of your business.",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-layout-purple text-white">
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-purple/15 blur-[120px] rounded-full -z-10" />
          <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
            Plans
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Pick your stage of the journey.
          </h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Grow into the next tier as your business does. No lock-in, no
            surprise jumps.
          </p>
        </section>

        {/* Plans */}
        <section className="pb-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-3xl border p-8 flex flex-col gap-6",
                    plan.featured
                      ? "border-button-orange bg-gradient-to-b from-button-orange/10 to-button-orange/5 shadow-2xl shadow-button-orange/20 md:-translate-y-6"
                      : "border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
                  )}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-button-orange text-white text-md font-bold rounded-full whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <h3
                      className={cn(
                        "text-2xl font-bold",
                        plan.featured ? "text-button-orange" : "text-white"
                      )}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-3xl font-bold mt-2 text-white">
                      {plan.price}
                      {plan.period && (
                        <span className="text-md text-white/40 font-normal ml-1">
                          {plan.period}
                        </span>
                      )}
                    </p>
                    <p className="text-white/55 text-sm mt-3 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-white/80"
                      >
                        <Check className="w-4 h-4 text-button-orange shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/book-a-demo"
                    className={cn(
                      "w-full py-3 rounded-full font-semibold text-center transition-all block",
                      plan.featured
                        ? "bg-button-orange hover:bg-bg-orange-btn text-white"
                        : "bg-transparent border border-white/30 hover:bg-white/10 text-white"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            {/* Trust note */}
            <p className="text-center text-white/30 text-sm mt-10">
              300+ Philippine businesses run on The Prominent — from retail
              chains to mid-market manufacturers.
            </p>
          </div>
        </section>

        {/* Comparison hint */}
        <section className="py-16 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
              Compare
            </p>
            <h2 className="text-3xl font-bold mb-4">
              All plans include the essentials
            </h2>
            <p className="text-white/55 mb-10">
              Every plan ships with these out of the box.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "SSL encryption",
                "Daily backups",
                "99.9% uptime SLA",
                "PH data residency",
                "BIR-ready exports",
                "Mobile access",
                "Multi-user roles",
                "Audit logs",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03] text-sm"
                >
                  <Check className="w-4 h-4 text-button-orange shrink-0" />
                  <span className="text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
                FAQ
              </p>
              <h2 className="text-4xl font-bold">Common questions</h2>
            </div>
            <PricingFAQ />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
