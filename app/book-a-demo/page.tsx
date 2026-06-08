"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Building2, Phone, ArrowRight, Check, Sparkles,
  Calculator, Users, Package, Monitor, ShoppingCart, UserCircle,
  Truck, Clock, FolderKanban, BarChart3, FileText,
  Calendar, Headphones, TrendingUp, PlayCircle, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MODULES } from "@/data/modules";
import type { ModuleIconName } from "@/data/modules";

const MODULE_ICON_MAP: Record<ModuleIconName, React.ElementType> = {
  Calculator,
  Users,
  Package,
  Monitor,
  ShoppingCart,
  UserCircle,
  Truck,
  Clock,
  FolderKanban,
  BarChart3,
  Building2,
  FileText,
};

const BENEFITS = [
  {
    icon: PlayCircle,
    title: "Live product walkthrough",
    desc: "Watch the platform handle real business scenarios — not just slide decks.",
  },
  {
    icon: Headphones,
    title: "Scoped to your industry",
    desc: "Your demo is focused on the modules that matter most for your operations.",
  },
  {
    icon: Calendar,
    title: "30 minutes, no fluff",
    desc: "A focused session with a product specialist, not a generic sales pitch.",
  },
  {
    icon: TrendingUp,
    title: "Custom proposal included",
    desc: "Walk away with a tailored pricing breakdown built for your business size.",
  },
];

const STATS = [
  { value: "500+", label: "Businesses onboarded" },
  { value: "12", label: "Integrated modules" },
  { value: "6", label: "Industries served" },
];

const NEXT_STEPS = [
  "Check your email for a confirmation",
  "Our team will reach out to schedule a time",
  "Get a live, personalized walkthrough",
  "Receive a tailored proposal after the demo",
];

