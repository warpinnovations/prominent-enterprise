"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Settings2, Rocket, LineChart, LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const DEFAULT_STEPS: Step[] = [
  {
    icon: Compass,
    title: "Assess",
    description: "We map your current workflows and pinpoint where time and money leak.",
  },
  {
    icon: Settings2,
    title: "Configure",
    description: "Your modules are tailored to how your business actually operates — no rip-and-replace.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Guided onboarding and data migration get your team live in days, not months.",
  },
  {
    icon: LineChart,
    title: "Grow",
    description: "Real-time dashboards and support help you scale with confidence.",
  },
];

// per-step accent gradients
const COLORS = [
  { grad: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.6)", text: "text-violet-300" },
  { grad: "from-blue-500 to-indigo-600", glow: "rgba(59,130,246,0.6)", text: "text-blue-300" },
  { grad: "from-amber-500 to-orange-600", glow: "rgba(245,158,11,0.6)", text: "text-amber-300" },
  { grad: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.6)", text: "text-emerald-300" },
];

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const HowItWorks = ({
  steps = DEFAULT_STEPS,
  eyebrow = "How it works",
  title = "From first look to full launch.",
}: {
  steps?: Step[];
  eyebrow?: string;
  title?: string;
}) => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary-purple/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-20">
          <p className="eyebrow justify-center mb-4">{eyebrow}</p>
          <h2 className="display text-4xl md:text-5xl font-bold text-white mb-5">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{title.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-white/55 text-lg text-balance">
            A guided path from day one — we handle the heavy lifting so your team is productive fast.
          </p>
        </Reveal>

        <div className="relative max-w-6xl mx-auto">
          {/* animated rail behind the icon nodes (desktop) */}
          <div className="pointer-events-none absolute hidden md:block left-[12.5%] right-[12.5%]" style={{ top: "2.75rem" }}>
            {/* faint track */}
            <div className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-white/10" />
            {/* gradient progress that draws in */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 via-amber-500 to-emerald-500"
              style={{ transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const c = COLORS[i % COLORS.length];
              return (
                <motion.div
                  key={step.title}
                  custom={i}
                  variants={card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* icon node (sits on the rail) */}
                  <div className="relative mb-6">
                    {/* glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[1.4rem] blur-xl opacity-40 group-hover:opacity-80 transition-opacity"
                      style={{ background: c.glow }}
                    />
                    <div
                      className={`relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${c.grad} shadow-lg ring-1 ring-white/25`}
                    >
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    {/* number badge */}
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#160c24] text-xs font-bold text-white shadow">
                      {i + 1}
                    </span>
                  </div>

                  {/* content card */}
                  <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors group-hover:border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-white/50">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
