"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MODULES,
  SME_BUNDLES,
  MID_BUNDLES,
  Module,
  Industry,
  BusinessSize,
} from "@/data/modules";
import { ModuleCard } from "./ModuleCard";
import { ModuleModal } from "./ModuleModal";

const INDUSTRY_FILTERS: { value: Industry; label: string }[] = [
  { value: "retail", label: "Retail" },
  { value: "fnb", label: "F&B" },
  { value: "wholesale", label: "Wholesale" },
  { value: "construction", label: "Construction" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "services", label: "Services" },
];

const SIZE_FILTERS: { value: BusinessSize; label: string }[] = [
  { value: "sme", label: "SME" },
  { value: "mid", label: "Mid-market" },
  { value: "enterprise", label: "Enterprise" },
];

export const ModuleGrid = () => {
  const [activeIndustries, setActiveIndustries] = useState<Set<Industry>>(new Set());
  const [activeSizes, setActiveSizes] = useState<Set<BusinessSize>>(new Set());
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const toggleIndustry = (val: Industry) => {
    setActiveIndustries((prev) => {
      const next = new Set(prev);
      next.has(val) ? next.delete(val) : next.add(val);
      return next;
    });
  };

  const toggleSize = (val: BusinessSize) => {
    setActiveSizes((prev) => {
      const next = new Set(prev);
      next.has(val) ? next.delete(val) : next.add(val);
      return next;
    });
  };

  const reset = () => {
    setActiveIndustries(new Set());
    setActiveSizes(new Set());
  };

  const filtered = useMemo<Module[]>(() => {
    const wantsSme = activeSizes.has("sme");
    const wantsMid = activeSizes.has("mid");
    const wantsEnterprise = activeSizes.has("enterprise");
    const industries = [...activeIndustries];
    const sources = industries.length === 0 ? ["_default"] : industries;

    const result = new Map<string, Module>();

    if (wantsSme) {
      const ids = new Set<string>();
      sources.forEach((k) =>
        (SME_BUNDLES[k] || SME_BUNDLES._default).forEach((id) => ids.add(id))
      );
      MODULES.filter((m) => ids.has(m.id)).forEach((m) =>
        result.set(m.id, m)
      );
    }

    if (wantsMid) {
      const ids = new Set<string>();
      sources.forEach((k) =>
        (MID_BUNDLES[k] || MID_BUNDLES._default).forEach((id) => ids.add(id))
      );
      MODULES.filter((m) => ids.has(m.id)).forEach((m) =>
        result.set(m.id, m)
      );
    }

    if (wantsEnterprise) {
      MODULES.filter((m) => {
        const indOk =
          industries.length === 0 ||
          industries.some((i) => m.industries.includes(i as Industry));
        return indOk && m.sizes.includes("enterprise");
      }).forEach((m) => result.set(m.id, m));
    }

    if (!wantsSme && !wantsMid && !wantsEnterprise) {
      MODULES.filter(
        (m) =>
          industries.length === 0 ||
          industries.some((i) => m.industries.includes(i as Industry))
      ).forEach((m) => result.set(m.id, m));
    }

    return [...result.values()];
  }, [activeIndustries, activeSizes]);

  const hasFilters = activeIndustries.size > 0 || activeSizes.size > 0;

  return (
    <div>
      {/* Filter bar */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/50 text-sm font-semibold">
            Filter by industry &amp; business size
          </p>
          {hasFilters && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {INDUSTRY_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => toggleIndustry(f.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all",
                activeIndustries.has(f.value)
                  ? "bg-button-orange border-button-orange text-white"
                  : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50",
                "cursor-pointer"
              )}
            >
              {f.label}
            </button>
          ))}
          <div className="w-px h-4 bg-white/20 mx-1 hidden sm:block" />
          {SIZE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => toggleSize(f.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all",
                activeSizes.has(f.value)
                  ? "bg-button-orange border-button-orange text-white"
                  : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50",
                "cursor-pointer"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-white/30 text-xs mb-4">
        {filtered.length === MODULES.length
          ? `Showing all ${MODULES.length} modules`
          : `Showing ${filtered.length} of ${MODULES.length} modules`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          No modules match — we build custom configurations.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onLearnMore={() => setSelectedModule(module)}
            />
          ))}
        </div>
      )}
      <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
    </div>
  );
};
