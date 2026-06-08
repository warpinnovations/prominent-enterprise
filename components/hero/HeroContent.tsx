"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { heroContent } from "@/data/hero";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const HeroContent = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {/* Eyebrow */}
      <motion.div variants={item}>
        <span className="inline-flex items-center text-xs font-semibold text-button-orange tracking-[1.4px] uppercase">
          {heroContent.eyebrow}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={item}
        className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white"
      >
        {heroContent.headline}
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={item}
        className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl"
      >
        {heroContent.description}
      </motion.p>

      {/* CTAs */}
      <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
        <Link href="/book-a-demo">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-full text-[15px] shadow-lg shadow-button-orange/25 transition-colors group cursor-pointer"
          >
            {heroContent.primaryCTA}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </Link>

        <Link href="#modules">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-4 bg-transparent border border-white/30 hover:bg-white/10 hover:border-white/50 text-white font-semibold rounded-full text-[15px] transition-all group cursor-pointer"
          >
            {heroContent.secondaryCTA}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Social proof */}
      {/* <motion.p variants={item} className="text-white/30 text-sm">
        Trusted by{" "}
        <span className="text-white/60 font-semibold">300+ Philippine businesses</span>
        {" "}— from retail chains to mid-market manufacturers.
      </motion.p> */}
    </motion.div>
  );
};
