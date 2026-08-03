"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Wallet,
  Package,
  Users,
  ShieldCheck,
  FileCheck2,
  ReceiptText,
} from "lucide-react";

const entMetrics = [
  { icon: Wallet, label: "Revenue", value: "₱12.4M", tint: "text-emerald-400" },
  { icon: Package, label: "SKUs", value: "24.8k", tint: "text-amber-400" },
  { icon: Users, label: "Payroll", value: "852", tint: "text-blue-400" },
];

function EnterpriseInner() {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-white/40">Company Overview</p>
          <p className="text-lg font-semibold text-white">This month</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5" />
          +18.2%
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {entMetrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
            <m.icon className={`w-4 h-4 mb-2 ${m.tint}`} />
            <p className="text-[10px] text-white/40">{m.label}</p>
            <p className="text-base font-semibold text-white">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/50">Cash flow</p>
          <p className="text-[10px] text-white/30">Last 12 weeks</p>
        </div>
        <div className="flex items-end gap-1.5 h-20">
          {[42, 58, 50, 71, 63, 82, 74, 90, 68, 95, 80, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary-purple/70 to-button-orange/50 rounded-t-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const govActivity = [
  { icon: FileCheck2, label: "Business Permit", sub: "Mendoza Trading", status: "Approved", iconBg: "bg-emerald-400/15", iconText: "text-emerald-400", pill: "bg-emerald-400/10 text-emerald-400" },
  { icon: ReceiptText, label: "Real Property Tax", sub: "TCT-04821", status: "Paid", iconBg: "bg-blue-400/15", iconText: "text-blue-400", pill: "bg-blue-400/10 text-blue-400" },
  { icon: Users, label: "New Registration", sub: "Barangay 5", status: "Pending", iconBg: "bg-amber-400/15", iconText: "text-amber-400", pill: "bg-amber-400/10 text-amber-400" },
];

function GovernmentInner() {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs text-white/40">Q3 Collection Target</p>
        <span className="flex items-center gap-1 text-xs text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          91%
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-2.5">
        <p className="text-2xl font-bold text-white">₱8.2M</p>
        <p className="text-xs text-white/40">of ₱9.0M collected</p>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden mb-5">
        <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-primary-purple to-button-orange" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2.5">Recent activity</p>
      <div className="space-y-2">
        {govActivity.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2"
          >
            <div className={`w-8 h-8 rounded-lg ${r.iconBg} flex items-center justify-center shrink-0`}>
              <r.icon className={`w-4 h-4 ${r.iconText}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white leading-tight">{r.label}</p>
              <p className="text-[10px] text-white/35">{r.sub}</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${r.pill}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PORTALS = [
  { id: "ent", node: <EnterpriseInner />, badgeTitle: "SOC 2 · Audit-ready", badgeSub: "Compliance built in" },
  { id: "gov", node: <GovernmentInner />, badgeTitle: "COA · Audit-ready", badgeSub: "Full transparency" },
];

export const PortalPreview = ({ active }: { active: number }) => {
  const p = PORTALS[active] ?? PORTALS[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[460px]"
      style={{ perspective: "1800px" }}
    >
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary-purple/25 to-button-orange/10 blur-3xl rounded-[40px] -z-10" />

      {/* Stacked tile behind */}
      <div
        aria-hidden
        style={{ transform: "rotateY(-16deg) rotateX(6deg) translate(44px, -40px)" }}
        className="absolute inset-0 -z-[1] rounded-[32px] border border-white/15 bg-gradient-to-br from-primary-purple/50 via-purple-500/25 to-white/10 backdrop-blur-md shadow-2xl"
      />

      {/* Main card */}
      <div
        style={{ transform: "rotateY(-16deg) rotateX(6deg)" }}
        className="relative h-[400px] overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-white/[0.18] via-white/[0.07] to-white/[0.02] backdrop-blur-xl shadow-[0_50px_90px_-30px_rgba(10,4,24,0.9)] p-4 md:p-5"
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-2 pb-4">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white/15" />
            <span className="w-3 h-3 rounded-full bg-white/15" />
            <span className="w-3 h-3 rounded-full bg-white/15" />
          </div>
          <div className="ml-3 flex-1 h-6 rounded-md bg-white/[0.04] border border-white/5" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {p.node}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -left-5 z-30 panel rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl min-w-[190px]">
        <div className="w-9 h-9 rounded-xl bg-emerald-400/15 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-semibold text-white">{p.badgeTitle}</p>
            <p className="text-[10px] text-white/40">{p.badgeSub}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
