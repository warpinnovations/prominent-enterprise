"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Settings2, Rocket, LineChart, LucideIcon } from "lucide-react";
import { Reveal, staggerContainer, alternatingItem } from "@/components/Reveal";

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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-button-orange/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="left" className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
            {eyebrow}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{title.split(" ").slice(-1)}</span>
          </h3>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={alternatingItem(i)}
              className="relative glass rounded-3xl p-8 border border-white/10 group hover:border-white/20 transition-all"
            >
              <span className="absolute top-6 right-7 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                {i + 1}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-primary-purple/15 flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-widget-title-purple" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
