"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowRight } from "lucide-react";

type AnnouncementBarProps = {
  storageKey?: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const AnnouncementBar = ({
  storageKey = "hasDismissedAnnouncement",
  message = "The Prominent is now serving LGUs and enterprises nationwide.",
  ctaLabel = "See what's new",
  ctaHref = "/government",
}: AnnouncementBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem(storageKey)) setVisible(true);
  }, [storageKey]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(storageKey, "true");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative z-[60] bg-gradient-to-r from-primary-purple via-purple-600 to-button-orange overflow-hidden"
        >
          <div className="container mx-auto px-6 py-2.5 flex items-center justify-center gap-3 text-center">
            <Sparkles className="w-4 h-4 text-white/90 shrink-0 hidden sm:block" />
            <p className="text-[13px] md:text-sm text-white font-medium">
              {message}{" "}
              <Link
                href={ctaHref}
                className="underline decoration-white/40 underline-offset-2 hover:decoration-white inline-flex items-center gap-1 font-semibold"
              >
                {ctaLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
