"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Landmark,
  ReceiptText,
  FileCheck2,
  Wallet,
  Calculator,
  Users,
  Globe,
  FolderKanban,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { ScrollProgress } from "@/components/Animations";
import { Navbar } from "@/components/Navbar";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA, Footer } from "@/components/Footer";
import { PromoModal } from "@/components/PromoModal";
import { GovDashboardStack } from "@/components/GovDashboardStack";
import { RotatingText } from "@/components/RotatingText";
import { alternatingItem } from "@/components/Reveal";

const modules = [
  {
    icon: ReceiptText,
    title: "Real Property Tax (RPT)",
    description: "Assessment, billing, and collection with automated penalties and clearances.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: FileCheck2,
    title: "Business Permits & Licensing",
    description: "End-to-end BPLS — new applications, renewals, and one-stop-shop processing.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Wallet,
    title: "Treasury & Collections",
    description: "Cashiering, official receipts, and real-time revenue tracking across windows.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Calculator,
    title: "Budget & Accounting",
    description: "Budget preparation, obligations, disbursements, and government-standard reports.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: Users,
    title: "HR & Payroll",
    description: "Plantilla management, DTR, and automated payroll for LGU personnel.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Globe,
    title: "Citizen Services Portal",
    description: "Let constituents apply, request, and pay online — anytime, anywhere.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: FolderKanban,
    title: "Records & Documents",
    description: "Centralized, searchable document management with a full digital paper trail.",
    color: "from-indigo-400 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Executive Dashboard",
    description: "Real-time revenue, spending, and service metrics for data-driven governance.",
    color: "from-purple-400 to-pink-500",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Transparent & Audit-Ready",
    description: "Complete audit trails and government-compliant reporting keep every transaction accountable.",
  },
  {
    icon: Wallet,
    title: "Higher Revenue Collection",
    description: "Automated billing and reminders close leakages and improve collection efficiency.",
  },
  {
    icon: Globe,
    title: "Faster Citizen Services",
    description: "Digitize frontline services so permits and requests move in minutes, not days.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function GovernmentPage() {
  return (
    <main className="min-h-screen mesh-gradient">
      <ScrollProgress />
      <Navbar homeHref="/government" />

      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary-purple/15 blur-[160px] rounded-full -z-10" />
        <div className="absolute top-[20%] right-[8%] w-96 h-96 bg-button-orange/10 blur-[130px] rounded-full -z-10" />

        {/* Soft diagonal light shaft */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
          <div className="absolute top-[14%] left-[51%] h-[66%] w-28 rotate-[15deg] bg-gradient-to-b from-transparent via-white/[0.09] to-transparent blur-2xl" />
        </div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* LEFT — value proposition */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-purple/30 bg-primary-purple/10 text-sm font-medium text-widget-title-purple mb-6"
              >
                <Landmark className="w-4 h-4" />
                For Local Government Units
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="display text-5xl md:text-6xl lg:text-[4rem] font-bold text-white mb-6"
              >
                Digital government for{" "}
                <RotatingText
                  className="text-gradient"
                  words={["modern LGUs.", "smarter LGUs.", "connected LGUs.", "transparent LGUs."]}
                />
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-8 text-balance"
              >
                Prominent Government unifies treasury, taxation, permits, budget, and citizen
                services into one secure platform — built for transparency, revenue growth,
                and faster public service.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start gap-3 mb-10"
              >
                <Link href="/book-a-demo" className="btn-primary text-base">
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#gov-modules" className="btn-secondary text-base">
                  Explore modules
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/50"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  COA-ready audit trails
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-widget-title-purple" />
                  Online citizen services
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — interactive government dashboard stack */}
            <GovDashboardStack />
          </div>
        </div>
      </section>

      <Stats
        stats={[
          { value: "9+", label: "Connected offices" },
          { value: "70%", label: "Faster permits" },
          { value: "100%", label: "Audit-ready records" },
          { value: "24/7", label: "Citizen access" },
        ]}
      />

      {/* Modules */}
      <section id="gov-modules" className="py-24 md:py-32 relative overflow-hidden">
        {/* Layered gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-layout-purple/50 via-bg-purple/15 to-bg-layout-purple/50" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 28%, rgba(152,56,217,0.16), transparent 70%)",
          }}
        />
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow justify-center mb-4">
              <Landmark className="w-4 h-4" />
              Government Modules
            </p>
            <h2 className="display text-4xl md:text-5xl font-bold mb-5 text-white">
              One platform for the{" "}
              <span className="text-gradient">entire LGU.</span>
            </h2>
            <p className="text-white/55 text-lg text-balance">
              Purpose-built modules that connect every office — from the Treasurer to the Mayor.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                variants={alternatingItem(i)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full panel rounded-3xl p-6 overflow-hidden hover:border-white/20"
              >
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
                />
                <div
                  className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <mod.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="relative text-lg font-semibold text-white mb-2">{mod.title}</h3>
                <p className="relative text-sm text-white/45 leading-relaxed">{mod.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HowItWorks title="From assessment to full rollout." />

      {/* Benefits */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary-purple/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow justify-center mb-4">Why LGUs choose Prominent</p>
            <h2 className="display text-4xl md:text-5xl font-bold text-white">
              Govern with <span className="text-gradient">confidence.</span>
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative panel rounded-3xl p-8 overflow-hidden hover:border-white/20"
              >
                <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary-purple/40 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" />
                <span className="absolute top-6 right-7 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  0{i + 1}
                </span>
                <div className="relative w-12 h-12 rounded-2xl bg-primary-purple/15 border border-primary-purple/20 flex items-center justify-center mb-5">
                  <benefit.icon className="w-6 h-6 text-widget-title-purple" />
                </div>
                <h4 className="relative text-xl font-semibold text-white mb-3">{benefit.title}</h4>
                <p className="relative text-white/50 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Testimonials
        eyebrow="Trusted by public servants"
        title="Built for real governance."
      />

      <FAQ
        eyebrow="Government FAQ"
        title="What LGUs ask us."
        faqs={[
          {
            q: "Is Prominent Government compliant with government standards?",
            a: "Yes. Every transaction is logged with a complete audit trail and reports are built to align with government accounting and reporting requirements.",
          },
          {
            q: "Can it run alongside our existing systems?",
            a: "It can. We integrate with what you already use and migrate your data, so there's no disruptive rip-and-replace.",
          },
          {
            q: "How do citizens access online services?",
            a: "Through a secure Citizen Services Portal where constituents can apply, request documents, and pay — anytime, on any device.",
          },
          {
            q: "How long is implementation for an LGU?",
            a: "Timelines vary by size, but guided onboarding and data migration get most offices live in a matter of weeks.",
          },
          {
            q: "Is our data secure?",
            a: "Data is encrypted in transit and at rest, with role-based access controls per office and full accountability on every action.",
          },
        ]}
      />

      <CTA />
      <Footer />
      <PromoModal
        storageKey="hasSeenGovPromo"
        eyebrow="For LGUs"
        title="Modernize your LGU"
        description="See how Prominent Government digitizes treasury, taxation, permits, and citizen services in one platform."
        ctaLabel="Book a Government Demo"
      />
    </main>
  );
}
