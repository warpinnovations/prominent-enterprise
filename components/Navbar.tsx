"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, Landmark, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type NavbarProps = {
  variant?: "default" | "quiz";
  /** When rendered inside an external fixed header (e.g. below an announcement
   *  bar), set this so the nav flows in-place instead of pinning itself. */
  embedded?: boolean;
  /** Where the logo (and quiz "Back to site") links to. */
  homeHref?: string;
};

const navLinks = [
  { label: "Modules", href: "/enterprise#modules" },
  { label: "Solutions", href: "/enterprise#solutions" },
  { label: "Integrations", href: "/enterprise#integrations" },
  { label: "Security", href: "/enterprise#security" },
];

export const Navbar = ({
  variant = "default",
  embedded = false,
  homeHref = "/enterprise",
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  // Cross-portal switch: on the government site, offer The Prominent (and vice versa).
  const isGovernment = homeHref === "/government";
  const otherPortalHref = isGovernment ? "/enterprise" : "/government";
  const otherPortalLabel = isGovernment ? "The Prominent" : "Government";
  const OtherPortalIcon = isGovernment ? Building2 : Landmark;

  return (
    <nav
      className={cn(
        "transition-all duration-300",
        embedded ? "relative z-40" : "fixed top-0 left-0 right-0 z-50",
        isScrolled
          ? "bg-[#0b0614]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={homeHref} className="flex items-center group shrink-0" onClick={closeMenu}>
          <div className="relative w-40 h-14 md:w-52 md:h-16 group-hover:scale-[1.03] transition-transform duration-300">
            <Image
              src="/prominent-logo.png"
              alt="The Prominent"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav — segmented pill */}
        {variant === "default" && (
          <div className="hidden md:flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {variant === "quiz" ? (
            <Link
              href={homeHref}
              className="text-sm text-white/70 hover:text-white transition px-4 py-2 rounded-full border border-white/10 bg-white/5"
            >
              Back to site
            </Link>
          ) : (
            <>
              <Link
                href={otherPortalHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/12 bg-white/[0.04] text-white text-[13px] font-semibold hover:border-white/25 hover:bg-gradient-to-r hover:from-primary-purple/25 hover:to-button-orange/15 transition-colors"
              >
                <OtherPortalIcon className="w-4 h-4 text-widget-title-purple" />
                {otherPortalLabel}
              </Link>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  href="/book-a-demo"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-purple via-purple-600 to-button-orange bg-[length:200%_100%] bg-left hover:bg-right text-white text-[13px] font-semibold shadow-lg shadow-primary-purple/25 hover:shadow-primary-purple/50 transition-[background-position,box-shadow] duration-500"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        {variant === "default" ? (
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        ) : (
          <Link
            href={homeHref}
            className="md:hidden text-sm text-white/70 px-3 py-2 rounded-full border border-white/10 bg-white/5"
          >
            Back
          </Link>
        )}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {variant === "default" && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#0b0614]/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href={otherPortalHref}
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/12 bg-white/[0.04] text-white text-base font-semibold"
                >
                  <OtherPortalIcon className="w-4 h-4 text-widget-title-purple" />
                  {otherPortalLabel}
                </Link>
                <Link
                  href="/book-a-demo"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-purple via-purple-600 to-button-orange bg-[length:200%_100%] bg-left hover:bg-right text-white text-base font-semibold shadow-lg shadow-primary-purple/25 transition-[background-position] duration-500"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
