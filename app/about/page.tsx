import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | The Prominent",
  description:
    "The Prominent Enterprise was built by operators who got tired of duct-taping spreadsheets and offshore ERPs. Made in the Philippines, for Philippine business.",
  openGraph: {
    title: "About | The Prominent",
    description:
      "Made in the Philippines, made for Philippine business. The story behind TPE.",
  },
};

const VALUES = [
  {
    title: "Operator-first",
    description:
      "Built by people who've run businesses, not just coded for them.",
  },
  {
    title: "Philippine-native",
    description:
      "Designed for PH compliance, PH languages, and PH business realities.",
  },
  {
    title: "Modular by design",
    description: "Start with what you need. Add more as you grow.",
  },
  {
    title: "Cloud-native",
    description:
      "Available anywhere, on any device, with zero infrastructure overhead.",
  },
];

const BADGES = ["Local team", "PH-compliant", "Cloud-native", "Multi-tenant"];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-layout-purple text-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 via-transparent to-button-orange/10 -z-10" />
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary-purple/15 blur-[120px] rounded-full -z-10" />
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
              About TPE
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Made in the Philippines,
              <br />
              made for Philippine business.
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-xl mx-auto">
              The Prominent Enterprise (TPE) was built by operators who got
              tired of duct-taping spreadsheets and offshore ERPs that
              didn&apos;t speak our language.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
                  Our Story
                </p>
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  We design tooling that fits how Filipino businesses actually
                  run.
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-4">
                  Across branches, currencies, and compliance regimes.
                  We&apos;ve been in the trenches — managing stock across 10
                  locations, reconciling payroll for 500 employees, closing
                  books under BIR deadlines.
                </p>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  We built TPE because we couldn&apos;t find a tool that
                  understood all of that. So we made one.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-semibold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <Link
                  href="/book-a-demo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-full transition-all group"
                >
                  Meet the team
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary-purple/20 to-button-orange/10 aspect-[4/3] flex items-center justify-center text-white/20 text-sm">
                [ Team photo ]
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
              Mission
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              To give every Philippine enterprise the ERP it deserves.
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Not an adapted foreign product. Not a spreadsheet workaround. A
              real, purpose-built system for how Filipino businesses operate.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
                Values
              </p>
              <h2 className="text-4xl font-bold">What we stand for</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-button-orange/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-button-orange/20 flex items-center justify-center mb-4">
                    <Check className="w-4 h-4 text-button-orange" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team placeholder */}
        <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
                Team
              </p>
              <h2 className="text-4xl font-bold">
                The people behind The Prominent
              </h2>
              <p className="text-white/50 mt-4">
                Operators, engineers, and designers who&apos;ve worked in the
                industries we serve.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-purple/50 to-button-orange/50 shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded-full w-28 mb-2" />
                    <div className="h-3 bg-white/5 rounded-full w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
