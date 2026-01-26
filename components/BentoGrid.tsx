"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  MousePointer2, 
  Layers, 
  Sparkles, 
  Workflow, 
  Lock, 
  Cpu 
} from "lucide-react";

const BentoCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className,
  children 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  className?: string;
  children?: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      } as React.CSSProperties}
      className={cn("bento-card group", className)}
    >
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-lg bg-primary-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5 text-primary-purple" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-text-gray text-sm leading-relaxed mb-6">{description}</p>
      </div>
      {children}
    </div>
  );
};

export const BentoGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // Custom cubic-bezier for smooth reveal
      },
    },
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
            The Platform
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Engineered for the <span className="text-gradient">modern stack.</span>
          </h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          <motion.div variants={itemVariants} className="md:col-span-3">
            <BentoCard
              title="AI-Native Core"
              description="Built with machine learning at the center, not as an afterthought."
              icon={Sparkles}
              className="h-[400px]"
            >
              <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary-purple/20 to-transparent flex items-end justify-center p-8">
                <div className="w-full h-32 glass rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Cpu className="w-12 h-12 text-primary-purple" />
                    </motion.div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-3">
            <BentoCard
              title="Multiplayer Collaboration"
              description="Work together in real-time across departments with zero friction."
              icon={MousePointer2}
              className="h-[400px]"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 flex items-center gap-2 bg-button-orange px-3 py-1 rounded-full text-xs font-bold text-white shadow-xl"
                >
                  <MousePointer2 className="w-3 h-3 fill-white" />
                  Sarah
                </motion.div>
                <motion.div 
                  animate={{ x: [-100, 50, 0, -100], y: [50, 0, -50, 50] }}
                  transition={{ duration: 12, repeat: Infinity }}
                  className="absolute top-1/3 left-1/4 flex items-center gap-2 bg-primary-purple px-3 py-1 rounded-full text-xs font-bold text-white shadow-xl"
                >
                  <MousePointer2 className="w-3 h-3 fill-white" />
                  James
                </motion.div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard
              title="Enterprise Security"
              description="SOC2, GDPR, and HIPAA compliant out of the box."
              icon={Lock}
              className="h-[350px]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard
              title="Custom Workflows"
              description="Automate anything with our visual workflow builder."
              icon={Workflow}
              className="h-[350px]"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard
              title="Unified Layers"
              description="Connect all your data sources into a single source of truth."
              icon={Layers}
              className="h-[350px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
