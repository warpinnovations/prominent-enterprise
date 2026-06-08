"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-purple/5 -z-10" />
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem] border border-white/10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to scale YOUR <br />
            <span className="text-gradient">enterprise operations?</span>
          </h2>
          <p className="text-xl text-text-gray mb-10 max-w-2xl mx-auto">
            Transform your business operations with smart solutions designed for growth and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/book-a-demo">
              <button className="px-8 py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-full transition-all flex items-center gap-2 text-lg group">
                Book a Demo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-bg-layout-purple">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center mb-3 group">
              <div className="relative w-32 h-16 md:w-40 md:h-20 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/prominent-logo.png"
                  alt="The Prominent"
                  fill
                  className="object-contain -mt-7 -ml-2"
                />
              </div>
            </Link>
            <p className="text-text-gray text-sm leading-relaxed -mt-14">
              The next generation ERP system for modern enterprises in the
              Philippines. Built for efficiency, accuracy, and ease of use.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6 ml-16">Product</h5>
            <ul className="space-y-4 ml-16">
              <li>
                <Link
                  href="/#modules"
                  className="text-text-gray hover:text-white transition-colors text-sm"
                >
                  Modules
                </Link>
              </li>
              <li>
                <Link
                  href="/#plans"
                  className="text-text-gray hover:text-white transition-colors text-sm"
                >
                  Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6">Company</h5>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#about"
                  className="text-text-gray hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-text-gray hover:text-white transition-colors text-sm"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="/book-a-demo"
                  className="text-text-gray hover:text-white transition-colors text-sm"
                >
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-6">Contact</h5>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:inquiry.prominent@warp.ph"
                  className="text-text-gray hover:text-white transition-colors text-sm"
                >
                  inquiry.prominent@warp.ph
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center -mb-10">
        <p className="text-text-gray text-xs">
          © 2026 The Prominent. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
