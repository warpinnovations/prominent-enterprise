"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

// Direction names the edge the content enters FROM:
// "left" starts off to the left and slides right into place.
const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: -48 },
  right: { x: 48 },
  none: {},
};

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction the content travels in from. */
  direction?: Direction;
  /** Seconds before the animation starts. */
  delay?: number;
  duration?: number;
  /** Soft blur-to-sharp on entry for a more premium feel. */
  blur?: boolean;
  once?: boolean;
};

/**
 * Wrap any block to fade + slide it into view on scroll.
 * Respects prefers-reduced-motion (falls back to a plain fade).
 */
export const Reveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  blur = true,
  once = true,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // During SSR and the first client render, always assume motion is allowed so
  // the server markup matches the client (useReducedMotion is null on the
  // server, real on the client — branching on it directly desyncs hydration).
  // The reduced-motion preference is honored once mounted.
  const reduceMotion = mounted && reduce;

  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...OFFSET[direction], filter: blur ? "blur(10px)" : "blur(0px)" };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
};

/** Container variant that staggers direct motion children as they enter. */
export const staggerContainer = (stagger = 0.09): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

/** Item variant for children of a staggerContainer (rises up). */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Item variant that slides in from the left edge. */
export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -90, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Item variant that slides in from the right edge. */
export const staggerItemRight: Variants = {
  hidden: { opacity: 0, x: 90, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/**
 * Pick a stagger item variant by index so cards alternate
 * left / right as they enter — the classic "from the sides" effect.
 */
export const alternatingItem = (index: number): Variants =>
  index % 2 === 0 ? staggerItemLeft : staggerItemRight;
