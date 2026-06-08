"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TESTIMONIALS, Testimonial } from "@/data/testimonials";

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12 }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      className="relative rounded-3xl overflow-hidden h-[560px] cursor-pointer"
    >
      {/* Full-bleed photo */}
      <Image
        src={t.personImage}
        alt={t.name}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Base gradient — always on */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/5" />

      {/* Extra overlay — fades in on hover for full quote readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/35 to-black/20"
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Content pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="block text-button-orange text-4xl font-serif leading-none">
          &ldquo;
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={expanded ? "full" : "short"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={`text-white/90 leading-relaxed mb-5 ${expanded ? "text-[11px]" : "text-[14px]"}`}
          >
            {expanded ? t.fullQuote : (
              <>
                {t.shortQuote}{" "}
                <span className="text-button-orange font-medium underline underline-offset-2">
                  Show more
                </span>
              </>
            )}
          </motion.p>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/15 ">
          <div>
            <p className="font-semibold text-white text-sm">{t.name}</p>
            <p className="text-white/50 text-xs mt-0.5">
              {t.role}
            </p>
            <p className="text-white/50 text-xs mt-0.5">
              {t.company}
            </p>
          </div>
          <div className="relative h-6 w-24 shrink-0">
            <Image
              src={t.logoImage}
              alt={`${t.company} logo`}
              fill
              className="object-contain brightness-0 invert opacity-70"
              sizes="100px"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const TestimonialsPreview = () => {
  return (
    <section id="testimonials" className="py-24 bg-bg-layout-purple relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Trusted by Filipino Enterprises
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
