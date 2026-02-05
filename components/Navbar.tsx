"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type NavbarProps = {
  variant?: "default" | "quiz";
};

export const Navbar = ({ variant = "default" }: NavbarProps) => {
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
        <Link href="/" className="flex items-center group">
          <div className="relative w-32 h-16 md:w-40 md:h-20 group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/prominent-logo.png"
              alt="The Prominent"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        {variant === "default" && (
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/#modules"
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Modules
            </Link>
            <Link
              href="/#solutions"
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Solutions
            </Link>
            <Link
              href="/#cta"
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Contact
            </Link>
            <Link
              href="/prototype/payroll"
              className="text-[13px] font-medium text-primary-purple hover:text-primary-purple/80 transition-colors tracking-wide"
            >
              Prototype
            </Link>
          </div>
        )}

        {/* Right side buttons */}
        <div className="hidden md:flex items-center gap-6">
          {variant === "quiz" ? (
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white transition px-4 py-2 rounded-xl border border-white/10 bg-white/5"
            >
              Back to site
            </Link>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#cta"
                className="px-6 py-2.5 bg-gradient-to-r from-primary-purple to-button-orange text-white text-[13px] font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Join the Waitlist
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Toggle (default only) */}
        {variant === "default" && (
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        )}
      </div>

      {/* Mobile Menu (default only) */}
      {variant === "default" && mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-bg-layout-purple border-b border-white/10 p-6 md:hidden flex flex-col gap-6"
        >
          <Link href="/#modules" className="text-lg font-medium text-white">
            Modules
          </Link>
          <Link href="/#solutions" className="text-lg font-medium text-white">
            Solutions
          </Link>
          <Link href="/prototype/payroll" className="text-lg font-medium text-primary-purple">
            Prototype
          </Link>
          <Link href="/#cta" className="text-lg font-medium text-white">
            Contact
          </Link>
          <Link
            href="/#cta"
            className="px-6 py-3 bg-gradient-to-r from-primary-purple to-button-orange text-white text-base font-semibold rounded-xl flex items-center justify-center gap-2 mt-2"
          >
            Join the Waitlist
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </nav>
  );
};
