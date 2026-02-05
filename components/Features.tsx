"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Users,
  Package,
  Truck,
  ShoppingCart,
  UserCircle,
  FolderKanban,
  BarChart3,
  ShieldCheck,
  Plug,
  Monitor,
  Clock,
  ArrowRight,
  Check,
  Zap,
  Globe,
  Lock,
  Layers,
} from "lucide-react";

export const Features = () => {
  return (
    <section id="features" className="py-32 bg-bg-layout-purple relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 mb-6">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/70">Enterprise Modules</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Everything you need.
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Nothing you don't.
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-lg mx-auto">
            Twelve integrated modules built for enterprises that demand excellence.
          </p>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto">

          {/* Finance - Hero card with gradient mesh */}
          <div className="col-span-12 md:col-span-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 rounded-3xl" />
            <div className="relative h-full min-h-[320px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
              <div className="flex items-start justify-between mb-auto">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Finance & Accounting</h3>
                  <p className="text-white/40 max-w-sm">Complete general ledger, accounts payable & receivable, and multi-currency support.</p>
                </div>

              </div>

              {/* Mini dashboard preview */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.06]">
                  <p className="text-xs text-white/30 mb-1">Revenue</p>
                  <p className="text-xl font-semibold text-white">₱12.4M</p>
                  <p className="text-xs text-emerald-400 mt-1">+18.2%</p>
                </div>
                <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.06]">
                  <p className="text-xs text-white/30 mb-1">Expenses</p>
                  <p className="text-xl font-semibold text-white">₱4.2M</p>
                  <p className="text-xs text-white/40 mt-1">On track</p>
                </div>
                <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.06]">
                  <p className="text-xs text-white/30 mb-1">Net Margin</p>
                  <p className="text-xl font-semibold text-white">34%</p>
                  <p className="text-xs text-emerald-400 mt-1">+4.1%</p>
                </div>
              </div>
            </div>
          </div>

          {/* HR - Vertical card */}
          <div className="col-span-12 md:col-span-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 to-transparent rounded-3xl" />
            <div className="relative h-full min-h-[320px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">HR & Payroll</h3>
              <p className="text-sm text-white/40 mb-6">Employee lifecycle, attendance, and automated payroll processing.</p>

              {/* Employee avatars */}
              <div className="mt-auto">
                <div className="flex -space-x-3 mb-3">
                  {["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500"].map((color, i) => (
                    <div key={i} className={cn("w-10 h-10 rounded-full border-2 border-bg-layout-purple flex items-center justify-center text-xs font-medium text-white", color)}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-bg-layout-purple bg-white/10 flex items-center justify-center text-xs text-white/60">
                    +847
                  </div>
                </div>
                <p className="text-xs text-white/30">852 active employees</p>
              </div>
            </div>
          </div>

          {/* Inventory - Wide card */}
          <div className="col-span-12 md:col-span-6 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-3xl" />
            <div className="relative h-full min-h-[240px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Inventory & Warehouse</h3>
                  <p className="text-sm text-white/40">Multi-location stock tracking with barcode & RFID support.</p>
                </div>
              </div>

              {/* Stock indicators */}
              <div className="mt-auto flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold text-white">24,847</p>
                  <p className="text-xs text-white/30">SKUs tracked</p>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-white/50">In Stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-sm text-white/50">Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-white/50">Out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales - Wide card */}
          <div className="col-span-12 md:col-span-6 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-3xl" />
            <div className="relative h-full min-h-[240px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Sales & Orders</h3>
                  <p className="text-sm text-white/40">Quote-to-cash automation with approval workflows.</p>
                </div>
              </div>

              {/* Pipeline bars */}
              <div className="mt-auto flex items-end gap-2">
                {[
                  { label: "Leads", h: "60%", color: "bg-violet-500" },
                  { label: "Qualified", h: "45%", color: "bg-purple-500" },
                  { label: "Proposal", h: "30%", color: "bg-indigo-500" },
                  { label: "Closed", h: "25%", color: "bg-emerald-500" },
                ].map((stage) => (
                  <div key={stage.label} className="flex-1 flex flex-col items-center">
                    <div className="w-full h-16 bg-white/[0.04] rounded-lg overflow-hidden flex items-end">
                      <div className={cn("w-full rounded-t-md", stage.color)} style={{ height: stage.h }} />
                    </div>
                    <p className="text-[10px] text-white/30 mt-2">{stage.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Small cards row */}
          <div className="col-span-6 md:col-span-3 relative group">
            <div className="relative h-full min-h-[200px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Point of Sale</h3>
              <p className="text-xs text-white/40 mb-4">Fast retail checkout</p>
              <div className="mt-auto">
                <p className="text-2xl font-bold text-white">₱1.2M</p>
                <p className="text-[10px] text-white/30">Today's transactions</p>
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 relative group">
            <div className="relative h-full min-h-[200px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/20">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Queue System</h3>
              <p className="text-xs text-white/40 mb-4">Customer flow</p>
              <div className="mt-auto font-mono">
                <p className="text-2xl font-bold text-white">A-042</p>
                <p className="text-[10px] text-white/30">Now serving</p>
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 relative group">
            <div className="relative h-full min-h-[200px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">CRM</h3>
              <p className="text-xs text-white/40 mb-4">Relationship tracking</p>
              <div className="mt-auto">
                <p className="text-2xl font-bold text-white">4,281</p>
                <p className="text-[10px] text-white/30">Active contacts</p>
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 relative group">
            <div className="relative h-full min-h-[200px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Procurement</h3>
              <p className="text-xs text-white/40 mb-4">Vendor management</p>
              <div className="mt-auto">
                <p className="text-2xl font-bold text-white">127</p>
                <p className="text-[10px] text-white/30">Active suppliers</p>
              </div>
            </div>
          </div>

          {/* BI - Wide card with chart */}
          <div className="col-span-12 md:col-span-7 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/5 rounded-3xl" />
            <div className="relative h-full min-h-[220px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Business Intelligence</h3>
                    <p className="text-sm text-white/40">Real-time dashboards & custom reports</p>
                  </div>
                </div>
              </div>

              {/* Chart visualization */}
              <div className="mt-auto flex items-end gap-1.5 h-20">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-purple-500/40 to-purple-500/10 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Project Management */}
          <div className="col-span-12 md:col-span-5 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-3xl" />
            <div className="relative h-full min-h-[220px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Project Management</h3>
                  <p className="text-sm text-white/40">Tasks, timelines, resources</p>
                </div>
              </div>

              {/* Progress bars */}
              <div className="mt-auto space-y-3">
                {[
                  { name: "Q1 Rollout", progress: 92 },
                  { name: "Mobile App", progress: 67 },
                  { name: "API v2", progress: 41 },
                ].map((project) => (
                  <div key={project.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/50">{project.name}</span>
                      <span className="text-white/70">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row - Compliance & Integrations */}
          <div className="col-span-12 md:col-span-4 relative group">
            <div className="relative h-full min-h-[180px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Compliance</h3>
                <p className="text-sm text-white/40">Audit trails & governance</p>
                <div className="flex items-center gap-2 mt-3">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-white/50">SOC 2 Type II</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-blue-500/5 rounded-3xl" />
            <div className="relative h-full min-h-[180px] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <Plug className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Integrations</h3>
                    <p className="text-sm text-white/40">Connect with 200+ enterprise tools</p>
                  </div>
                </div>
              </div>

              {/* Integration logos placeholder */}
              <div className="mt-auto flex items-center gap-3">
                {[Zap, Globe, Lock, Layers, BarChart3, Users].map((Icon, i) => (
                  <div key={i} className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/40" />
                  </div>
                ))}
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs text-white/40">
                  +194
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
