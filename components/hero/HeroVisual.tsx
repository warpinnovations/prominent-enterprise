"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Users,
  Package,
  Monitor,
  ShoppingCart,
  UserCircle,
  Truck,
  Clock,
  FolderKanban,
  BarChart3,
  Building2,
  FileText,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULES, Module } from "@/data/modules";

const ICON_MAP: Record<string, LucideIcon> = {
  Calculator,
  Users,
  Package,
  Monitor,
  ShoppingCart,
  UserCircle,
  Truck,
  Clock,
  FolderKanban,
  BarChart3,
  Building2,
  FileText,
};

// Split modules across the two orbit rings
const innerModules = MODULES.slice(0, 6);  // Finance → CRM
const outerModules = MODULES.slice(6);     // Procurement → Files

const ICON_SIZE = 44;

// --- Orbit ring: rotates its container; each icon counter-rotates to stay upright ---
function OrbitRing({
  modules,
  radius,
  duration,
  reverse = false,
  startOffset = 0, // degrees offset so rings don't start at same position
}: {
  modules: Module[];
  radius: number;
  duration: number;
  reverse?: boolean;
  startOffset?: number;
}) {
  const direction = reverse ? -360 : 360;

  return (
    <motion.div
      className="absolute"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: "50%",
        left: "50%",
        marginTop: -radius,
        marginLeft: -radius,
      }}
      animate={{ rotate: direction }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {modules.map((mod, i) => {
        const Icon = ICON_MAP[mod.iconName] ?? Package;
        // Evenly distribute icons; start from the top (-90°) plus offset
        const angleDeg =
          (360 / modules.length) * i - 90 + startOffset;
        const angleRad = (angleDeg * Math.PI) / 180;

        // Position within the rotating container (origin = center of the div)
        const cx = radius + radius * Math.cos(angleRad) - ICON_SIZE / 2;
        const cy = radius + radius * Math.sin(angleRad) - ICON_SIZE / 2;

        return (
          <motion.div
            key={mod.id}
            className="absolute"
            style={{ left: cx, top: cy, width: ICON_SIZE, height: ICON_SIZE }}
            // Counter-rotate so the icon stays upright as its container spins
            animate={{ rotate: -direction }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <div
              className={cn(
                "w-full h-full rounded-xl bg-gradient-to-br flex items-center justify-center border border-white/20 shadow-lg cursor-default",
                mod.iconGradient
              )}
              title={mod.title}
            >
              <Icon className="w-5 h-5 text-white drop-shadow-sm" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Static accent dot positions on a ring
function RingDots({
  radius,
  count,
  color,
  size = 5,
  offsetAngle = 0,
}: {
  radius: number;
  count: number;
  color: string;
  size?: number;
  offsetAngle?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angleDeg = (360 / count) * i + offsetAngle - 90;
        const angleRad = (angleDeg * Math.PI) / 180;
        return (
          <div
            key={i}
            className={cn("absolute rounded-full", color)}
            style={{
              width: size,
              height: size,
              top: "50%",
              left: "50%",
              marginTop: -(size / 2) + radius * Math.sin(angleRad),
              marginLeft: -(size / 2) + radius * Math.cos(angleRad),
            }}
          />
        );
      })}
    </>
  );
}

export const HeroVisual = () => {
  // Visual is designed at 460×460; it centers itself in the column
  const SIZE = 460;
  const CENTER = SIZE / 2;
  const INNER_R = 118;
  const OUTER_R = 195;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center lg:justify-end"
    >
      {/* Fixed-size orbit stage */}
      <div
        className="relative"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* Ambient glow behind the whole visual */}
        <div
          className="absolute rounded-full bg-primary-purple/20 blur-3xl pointer-events-none"
          style={{ width: 320, height: 320, top: CENTER - 160, left: CENTER - 160 }}
        />
        <div
          className="absolute rounded-full bg-button-orange/10 blur-2xl pointer-events-none"
          style={{ width: 200, height: 200, top: CENTER - 100, left: CENTER - 100 }}
        />

        {/* Orbit ring borders (SVG so we can get dashes easily) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          fill="none"
        >
          {/* Outer ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={OUTER_R}
            stroke="rgba(152,56,217,0.35)"
            strokeWidth="1"
            strokeDasharray="5 9"
          />
          {/* Inner ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={INNER_R}
            stroke="rgba(243,91,4,0.35)"
            strokeWidth="1"
            strokeDasharray="4 7"
          />
        </svg>

        {/* Accent dots on outer ring */}
        <RingDots
          radius={OUTER_R}
          count={6}
          color="bg-primary-purple/70"
          size={6}
          offsetAngle={30}
        />

        {/* Accent dots on inner ring */}
        <RingDots
          radius={INNER_R}
          count={6}
          color="bg-button-orange/70"
          size={5}
          offsetAngle={60}
        />

        {/* Animated orbit rings */}
        <OrbitRing
          modules={innerModules}
          radius={INNER_R}
          duration={22}
        />
        <OrbitRing
          modules={outerModules}
          radius={OUTER_R}
          duration={38}
          reverse
          startOffset={15}
        />

        {/* Center logo */}
        <div
          className="absolute z-10"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Glow layers */}
          <div className="absolute -inset-8 bg-primary-purple/25 rounded-full blur-2xl" />
          <div className="absolute -inset-4 bg-primary-purple/15 rounded-3xl blur-xl" />

          {/* Logo box */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-28 h-28 flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.ico"
              alt="The Prominent"
              width={96}
              height={96}
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
