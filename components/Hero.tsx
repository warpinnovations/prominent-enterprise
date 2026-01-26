"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from "framer-motion";
import { ChevronRight, Play, Users, TrendingUp, Bell } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax and scroll effects
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);
  
  // Fix: Opacity now fades much more slowly and stays visible (0.4) instead of 0
  const opacity = useTransform(scrollY, [0, 800], [1, 0.85]);
  
  // Scroll animation for the main image (The "looking at" effect)
  const imageScale = useTransform(scrollY, [0, 500], [0.9, 1]);
  const imageRotateX = useTransform(scrollY, [0, 500], [15, 0]);
  const imageTranslateY = useTransform(scrollY, [0, 500], [50, 0]);

  // Mouse Parallax Effect for the Hero Image (active when not scrolling)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springRotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const floatVariants: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatReverseVariants: Variants = {
    animate: {
      y: [0, 15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-32 pb-20 md:pt-48 md:pb-60 overflow-hidden"
    >
      {/* Background Glows */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary-purple/20 blur-[140px] rounded-full -z-10" 
      />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-b from-primary-purple/15 to-transparent blur-[120px] -z-10" />
      <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-button-orange/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-primary-purple/10 blur-[120px] rounded-full -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
        className="container mx-auto px-6 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[13px] font-medium text-widget-title-purple mb-10 relative group cursor-pointer overflow-hidden transition-all hover:border-white/20 hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-purple opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-purple"></span>
          </span>
          <span className="relative z-10">New: AI-Powered Resource Planning</span>
          <ChevronRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] text-white"
        >
          The prominent way <br />
          <span className="text-gradient">to manage enterprise.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
        >
          Streamline operations, finance, and human resources with a
          purpose-built ERP. Designed for speed, scale, and the modern enterprise.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button className="px-8 py-4 bg-button-orange hover:bg-bg-orange-btn text-white font-semibold rounded-2xl transition-all flex items-center gap-2 text-lg group hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-button-orange/20">
            Get Started
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all flex items-center gap-2 text-lg hover:scale-[1.02] active:scale-[0.98]">
            <Play className="w-5 h-5 fill-white" />
            Watch Demo
          </button>
        </motion.div>

        {/* Hero Image Container with Entrance/Scroll Animation */}
        <motion.div
          variants={itemVariants}
          style={{ 
            perspective: 1500,
            scale: imageScale,
            rotateX: imageRotateX,
            y: imageTranslateY,
          }}
          className="mt-24 relative mx-auto max-w-6xl px-4"
        >
          <motion.div
            style={{ 
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative glass rounded-3xl p-1.5 md:p-2.5 overflow-hidden shadow-[0_0_80px_-15px_rgba(152,56,217,0.3)] border-white/10 group"
          >
            <div className="relative aspect-[16/10] bg-bg-purple/50 rounded-2xl overflow-hidden border border-white/5">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Dashboard Preview"
                fill
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
              
              {/* Scanning Light Effect */}
              <motion.div 
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 5
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-10"
              />

              {/* Refined Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-layout-purple/40 via-transparent to-transparent opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-purple/20 via-transparent to-button-orange/10 opacity-50" />
              
              {/* Inner Glow/Highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Floating UI Elements with Scroll Parallax */}
          
          {/* Analytics Badge */}
          <motion.div 
            style={{ y: y2 }}
            variants={floatVariants}
            animate="animate"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-12 top-1/4 glass p-5 rounded-2xl border border-white/10 hidden lg:block shadow-2xl z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-purple/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-purple" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.15em] text-text-gray font-bold">Monthly Growth</p>
                <p className="text-2xl font-bold text-white">+24.8%</p>
              </div>
            </div>
          </motion.div>

          {/* Team Members Badge */}
          <motion.div 
            style={{ y: y1 }}
            variants={floatReverseVariants}
            animate="animate"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -left-16 bottom-1/4 glass p-4 rounded-2xl border border-white/10 hidden lg:block shadow-2xl z-20"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-button-orange/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-button-orange" />
                </div>
                <span className="text-sm font-bold text-white">Project Velocity</span>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-bg-layout-purple overflow-hidden">
                    <Image 
                      src={`https://i.pravatar.cc/150?u=${i + 20}`} 
                      alt="Avatar" 
                      width={36} 
                      height={36} 
                    />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-bg-layout-purple bg-white/10 flex items-center justify-center text-[10px] font-black text-white backdrop-blur-sm">
                  +12
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification Toast */}
          <motion.div 
            style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }}
            className="absolute right-[10%] -bottom-6 glass px-6 py-4 rounded-2xl border border-white/10 hidden lg:flex items-center gap-4 shadow-2xl z-20"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-semibold text-white/90">New invoice paid by Acme Corp</span>
            <div className="w-8 h-8 rounded-lg bg-widget-title-purple/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-widget-title-purple" />
            </div>
          </motion.div>

          {/* Decorative Background Elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-button-orange/10 blur-[100px] rounded-full -z-10" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-purple/10 blur-[100px] rounded-full -z-10" />
        </motion.div>
      </motion.div>
    </section>
  );
};
