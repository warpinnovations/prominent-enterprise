"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type RotatingTextProps = {
  words: string[];
  className?: string;
  /** Milliseconds each word stays before rotating. */
  interval?: number;
};

/**
 * Cycles through `words` in place with a smooth cross-dissolve — the outgoing
 * and incoming words overlap (stacked in one grid cell) and slide/fade past
 * each other, so there's no hard cut.
 *
 * Renders the first word statically until mounted so SSR and the client's
 * first render match (no hydration mismatch, no flash).
 */
export const RotatingText = ({ words, className, interval = 3000 }: RotatingTextProps) => {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || words.length < 2) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [mounted, words.length, interval]);

  if (!mounted) {
    return <span className={`inline-block whitespace-nowrap ${className ?? ""}`}>{words[0]}</span>;
  }

  return (
    <span
      className="relative inline-grid align-bottom"
      style={{ gridTemplateAreas: '"stack"' }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: "0.45em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.45em" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block whitespace-nowrap ${className ?? ""}`}
          style={{ gridArea: "stack" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
