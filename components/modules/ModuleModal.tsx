"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  Check,
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
import { Module } from "@/data/modules";

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

export function ModuleModal({
  module,
  onClose,
}: {
  module: Module | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = module ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [module]);

  if (!mounted) return null;

  const Icon = module ? (ICON_MAP[module.iconName] ?? Package) : Package;

  return createPortal(
    <AnimatePresence>
      {module && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center p-6 pointer-events-none"
            style={{ zIndex: 9999 }}
          >
            <div className="relative w-full max-w-md bg-[#1a0535] rounded-3xl p-8 pointer-events-auto shadow-2xl border border-white/10">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5",
                  module.iconGradient
                )}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Title + tagline */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {module.title}
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                {module.tagline}
              </p>

              {/* Features */}
              <p className="text-[11px] font-bold text-button-orange tracking-[1.6px] uppercase mb-3">
                What&apos;s Included
              </p>
              <ul className="space-y-2.5 mb-8">
                {module.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-button-orange shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="#book" onClick={onClose}>
                <button className="w-full py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-2xl transition-colors text-sm cursor-pointer">
                  Book a Demo for this module
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
