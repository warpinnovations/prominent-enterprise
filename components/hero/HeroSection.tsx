"use client";

import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";

export const HeroSection = () => {
  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background gradients — mirrors the original HTML hero */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(1000px 500px at 90% 10%, rgba(152,56,217,.45), transparent 60%),
            radial-gradient(800px 400px at 10% 90%, rgba(243,91,4,.15), transparent 60%),
            linear-gradient(135deg, #290143 0%, #3a0a5c 60%, #9838D9 130%)
          `,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-layout-purple to-transparent -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
          <HeroContent />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};
