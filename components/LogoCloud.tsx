"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Orbit, Rocket, Hexagon, Atom, Triangle, LucideIcon } from "lucide-react";

type Brand = { name: string; icon: LucideIcon };

const brands: Brand[] = [
  { name: "Acme Corp", icon: Building2 },
  { name: "GlobalFlow", icon: Orbit },
  { name: "Interstellar", icon: Rocket },
  { name: "Nexus", icon: Hexagon },
  { name: "Quantum", icon: Atom },
  { name: "Vertex", icon: Triangle },
];

const fadeMask = {
  maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
};

export const LogoCloud = () => {
  return (
    <section className="py-16 md:py-20 border-y border-white/5 bg-bg-layout-purple/30">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-medium text-white/40 uppercase tracking-[0.25em] mb-12"
        >
          Trusted by teams across industries
        </motion.p>

        {/* Marquee */}
        <div className="relative overflow-hidden" style={fadeMask}>
          <motion.div
            className="flex w-max items-center gap-14 md:gap-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-3 text-white/35 grayscale transition-all duration-300 hover:text-white/80 hover:grayscale-0"
              >
                <brand.icon className="w-6 h-6 md:w-7 md:h-7" />
                <span className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