export default function BookADemoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modulesTouched, setModulesTouched] = useState(false);
  const modulesRef = useRef<HTMLDivElement>(null);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      if (next.size > 0) setModulesTouched(false);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedModules.size === 0) {
      setModulesTouched(true);
      modulesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, mobile, modules: [...selectedModules] }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary-purple/50 focus:bg-white/[0.07] transition-all";

  return (
    <div className="min-h-screen bg-bg-layout-purple text-white">
      <Navbar />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.main
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="container mx-auto px-6 pt-28 pb-24"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 xl:gap-20 items-start">

                {/* ── Left: Value panel ── */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:sticky lg:top-28 space-y-8"
                >
                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-button-orange/15 border border-button-orange/30 rounded-full text-button-orange text-xs font-semibold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3" />
                    Free · No commitment required
                  </span>

                  {/* Headline */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight">
                      See The Prominent<br />
                      <span className="text-primary-purple">in Action</span>
                    </h1>
                    <p className="text-white/55 text-lg leading-relaxed max-w-sm">
                      Get a live, personalized walkthrough with a real specialist —
                      tailored to your business, your industry, and your goals.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 pt-1">
                    {STATS.map((s, i) => (
                      <div key={s.label}>
                        {i > 0 && <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-px bg-white/10" />}
                        <div className="relative">
                          <p className="text-2xl font-bold text-white">{s.value}</p>
                          <p className="text-white/38 text-xs mt-0.5">{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-white/8" />

                  {/* Benefits */}
                  <div className="space-y-5">
                    <p className="text-[11px] font-semibold text-white/35 tracking-[1.6px] uppercase">
                      What to expect
                    </p>
                    {BENEFITS.map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-xl bg-primary-purple/15 border border-primary-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-primary-purple" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-white mb-0.5">{title}</p>
                          <p className="text-white/42 text-sm leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* ── Right: Form card ── */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <form
                    onSubmit={handleSubmit}
                    className="bg-gradient-to-b from-white/[0.075] to-white/[0.025] border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
                  >

                    {/* ─ Contact fields ─ */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-1">Your Details</h2>
                      <p className="text-white/38 text-sm mb-6">Tell us a bit about yourself and your company.</p>

                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-white/45 mb-2">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Juan dela Cruz"
                                className={inputBase}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-white/45 mb-2">Mobile Number</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="tel"
                                required
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="+63 9XX XXX XXXX"
                                className={inputBase}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-white/45 mb-2">Work Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="juan@company.com"
                              className={inputBase}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-white/45 mb-2">Company Name</label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input
                              type="text"
                              required
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Your Company"
                              className={inputBase}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/8 mb-8" />

                    {/* ─ Module selector ─ */}
                    <motion.div
                      ref={modulesRef}
                      className="mb-8"
                      animate={modulesTouched && selectedModules.size === 0 ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <h2 className="text-xl font-bold">Modules of Interest</h2>
                        {selectedModules.size > 0 && (
                          <span className="text-xs text-primary-purple font-medium">
                            {selectedModules.size} selected
                          </span>
                        )}
                      </div>
                      <p className="text-white/38 text-sm mb-5">Select the areas you&apos;d like to explore during the demo.</p>

                      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-2xl transition-colors ${modulesTouched && selectedModules.size === 0 ? "outline outline-1 outline-red-400/50 p-3 bg-red-400/[0.04]" : ""}`}>
                        {MODULES.map((mod) => {
                          const Icon = MODULE_ICON_MAP[mod.iconName];
                          const checked = selectedModules.has(mod.id);
                          return (
                            <button
                              key={mod.id}
                              type="button"
                              onClick={() => toggleModule(mod.id)}
                              className={`relative flex items-center gap-2.5 px-3 py-3 rounded-xl border text-left transition-all cursor-pointer group ${
                                checked
                                  ? "border-primary-purple/50 bg-primary-purple/10 text-white"
                                  : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/70 hover:bg-white/[0.05]"
                              }`}
                            >
                              <Icon
                                className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                  checked ? "text-primary-purple" : "text-white/30"
                                }`}
                              />
                              <span className="text-xs font-medium leading-tight flex-1">
                                {mod.title}
                                {mod.soon && (
                                  <span className="block text-[10px] text-white/30 font-normal mt-0.5">Soon</span>
                                )}
                              </span>
                              {checked && (
                                <Check className="w-3 h-3 text-primary-purple shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {modulesTouched && selectedModules.size === 0 && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 mt-3 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            Please select at least one module to continue.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* ─ Submit ─ */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-[15px]"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Booking your demo…
                        </>
                      ) : (
                        <>
                          Book My Free Demo
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-white/28 text-xs text-center leading-relaxed mt-4">
                      By submitting, you agree to receive updates about The Prominent.
                      You can unsubscribe at any time.
                    </p>
                  </form>
                </motion.div>

              </div>
            </div>
          </motion.main>
        ) : (
          /* ── Success state ── */
          <motion.main
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto px-6 pt-32 pb-24"
          >
            <div className="max-w-lg mx-auto text-center">

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.65, delay: 0.15 }}
                className="relative w-24 h-24 mx-auto mb-8"
              >
                <div className="w-full h-full bg-emerald-400/15 border border-emerald-400/30 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-emerald-400" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 border-2 border-emerald-400/40 rounded-full"
                />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-3 mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold">You&apos;re booked!</h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  Welcome,{" "}
                  <span className="text-white font-semibold">{name}</span>
                  {" "}from{" "}
                  <span className="text-white font-semibold">{company}</span>.
                  We&apos;ll reach out to{" "}
                  <span className="text-button-orange">{email}</span>{" "}
                  shortly to confirm your session.
                </p>
              </motion.div>

              {/* Next steps */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 mb-8 text-left"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <Sparkles className="w-4 h-4 text-primary-purple" />
                  <h3 className="font-bold text-base">What happens next</h3>
                </div>
                <div className="space-y-4">
                  {NEXT_STEPS.map((step, idx) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + idx * 0.1 }}
                      className="flex items-start gap-3.5"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-purple/20 border border-primary-purple/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary-purple text-[11px] font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-white/65 text-sm leading-relaxed pt-0.5">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Link
                  href="/"
                  className="px-7 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all text-sm"
                >
                  Back to Home
                </Link>
                <Link
                  href="/modules"
                  className="px-7 py-3 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm group"
                >
                  Explore Modules
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
