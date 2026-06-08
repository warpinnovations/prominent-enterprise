"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/data/pricing";

export const PlansSection = () => {
  return (
    <section
      id="plans"
      className="py-24 bg-bg-layout-purple relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-purple/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plans that fit your scale
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border flex flex-col p-7",
                plan.featured
                  ? "border-button-orange bg-white/[0.06]"
                  : "border-white/10 bg-white/[0.03]"
              )}
            >
              {/* Popular badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-button-orange text-white text-sm font-bold rounded-full whitespace-nowrap tracking-wide">
                  {plan.badge}
                </span>
              )}

              {/* Plan label */}
              <p className="text-base font-bold text-button-orange mb-4">
                {plan.name} plan
              </p>

              {/* Price block */}
              <div className="mb-1">
                <div className="flex items-end gap-2">
                  {plan.pricePrefix && (
                    <span className="text-xl font-semibold text-white/70 mb-1.5">
                      {plan.pricePrefix}
                    </span>
                  )}
                  <span className="text-6xl font-bold text-white leading-none tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-white/70 text-sm font-medium mb-1.5">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-white/45 text-xs leading-relaxed mt-3 mb-6">
                {plan.description}
              </p>

              {/* Primary CTA */}
              <Link
                href={plan.id === "enterprise" ? "#book" : "/book-a-demo"}
                className={cn(
                  "w-full py-3 rounded-full font-semibold text-center text-sm transition-all block",
                  plan.featured
                    ? "bg-button-orange hover:bg-orange-500 text-white"
                    : "border border-white/20 hover:bg-white/10 text-white"
                )}
              >
                {plan.cta}
              </Link>

              {/* Secondary link — hidden on Enterprise */}
              {plan.id !== "enterprise" && (
                <Link
                  href="#book"
                  className="text-center text-xs text-white/35 hover:text-white/60 transition-colors mt-3 mb-7"
                >
                  Chat to sales
                </Link>
              )}
              {plan.id === "enterprise" && <div className="mb-7" />}

              {/* Divider */}
              <div className="border-t border-white/10 pt-6">
                {/* Features label */}
                <p className="text-[10px] font-bold text-white/30 tracking-[2px] uppercase mb-4">
                  Features
                </p>

                {/* Feature list */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                      {/* Circular filled check icon */}
                      <span className="w-4 h-4 rounded-full bg-button-orange flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
