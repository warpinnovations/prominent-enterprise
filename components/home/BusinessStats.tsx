"use client";

import { motion } from "framer-motion";

const STATS = [
  { num: "60%", label: "Faster month-end close" },
  { num: "3×", label: "Inventory turnover visibility" },
  { num: "100%", label: "Audit-ready records" },
];

export const BusinessStats = () => {
  return (
    <section id="business" className="py-24 bg-bg-layout-purple relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-purple/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
            Built for businesses ready to scale
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            From your first 10 employees
            <br />
            to your 10th branch.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Whether you&apos;re tightening operations or rolling out to new
            locations, The Prominent gives you the visibility and control to
            grow without breaking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -4, borderColor: "rgba(243, 91, 4, 0.4)" }}
              className="relative p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-center cursor-default"
            >
              <p className="text-6xl font-bold text-button-orange leading-none tracking-tight mb-4">
                {stat.num}
              </p>
              <p className="text-white/60 text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
