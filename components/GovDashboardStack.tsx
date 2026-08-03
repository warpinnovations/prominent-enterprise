"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  FileCheck2,
  ReceiptText,
  Wallet,
  Users,
  ShieldCheck,
} from "lucide-react";

const activity = [
  { icon: FileCheck2, label: "Business Permit", sub: "Mendoza Trading", status: "Approved", iconBg: "bg-emerald-400/15", iconText: "text-emerald-400", pill: "bg-emerald-400/10 text-emerald-400" },
  { icon: ReceiptText, label: "Real Property Tax", sub: "TCT-04821", status: "Paid", iconBg: "bg-blue-400/15", iconText: "text-blue-400", pill: "bg-blue-400/10 text-blue-400" },
  { icon: Wallet, label: "Treasury Payout", sub: "Payroll batch", status: "Processed", iconBg: "bg-violet-400/15", iconText: "text-violet-400", pill: "bg-violet-400/10 text-violet-400" },
  { icon: Users, label: "New Registration", sub: "Barangay 5", status: "Pending", iconBg: "bg-amber-400/15", iconText: "text-amber-400", pill: "bg-amber-400/10 text-amber-400" },
];

const budget = [
  { label: "Treasury", pct: 78, bar: "from-emerald-400 to-teal-500" },
  { label: "Engineering", pct: 64, bar: "from-blue-400 to-indigo-500" },
  { label: "Health Services", pct: 52, bar: "from-violet-400 to-purple-500" },
  { label: "Social Welfare", pct: 41, bar: "from-amber-400 to-orange-500" },
];

function CollectionsView() {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 md:p-5">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs text-white/40">Q3 Collection Target</p>
        <span className="flex items-center gap-1 text-xs text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          91%
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-2.5">
        <p className="text-3xl font-bold text-white">₱8.2M</p>
        <p className="text-xs text-white/40">of ₱9.0M collected</p>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden mb-6">
        <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-primary-purple to-button-orange" />
      </div>

      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">Recent activity</p>
      <div className="space-y-2">
        {activity.map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5"
          >
            <div className={`w-8 h-8 rounded-lg ${row.iconBg} flex items-center justify-center shrink-0`}>
              <row.icon className={`w-4 h-4 ${row.iconText}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white leading-tight">{row.label}</p>
              <p className="text-[10px] text-white/35">{row.sub}</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${row.pill}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetView() {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 md:p-5">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs text-white/40">Budget Utilization</p>
        <span className="text-xs text-white/50">FY 2026</span>
      </div>
      <div className="flex items-baseline gap-2 mb-6">
        <p className="text-3xl font-bold text-white">₱142M</p>
        <p className="text-xs text-white/40">appropriated</p>
      </div>

      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">By office</p>
      <div className="space-y-4">
        {budget.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-white/70">{b.label}</span>
              <span className="text-xs text-white/50">{b.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${b.bar}`}
                style={{ width: `${b.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS = [
  { id: "collections", node: <CollectionsView /> },
  { id: "budget", node: <BudgetView /> },
];

export const GovDashboardStack = () => {
  const [front, setFront] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[500px] sm:h-[520px]"
      style={{ perspective: "1800px" }}
    >
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary-purple/25 to-button-orange/10 blur-3xl rounded-[40px] -z-10" />

      {VIEWS.map((view, i) => {
        const isFront = i === front;
        return (
          <motion.div
            key={view.id}
            onClick={() => !isFront && setFront(i)}
            animate={{
              rotateY: -16,
              rotateX: 6,
              x: isFront ? 0 : 44,
              y: isFront ? 0 : -40,
              scale: isFront ? 1 : 0.94,
              opacity: isFront ? 1 : 0.5,
            }}
            whileHover={!isFront ? { opacity: 0.8, scale: 0.97 } : undefined}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            style={{ transformStyle: "preserve-3d", zIndex: isFront ? 20 : 10 }}
            suppressHydrationWarning
            className={`absolute inset-0 overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-white/[0.18] via-white/[0.07] to-white/[0.02] backdrop-blur-xl shadow-[0_50px_90px_-30px_rgba(10,4,24,0.9)] ${
              isFront ? "" : "cursor-pointer"
            }`}
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="p-4 md:p-5">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-2 pb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white/15" />
                  <span className="w-3 h-3 rounded-full bg-white/15" />
                  <span className="w-3 h-3 rounded-full bg-white/15" />
                </div>
                <div className="ml-3 flex-1 h-6 rounded-md bg-white/[0.04] border border-white/5" />
              </div>
              {view.node}
            </div>
          </motion.div>
        );
      })}

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute -bottom-5 -left-5 z-30 panel rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-400/15 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">COA · Audit-ready</p>
          <p className="text-[10px] text-white/40">Full transparency</p>
        </div>
      </motion.div>

      {/* View switch indicator */}
      <div className="absolute -bottom-2 right-4 z-30 flex items-center gap-2">
        {VIEWS.map((v, i) => (
          <button
            key={v.id}
            aria-label={`Show ${v.id} view`}
            onClick={() => setFront(i)}
            className={`h-2 rounded-full transition-all ${
              i === front ? "w-6 bg-white/70" : "w-2 bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
