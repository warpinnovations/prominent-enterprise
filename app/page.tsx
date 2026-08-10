"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Landmark, ArrowRight, LucideIcon } from "lucide-react";

type Panel = {
  href: string;
  icon: LucideIcon;
  kicker: string;
  title: string;
  desc: string;
  bg: string;
  glow: string;
  iconBg: string;
  iconShadow: string;
  kickerPill: string;
  dot: string;
  ctaBg: string;
  ctaShadow: string;
};

const panels: Panel[] = [
  {
    href: "/enterprise",
    icon: Building2,
    kicker: "For Business",
    title: "The Prominent",
    desc: "Run your whole company — finance, HR & payroll, inventory, sales and compliance in one platform.",
    bg: "bg-gradient-to-br from-[#22093f] via-[#13061f] to-[#0b0614]",
    glow: "bg-primary-purple/30",
    iconBg: "from-primary-purple to-purple-600",
    iconShadow: "shadow-primary-purple/40",
    kickerPill: "border-primary-purple/30 bg-primary-purple/10 text-widget-title-purple",
    dot: "bg-widget-title-purple",
    ctaBg: "from-primary-purple via-purple-600 to-button-orange",
    ctaShadow: "shadow-primary-purple/40",
  },
  {
    href: "/government",
    icon: Landmark,
    kicker: "For Governance",
    title: "Prominent Governance",
    desc: "Run your LGU — treasury, taxation, permits, budget and citizen services, built for transparency.",
    bg: "bg-gradient-to-br from-[#0b1c44] via-[#0a0f22] to-[#0b0614]",
    glow: "bg-blue-500/30",
    iconBg: "from-blue-400 to-indigo-500",
    iconShadow: "shadow-blue-500/40",
    kickerPill: "border-blue-400/30 bg-blue-500/10 text-blue-300",
    dot: "bg-blue-400",
    ctaBg: "from-blue-400 via-blue-500 to-indigo-500",
    ctaShadow: "shadow-blue-500/40",
  },
];

export default function ChooserPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="relative h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-[#0b0614]">
      {/* Shared logo */}
      <div className="pointer-events-none absolute top-7 left-1/2 -translate-x-1/2 z-30 w-44 h-14">
        <Image
          src="/prominent-logo.png"
          alt="The Prominent"
          fill
          className="object-contain drop-shadow-[0_4px_24px_rgba(152,56,217,0.55)]"
          priority
        />
      </div>

      {panels.map((p, i) => {
        const Icon = p.icon;
        const dimmed = hovered !== null && hovered !== i;
        return (
          <Link
            key={p.href}
            href={p.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ flexGrow: hovered === i ? 1.45 : hovered === null ? 1 : 0.65 }}
            className={`group relative flex basis-0 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center transition-[flex-grow,opacity] duration-500 ease-out ${p.bg} ${
              dimmed ? "opacity-50" : "opacity-100"
            } ${i === 0 ? "border-b md:border-b-0 md:border-r border-white/[0.07]" : ""}`}
          >
            {/* dotted grid texture */}
            <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-30" />
            {/* top hairline accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            {/* accent spotlight */}
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-opacity duration-500 ${p.glow} ${
                hovered === i ? "opacity-100" : "opacity-55"
              }`}
            />
            {/* big faint watermark icon */}
            <Icon className="pointer-events-none absolute -bottom-16 -right-10 h-96 w-96 text-white/[0.03] transition-transform duration-700 group-hover:scale-105" />
            {/* glossy hover sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.05] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* content */}
            <div className="relative z-10 flex max-w-sm flex-col items-center">
              {/* icon tile */}
              <div
                className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${p.iconBg} shadow-xl ${p.iconShadow} ring-1 ring-white/20 transition-all duration-500 group-hover:scale-110`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent opacity-60" />
                <Icon className="relative h-8 w-8 text-white" />
              </div>

              {/* kicker pill */}
              <span
                className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm ${p.kickerPill}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                {p.kicker}
              </span>

              <h2 className="display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {p.title}
              </h2>
              <p className="text-white/55 leading-relaxed mb-9 text-balance">{p.desc}</p>

              {/* premium CTA */}
              <span
                className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg ${p.ctaShadow} bg-gradient-to-r ${p.ctaBg} bg-[length:200%_100%] bg-left transition-[background-position,transform] duration-500 group-hover:bg-right group-hover:-translate-y-0.5`}
              >
                <span className="relative z-10">Enter</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                {/* shine sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </span>
            </div>
          </Link>
        );
      })}

      {/* footer note */}
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-[11px] text-white/30">
        © 2026 Prometheus · Choose your experience
      </p>
    </main>
  );
}
