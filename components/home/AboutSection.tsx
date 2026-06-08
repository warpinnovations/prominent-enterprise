"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BADGES = ["Local team", "PH-compliant", "Cloud-native", "Multi-tenant"];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-bg-layout-purple relative overflow-hidden border-y border-white/5"
    >
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-primary-purple/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4">
              About TPE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Built in Western Visayas.
              <br />
              Engineered for Global-Standard Operations.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              The Prominent Enterprise is a global-standard operations system
              developed to help you get things under control. It connects your
              essential processes into one place so you don&apos;t have to deal
              with scattered tools, repeated work, or constant confusion—just a
              smoother way of getting things done.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-semibold"
                >
                  {badge}
                </span>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-button-orange font-semibold hover:gap-3 transition-all group"
            >
              Meet the team
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary-purple/20 to-button-orange/10 aspect-[4/3] flex items-center justify-center text-white/20 text-sm"
          >
            [ Team photo ]
          </motion.div>
        </div>
      </div>
    </section>
  );
};
