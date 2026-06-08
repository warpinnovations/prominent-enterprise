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
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-purple/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-button-orange/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary-purple/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className={cn(
                "group relative rounded-2xl border flex flex-col p-7 transition-shadow duration-300",
                plan.featured
                  ? "border-button-orange/70 bg-white/[0.06] shadow-[0_0_40px_rgba(243,91,4,0.12)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              )}
            >
              {/* Featured card inner glow */}
              {plan.featured && (
                <motion.div
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-b from-button-orange/8 via-transparent to-transparent pointer-events-none"
                />
              )}

              {/* Top accent line */}
              <div className={cn(
                "absolute top-0 left-8 right-8 h-px",
                plan.featured
                  ? "bg-linear-to-r from-transparent via-button-orange/60 to-transparent"
                  : "bg-linear-to-r from-transparent via-white/15 to-transparent"
              )} />

              {/* Popular badge */}
              {plan.badge && (
                <motion.span
                  initial={{ opacity: 0, y: -8, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13 + 0.3, type: "spring", stiffness: 260, damping: 18 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-button-orange text-white text-sm font-bold rounded-full whitespace-nowrap tracking-wide"
                >
                  {plan.badge}
                </motion.span>
              )}

              {/* Plan label */}
              <p className="text-base font-bold text-button-orange mb-4">
                {plan.name} plan
              </p>

              {/* Price block */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-1"
              >
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
              </motion.div>

              {/* Description */}
              <p className="text-white/45 text-xs leading-relaxed mt-3 mb-6">
                {plan.description}
              </p>

              {/* Primary CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
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
              </motion.div>

              {/* Secondary link */}
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
                <p className="text-[10px] font-bold text-white/30 tracking-[2px] uppercase mb-4">
                  Features
                </p>

                <ul className="space-y-3">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + fi * 0.06, duration: 0.4 }}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <span className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110",
                        plan.featured ? "bg-button-orange" : "bg-white/20"
                      )}>
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                      {f}
                    </motion.li>
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
