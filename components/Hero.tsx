"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import { ChevronRight, Gift, X, Sparkles } from "lucide-react";
import Link from "next/link"

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  
  // Rotating headlines
  const headlines = [
    "Are you frustrated with manual processes?",
    "Are you ready to be digital-ready?",
    "Do you want to save time and money?",
    "Are you frustrated with delays?",
    "Are you ready to grow your business?",
    "Do you want to take control of your business?",
    "Let us introduce you to Smart solutions.",
  ];
  
  // Rotate headlines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [headlines.length]);
  
  // Auto-show gift modal once per browser session
  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem('hasSeenGiftModal');
    
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowGiftModal(true);
        // Mark as seen in this session
        sessionStorage.setItem('hasSeenGiftModal', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle modal close
  const handleCloseModal = () => {
    setShowGiftModal(false);
    sessionStorage.setItem('hasSeenGiftModal', 'true');
  };
  
  // Parallax and scroll effects
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  
  // Opacity fade on scroll
  const opacity = useTransform(scrollY, [0, 800], [1, 0.85]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Glows */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 left-1/4 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-primary-purple/20 blur-[140px] rounded-full -z-10" 
      />
      <div className="absolute top-[10%] right-[20%] w-96 h-96 bg-button-orange/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-primary-purple/10 blur-[100px] rounded-full -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
        className="container mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* LEFT SIDE - The Prominent Branding */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <div className="relative h-[180px] md:h-[340px] lg:h-[400px] flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentHeadlineIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-white absolute inset-0 flex items-center"
                >
                  <span className="text-gradient">{headlines[currentHeadlineIndex]}</span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/60 leading-relaxed font-normal max-w-xl"
            >
              Streamline operations, finance, and human resources with a
              purpose-built ERP. Designed for speed, scale, and the modern enterprise.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/prototype/payroll">
                <button className="px-8 py-4 bg-gradient-to-r from-primary-purple to-purple-600 hover:from-purple-600 hover:to-primary-purple text-white font-bold rounded-2xl transition-all flex items-center gap-3 text-base hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary-purple/30 group relative overflow-hidden">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Gift className="w-5 h-5" />
                  </motion.div>
                  <span className="relative z-10">Claim your free gift</span>
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Digital Readiness Quiz CTA */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-[40px] p-12 border border-white/10 shadow-2xl overflow-hidden group hover:border-white/20 transition-all"
            >
              {/* Animated Background Gradient */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary-purple/30 to-button-orange/30 blur-3xl rounded-full"
              />
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-button-orange/20 border border-button-orange/30 text-xs font-bold uppercase tracking-wider text-button-orange"
                  >
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-button-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-button-orange"></span>
                    </span>
                    Free Assessment
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-4xl md:text-5xl font-bold leading-tight text-white"
                  >
                    Is your business <br />
                    <span className="bg-gradient-to-r from-button-orange to-primary-purple bg-clip-text text-transparent">
                      digitally ready?
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/50 text-base leading-relaxed"
                  >
                    Take a 2 minute assessment to see how digitally ready your business is.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Link href="/quiz">
                    <button className="w-full px-8 py-5 bg-gradient-to-r from-button-orange to-bg-orange-btn hover:from-bg-orange-btn hover:to-button-orange text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-lg group hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-button-orange/30 relative overflow-hidden">
                      <span className="relative z-10">Take an assessment</span>
                      <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </button>
                  </Link>
                </motion.div>

                {/* Benefits List */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="space-y-3 pt-6 border-t border-white/5"
                >
                  {[
                    "Get personalized recommendations",
                    "Discover optimization opportunities",
                    "See your digital maturity score"
                  ].map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary-purple/20 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-primary-purple" />
                      </div>
                      <span className="text-white/60 text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-purple/20 blur-3xl rounded-full" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-button-orange/20 blur-3xl rounded-full" />
            </motion.div>
          </motion.div>
        </div>

      </motion.div>

      {/* Gift Modal/Popup */}
      <AnimatePresence>
        {showGiftModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-2xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 max-w-xl md:max-w-2xl w-full border border-white/20 shadow-2xl overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary-purple/40 to-button-orange/40 blur-3xl rounded-full"
                />

                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all group z-10"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Waitlist Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-primary-purple/30 to-purple-600/30 rounded-2xl flex items-center justify-center border border-primary-purple/40 relative"
                >
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary-purple" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary-purple/20 rounded-2xl"
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-4 md:space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      ✨ Join the Waitlist
                    </h3>
                    <p className="text-white/60 text-sm md:text-base">
                      Be among the first to transform your business operations with exclusive perks
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-yellow-400" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white mb-0.5 text-sm">Early Access</h4>
                        <p className="text-white/50 text-xs">Be the first to experience The Prominent when we launch</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-primary-purple" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white mb-0.5 text-sm">Exclusive Discounts</h4>
                        <p className="text-white/50 text-xs">Waived Installation Fee</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white mb-0.5 text-sm">Priority Support</h4>
                        <p className="text-white/50 text-xs">Jump the queue with dedicated onboarding assistance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-green-400" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white mb-0.5 text-sm">Lifetime Benefits</h4>
                        <p className="text-white/50 text-xs">Lock in special pricing and features forever</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-2"
                  >
                    <Link href="/waitlist">
                      <button className="w-full px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-primary-purple to-purple-600 hover:from-purple-600 hover:to-primary-purple text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-base group hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary-purple/40 relative overflow-hidden">
                        <span className="relative z-10">Secure Your Spot</span>
                        <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </button>
                    </Link>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary-purple/20 blur-3xl rounded-full" />
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-button-orange/20 blur-3xl rounded-full" />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
