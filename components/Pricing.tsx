"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small teams and startups.",
    features: ["Up to 10 users", "Basic analytics", "24h support response", "Standard security"],
    buttonText: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/user/mo",
    description: "Advanced tools for growing companies.",
    features: ["Unlimited users", "Advanced AI insights", "1h priority support", "Custom workflows", "SOC2 compliance"],
    buttonText: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Maximum power for large organizations.",
    features: ["White-glove onboarding", "Dedicated account manager", "Custom integrations", "Unlimited history", "SLA guarantees"],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

export const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <section id="pricing" className="py-24 bg-bg-layout-purple/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
            Pricing
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Simple, transparent <span className="text-gradient">plans.</span>
          </h3>
          <p className="text-text-gray text-lg">
            Choose the best plan for your team&apos;s needs. No hidden fees.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={cn(
                "glass p-10 rounded-[2.5rem] border flex flex-col h-full relative overflow-hidden",
                plan.highlight ? "border-primary-purple/50 bg-primary-purple/5" : "border-white/5"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-primary-purple text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-text-gray text-sm">{plan.period}</span>}
                </div>
                <p className="text-text-gray text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-5 h-5 text-primary-purple shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group",
                  plan.highlight 
                    ? "bg-primary-purple text-white hover:bg-primary-purple/90" 
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                )}
              >
                {plan.buttonText}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
