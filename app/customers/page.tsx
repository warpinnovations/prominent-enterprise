import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TESTIMONIALS, COMPANY_LOGOS } from "@/data/testimonials";
import { Navbar } from "@/components/Navbar";
import { CTA, Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Customers | The Prominent",
  description:
    "300+ Philippine businesses trust The Prominent for ERP. See how operators across retail, F&B, wholesale, and manufacturing scale with us.",
  openGraph: {
    title: "Customers | The Prominent",
    description:
      "Trusted by operators across the Philippines. Real results from real businesses.",
  },
};

const STATS = [
  { num: "300+", label: "Philippine businesses running on TPE" },
  { num: "60%", label: "Faster month-end close for finance teams" },
  { num: "7+", label: "Average branches per enterprise customer" },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-bg-layout-purple text-white">
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-primary-purple/15 blur-[120px] rounded-full -z-10" />
          <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
            Customers
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Trusted by operators across the Philippines.
          </h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Real results from businesses who made the switch.
          </p>
        </section>

        {/* Stats */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-center"
                >
                  <p className="text-5xl font-bold text-button-orange mb-3">
                    {s.num}
                  </p>
                  <p className="text-white/60 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl font-bold mb-12">What our customers say</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:border-button-orange/40 transition-colors group"
                >
                  <span className="absolute top-5 right-6 text-7xl leading-none text-button-orange/15 font-serif select-none pointer-events-none">
                    &ldquo;
                  </span>
                  <p className="text-white/85 leading-relaxed mb-8 relative z-10">
                    {t.fullQuote}
                  </p>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-white/50 text-sm mt-0.5">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company logos */}
        <section className="py-16 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <p className="text-center text-white/25 text-xs font-semibold uppercase tracking-widest mb-8">
              Companies running on The Prominent
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {COMPANY_LOGOS.map((logo) => (
                <div
                  key={logo.id}
                  className="h-12 bg-white/10 rounded-xl flex items-center justify-center text-xs font-bold text-white/40 tracking-widest"
                >
                  {logo.displayName}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
              Join them
            </p>
            <h2 className="text-4xl font-bold mb-6">
              Ready to see The Prominent in action?
            </h2>
            <p className="text-white/60 mb-8">
              15-minute personalized walkthrough. No commitment.
            </p>
            <Link
              href="/book-a-demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-full transition-all group text-lg"
            >
              Book a Demo
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
