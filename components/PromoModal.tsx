"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Check } from "lucide-react";

type Perk = {
  title: string;
  description: string;
};

type PromoModalProps = {
  /** Unique key so each page can control its own "seen" state. */
  storageKey?: string;
  /** Delay before the modal auto-opens, in ms. */
  delay?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  perks?: Perk[];
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULT_PERKS: Perk[] = [
  { title: "Early access", description: "Be first in line when we launch." },
  { title: "Waived installation fee", description: "Exclusive for early partners." },
  { title: "Priority support", description: "Dedicated onboarding assistance." },
  { title: "Locked-in pricing", description: "Special rates, kept for life." },
];

export const PromoModal = ({
  storageKey = "hasSeenPromoModal",
  delay = 2500,
  eyebrow = "Limited early-partner offer",
  title = "Get a head start with The Prominent",
  description = "Book a demo now and unlock exclusive perks reserved for our first partners.",
  perks = DEFAULT_PERKS,
  ctaLabel = "Book a Demo",
  ctaHref = "/book-a-demo",
}: PromoModalProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(storageKey)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(storageKey, "true");
    }, delay);

    return () => clearTimeout(timer);
  }, [storageKey, delay]);

  const close = () => setOpen(false);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", duration: 0.45 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#120a1f]/95 shadow-2xl"
          >
            {/* Soft accent glow, top */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-primary-purple/25 blur-[90px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-purple/60 to-transparent" />

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative px-7 pt-8 pb-7 md:px-9">
              {/* Icon + eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-purple/30 bg-primary-purple/15">
                  <Sparkles className="h-5 w-5 text-widget-title-purple" />
                </div>
                <span className="inline-flex items-center rounded-full border border-button-orange/30 bg-button-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-button-orange">
                  {eyebrow}
                </span>
              </div>

              {/* Copy */}
              <h3 className="display text-2xl md:text-[28px] font-bold text-white mb-2">{title}</h3>
              <p className="text-white/55 text-sm md:text-base leading-relaxed mb-6">{description}</p>

              {/* Perks */}
              <ul className="mb-7 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {perks.map((perk) => (
                  <li key={perk.title} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white leading-tight">{perk.title}</p>
                      <p className="text-xs text-white/40 leading-snug">{perk.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link href={ctaHref} onClick={close} className="btn-primary w-full text-base">
                  {ctaLabel}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button
                  onClick={close}
                  className="text-center text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  No thanks, maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
