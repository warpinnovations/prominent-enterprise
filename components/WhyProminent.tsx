"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Gauge, MapPin, Headphones, LucideIcon } from "lucide-react";
import { staggerContainer, alternatingItem } from "@/components/Reveal";

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

const VALUES: Value[] = [
  {
    icon: Layers,
    title: "One system, not ten tools",
    description:
      "Finance, HR, inventory, sales, and compliance share the same data — no more reconciling spreadsheets or copy-pasting between apps.",
    points: ["Single source of truth", "Real-time across departments", "No duplicate data entry"],
  },
  {
    icon: MapPin,
    title: "Built for local realities",
    description:
      "SSS, Pag-IBIG, PhilHealth, BIR TRAIN-law tax, and government reporting are handled out of the box — not bolted on afterwards.",
    points: ["PH statutory compliance", "Peso-first accounting", "LGU-ready workflows"],
  },
  {
    icon: Gauge,
    title: "Live in days, not months",
    description:
      "Guided onboarding and data migration get your team productive fast, with a modular rollout that grows at your pace.",
    points: ["Assisted data migration", "Modular adoption", "Hands-on training"],
  },
  {
    icon: Headphones,
    title: "Support that shows up",
    description:
      "Local, responsive support and dedicated onboarding — the people who set you up are the people who help you scale.",
    points: ["Dedicated onboarding", "Priority response", "Ongoing enablement"],
  },
];

export const WhyProminent = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Why The Prominent</p>
          <h2 className="display text-4xl md:text-5xl font-bold text-white mb-5">
            Software that fits how you{" "}
            <span className="text-gradient">actually work.</span>
          </h2>
          <p className="text-white/55 text-lg text-balance">
            Most ERPs are built for someone else&apos;s market. The Prominent is engineered
            for the operators, finance teams, and public offices running businesses here.
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              variants={alternatingItem(i)}
              className="panel rounded-3xl p-8 group hover:border-white/15 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary-purple/15 border border-primary-purple/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <value.icon className="w-6 h-6 text-widget-title-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-white/50 leading-relaxed mb-5">{value.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {value.points.map((p) => (
                      <li
                        key={p}
                        className="text-xs text-white/70 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
