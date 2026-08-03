"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { HeroDashboardStack } from "@/components/HeroDashboardStack";
import { RotatingText } from "@/components/RotatingText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary-purple/15 blur-[160px] rounded-full -z-10" />
      <div className="absolute top-[20%] right-[8%] w-96 h-96 bg-button-orange/10 blur-[130px] rounded-full -z-10" />

      {/* Decorative diagonal light shaft — soft, ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <div className="absolute top-[14%] left-[51%] h-[66%] w-28 rotate-[15deg] bg-gradient-to-b from-transparent via-white/[0.09] to-transparent blur-2xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* LEFT — value proposition */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-6"
            >
              <span className="flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-white/70 tracking-wide">
                Enterprise ERP · Built for the Philippines
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="display text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white mb-6"
            >
              Run your entire business on{" "}
              <RotatingText
                className="text-gradient"
                words={["one platform.", "one system.", "one dashboard.", "one workspace."]}
              />
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-8 text-balance"
            >
              The Prominent unifies finance, HR &amp; payroll, inventory, sales, and
              compliance into a single system — purpose-built for the way local
              enterprises and government units actually operate.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-start gap-3 mb-10"
            >
              <Link href="/book-a-demo" className="btn-primary text-base">
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/quiz" className="btn-secondary text-base">
                Take the readiness assessment
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-amber-500"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 border-[#0b0614] flex items-center justify-center text-[10px] font-semibold text-white ${c}`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    )
                  )}
                </div>
                <span className="text-sm text-white/50">
                  Trusted across retail, F&amp;B &amp; government
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-button-orange text-button-orange" />
                  ))}
                </div>
                <span className="text-sm text-white/50">Loved by operators</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — interactive product dashboard stack */}
          <HeroDashboardStack />
        </div>
      </div>
    </section>
  );
};
