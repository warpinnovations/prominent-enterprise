"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import Link from "next/link"

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
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
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[13px] font-medium text-widget-title-purple relative group cursor-pointer overflow-hidden transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-purple"></span>
              </span>
              <span className="relative z-10">New: AI-Powered Resource Planning</span>
              <ChevronRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-white"
            >
              The prominent way <br />
              <span className="text-gradient">to manage enterprise.</span>
            </motion.h1>

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
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all flex items-center gap-2 text-base hover:scale-[1.02] active:scale-[0.98] group">
                  <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                  Try The Prototype
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 pt-8 border-t border-white/5"
            >
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-white/40">Enterprises</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">99.9%</p>
                <p className="text-sm text-white/40">Uptime</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm text-white/40">Support</p>
              </div>
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
                    Take our 2-minute assessment to discover how The Prominent can transform your operations.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Link href="/quiz">
                    <button className="w-full px-8 py-5 bg-gradient-to-r from-button-orange to-bg-orange-btn hover:from-bg-orange-btn hover:to-button-orange text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-lg group hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-button-orange/30 relative overflow-hidden">
                      <span className="relative z-10">Take The Quiz</span>
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
    </section>
  );
};
