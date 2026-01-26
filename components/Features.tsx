"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  Database,
} from "lucide-react";

const features = [
  {
    title: "Financial Intelligence",
    description:
      "Real-time visibility into your company's financial health with automated reporting.",
    icon: BarChart3,
    color: "text-button-orange",
  },
  {
    title: "Human Capital Management",
    description:
      "Manage your global workforce with integrated payroll, benefits, and performance tracking.",
    icon: Users,
    color: "text-primary-purple",
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade security with role-based access control and comprehensive audit trails.",
    icon: ShieldCheck,
    color: "text-primary-green",
  },
  {
    title: "Lightning Fast Performance",
    description:
      "Built on a high-performance architecture that scales with your business needs.",
    icon: Zap,
    color: "text-orange-secondary",
  },
  {
    title: "Global Operations",
    description:
      "Multi-currency and multi-language support for seamless international expansion.",
    icon: Globe,
    color: "text-widget-title-purple",
  },
  {
    title: "Unified Data Platform",
    description:
      "A single source of truth for all your enterprise data across every department.",
    icon: Database,
    color: "text-primary-gray",
  },
];

export const Features = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-bg-layout-purple">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
            Features
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Everything you need to <br />
            <span className="text-text-gray">run a world-class company.</span>
          </h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">
                {feature.title}
              </h4>
              <p className="text-text-gray leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
