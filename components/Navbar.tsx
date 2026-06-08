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
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#about"
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              About
            </Link>
            <Link
              href="/#testimonials"
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Testimonials
            </Link>
            <Link
              href="/#modules"
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Modules
            </Link>
            <Link
              href="/#plans"
              className="text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Plans
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
              <a
                href="/book-a-demo"
                className="px-6 py-2.5 bg-button-orange hover:bg-bg-orange-btn text-white text-[13px] font-semibold rounded-full transition-colors flex items-center gap-2"
              >
                Book a Demo
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </div>

        {/* Mobile Toggle (default only) */}
        {variant === "default" && (
          <button
            className="md:hidden text-white cursor-pointer"
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
          className="absolute top-full left-0 right-0 bg-bg-layout-purple border-b border-white/10 p-6 md:hidden flex flex-col gap-5"
        >
          <Link href="/#about" className="text-lg font-medium text-white" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/#testimonials" className="text-lg font-medium text-white" onClick={() => setMobileMenuOpen(false)}>
            Testimonials
          </Link>
          <Link href="/#modules" className="text-lg font-medium text-white" onClick={() => setMobileMenuOpen(false)}>
            Modules
          </Link>
          <Link href="/#plans" className="text-lg font-medium text-white" onClick={() => setMobileMenuOpen(false)}>
            Plans
          </Link>
          <a
            href="/book-a-demo"
            className="px-6 py-3 bg-button-orange hover:bg-bg-orange-btn text-white text-base font-semibold rounded-full flex items-center justify-center gap-2 mt-2 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Demo
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </nav>
  );
};
