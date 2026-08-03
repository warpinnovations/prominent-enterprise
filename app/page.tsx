"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Landmark, Check } from "lucide-react";
import { PortalPreview } from "@/components/PortalPreview";

const bullets = [
  "Unified finance, HR & operations",
  "Local compliance, built in",
  "Live in days, not months",
];

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
    <main className="relative min-h-screen mesh-gradient flex items-center overflow-hidden">
      {/* Ambient depth glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-[14%] w-[620px] h-[620px] rounded-full bg-primary-purple/12 blur-[160px]" />
        <div className="absolute right-[4%] top-[20%] w-[600px] h-[560px] rounded-full bg-primary-purple/16 blur-[150px]" />
        <div className="absolute right-[12%] bottom-[6%] w-[420px] h-[420px] rounded-full bg-button-orange/8 blur-[140px]" />
        {/* soft diagonal light shaft */}
        <div className="hidden lg:block absolute top-[12%] left-[52%] h-[70%] w-28 rotate-[15deg] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent blur-2xl" />
      </div>
      {/* gentle edge vignette to focus the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 60%, rgba(6,3,12,0.45))" }}
      />

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* LEFT — choose */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-56 h-20 md:w-64 md:h-20 mb-9">
              <Image
                src="/prominent-logo.png"
                alt="The Prominent"
                fill
                className="object-contain object-left drop-shadow-[0_4px_24px_rgba(152,56,217,0.5)]"
                priority
              />
            </div>

            <p className="eyebrow mb-4">Choose your experience</p>
            <h1 className="display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              One platform,{" "}
              <span className="text-gradient">built for you.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md mb-7 text-balance">
              The Prominent powers modern enterprises and government units alike. Pick the
              experience made for your organization.
            </p>

            <ul className="space-y-2.5 mb-9">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-white/60 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-purple/15">
                    <Check className="w-3 h-3 text-widget-title-purple" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Two choice buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/enterprise"
                {...focusPortal(0)}
                className={`group relative flex flex-1 items-center gap-3.5 rounded-2xl p-4 bg-gradient-to-r from-primary-purple via-purple-600 to-button-orange bg-[length:200%_100%] shadow-lg transition-all duration-500 ${
                  active === 0
                    ? "bg-right shadow-xl shadow-primary-purple/40 ring-1 ring-white/20"
                    : "bg-left shadow-primary-purple/20 opacity-80"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Building2 className="w-5 h-5 text-white" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-wider text-white/70">
                    For Business
                  </span>
                  <span className="block font-semibold text-white">The Prominent</span>
                </span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/government"
                {...focusPortal(1)}
                className={`group relative flex flex-1 items-center gap-3.5 rounded-2xl p-4 border transition-all duration-300 ${
                  active === 1
                    ? "border-white/25 bg-white/[0.08] ring-1 ring-primary-purple/40"
                    : "border-white/12 bg-white/[0.03]"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-purple/15 border border-primary-purple/20">
                  <Landmark className="w-5 h-5 text-widget-title-purple" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-wider text-white/45">
                    For Government
                  </span>
                  <span className="block font-semibold text-white">Prominent Government</span>
                </span>
                <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </Link>
            </div>

            <p className="mt-8 text-xs text-white/30">© 2026 Prometheus. All rights reserved.</p>
          </motion.div>

          {/* RIGHT — layered portal preview (switches with the buttons) */}
          <div className="hidden lg:block">
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
