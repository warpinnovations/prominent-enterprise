"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  Mail,
  MessageSquare,
  ShoppingBag,
  Truck,
  FileText,
  BarChart3,
  Plug,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";

const categories = [
  {
    title: "Banking & Payments",
    icon: CreditCard,
    iconBg: "from-emerald-400 to-teal-500",
    dot: "bg-emerald-400",
    count: 24,
    items: ["Bank feeds", "e-Wallets", "Payment gateways", "Payroll disbursement"],
  },
  {
    title: "Commerce & Sales",
    icon: ShoppingBag,
    iconBg: "from-violet-400 to-purple-500",
    dot: "bg-violet-400",
    count: 30,
    items: ["Online storefronts", "Marketplaces", "POS hardware", "Barcode scanners"],
  },
  {
    title: "Government & Filing",
    icon: Building2,
    iconBg: "from-blue-400 to-indigo-500",
    dot: "bg-blue-400",
    count: 18,
    items: ["BIR forms", "SSS / Pag-IBIG", "PhilHealth", "LGU portals"],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    iconBg: "from-pink-400 to-rose-500",
    dot: "bg-pink-400",
    count: 22,
    items: ["Email & SMS", "Chat platforms", "Notifications", "Approvals"],
  },
  {
    title: "Logistics",
    icon: Truck,
    iconBg: "from-amber-400 to-orange-500",
    dot: "bg-amber-400",
    count: 16,
    items: ["Couriers", "Fleet tracking", "Delivery apps", "Warehousing"],
  },
  {
    title: "Docs & Analytics",
    icon: FileText,
    iconBg: "from-cyan-400 to-blue-500",
    dot: "bg-cyan-400",
    count: 26,
    items: ["Spreadsheets", "e-Signatures", "BI tools", "Data exports"],
  },
];

export const Integrations = () => {
  return (
    <section id="integrations" className="py-24 md:py-32 relative overflow-hidden">
      <div className="grid-backdrop absolute inset-0 -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-purple/10 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <p className="eyebrow mb-4 justify-center">
            <Plug className="w-4 h-4" />
            Integrations
          </p>
          <h2 className="display text-4xl md:text-5xl font-bold text-white mb-5">
            Connects to the tools you{" "}
            <span className="text-gradient">already run on.</span>
          </h2>
          <p className="text-white/55 text-lg text-balance">
            The Prominent sits at the center of your operations and talks to 200+ services —
            so data flows in and out without manual re-entry.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative panel rounded-3xl p-6 overflow-hidden hover:border-white/20"
            >
              {/* faint colored wash on hover */}
              <div
                className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${cat.iconBg} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
              />

              <div className="relative flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.iconBg} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{cat.title}</h3>
                </div>
                <span className="text-[11px] font-medium text-white/50 bg-white/[0.05] border border-white/10 rounded-full px-2.5 py-1 whitespace-nowrap">
                  {cat.count} apps
                </span>
              </div>

              <div className="relative flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-white/55 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-colors"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/book-a-demo"
            className="inline-flex items-center gap-2 text-widget-title-purple hover:text-white transition-colors font-medium"
          >
            Ask about a specific integration
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* subtle icon strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 opacity-70">
          {[CreditCard, ShoppingBag, Building2, MessageSquare, Truck, FileText, Mail, BarChart3].map(
            (Icon, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:border-white/20 hover:bg-white/[0.06] transition-colors"
              >
                <Icon className="w-5 h-5 text-white/40" />
              </div>
            )
          )}
          <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-xs text-white/40">
            +192
          </div>
        </div>
      </div>
    </section>
  );
};
