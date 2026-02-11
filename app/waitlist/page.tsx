"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, User, Check, ArrowRight, Gift, Zap, Crown, Clock, Building2, Phone } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company: companyName,
          mobile: mobileNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('❌ Submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit. Please try again.';
      alert(`Submission failed: ${errorMessage}\n\nPlease check the console for details.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const perks = [
    {
      icon: Crown,
      title: "Early Access",
      description: "Be the first to experience The Prominent when we launch",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Gift,
      title: "Exclusive Discounts",
      description: "Get up to 50% off on your first 3 months",
      color: "from-primary-purple to-purple-600"
    },
    {
      icon: Zap,
      title: "Priority Support",
      description: "Jump the queue with dedicated onboarding assistance",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Lifetime Benefits",
      description: "Lock in special pricing and features forever",
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-layout-purple text-white font-sans">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                {/* Left Side - Hero Content */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-purple/30 bg-primary-purple/10 text-sm font-medium text-primary-purple">
                    <Sparkles className="w-4 h-4" />
                    Limited Spots Available
                  </div>

                  <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                      Join the{" "}
                      <span className="bg-gradient-to-r from-primary-purple to-purple-400 bg-clip-text text-transparent">
                        Waitlist
                      </span>
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed">
                      Be among the first to transform your business operations. 
                      Get exclusive early access and special pricing when we launch.
                    </p>
                  </div>

                  {/* Perks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                    {perks.map((perk, idx) => (
                      <motion.div
                        key={perk.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="relative p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-white/20 transition-all group"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${perk.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <perk.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-white mb-1">{perk.title}</h3>
                        <p className="text-sm text-white/50">{perk.description}</p>
                      </motion.div>
                    ))}
                  </div>

                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary-purple/20 to-purple-600/20 blur-3xl opacity-30" />
                  
                  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Secure Your Spot</h2>
                      </div>

                      {/* Name Input */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-white/70">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-purple/50 focus:ring-2 focus:ring-primary-purple/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-white/70">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-purple/50 focus:ring-2 focus:ring-primary-purple/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Company Name Input */}
                      <div className="space-y-2">
                        <label htmlFor="companyName" className="block text-sm font-medium text-white/70">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            id="companyName"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Your company"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-purple/50 focus:ring-2 focus:ring-primary-purple/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Mobile Number Input */}
                      <div className="space-y-2">
                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-white/70">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="tel"
                            id="mobileNumber"
                            required
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="+63 912 345 6789"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-purple/50 focus:ring-2 focus:ring-primary-purple/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-purple to-purple-600 hover:from-purple-600 hover:to-primary-purple text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-base group hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary-purple/40 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Joining...</span>
                          </>
                        ) : (
                          <>
                            <span>Join the Waitlist</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </button>

                      <p className="text-xs text-white/40 text-center">
                        By joining, you agree to receive updates about The Prominent.
                        <br />
                        You can unsubscribe at any time.
                      </p>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-2xl mx-auto text-center py-20"
              >
                {/* Success Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-400/30 relative"
                >
                  <Check className="w-12 h-12 text-green-400" />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-green-400/50 rounded-full"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    You&apos;re on the list! 🎉
                  </h2>
                  <p className="text-xl text-white/60 mb-4">
                    Welcome aboard, <span className="text-white font-semibold">{name}</span> from <span className="text-white font-semibold">{companyName}</span>!
                  </p>
                  <p className="text-lg text-white/50 mb-8">
                    We&apos;ve sent a confirmation to <span className="text-primary-purple">{email}</span>
                    <br />
                    You&apos;ll receive updates at <span className="text-primary-purple">{mobileNumber}</span>
                  </p>

                  <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-3xl p-8 mb-8">
                    <h3 className="font-bold text-xl mb-4 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary-purple" />
                      What Happens Next?
                    </h3>
                    <div className="space-y-4 text-left max-w-md mx-auto">
                      {[
                        "Check your email for a confirmation link",
                        "We'll notify you as soon as we launch",
                        "Get ready for exclusive early-bird pricing",
                        "Connect with our team for personalized onboarding"
                      ].map((step, idx) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary-purple text-xs font-bold">{idx + 1}</span>
                          </div>
                          <p className="text-white/70">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/"
                      className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all"
                    >
                      Back to Home
                    </Link>
                    <Link
                      href="/prototype/payroll"
                      className="px-8 py-3 bg-gradient-to-r from-primary-purple to-purple-600 hover:opacity-90 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                    >
                      Try The Prominent
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
