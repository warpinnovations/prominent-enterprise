"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Building2, Phone, ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MODULES } from "@/data/modules";

export default function BookADemoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          mobile,
          modules: [...selectedModules],
        }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-primary-purple/50 focus:bg-white/[0.07] transition-all";

  return (
    <div className="min-h-screen bg-bg-layout-purple text-white">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 space-y-4"
          >
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase">
              Schedule a free demo
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Book a Demo.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
              See The Prominent in action. Get a personalized walkthrough of how
              we can transform your business operations.
            </p>
          </motion.div>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
              >
                <form onSubmit={handleSubmit}>
                  <div className="grid lg:grid-cols-2 gap-10">

                    {/* Left — contact fields */}
                    <div className="space-y-5">
                      <h2 className="text-lg font-bold mb-2">Your Details</h2>

                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Juan dela Cruz"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="juan@company.com"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-2">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type="text"
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Your Company"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-2">Mobile Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type="tel"
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="+63 9XX XXX XXXX"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Booking…
                          </>
                        ) : (
                          <>
                            Book a Demo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>

                      <p className="text-white/30 text-xs text-center leading-relaxed">
                        By submitting, you agree to receive updates about The Prominent.
                        You can unsubscribe at any time.
                      </p>
                    </div>

                    {/* Right — modules */}
                    <div>
                      <h2 className="text-lg font-bold mb-2">Modules of Interest</h2>
                      <p className="text-xs text-white/40 mb-4">Select all that apply</p>
                      <div className="grid grid-cols-2 gap-2">
                        {MODULES.map((mod) => {
                          const checked = selectedModules.has(mod.id);
                          return (
                            <button
                              key={mod.id}
                              type="button"
                              onClick={() => toggleModule(mod.id)}
                              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                checked
                                  ? "border-button-orange/60 bg-button-orange/10 text-white"
                                  : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70"
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                                  checked
                                    ? "bg-button-orange border-button-orange"
                                    : "bg-transparent border-white/20"
                                }`}
                              >
                                {checked && <Check className="w-2.5 h-2.5 text-white" />}
                              </span>
                              <span className="text-xs font-medium leading-tight">{mod.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-8 bg-emerald-400/20 border border-emerald-400/30 rounded-full flex items-center justify-center relative"
                >
                  <Check className="w-10 h-10 text-emerald-400" />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-emerald-400/50 rounded-full"
                  />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4">Demo Booked!</h2>
                <p className="text-xl text-white/60 mb-4">
                  Welcome, <span className="text-white font-semibold">{name}</span> from{" "}
                  <span className="text-white font-semibold">{company}</span>!
                </p>
                <p className="text-white/50 mb-10">
                  Our team will reach out to{" "}
                  <span className="text-button-orange">{email}</span> shortly.
                </p>

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 mb-8 text-left max-w-md mx-auto">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-purple" />
                    What Happens Next?
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Check your email for a confirmation",
                      "Our team will reach out to schedule a time",
                      "Get a personalized walkthrough of The Prominent",
                      "Receive a tailored proposal after the demo",
                    ].map((step, idx) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-primary-purple text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-white/70 text-sm">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Back to Home
                  </Link>
                  <Link
                    href="/payroll"
                    className="px-8 py-3 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                  >
                    Try The Prominent
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
