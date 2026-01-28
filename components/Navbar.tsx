"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        isScrolled
          ? "bg-bg-layout-purple/70 backdrop-blur-xl border-white/10 py-4"
          : "bg-transparent border-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-primary-purple rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            The Prominent
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {["Features", "Method", "Customers", "Pricing"].map((item) => (
            <Link
              key={item}
              href={item === "Prototype" ? "/prototype/payroll" : `/#${item.toLowerCase()}`}
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/prototype/payroll"
            className="text-[13px] font-medium text-primary-purple hover:text-primary-purple/80 transition-colors tracking-wide"
          >
            Prototype
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-[13px] font-medium text-white/60 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-white text-bg-layout-purple hover:bg-white/90 text-[13px] font-bold rounded-full transition-all flex items-center gap-1 group"
          >
            Get Started
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-bg-layout-purple border-b border-white/10 p-6 md:hidden flex flex-col gap-6"
        >
          <Link href="/#features" className="text-lg font-medium text-white">
            Features
          </Link>
          <Link href="/#method" className="text-lg font-medium text-white">
            Method
          </Link>
          <Link href="/#customers" className="text-lg font-medium text-white">
            Customers
          </Link>
          <Link href="/#pricing" className="text-lg font-medium text-white">
            Pricing
          </Link>
          <Link href="/prototype/payroll" className="text-lg font-medium text-primary-purple">
            Prototype
          </Link>
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <Link href="/login" className="text-lg font-medium text-white">
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 bg-button-orange text-white text-center font-medium rounded-full"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
