"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

type QA = { q: string; a: string };

const DEFAULT_FAQS: QA[] = [
  {
    q: "How long does it take to get started?",
    a: "Most teams are live within a few days. We handle data migration and guided onboarding so there's no messy rip-and-replace.",
  },
  {
    q: "Can I pick only the modules I need?",
    a: "Yes. The Prominent is modular — start with what solves your biggest pain today and add more as you grow.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted in transit and at rest, with role-based access controls and full audit trails on every transaction.",
  },
  {
    q: "Do you offer support and training?",
    a: "Every plan includes onboarding assistance, and priority support is available for early partners.",
  },
  {
    q: "Does it work for both businesses and government units?",
    a: "Absolutely. The Prominent powers enterprises and LGUs alike, with modules purpose-built for each.",
  },
];

export const FAQ = ({
  faqs = DEFAULT_FAQS,
  eyebrow = "FAQ",
  title = "Questions, answered.",
}: {
  faqs?: QA[];
  eyebrow?: string;
  title?: string;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
            {eyebrow}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{title.split(" ").slice(-1)}</span>
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-white font-medium text-base md:text-lg">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-full bg-primary-purple/15 flex items-center justify-center shrink-0"
                  >
                    <Plus className="w-4 h-4 text-widget-title-purple" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-white/50 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
