"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type ParallaxGlowProps = {
  className?: string;
  /** How many pixels the glow drifts across its scroll range. */
  speed?: number;
};

/**
 * A decorative, absolutely-positioned glow that drifts slowly as it scrolls
 * through the viewport, adding depth. Purely visual (aria-hidden).
 *
 * The scroll-linked transform is only bound after mount so the server render
 * and the client's first render are identical (no transform) — otherwise the
 * SSR transform value won't match the client and React throws a hydration
 * mismatch on the inline style.
 */
export const ParallaxGlow = ({ className, speed = 60 }: ParallaxGlowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      suppressHydrationWarning
      style={mounted && !reduce ? { y } : undefined}
      className={className}
    />
  );
};
