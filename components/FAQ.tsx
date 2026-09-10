"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircleQuestion, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

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

// subtle floating particles for the graphic card
const particles = [
  { x: "14%", y: "22%", s: 6, d: 0 },
  { x: "80%", y: "16%", s: 4, d: 0.9 },
  { x: "86%", y: "58%", s: 7, d: 1.6 },
  { x: "20%", y: "70%", s: 5, d: 0.5 },
  { x: "60%", y: "80%", s: 4, d: 1.2 },
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
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* LEFT — copy + graphic card */}
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="display text-4xl md:text-5xl font-bold text-white mb-4">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient">{title.split(" ").slice(-1)}</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8 text-balance">
              Everything you need to know about The Prominent. Can&apos;t find your answer? We&apos;re
              just one message away.
            </p>

            {/* graphic card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              {/* soft radial glow */}
              <div className="pointer-events-none absolute -top-12 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-primary-purple/25 blur-[70px]" />
              {/* faint dot grid */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
              {/* hairline top accent */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary-purple/50 to-transparent" />

              {/* floating particles */}
              {particles.map((p, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  animate={{ y: [0, -12, 0], opacity: [0.25, 0.7, 0.25] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.d }}
                  className="pointer-events-none absolute rounded-full bg-widget-title-purple"
                  style={{ left: p.x, top: p.y, width: p.s, height: p.s, boxShadow: "0 0 10px rgba(167,139,250,0.7)" }}
                />
              ))}

              {/* orb with slowly rotating dashed ring */}
              <div className="relative mx-auto mb-7 h-24 w-24">
                <motion.div
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-primary-purple/40"
                />
                <motion.div
                  aria-hidden
                  animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-3 rounded-full bg-gradient-to-br from-primary-purple to-button-orange blur-lg"
                />
                <div className="absolute inset-[14%] flex items-center justify-center rounded-full bg-gradient-to-br from-primary-purple to-purple-700 shadow-[0_8px_30px_-6px_rgba(152,56,217,0.7)] ring-1 ring-white/20">
                  <MessageCircleQuestion className="h-8 w-8 text-white" />
                </div>
              </div>

              <h3 className="relative text-center text-xl font-bold text-white">Still have questions?</h3>
              <p className="relative mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-white/55">
                Our team is happy to walk you through anything — book a demo or drop us a line.
              </p>

              <div className="relative mt-7 flex flex-col items-center gap-3">
                <Link href="/book-a-demo" className="btn-primary text-sm">
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:inquiry.prominent@warp.ph"
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  inquiry.prominent@warp.ph
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.q}
                  className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                    isOpen
                      ? "border-primary-purple/40 bg-gradient-to-br from-primary-purple/[0.10] to-transparent"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  {/* top hairline accent on the open card */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-purple/60 to-transparent transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    {/* index number */}
                    <span
                      className={`text-sm font-semibold tabular-nums transition-colors ${
                        isOpen ? "text-widget-title-purple" : "text-white/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base font-medium text-white md:text-lg">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-gradient-to-br from-primary-purple to-purple-600 text-white" : "bg-white/[0.06] text-widget-title-purple"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
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
                        <p className="ml-[2.75rem] mr-6 border-l-2 border-primary-purple/40 pb-5 pl-4 text-white/60 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
