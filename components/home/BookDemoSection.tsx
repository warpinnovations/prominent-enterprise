"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const BookDemoSection = () => {
  return (
    <section id="book" className="py-24 bg-bg-layout-purple relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-purple/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6 max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold text-button-orange tracking-[1.6px] uppercase">
            Schedule a free demo
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Book a Demo.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            See The Prominent in action. Get a personalized walkthrough of how
            we can transform your business operations.
          </p>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-white font-semibold">300+ Philippine businesses</span>{" "}
              run on The Prominent — from retail chains to mid-market manufacturers.
            </p>
          </div>
          <div className="pt-2">
            <a href="/book-a-demo">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-full text-base shadow-lg shadow-button-orange/25 transition-colors group cursor-pointer"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
