"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ParallaxGlow } from "@/components/ParallaxGlow";
import { Reveal, staggerContainer, alternatingItem } from "@/components/Reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We finally have one source of truth. Closing our books used to take a week — now it's done in an afternoon.",
    name: "Placeholder Name",
    role: "Finance Head, Sample Retail Co.",
    initials: "PR",
    color: "bg-emerald-500",
  },
  {
    quote:
      "Onboarding was painless and the team actually adopted it. Our daily sales and stock are finally in sync.",
    name: "Placeholder Name",
    role: "Owner, Sample F&B Group",
    initials: "SF",
    color: "bg-blue-500",
  },
  {
    quote:
      "Permit processing that used to take days now happens in minutes. Our constituents noticed the difference immediately.",
    name: "Placeholder Name",
    role: "Administrator, Sample LGU",
    initials: "SL",
    color: "bg-button-orange",
  },
];

export const Testimonials = ({
  testimonials = DEFAULT_TESTIMONIALS,
  eyebrow = "What people say",
  title = "Loved by teams that ship.",
}: {
  testimonials?: Testimonial[];
  eyebrow?: string;
  title?: string;
}) => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Layered gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-layout-purple/50 via-bg-purple/15 to-bg-layout-purple/50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 42%, rgba(152,56,217,0.16), transparent 70%)",
        }}
      />
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
      <ParallaxGlow
        speed={60}
        className="absolute top-0 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="right" className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow justify-center mb-4">{eyebrow}</p>
          <h2 className="display text-4xl md:text-5xl font-bold text-white">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{title.split(" ").slice(-1)}</span>
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.role}
              variants={alternatingItem(i)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-sm p-8 hover:border-white/20 transition-colors"
            >
              {/* colored corner glow on hover */}
              <div
                className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full ${t.color} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500`}
              />
              {/* big decorative quote */}
              <span className="pointer-events-none absolute top-3 right-6 select-none font-serif text-7xl leading-none text-white/[0.07]">
                &rdquo;
              </span>

              <div className="relative flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-button-orange text-button-orange" />
                ))}
              </div>

              <p className="relative text-[15px] leading-relaxed text-white/75 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="relative flex items-center gap-3 pt-5 border-t border-white/5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${t.color} text-sm font-semibold text-white ring-2 ring-white/10`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
