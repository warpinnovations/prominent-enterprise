"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Hero visual — code-built copy of the client peg using the real
 * orbital-module illustrations. Central Prominent app-icon orbited by
 * three rings: inner (2 icons), middle (3), outer (6). Rings alternate
 * spin direction; each icon counter-rotates to stay upright.
 *
 * Assets: public/oribital-modules-items/orbital-module (N).png (1–11)
 *         public/oribital-modules-items/TPE-middle-icon.png
 */

const DIR = "/oribital-modules-items";
const src = (n: number) => `${DIR}/orbital-module%20(${n}).png`;

const SPIN = { duration: 65, repeat: Infinity, ease: "linear" as const };

type Item = { n: number; angle: number };

/** evenly distribute image numbers around a ring, starting at the top */
const ring = (nums: number[], start = -90): Item[] =>
  nums.map((n, i) => ({ n, angle: start + (360 / nums.length) * i }));

// outer ring — 6 icons · middle ring — 3 · inner ring — 2
const outer = ring([6, 1, 4, 5, 2, 9]);
const middle = ring([3, 10, 11], -70);
const inner = ring([7, 8], -90);

const ICON_SIZE = 150; // sized so three rings fit without piling up
const OUTER_RADIUS = 45; // %
const MIDDLE_RADIUS = 35; // %
const INNER_RADIUS = 25; // %
const LOGO_SIZE = 300;

// decorative dots
const outerDots = [
  { angle: -55, c: "bg-amber-300" },
  { angle: 20, c: "bg-yellow-400" },
  { angle: 128, c: "bg-primary-purple" },
  { angle: 235, c: "bg-yellow-400" },
];
const middleDots = [{ angle: 85, c: "bg-primary-purple" }];

function pos(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + Math.cos(rad) * radius, y: 50 + Math.sin(rad) * radius };
}

function OrbitIcon({ n, angle, radius, counter }: Item & { radius: number; counter: number }) {
  const { x, y } = pos(angle, radius);
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginLeft: -ICON_SIZE / 2,
        marginTop: -ICON_SIZE / 2,
      }}
    >
      {/* counter-rotate so the icon stays upright while its ring circles */}
      <motion.div animate={{ rotate: counter }} transition={SPIN} className="h-full w-full">
        <Image
          src={src(n)}
          alt=""
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="h-full w-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        />
      </motion.div>
    </div>
  );
}

function Dot({ angle, radius, c }: { angle: number; radius: number; c: string }) {
  const { x, y } = pos(angle, radius);
  return (
    <span
      className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${c}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  );
}

export const HeroHub = () => {
  return (
    <div
      className="relative mx-auto"
      style={{ width: "clamp(340px, 46vw, 540px)", height: "clamp(340px, 46vw, 540px)" }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-[20%] rounded-full bg-gradient-to-tr from-primary-purple/25 to-button-orange/12 blur-[90px]" />

      {/* orbit rings (the "lines") — purple, each ring mixes solid stretches
          and breaks within itself (SVG stroke dash patterns) */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        strokeLinecap="round"
      >
        {/* outer — long solid arc, then a broken stretch (rotates clockwise) */}
        <motion.circle
          cx="50" cy="50" r="45" stroke="rgba(167,139,250,0.6)" strokeWidth="0.7" strokeDasharray="78 4 3 4 3 4 46 4 14 4 3 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {/* middle — mostly solid with two gaps (rotates counter-clockwise) */}
        <motion.circle
          cx="50" cy="50" r="35" stroke="rgba(167,139,250,0.5)" strokeWidth="0.6" strokeDasharray="96 6 44 6 20 6"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {/* inner — solid arc + a dotted stretch (rotates clockwise) */}
        <motion.circle
          cx="50" cy="50" r="25" stroke="rgba(167,139,250,0.5)" strokeWidth="0.7" strokeDasharray="52 4 3 4 3 4 3 4 36 4 12 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>

      {/* OUTER ring — clockwise */}
      <motion.div animate={{ rotate: 360 }} transition={SPIN} className="absolute inset-0">
        {outerDots.map((d, i) => (
          <Dot key={`od${i}`} angle={d.angle} radius={OUTER_RADIUS} c={d.c} />
        ))}
        {outer.map((it) => (
          <OrbitIcon key={`o${it.n}`} {...it} radius={OUTER_RADIUS} counter={-360} />
        ))}
      </motion.div>

      {/* MIDDLE ring — counter-clockwise */}
      <motion.div animate={{ rotate: -360 }} transition={SPIN} className="absolute inset-0">
        {middleDots.map((d, i) => (
          <Dot key={`md${i}`} angle={d.angle} radius={MIDDLE_RADIUS} c={d.c} />
        ))}
        {middle.map((it) => (
          <OrbitIcon key={`m${it.n}`} {...it} radius={MIDDLE_RADIUS} counter={360} />
        ))}
      </motion.div>

      {/* INNER ring — clockwise */}
      <motion.div animate={{ rotate: 360 }} transition={SPIN} className="absolute inset-0">
        {inner.map((it) => (
          <OrbitIcon key={`i${it.n}`} {...it} radius={INNER_RADIUS} counter={-360} />
        ))}
      </motion.div>

      {/* central Prominent app-icon — static */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={`${DIR}/TPE-middle-icon.png`}
          alt="The Prominent"
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          priority
          className="drop-shadow-[0_10px_45px_rgba(152,56,217,0.65)]"
        />
      </div>
    </div>
  );
};
