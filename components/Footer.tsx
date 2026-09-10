"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/10"
        >
          {/* gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/25 via-bg-layout-purple/40 to-button-orange/15" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-purple/30 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-button-orange/20 blur-[120px] rounded-full" />

          <div className="relative px-8 py-16 md:px-20 md:py-24 text-center">
            <p className="eyebrow justify-center mb-5">Get started</p>
            <h2 className="display text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
              Ready to see how The Prominent Enterprise can{" "}
              <span className="text-gradient">streamline your operations?</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto text-balance">
              Let us walk you through your next business solution.
            </p>
            <div className="flex justify-center">
              <Link href="/book-a-demo" className="btn-primary text-base">
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const quickLinks = [
  { label: "Home", href: "/enterprise" },
  { label: "Our Works", href: "#" },
  { label: "About", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Contact Us", href: "/book-a-demo" },
];

const contactItems = [
  { icon: Phone, label: "(033) 329-28-38", href: "tel:0333292838" },
  { icon: Phone, label: "(033) 511-36-05", href: "tel:0335113605" },
  { icon: Mail, label: "inquiry.prominent@warp.ph", href: "mailto:inquiry.prominent@warp.ph" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // NOTE: not wired to a backend yet — swap in your list provider / API route.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0b0614]/80 backdrop-blur-sm">
      {/* Top accent: gradient hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-purple/40 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Newsletter strip */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-10 border-b border-white/5">
          <div>
            <h4 className="text-white font-semibold text-lg">Stay in the loop</h4>
            <p className="text-white/45 text-sm mt-1">
              Product updates and launch news, straight to your inbox. No spam.
            </p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-400 text-sm md:min-w-[380px]">
              <Check className="w-4 h-4" />
              Thanks — you&apos;re on the list.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto md:min-w-[380px]">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary-purple/50 transition-colors"
                />
              </div>
              <button type="submit" className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Main grid: company + quick links + contact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-12 md:py-14">
          {/* Company column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-5 group">
              <div className="relative w-32 h-14 group-hover:scale-105 transition-transform duration-300">
                <Image src="/prominent-logo.png" alt="Prometheus" fill className="object-contain object-left" />
              </div>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-6">
              The Prominent Enterprise — the next-generation ERP system for modern enterprises
              in the Philippines. Built for efficiency, accuracy, and ease of use.
            </p>

            {/* Address */}
            <div className="flex items-start gap-2.5 text-sm text-white/50 mb-6">
              <MapPin className="w-4 h-4 text-widget-title-purple shrink-0 mt-0.5" />
              <address className="not-italic leading-relaxed">
                Daily Guardian Center<br />
                Mandurriao, Iloilo City<br />
                Philippines
              </address>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2.5">
              {[Linkedin, Facebook, Twitter].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Quick Links</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm">Contact</h5>
            <ul className="space-y-3">
              {contactItems.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <c.icon className="w-4 h-4 text-widget-title-purple shrink-0" />
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-x-5 gap-y-2 text-xs text-white/40">
            <p>© 2026 Prometheus. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};
