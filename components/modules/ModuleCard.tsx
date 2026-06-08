"use client";

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
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
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

export const ModuleCard = ({ module, onLearnMore }: { module: Module; onLearnMore: () => void }) => {
  const Icon = ICON_MAP[module.iconName] ?? Package;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onClick={onLearnMore}
      className={cn(
        "relative p-6 rounded-2xl border flex flex-col gap-4 group cursor-pointer overflow-hidden",
        "bg-gradient-to-b from-white/[0.06] to-transparent",
        "border-white/10 hover:border-button-orange/50 transition-colors duration-300",
        module.soon && "opacity-70"
      )}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-button-orange/10 rounded-full blur-2xl" />
      </div>

      {/* Soon badge */}
      {module.soon && (
        <span className="absolute top-4 right-4 text-[9px] font-bold bg-white/8 text-white/40 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
          Soon
        </span>
      )}

      {/* Icon */}
      <div className="relative w-fit">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg",
            module.iconGradient
          )}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
        </div>
        {/* Icon glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-500 bg-gradient-to-br -z-10",
            module.iconGradient
          )}
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-semibold text-white text-[15px] leading-snug mb-2">
          {module.title}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed">
          {module.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.07]">
        <span className="text-xs font-semibold text-button-orange flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
          Learn more
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
        {!module.soon && (
          <span className="text-[10px] text-white/20 font-medium uppercase tracking-wider">
            Available
          </span>
        )}
      </div>
    </motion.div>
  );
};
