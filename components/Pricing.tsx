"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { ParallaxGlow } from "@/components/ParallaxGlow";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";

type Plan = {
  name: string;
  price: string;
  tagline: string;
  note?: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Essential",
    price: "₱8,000",
    tagline: "Start with what matters most.",
    features: ["3 Core Modules", "1 module of your choice", "10 Users", "1 Branch · 1 Warehouse", "20 GB Storage"],
  },
  {
    name: "Build",
    price: "₱14,000",
    tagline: "Strengthen your business foundation.",
    note: "₱10,000 if you sign up on or before June 25, 2026",
    features: ["3 Core Modules", "3 modules of your choice", "20 Users", "1 Branch · 1 Warehouse", "50 GB Storage"],
  },
  {
    name: "Scale",
    price: "₱20,000",
    tagline: "Streamline daily operations.",
    featured: true,
    features: ["3 Core Modules", "5 modules of your choice", "35 Users", "2 Branches · 2 Warehouses", "100 GB Storage"],
  },
  {
    name: "Expand",
    price: "₱25,000",
    tagline: "Unlock growth across all departments.",
    features: ["3 Core Modules", "7 modules of your choice", "50 Users", "3 Branches · 3 Warehouses", "150 GB Storage"],
  },
  {
    name: "Prime",
    price: "₱35,000",
    tagline: "The complete Prominent Enterprise ecosystem.",
    features: ["All available modules", "50 Users", "5 Branches · 5 Warehouses", "250 GB Storage"],
  },
];

export const Pricing = () => {
  return (
    <section id="solutions" className="py-24 md:py-32 relative overflow-hidden">
      {/* Layered gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-layout-purple/45 via-bg-purple/15 to-bg-layout-purple/45" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 32%, rgba(152,56,217,0.16), transparent 70%)" }}
      />
      <ParallaxGlow speed={70} className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[128px] pointer-events-none" />
      <ParallaxGlow speed={-50} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          {/* pill badge */}
          <span className="inline-flex items-center rounded-full border border-primary-purple/40 bg-primary-purple/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-widget-title-purple mb-5">
            Pricing
          </span>
          <h2 className="display text-4xl md:text-5xl font-bold text-white mb-5">
            Plans that fit{" "}
            <span className="text-gradient">your scale.</span>
          </h2>
          <p className="text-white/55 text-lg text-balance">
            Simple, transparent pricing that grows with you. Every plan includes 3 core modules —
            add more as you grow.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={`relative flex flex-col rounded-3xl border p-6 transition-colors ${
                plan.featured
                  ? "border-primary-purple/60 bg-primary-purple/[0.10] ring-2 ring-primary-purple/40 shadow-xl shadow-primary-purple/20 lg:-my-2"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-purple to-purple-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                  Most popular
                </span>
              )}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-widget-title-purple">
                {plan.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-xs text-white/40">per month</span>
              </div>
              <p className="mt-2 text-sm text-white/55 min-h-[40px]">{plan.tagline}</p>
              {plan.note && <p className="mt-1 text-[11px] leading-snug text-button-orange">{plan.note}</p>}

              {/* CTAs — primary + secondary (peg's two-button pattern) */}
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  href="/book-a-demo"
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-gradient-to-r from-primary-purple to-purple-600 text-white shadow-lg shadow-primary-purple/30 hover:brightness-110"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Book a Demo
                </Link>
                <a
                  href="mailto:inquiry.prominent@warp.ph"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-medium text-white/55 hover:text-white transition"
                >
                  Talk to sales
                </a>
              </div>

              {/* Features */}
              <p className="mt-6 mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Features
              </p>
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-purple/20">
                      <Check className="h-3 w-3 text-widget-title-purple" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
