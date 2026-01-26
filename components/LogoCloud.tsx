"use client";

import React from "react";
import { motion } from "framer-motion";

const logos = [
  "Acme Corp", "GlobalFlow", "Interstellar", "Nexus", "Quantum", "Vertex"
];

export const LogoCloud = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 border-y border-white/5 bg-bg-layout-purple/50">
      <div className="container mx-auto px-6">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-text-gray uppercase tracking-[0.2em] mb-12"
        >
          Trusted by industry leaders worldwide
        </motion.p>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
        >
          {logos.map((logo) => (
            <motion.span
              key={logo}
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold tracking-tighter text-white/80"
            >
              {logo}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
