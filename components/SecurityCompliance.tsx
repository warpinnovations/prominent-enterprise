"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  ScrollText,
  ServerCog,
  RefreshCw,
} from "lucide-react";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";

const controls = [
  {
    icon: Lock,
    title: "Encryption everywhere",
    description: "Data is encrypted in transit (TLS) and at rest, end to end.",
  },
  {
    icon: KeyRound,
    title: "Role-based access",
    description: "Granular permissions per office, branch, and role — least-privilege by default.",
  },
  {
    icon: ScrollText,
    title: "Full audit trails",
    description: "Every create, edit, and approval is logged and traceable for accountability.",
  },
  {
    icon: ServerCog,
    title: "Reliable infrastructure",
    description: "Cloud-hosted with monitoring, so your team stays productive around the clock.",
  },
  {
    icon: RefreshCw,
    title: "Automated backups",
    description: "Regular backups and recovery keep your records safe from loss.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-ready",
    description: "Reporting aligned to government and accounting standards, audit-ready on demand.",
  },
];

const badges = ["SOC 2 Type II", "TLS 1.2+", "RBAC", "Audit Logging", "Encrypted Backups"];

export const SecurityCompliance = () => {
  return (
    <section id="security" className="py-24 md:py-32 bg-bg-layout-purple/40 border-y border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — headline */}
          <Reveal direction="left">
            <p className="eyebrow mb-4">
              <ShieldCheck className="w-4 h-4" />
              Security &amp; Compliance
            </p>
            <h2 className="display text-4xl md:text-5xl font-bold text-white mb-5">
              Enterprise-grade trust,{" "}
              <span className="text-gradient">by default.</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8 text-balance">
              Handling payroll, taxes, and public funds means security can&apos;t be an
              afterthought. The Prominent is built with the controls auditors and
              administrators expect — so you can move fast without cutting corners.
            </p>

            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 text-sm text-white/70 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {b}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right — controls grid */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {controls.map((c) => (
              <motion.div
                key={c.title}
                variants={staggerItem}
                className="panel rounded-2xl p-5 hover:border-white/15 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-1.5">{c.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
