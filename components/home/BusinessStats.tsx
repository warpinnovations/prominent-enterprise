"use client";

import { motion } from "framer-motion";
import { Layers, Package, ShieldCheck } from "lucide-react";

const STATS = [
  {
    num: "1 platform",
    label: "for accurate data",
    icon: Layers,
    glow: "from-button-orange/20 via-transparent to-transparent",
    iconBg: "bg-button-orange/15 border-button-orange/25",
    iconColor: "text-button-orange",
  },
  {
    num: "95%+",
    label: "stock accuracy",
    icon: Package,
    glow: "from-primary-purple/20 via-transparent to-transparent",
    iconBg: "bg-primary-purple/15 border-primary-purple/25",
    iconColor: "text-primary-purple",
  },
  {
    num: "100%",
    label: "actions tracked",
    icon: ShieldCheck,
    glow: "from-emerald-400/20 via-transparent to-transparent",
    iconBg: "bg-emerald-400/15 border-emerald-400/25",
    iconColor: "text-emerald-400",
  },
];

export const BusinessStats = () => {
  return (
    <section id="business" className="py-24 bg-bg-layout-purple relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Trusted by real organizations.<br />Proven by real results.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The Prominent Enterprise is a trusted system backed by real-world
            results and proven impact from the organizations that use it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] overflow-hidden cursor-default"
              >
                {/* Top accent glow */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${stat.glow} pointer-events-none`} />

                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Hover border shimmer */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20 pointer-events-none" />

                <div className="relative p-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center mb-6 ${stat.iconBg}`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>

                  {/* Number */}
                  <p className="text-5xl md:text-6xl font-bold text-white leading-none tracking-tight mb-3">
                    {stat.num}
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-px bg-white/15 mb-3" />

                  {/* Label */}
                  <p className="text-white/50 text-sm font-medium tracking-wide">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
