"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, Mail, Share2, Zap, MoreHorizontal } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/** status styles for the work-management mockup */
const statusStyle: Record<string, string> = {
  Done: "bg-emerald-500/20 text-emerald-300 ring-emerald-400/30",
  Working: "bg-amber-500/20 text-amber-300 ring-amber-400/30",
  Stuck: "bg-rose-500/20 text-rose-300 ring-rose-400/30",
};
const statusLabel: Record<string, string> = {
  Done: "Done",
  Working: "Working on it",
  Stuck: "Stuck",
};

const thisMonth = [
  { task: "Review KPIs", status: "Done", owner: "AB", ring: "bg-violet-500" },
  { task: "Develop Q1 plan", status: "Working", owner: "JM", ring: "bg-blue-500" },
  { task: "Plan kickoff", status: "Done", owner: "LC", ring: "bg-emerald-500" },
  { task: "Update database", status: "Stuck", owner: "RS", ring: "bg-amber-500" },
];
const nextMonth = [
  { task: "Renew contracts", status: "Done", date: "Oct 9" },
  { task: "Hardware maintenance", status: "Working", date: "Oct 12" },
  { task: "Launch efficiency campaign", status: "Done", date: "Oct 25" },
  { task: "Finalize budget", status: "Stuck", date: "Oct 31" },
];

const Row = ({
  task,
  status,
  owner,
  ring,
  date,
}: {
  task: string;
  status: string;
  owner?: string;
  ring?: string;
  date?: string;
}) => (
  <div className="grid grid-cols-[1.6fr_auto_auto] items-center gap-2 py-2 border-t border-white/[0.06]">
    <span className="truncate text-xs text-white/70">{task}</span>
    <span className={`justify-self-start rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 ${statusStyle[status]}`}>
      {statusLabel[status]}
    </span>
    {owner ? (
      <div className={`h-5 w-5 justify-self-end rounded-full ${ring} flex items-center justify-center text-[9px] font-semibold text-white ring-2 ring-[#12091d]`}>
        {owner}
      </div>
    ) : (
      <span className="justify-self-end text-[10px] text-white/40">{date}</span>
    )}
  </div>
);

export const WhyProminent = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[600px] h-[400px] bg-primary-purple/12 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT — copy */}
          <Reveal direction="left">
            <p className="eyebrow mb-4">About The Prominent</p>
            <h2 className="display text-4xl md:text-5xl font-bold text-white mb-6">
              Built in Western Visayas.{" "}
              <span className="text-gradient">Engineered for global-standard operations.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed text-balance">
              The Prominent Enterprise is a global-standard operations system developed to help you
              get things under control. It connects your essential processes into one place so you
              don&apos;t have to deal with scattered tools, repeated work, or constant confusion —
              just a smoother way of getting things done.
            </p>
          </Reveal>

          {/* RIGHT — work-management mockup */}
          <Reveal direction="right" className="relative">
            {/* floating integration chips */}
            <div className="pointer-events-none absolute -top-6 right-6 z-20 flex gap-3">
              {[
                { icon: Cloud, color: "from-blue-400 to-blue-600", delay: 0 },
                { icon: Mail, color: "from-sky-400 to-indigo-500", delay: 0.4 },
                { icon: Share2, color: "from-orange-400 to-rose-500", delay: 0.8 },
              ].map(({ icon: Icon, color, delay }, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg ring-1 ring-white/20`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </motion.div>
              ))}
            </div>

            {/* automation popover */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-2 top-1/2 z-20 w-44 rounded-xl border border-white/10 bg-[#160c24]/95 p-3 shadow-2xl backdrop-blur"
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-500">
                  <Zap className="h-3 w-3 text-white" />
                </span>
                <span className="text-[10px] font-semibold text-white/80">Automation</span>
              </div>
              <p className="text-[10px] leading-snug text-white/55">
                When a <span className="text-white/80">due date</span> arrives, send an alert.
              </p>
            </motion.div>

            {/* main window */}
            <div className="panel rounded-2xl p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <MoreHorizontal className="h-4 w-4 text-white/30" />
              </div>

              <h3 className="mb-4 text-lg font-semibold text-white">Work management</h3>

              {/* This month */}
              <p className="mb-1 text-xs font-semibold text-widget-title-purple">This month</p>
              <div className="mb-4">
                {thisMonth.map((r) => (
                  <Row key={r.task} {...r} />
                ))}
              </div>

              {/* Next month */}
              <p className="mb-1 text-xs font-semibold text-button-orange">Next month</p>
              <div>
                {nextMonth.map((r) => (
                  <Row key={r.task} {...r} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
