"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the `.reveal` / `.reveal-stagger` CSS classes using a single
 * IntersectionObserver. Drop this once in the root layout — every element
 * carrying those classes (now or after client navigation) is revealed once
 * as it scrolls into view, then unobserved so it never resets.
 *
 * No animation library involved; the actual transition lives in globals.css.
 */
export const ScrollReveal = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Flag the document so the "hidden" initial styles apply only with JS on.
    document.documentElement.classList.add("js-reveal");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger")
    );

    // Respect reduced-motion: reveal everything immediately, no observer.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // once only
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => {
      // Skip anything already revealed from a previous run.
      if (!el.classList.contains("is-visible")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};
