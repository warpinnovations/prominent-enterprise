"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Landmark } from "lucide-react";
import { PortalPreview } from "@/components/PortalPreview";

export default function ChooserPage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Gently alternate the preview while idle so both portals are shown.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a === 0 ? 1 : 0)), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const focusPortal = (i: number) => ({
    onMouseEnter: () => {
      setPaused(true);
      setActive(i);
    },
    onMouseLeave: () => setPaused(false),
    onFocus: () => {
      setPaused(true);
      setActive(i);
    },
    onBlur: () => setPaused(false),
  });

  return (
    <main className="relative min-h-screen lg:h-screen mesh-gradient flex items-center overflow-x-hidden lg:overflow-hidden">
      {/* Ambient depth glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-[14%] w-[620px] h-[620px] rounded-full bg-primary-purple/12 blur-[160px]" />
        <div className="absolute right-[4%] top-[20%] w-[600px] h-[560px] rounded-full bg-primary-purple/16 blur-[150px]" />
        <div className="absolute right-[12%] bottom-[6%] w-[420px] h-[420px] rounded-full bg-button-orange/8 blur-[140px]" />
        <div className="hidden lg:block absolute top-[12%] left-[52%] h-[70%] w-28 rotate-[15deg] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent blur-2xl" />
      </div>
      {/* gentle edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 60%, rgba(6,3,12,0.45))" }}
      />

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* LEFT — choose */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-52 h-16 mb-6">
              <Image
                src="/prominent-logo.png"
                alt="The Prominent"
                fill
                className="object-contain object-left drop-shadow-[0_4px_24px_rgba(152,56,217,0.5)]"
                priority
              />
            </div>

            <p className="eyebrow mb-3">Welcome</p>
            <h1 className="display text-4xl md:text-5xl font-bold text-white mb-4">
              One platform,{" "}
              <span className="text-gradient">built for you.</span>
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-md mb-7 text-balance">
              Pick the experience made for your organization.
            </p>

            {/* Simple prompt */}
            <p className="text-sm font-medium text-white/45 mb-3">Which one are you?</p>

            {/* Two choice buttons — both highlighted, clearly labelled */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* FOR BUSINESS */}
              <Link
                href="/enterprise"
                {...focusPortal(0)}
                className={`group relative flex flex-1 items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                  active === 0
                    ? "border-primary-purple/50 bg-primary-purple/[0.12] ring-2 ring-primary-purple/35 -translate-y-0.5 shadow-lg shadow-primary-purple/25"
                    : "border-primary-purple/20 bg-primary-purple/[0.05] hover:border-primary-purple/40 hover:-translate-y-0.5"
                }`}
              >
                <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br from-primary-purple to-button-orange opacity-25 blur-2xl" />
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-purple to-purple-600 shadow-lg shadow-primary-purple/30">
                  <Building2 className="h-6 w-6 text-white" />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block text-base font-bold text-white">For Business</span>
                  <span className="block text-xs text-white/55">The Prominent · run your company</span>
                </span>
                <ArrowRight className="relative h-5 w-5 shrink-0 text-white/70 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </Link>

              {/* FOR GOVERNMENT */}
              <Link
                href="/government"
                {...focusPortal(1)}
                className={`group relative flex flex-1 items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                  active === 1
                    ? "border-blue-400/45 bg-blue-500/[0.12] ring-2 ring-blue-400/35 -translate-y-0.5 shadow-lg shadow-blue-500/25"
                    : "border-blue-400/20 bg-blue-500/[0.05] hover:border-blue-400/40 hover:-translate-y-0.5"
                }`}
              >
                <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-25 blur-2xl" />
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/30">
                  <Landmark className="h-6 w-6 text-white" />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block text-base font-bold text-white">For Government</span>
                  <span className="block text-xs text-white/55">Prominent Government · run your LGU</span>
                </span>
                <ArrowRight className="relative h-5 w-5 shrink-0 text-white/70 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            </div>

            <p className="mt-6 text-xs text-white/30">© 2026 Prometheus. All rights reserved.</p>
          </motion.div>

          {/* RIGHT — layered portal preview (switches with the buttons) */}
          <div className="flex justify-center lg:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <PortalPreview active={active} />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
