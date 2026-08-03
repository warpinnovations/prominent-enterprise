"use client";

import React from "react";
import { motion } from "framer-motion";

type Stat = { value: string; label: string };

const DEFAULT_STATS: Stat[] = [
  { value: "12+", label: "Integrated modules" },
  { value: "80%", label: "Less manual paperwork" },
  { value: "3x", label: "Faster reporting" },
  { value: "24/7", label: "Cloud availability" },
];

export const Stats = ({
  stats = DEFAULT_STATS,
  heading,
}: {
  stats?: Stat[];
  heading?: string;
}) => {
  return (
    <section className="py-16 border-y border-white/5 bg-bg-layout-purple/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {heading && (
          <p className="text-center text-sm font-medium text-text-gray uppercase tracking-[0.2em] mb-10">
            {heading}
          </p>
        )}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-5xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-widget-title-purple bg-clip-text text-transparent tabular-nums">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
