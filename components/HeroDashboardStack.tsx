"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Wallet, Package, Users, ShieldCheck } from "lucide-react";

const metrics = [
  { icon: Wallet, label: "Revenue", value: "₱12.4M", tint: "text-emerald-400" },
  { icon: Package, label: "SKUs", value: "24.8k", tint: "text-amber-400" },
  { icon: Users, label: "Payroll", value: "852", tint: "text-blue-400" },
];

const stages = [
  { label: "Leads", count: "1,240", pct: 100, bar: "from-violet-400 to-purple-500" },
  { label: "Qualified", count: "820", pct: 66, bar: "from-blue-400 to-indigo-500" },
  { label: "Proposal", count: "410", pct: 33, bar: "from-cyan-400 to-blue-500" },
  { label: "Closed Won", count: "190", pct: 15, bar: "from-emerald-400 to-teal-500" },
];

function OverviewView() {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 md:p-5">
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
        {metrics.map((m) => (
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
        <div className="flex items-end gap-1.5 h-24">
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

function PipelineView() {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 md:p-5">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs text-white/40">Sales Pipeline</p>
        <span className="text-xs text-white/50">This quarter</span>
      </div>
      <div className="flex items-baseline gap-2 mb-6">
        <p className="text-3xl font-bold text-white">₱24.8M</p>
        <p className="text-xs text-white/40">total pipeline</p>
      </div>

      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">By stage</p>
      <div className="space-y-4">
        {stages.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-white/70">{s.label}</span>
              <span className="text-xs text-white/50">{s.count}</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS = [
  { id: "overview", node: <OverviewView /> },
  { id: "pipeline", node: <PipelineView /> },
];

export const HeroDashboardStack = () => {
  const [front, setFront] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[440px] sm:h-[460px]"
      style={{ perspective: "1800px" }}
    >
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary-purple/20 to-button-orange/10 blur-3xl rounded-[40px] -z-10" />

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
          <p className="text-xs font-semibold text-white">SOC 2 · Audit-ready</p>
          <p className="text-[10px] text-white/40">Compliance built in</p>
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
