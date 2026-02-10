"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <section id="solutions" className="py-24 bg-bg-layout-purple/30 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[128px] pointer-events-none" />
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
          {packages.map((pkg) => {
            return (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="relative p-8 rounded-4xl border border-white/10 overflow-hidden group"
                style={{
                  backdropFilter: "blur(16px)",
                }}
              >
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

                {/* Icon */}
                <div className="text-4xl mb-3">
                  {pkg.icon}
                </div>

                {/* Title & Subtitle */}
                <h4 className="text-xl font-bold text-white">{pkg.name}</h4>
                <p className="text-primary-purple text-sm font-medium mb-3">{pkg.subtitle}</p>

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
                      {/* Description */}
                      <p className="text-text-gray text-sm mb-4">{pkg.description}</p>

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
              </motion.div>
            );
          })}
        </motion.div>
    </section>
  );
};
