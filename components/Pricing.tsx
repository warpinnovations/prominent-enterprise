"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { ParallaxGlow } from "@/components/ParallaxGlow";

/** Card that tilts in 3D toward the cursor with a light glare that tracks it. */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), spring);
  const glareX = useTransform(mx, [-0.5, 0.5], ["12%", "88%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["12%", "88%"]);
  const glare = useMotionTemplate`radial-gradient(240px circle at ${glareX} ${glareY}, rgba(255,255,255,0.1), transparent 60%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      suppressHydrationWarning
      className={className}
    >
      {children}
      <motion.div
        aria-hidden
        suppressHydrationWarning
        className="pointer-events-none absolute inset-0"
        style={{ background: glare }}
      />
    </motion.div>
  );
}
import { alternatingItem } from "@/components/Reveal";

const packages = [
  {
    id: "retail",
    name: "Sales & Stock Tracker",
    subtitle: "for Retail",
    price: 49,
    description: "Perfect for sari-sari stores, boutiques, specialty shops, and small groceries.",
    painPoints: ["Daily sales tracking", "Stock running out alerts", "Cash mismatch prevention"],
    modules: ["POS", "Inventory & Warehouse", "Finance & Accounting", "Basic Reporting"],
    icon: "🏪",
  },
  {
    id: "fnb",
    name: "Restaurant Sales & Expense",
    subtitle: "for Food & Beverage",
    price: 59,
    description: "Built for dine-in restaurants, takeout spots, cafés, and food kiosks.",
    painPoints: ["Daily sales monitoring", "Ingredient usage tracking", "Staff cost management"],
    modules: ["POS", "Inventory & Warehouse", "Procurement & Supplier", "Finance & Accounting", "Basic Reporting"],
    icon: "🍽️",
  },
  {
    id: "wholesale",
    name: "Order, Stock & Billing",
    subtitle: "for Wholesale & Distribution",
    price: 69,
    description: "Ideal for traders, distributors, and resellers managing bulk orders.",
    painPoints: ["Orders not getting lost", "Stock accuracy", "Margin tracking"],
    modules: ["Sales & Order Management", "Inventory & Warehouse", "CRM", "Finance & Accounting", "Basic Reporting"],
    icon: "📦",
  },
  {
    id: "construction",
    name: "Project Cost & Materials",
    subtitle: "for Construction & Trade",
    price: 79,
    description: "Designed for contractors, suppliers, and small developers.",
    painPoints: ["Project cost control", "Material tracking", "Labor pay management"],
    modules: ["Project Management", "Procurement & Supplier", "Inventory & Warehouse", "HR & Payroll", "Finance & Accounting"],
    icon: "🏗️",
  },
  {
    id: "manufacturing",
    name: "Production & Cost Control",
    subtitle: "for Manufacturing",
    price: 89,
    description: "For food production facilities, light manufacturing, and workshops.",
    painPoints: ["Raw material management", "Production delay prevention", "Cost per output tracking"],
    modules: ["Inventory & Warehouse", "Procurement & Supplier", "Sales & Order Management", "Finance & Accounting", "Basic Reporting"],
    icon: "🏭",
  },
  {
    id: "services",
    name: "Client, Job & Billing",
    subtitle: "for Service Businesses",
    price: 59,
    description: "Perfect for creative agencies, repair services, and clinics.",
    painPoints: ["Client tracking", "Job progress monitoring", "Proper billing"],
    modules: ["CRM", "Project Management", "Sales & Order Management", "Finance & Accounting", "Basic Reporting"],
    icon: "💼",
  },
];

const CARD_COLORS = [
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-amber-500",
  "from-blue-400 to-indigo-500",
  "from-amber-400 to-yellow-500",
  "from-violet-400 to-purple-500",
  "from-cyan-400 to-blue-500",
];

export const Pricing = () => {
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);

  const toggleExpand = (packageId: string) => {
    setExpandedPackages(prev =>
      prev.includes(packageId)
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="solutions" className="py-24 md:py-32 relative overflow-hidden">
      {/* Layered gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-layout-purple/45 via-bg-purple/15 to-bg-layout-purple/45" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 32%, rgba(152,56,217,0.18), transparent 70%)",
        }}
      />
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
      {/* Background glow effects */}
      <ParallaxGlow speed={70} className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[128px] pointer-events-none" />
      <ParallaxGlow speed={-50} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[128px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
          Industry Solutions
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Built for YOUR <span className="text-gradient">business.</span>
        </h3>
        <p className="text-text-gray text-lg">
          Or choose our pre-selected packages for specific industries
        </p>
      </motion.div>

        {/* Industry Packages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {packages.map((pkg, index) => {
            return (
              <motion.div key={pkg.id} variants={alternatingItem(index)} className="group">
                <TiltCard className="relative p-8 rounded-4xl border border-white/10 overflow-hidden bg-white/[0.02] backdrop-blur-md transition-shadow duration-300 hover:border-white/20 hover:shadow-[0_35px_70px_-30px_rgba(10,4,24,0.95)]">
                {/* Animated background */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                  }}
                />

                {/* Liquid glass top highlight */}
                <div
                  className="absolute top-0 left-4 right-4 h-px"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)",
                  }}
                />

                {/* Header: icon tile + title */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${CARD_COLORS[index]} flex items-center justify-center text-3xl shadow-lg shadow-black/20 shrink-0`}
                  >
                    {pkg.icon}
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h4 className="text-lg font-bold text-white leading-tight">{pkg.name}</h4>
                    <p className="text-widget-title-purple text-sm font-medium mt-0.5">{pkg.subtitle}</p>
                  </div>
                </div>

                {/* Description (always visible) */}
                <p className="text-white/50 text-sm leading-relaxed mb-4">{pkg.description}</p>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleExpand(pkg.id)}
                  className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-medium mb-3 transition-colors"
                >
                  <span>{expandedPackages.includes(pkg.id) ? "Hide Details" : "View Details"}</span>
                  <motion.div
                    animate={{ rotate: expandedPackages.includes(pkg.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {expandedPackages.includes(pkg.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Pain Points */}
                      <div className="mb-4">
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Solves</p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.painPoints.map((point) => (
                            <span
                              key={point}
                              className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded-full"
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Modules included */}
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Modules Included</p>
                        <ul className="space-y-1.5">
                          {pkg.modules.map((module, index) => (
                            <motion.li
                              key={module}
                              className="flex items-center gap-2 text-sm text-white/70"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.2,
                              }}
                            >
                              <Check className="w-4 h-4 text-primary-purple shrink-0" />
                              {module}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
    </section>
  );
};
