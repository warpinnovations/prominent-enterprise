"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { ParallaxGlow } from "@/components/ParallaxGlow";

const DIR = "/oribital-modules-items";
const src = (n: number) => `${DIR}/orbital-module%20(${n}).png`;
const LINE = "rgba(167,139,250,0.6)"; // same purple as the hero orbit lines
const DOT = "rgba(167,139,250,0.95)";

type Module = { img: number; title: string; color: string };

// img = orbital illustration number. Confirmed: 4=SALE, 6=boxes, 3=pie chart,
// 1=scale, 2=workflow. The rest (5,7–11) are best-guess — tell me to reorder.
const modules: Module[] = [
  { img: 4, title: "Sales & Order Management", color: "from-violet-400 to-purple-500" },
  { img: 7, title: "Point of Sale (POS)", color: "from-pink-400 to-rose-500" },
  { img: 6, title: "Inventory & Warehouse", color: "from-amber-400 to-orange-500" },
  { img: 8, title: "Procurement & Suppliers", color: "from-orange-400 to-amber-500" },
  { img: 9, title: "Finance & Accounting", color: "from-emerald-400 to-teal-500" },
  { img: 5, title: "Human Resources & Payroll", color: "from-blue-400 to-indigo-500" },
  { img: 3, title: "Business Intelligence", color: "from-purple-400 to-pink-500" },
  { img: 10, title: "Queue Management", color: "from-rose-400 to-red-500" },
  { img: 11, title: "Project Management", color: "from-indigo-400 to-blue-500" },
  { img: 1, title: "Compliance", color: "from-red-400 to-rose-500" },
  { img: 2, title: "Business Integration", color: "from-cyan-400 to-blue-500" },
];

const ICON = 76;
const dashV = `repeating-linear-gradient(to bottom, ${LINE} 0 6px, transparent 6px 12px)`;
const dashH = `repeating-linear-gradient(to right, ${LINE} 0 6px, transparent 6px 12px)`;

const Dot = () => (
  <span aria-hidden className="shrink-0" style={{ width: 7, height: 7, borderRadius: "9999px", background: DOT, boxShadow: `0 0 8px ${DOT}` }} />
);

/** horizontal flowing connector between two boxes */
const HConn = () => (
  <span aria-hidden className="mx-1 flex shrink-0 items-center">
    <Dot />
    <span className="animate-flow-x" style={{ height: 2, width: 44, backgroundImage: dashH }} />
    <Dot />
  </span>
);

/** vertical flowing connector between two rows */
const VConn = () => (
  <span aria-hidden className="my-1 flex flex-col items-center">
    <Dot />
    <span className="animate-root-flow" style={{ width: 2, height: 34, backgroundImage: dashV }} />
    <Dot />
  </span>
);

function ModuleBox({ idx }: { idx: number }) {
  const mod = modules[idx];
  return (
    <div className="group flex w-[168px] shrink-0 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]">
      <div className="relative animate-soft-float" style={{ animationDelay: `${(idx % 6) * 0.4}s` }}>
        <div className={`pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br ${mod.color} opacity-30 blur-lg transition-opacity duration-500 group-hover:opacity-70`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src(mod.img)}
          alt={mod.title}
          className="relative object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110"
          style={{ height: ICON, width: ICON }}
        />
      </div>
      <span className="text-xs font-semibold leading-tight text-white/90">{mod.title}</span>
    </div>
  );
}

/** a horizontal row of boxes joined by flowing connectors */
const Row = ({ idxs }: { idxs: number[] }) => (
  <div className="flex items-center justify-center">
    {idxs.map((idx, i) => (
      <React.Fragment key={idx}>
        <ModuleBox idx={idx} />
        {i < idxs.length - 1 && <HConn />}
      </React.Fragment>
    ))}
  </div>
);

export const Features = () => {
  const rows = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10],
  ];

  return (
    <section id="modules" className="py-24 md:py-32 bg-bg-layout-purple relative overflow-hidden">
      <ParallaxGlow speed={70} className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[150px] pointer-events-none" />
      <ParallaxGlow speed={-50} className="absolute bottom-0 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="left" className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow justify-center mb-4">Modules</p>
          <h2 className="display text-4xl md:text-5xl font-bold text-white mb-5">
            Everything you need to{" "}
            <span className="text-gradient">run your business.</span>
          </h2>
          <p className="text-white/55 text-lg text-balance">
            One connected platform — every module flows into the next.
          </p>
        </Reveal>

        {/* horizontal connected flow (desktop) */}
        <div className="hidden md:flex flex-col items-center overflow-x-auto pb-2">
          {/* core node with pulsing halo */}
          <div className="relative">
            <div aria-hidden className="animate-core-halo pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-gradient-to-r from-primary-purple/40 to-button-orange/30 blur-xl" />
            <div className="relative flex items-center gap-2.5 rounded-2xl border border-primary-purple/40 bg-primary-purple/15 px-6 py-3.5 shadow-lg shadow-primary-purple/25 backdrop-blur">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${DIR}/TPE-middle-icon.png`} alt="The Prominent" style={{ height: 42, width: 42 }} className="object-contain" />
              <span className="whitespace-nowrap text-base font-semibold text-white">The Prominent</span>
            </div>
          </div>

          <VConn />
          <Row idxs={rows[0]} />
          <VConn />
          <Row idxs={rows[1]} />
          <VConn />
          <Row idxs={rows[2]} />
        </div>

        {/* compact grid (mobile) */}
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto md:hidden">
          {modules.map((_, i) => (
            <ModuleBox key={i} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
