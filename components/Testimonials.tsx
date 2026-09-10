"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { ParallaxGlow } from "@/components/ParallaxGlow";
import { Reveal, staggerContainer, alternatingItem } from "@/components/Reveal";

type Testimonial = {
  /** short pull-quote shown over the card (peg-style one-liner) */
  pull: string;
  /** full quote, kept for reference / future expansion */
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  /** headshot / photo path in /public */
  image: string;
  /** company logo path in /public (dark/colored on transparent) */
  logo: string;
  /** CSS object-position for the crop, e.g. "center", "top", "50% 30%" */
  objectPos?: string;
  /** tailwind gradient classes shown behind while the photo loads */
  gradient: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    pull: "Everything in one platform. I spend less time chasing documents and more on work that adds value.",
    quote:
      "Since implementing The Prominent Enterprise, managing leave requests, approvals, employee records, project updates, and payroll has become significantly easier. I spend less time chasing documents and more time on work that adds value. Having everything in one platform has improved efficiency across our team.",
    name: "Jayvee Bayaban",
    role: "Finance Officer",
    company: "Prometheus",
    initials: "JB",
    image: "/testimonial-images/prometheus.jpg",
    logo: "/testimonial-images/prometheus-logo-trim.png",
    objectPos: "center",
    gradient: "from-primary-purple/80 via-purple-700/60 to-[#12091d]",
  },
  {
    pull: "The reliable system we could depend on to keep our stocks flowing.",
    quote:
      "As the business grew, managing inventory through the 101 Food Tank became stressful — delays and inaccurate tracking from a lack of centralized monitoring. We needed a simple, reliable system we could depend on to keep our stocks flowing. That solution became The Prominent Enterprise.",
    name: "Jona Mae Antiquiera",
    role: "Co-Owner & Co-Founder",
    company: "101 Food",
    initials: "JA",
    image: "/testimonial-images/101foods.png",
    logo: "/testimonial-images/101foods-logo-trim.png",
    objectPos: "center",
    gradient: "from-button-orange/80 via-orange-700/50 to-[#12091d]",
  },
  {
    pull: "Modernizing our HR, payroll, and admin was easy — thanks to The Prominent.",
    quote:
      "When I took over as Publisher, our operations were still the same legacy processes from the past 25 years. We worked to modernize our backend by optimizing our HR, payroll, and admin processes. That part was easy thanks to The Prominent.",
    name: "Lawrence Clark Fernandez",
    role: "Publisher",
    company: "Daily Guardian",
    initials: "LF",
    image: "/testimonial-images/dg.jpg",
    logo: "/testimonial-images/dg-logo-trim.png",
    objectPos: "center",
    gradient: "from-blue-600/70 via-indigo-800/50 to-[#12091d]",
  },
];

export const Testimonials = ({
  testimonials = DEFAULT_TESTIMONIALS,
  eyebrow = "Testimonials",
  title = "Trusted by Filipino Enterprises",
}: {
  testimonials?: Testimonial[];
  eyebrow?: string;
  title?: string;
}) => {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
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
        <Reveal direction="right" className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="display text-4xl md:text-5xl font-bold text-white leading-tight">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{title.split(" ").slice(-1)}</span>
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={alternatingItem(i)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 ring-1 ring-white/[0.03]"
            >
              {/* gradient shown behind while the photo loads */}
              <div className={`absolute inset-0 bg-gradient-to-b ${t.gradient}`} />

              {/* real photo — full-bleed (object-fit forced inline so it never stretches) */}
              <Image
                src={t.image}
                alt={t.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: t.objectPos ?? "center" }}
                className="transition-transform duration-700 group-hover:scale-105"
              />

              {/* bottom scrim for quote legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

              {/* quote overlay */}
              <div className="relative p-6">
                <Quote className="mb-3 h-6 w-6 text-white/40" />
                <p className="mb-5 text-lg font-medium leading-snug text-white text-balance">
                  &ldquo;{t.pull}&rdquo;
                </p>
                <div className="flex items-end justify-between gap-3 border-t border-white/15 pt-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/60">{t.role}</div>
                  </div>
                  {/* company logo on a white chip (logos are dark/colored) */}
                  <div className="flex items-center rounded-md bg-white px-2.5 py-1.5 shadow-md shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.logo}
                      alt={t.company}
                      style={{ height: "22px", width: "auto", maxWidth: "96px", objectFit: "contain", display: "block" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
