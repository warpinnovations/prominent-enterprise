"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BADGES = ["Local team", "PH-compliant", "Cloud-native", "Multi-tenant"];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-bg-layout-purple relative overflow-hidden border-y border-white/5"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-primary-purple/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[350px] bg-button-orange/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary-purple/12 blur-[100px] rounded-full pointer-events-none" />
      {/* Extra purple orbs */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary-purple/20 blur-[90px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/3 w-62.5 h-[250px] bg-primary-purple/15 blur-[80px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-8xl mx-auto">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-4"
            >
              About TPE
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Built in Western Visayas.
              <br />
              Engineered for Global-Standard Operations.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-white/60 text-lg leading-relaxed mb-8"
            >
              The Prominent Enterprise is a global-standard operations system
              developed to help you get things under control. It connects your
              essential processes into one place so you don&apos;t have to deal
              with scattered tools, repeated work, or constant confusion—just a
              smoother way of getting things done.
            </motion.p>

            <div className="flex flex-wrap gap-2 mb-8">
              {BADGES.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4, type: "spring", stiffness: 200, damping: 16 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-semibold cursor-default"
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
            </motion.div>
          </motion.div>

          {/* Right: Stacked dashboard cards */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center py-10 px-10"
          >
            {/* Breathing purple glow */}
            <motion.div
              animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary-purple/20 blur-[60px] rounded-[3rem] pointer-events-none"
            />

            {/* Middle card — rotated left */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute w-full rounded-3xl border border-primary-purple/25 overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
              style={{ rotate: -5, x: -12, y: 12, scale: 1.03, opacity: 0.65, zIndex: 2 }}
            >
              <Image src="/tpe-dashboard.png" alt="" width={800} height={600} className="w-full h-auto max-h-[420px] object-cover object-top block" />
            </motion.div>

            {/* Front card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative w-full rounded-3xl border border-primary-purple/50 overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(152,56,217,0.25)]"
              style={{ zIndex: 3, scale: 1.15 }}
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent z-10" />
              <Image
                src="/tpe-dashboard.png"
                alt="The Prominent Enterprise dashboard"
                width={800}
                height={600}
                className="w-full h-auto max-h-[420px] object-cover object-top block"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-layout-purple/60 to-transparent pointer-events-none" />
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
