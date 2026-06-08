"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { ModuleGrid } from "@/components/modules/ModuleGrid";

export const ModulesSection = () => {
  return (
    <section id="modules" className="py-24 bg-bg-layout-purple relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Layers className="w-4 h-4 text-primary-purple" />
            <span className="text-sm text-white/70">Enterprise Modules</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Everything you need to{" "}
            <span className="text-gradient">run your business.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Pick the modules you need today. Add the rest as you grow.
          </p>
        </motion.div>

        <ModuleGrid />
      </div>
    </section>
  );
};
