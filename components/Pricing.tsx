"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Package, Sparkles } from "lucide-react";

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

const allInOneBundle = {
  name: "Complete Enterprise Suite",
  originalPrice: 404,
  discountedPrice: 199,
  savings: 205,
  description: "Get access to ALL modules across all industries. Perfect for growing businesses with diverse operations.",
  modules: [
    "POS",
    "Inventory & Warehouse",
    "Finance & Accounting",
    "Sales & Order Management",
    "CRM",
    "Project Management",
    "Procurement & Supplier",
    "HR & Payroll",
    "Advanced Reporting",
  ],
  bonusFeatures: ["Priority 24/7 support", "Custom onboarding", "Dedicated account manager", "99.9% SLA guarantee"],
};

export const Pricing = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const togglePackage = (packageId: string) => {
    setSelectedPackages(prev =>
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
    <section id="pricing" className="py-24 bg-bg-layout-purple/30 relative overflow-hidden">
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
          Built for your <span className="text-gradient">business.</span>
        </h3>
        <p className="text-text-gray text-lg">
          Choose the package designed for your industry or get everything with our complete bundle.
        </p>
      </motion.div>
      {/* <div className="container mx-auto px-6 relative z-10"> */}
       
        {/* All-in-One Bundle - Liquid Glass Card */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative group"> */}
            {/* Liquid glass outer glow */}
            {/* <div className="absolute -inset-1 bg-linear-to-r from-primary-purple via-button-orange to-primary-purple rounded-[2.5rem] opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500" /> */}

            {/* Main liquid glass card */}
            {/* <div className="relative p-10 rounded-[2.5rem] border border-white/20 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(152, 56, 217, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(243, 91, 4, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.3)",
              }}
            > */}
              {/* Liquid highlight effect */}
              {/* <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-white/20 via-transparent to-transparent" /> */}

              {/* Best Value Badge */}
              {/* <div className="absolute top-6 right-6 flex items-center gap-2 bg-linear-to-r from-button-orange to-orange-secondary px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">Save 50%</span>
              </div>

              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-8 h-8 text-primary-purple" />
                    <h4 className="text-2xl font-bold text-white">{allInOneBundle.name}</h4>
                  </div>


                  <p className="text-text-gray mb-6">{allInOneBundle.description}</p>

                  <button className="w-full lg:w-auto px-8 py-4 bg-linear-to-r from-primary-purple to-button-orange text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
                    Get Complete Suite
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex-1 lg:border-l lg:border-white/10 lg:pl-10">
                  <h5 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
                    All Modules Included
                  </h5>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {allInOneBundle.modules.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-primary-purple shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <h5 className="text-sm font-semibold uppercase tracking-widest text-button-orange mb-3">
                    Bonus Features
                  </h5>
                  <div className="space-y-2">
                    {allInOneBundle.bonusFeatures.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-white/80">
                        <Sparkles className="w-4 h-4 text-button-orange shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div> 
        */}

        {/* <div className="text-center mb-12">
          <span className="text-text-gray text-sm uppercase tracking-widest">Or choose by industry</span>
        </div> */}

        {/* Industry Packages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {packages.map((pkg) => {
            const isSelected = selectedPackages.includes(pkg.id);
            return (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  scale: isSelected ? 1.02 : 1,
                  borderColor: isSelected ? "rgba(152, 56, 217, 0.6)" : "rgba(255, 255, 255, 0.1)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8,
                }}
                onClick={() => togglePackage(pkg.id)}
                className="relative p-8 rounded-4xl border cursor-pointer overflow-hidden group"
                style={{
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(152, 56, 217, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Animated glow effect on selection */}
                <motion.div
                  className="absolute inset-0 -z-20 rounded-4xl"
                  animate={{
                    boxShadow: isSelected
                      ? "0 10px 40px rgba(152, 56, 217, 0.3), inset 0 1px 1px rgba(255,255,255,0.1)"
                      : "0 0 0 rgba(152, 56, 217, 0), inset 0 1px 1px rgba(255,255,255,0.05)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Liquid glass top highlight */}
                <motion.div
                  className="absolute top-0 left-4 right-4 h-px"
                  animate={{
                    background: isSelected
                      ? "linear-gradient(to right, transparent, rgba(152, 56, 217, 0.5), transparent)"
                      : "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Selection indicator with smooth animation */}
                <motion.div
                  className="absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center overflow-hidden"
                  animate={{
                    borderColor: isSelected ? "rgb(152, 56, 217)" : "rgba(255, 255, 255, 0.3)",
                    backgroundColor: isSelected ? "rgb(152, 56, 217)" : "transparent",
                    scale: isSelected ? 1 : 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Icon with bounce on selection */}
                <motion.div
                  className="text-4xl mb-3"
                  animate={{
                    scale: isSelected ? [1, 1.2, 1] : 1,
                    rotate: isSelected ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  {pkg.icon}
                </motion.div>

                {/* Title & Subtitle */}
                <h4 className="text-xl font-bold text-white">{pkg.name}</h4>
                <p className="text-primary-purple text-sm font-medium mb-3">{pkg.subtitle}</p>

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
                        animate={{
                          opacity: isSelected ? 1 : 0.7,
                        }}
                        transition={{
                          delay: isSelected ? index * 0.05 : 0,
                          duration: 0.3,
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: isSelected ? [1, 1.3, 1] : 1,
                          }}
                          transition={{
                            delay: isSelected ? index * 0.05 : 0,
                            duration: 0.3,
                          }}
                        >
                          <Check className="w-4 h-4 text-primary-purple shrink-0" />
                        </motion.div>
                        {module}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Packages Summary */}
        <AnimatePresence>
          {selectedPackages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <motion.div
                className="p-6 rounded-2xl border border-primary-purple/30 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(152, 56, 217, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
                  backdropFilter: "blur(16px)",
                }}
                layout
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      "linear-gradient(90deg, transparent 0%, rgba(152, 56, 217, 0.2) 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 100%, rgba(152, 56, 217, 0.2) 150%, transparent 200%)",
                    ],
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <div>
                    <motion.p
                      className="text-white text-lg font-semibold"
                      key={selectedPackages.length}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selectedPackages.length} package{selectedPackages.length > 1 ? "s" : ""} selected
                    </motion.p>
                    <p className="text-white/60 text-sm mt-1">Contact us for pricing details</p>
                  </div>
                  <motion.button
                    className="px-6 py-3 bg-primary-purple text-white font-bold rounded-xl flex items-center gap-2 group"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(152, 56, 217, 0.9)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    Continue with Selection
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      {/* </div> */}
    </section>
  );
};
