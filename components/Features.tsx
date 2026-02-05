"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Users,
  Package,
  Truck,
  ShoppingCart,
  UserCircle,
  FolderKanban,
  BarChart3,
  ShieldCheck,
  Plug,
  Monitor,
  Clock,
  TrendingUp,
  CreditCard,
  Boxes,
  ScanBarcode,
  ClipboardList,
  Send,
  CheckCircle2,
  Lock,
  MousePointer2,
  DollarSign,
  Receipt,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Database,
  Cloud,
  Smartphone,
} from "lucide-react";

type IconComponent = React.ComponentType<{ className?: string }>;

// Reusable Bento Card with mouse follow effect
const BentoCard = ({
  className,
  children,
}: {
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
      {children}
    </div>
  );
};

// Static icon positioned around a center point
const OrbitingIcon = ({
  Icon,
  radius,
  delay = 0,
  color
}: {
  Icon: IconComponent;
  radius: number;
  duration?: number;
  delay?: number;
  color: string;
}) => {
  const angle = delay * 45; // spread icons by delay value
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      className={`absolute w-8 h-8 rounded-lg ${color} flex items-center justify-center shadow-lg`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.15, type: "spring", stiffness: 200 }}
      style={{
        left: "50%",
        top: "50%",
        marginLeft: -16 + x,
        marginTop: -16 + y,
      }}
    >
      <Icon className="w-4 h-4 text-white" />
    </motion.div>
  );
};

// Static cursor with name
const FloatingCursor = ({
  name,
  color,
  initialX,
  initialY,
}: {
  name: string;
  color: string;
  initialX: number;
  initialY: number;
  animateX?: number[];
  animateY?: number[];
  duration?: number;
}) => (
  <motion.div
    initial={{ x: initialX, y: initialY, opacity: 0 }}
    animate={{ x: initialX, y: initialY, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`absolute flex items-center gap-1.5 ${color} px-2 py-1 rounded-full text-[10px] font-bold text-white shadow-xl z-20`}
  >
    <MousePointer2 className="w-2.5 h-2.5 fill-white" />
    {name}
  </motion.div>
);

// Animated donut chart
const DonutChart = () => (
  <div className="relative w-24 h-24">
    <svg className="w-full h-full -rotate-90">
      <circle cx="48" cy="48" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
      <motion.circle
        cx="48"
        cy="48"
        r="36"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="226"
        initial={{ strokeDashoffset: 226 }}
        animate={{ strokeDashoffset: 60 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9838D9" />
          <stop offset="100%" stopColor="#F35B04" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-white font-bold">73%</span>
    </div>
  </div>
);

// Animated list item
const ListItem = ({ icon: Icon, text, delay }: { icon: IconComponent; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="flex items-center gap-2 text-xs text-white/60"
  >
    <Icon className="w-3 h-3 text-primary-purple" />
    {text}
  </motion.div>
);

// Static notification dot
const PulsingDot = ({ color }: { color: string; delay?: number }) => (
  <div className={`w-2 h-2 rounded-full ${color}`} />
);

// Transaction row animation
const TransactionRow = ({
  icon: Icon,
  label,
  amount,
  isPositive,
  delay
}: {
  icon: IconComponent;
  label: string;
  amount: string;
  isPositive: boolean;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center justify-between py-2 border-b border-white/5"
  >
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
        <Icon className="w-3 h-3 text-white/60" />
      </div>
      <span className="text-xs text-white/70">{label}</span>
    </div>
    <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {amount}
    </div>
  </motion.div>
);

export const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-bg-layout-purple relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-button-orange/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-purple mb-4">
            Modules
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Everything you need to{" "}
            <span className="text-gradient">run your business.</span>
          </h3>
          <p className="text-text-gray text-lg">
            A complete suite of integrated modules designed for modern enterprises.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-7xl mx-auto"
        >
          {/* Finance & Accounting - Large with transactions */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <BentoCard className="h-95">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Finance & Accounting</h3>
                <p className="text-text-gray text-sm mb-4">Complete financial visibility and control</p>
              </div>

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />

              {/* Interactive transactions visualization */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/50">Recent Transactions</span>
                    <div className="flex items-center gap-1 text-emerald-400 text-xs">
                      <TrendingUp className="w-3 h-3" />
                      +24.5%
                    </div>
                  </div>
                  <TransactionRow icon={Receipt} label="Invoice #1234" amount="₱12,500" isPositive={true} delay={0.3} />
                  <TransactionRow icon={Wallet} label="Payroll" amount="₱45,000" isPositive={false} delay={0.5} />
                  <TransactionRow icon={DollarSign} label="Sales Revenue" amount="₱28,750" isPositive={true} delay={0.7} />
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* HR & Payroll - Large with floating cursors */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <BentoCard className="h-95">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">HR & Payroll</h3>
                <p className="text-text-gray text-sm mb-4">Streamline workforce management</p>
              </div>

              {/* Floating cursors like BentoGrid */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingCursor
                  name="Maria"
                  color="bg-blue-500"
                  initialX={50}
                  initialY={120}
                  animateX={[50, 150, 80, 50]}
                  animateY={[120, 180, 220, 120]}
                  duration={8}
                />
                <FloatingCursor
                  name="Carlos"
                  color="bg-purple-500"
                  initialX={200}
                  initialY={150}
                  animateX={[200, 120, 180, 200]}
                  animateY={[150, 200, 160, 150]}
                  duration={10}
                />
                <FloatingCursor
                  name="Ana"
                  color="bg-button-orange"
                  initialX={100}
                  initialY={250}
                  animateX={[100, 180, 140, 100]}
                  animateY={[250, 200, 280, 250]}
                  duration={12}
                />
              </div>

              {/* Employee stats at bottom */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                {[
                  { label: "Active", value: "124", color: "text-emerald-400" },
                  { label: "On Leave", value: "8", color: "text-amber-400" },
                  { label: "New Hires", value: "12", color: "text-blue-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex-1 glass rounded-lg p-3 border border-white/5 text-center"
                  >
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] text-white/40">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          {/* Inventory - Tall with orbiting icons */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
            <BentoCard className="h-full min-h-100">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Inventory & Warehouse</h3>
                <p className="text-text-gray text-sm mb-6">Real-time stock visibility</p>

                <div className="space-y-2">
                  <ListItem icon={Boxes} text="Multi-location tracking" delay={0.2} />
                  <ListItem icon={ScanBarcode} text="Barcode scanning" delay={0.3} />
                  <ListItem icon={ClipboardList} text="Auto reorder alerts" delay={0.4} />
                </div>
              </div>

              {/* Orbiting warehouse icons */}
              <div className="absolute bottom-20 left-1/2 w-32 h-32 -translate-x-1/2">
                <OrbitingIcon Icon={Boxes} radius={50} duration={8} color="bg-amber-500/80" />
                <OrbitingIcon Icon={ScanBarcode} radius={50} duration={8} delay={2.67} color="bg-orange-500/80" />
                <OrbitingIcon Icon={Package} radius={50} duration={8} delay={5.33} color="bg-yellow-500/80" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-amber-400" />
                </div>
              </div>

              {/* Stock stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "In Stock", value: "2,847", color: "text-emerald-400" },
                    { label: "Low Stock", value: "124", color: "text-amber-400" },
                    { label: "Out", value: "18", color: "text-red-400" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="glass rounded-lg p-2 text-center border border-white/5"
                    >
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                      <p className="text-[9px] text-white/40">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* POS - Small with card swipe animation */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard className="h-50">
              <div className="relative z-10 flex items-start justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Monitor className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Point of Sale</h3>
                  <p className="text-text-gray text-xs">Lightning-fast checkout</p>
                </div>

                {/* Card icon */}
                <div className="relative">
                  <div className="glass rounded-lg p-3 border border-white/10">
                    <CreditCard className="w-8 h-8 text-pink-400" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-emerald-400 font-medium whitespace-nowrap">
                    ✓ Payment received
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Queue Management - Small with animated queue */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard className="h-50">
              <div className="relative z-10 flex items-start justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Queue Management</h3>
                  <p className="text-text-gray text-xs">Serve efficiently</p>
                </div>

                {/* Animated queue numbers */}
                <div className="flex flex-col gap-1.5">
                  {["A-042", "A-043", "A-044"].map((num, i) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: i === 0 ? 1 : 0.5 - i * 0.15,
                        x: 0,
                        scale: i === 0 ? 1 : 0.9
                      }}
                      transition={{ delay: i * 0.2 }}
                      className={cn(
                        "text-xs font-mono px-3 py-1 rounded",
                        i === 0 ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-white/5 text-white/40"
                      )}
                    >
                      {i === 0 && <span className="mr-1">→</span>}
                      {num}
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Sales & Order - Large with pipeline */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <BentoCard className="h-50">
              <div className="relative z-10 flex gap-6 h-full">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Sales & Order Management</h3>
                  <p className="text-text-gray text-xs">Quote to delivery, seamlessly</p>
                </div>

                {/* Sales pipeline visualization with connecting lines */}
                <div className="flex-1 flex items-center gap-1 relative">
                  {/* Connecting line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-purple-500 via-indigo-500 to-emerald-500 opacity-30" />

                  {[
                    { stage: "Lead", count: 24, color: "bg-violet-500" },
                    { stage: "Quote", count: 18, color: "bg-purple-500" },
                    { stage: "Order", count: 12, color: "bg-indigo-500" },
                    { stage: "Done", count: 8, color: "bg-emerald-500" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.stage}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      className="flex-1 text-center relative z-10"
                    >
                      <motion.div
                        className={`${item.color} h-16 rounded-lg mb-2 flex items-center justify-center shadow-lg`}
                        style={{ opacity: 1 - i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-white font-bold text-lg">{item.count}</span>
                      </motion.div>
                      <span className="text-[10px] text-white/50">{item.stage}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* CRM - with animated contact bubbles */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard className="h-50">
              <div className="relative z-10 h-full">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UserCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">CRM</h3>
                <p className="text-text-gray text-xs mb-3">Build lasting relationships</p>

                {/* Animated avatar stack */}
                <div className="flex -space-x-3">
                  {[
                    { initials: "AC", color: "bg-cyan-500" },
                    { initials: "BT", color: "bg-blue-500" },
                    { initials: "CM", color: "bg-purple-500" },
                    { initials: "DK", color: "bg-pink-500" },
                  ].map((avatar, i) => (
                    <motion.div
                      key={avatar.initials}
                      initial={{ opacity: 0, scale: 0, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      className={`w-10 h-10 rounded-full ${avatar.color} border-2 border-bg-layout-purple flex items-center justify-center text-xs font-bold text-white cursor-pointer relative`}
                    >
                      {avatar.initials}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="w-10 h-10 rounded-full bg-white/10 border-2 border-bg-layout-purple flex items-center justify-center text-xs font-bold text-white/60"
                  >
                    +99
                  </motion.div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Procurement - with notification badges */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard className="h-50">
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Truck className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">Procurement</h3>
                    <p className="text-text-gray text-xs">Supply chain mastery</p>
                  </div>
                </div>

                {/* Animated notification badges */}
                <div className="mt-auto space-y-1.5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 bg-orange-500/10 rounded-full px-2.5 py-1"
                  >
                    <PulsingDot color="bg-orange-400" />
                    <Send className="w-3 h-3 text-orange-400" />
                    <span className="text-[11px] text-orange-400">12 POs pending</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 bg-emerald-500/10 rounded-full px-2.5 py-1"
                  >
                    <PulsingDot color="bg-emerald-400" delay={0.5} />
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400">8 delivered today</span>
                  </motion.div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Project Management - with animated progress */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard className="h-50">
              <div className="relative z-10 h-full">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Project Management</h3>
                <p className="text-text-gray text-xs mb-3">On time, on budget</p>

                {/* Animated progress bars */}
                <div className="space-y-3">
                  {[
                    { name: "Website Redesign", progress: 85, color: "bg-indigo-400" },
                    { name: "Mobile App", progress: 60, color: "bg-purple-400" },
                  ].map((project, i) => (
                    <div key={project.name}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-white/60">{project.name}</span>
                        <span className="text-indigo-400">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                          className={`h-full ${project.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Business Intelligence - Large with donut and metrics */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <BentoCard className="h-55">
              <div className="relative z-10 flex gap-8 h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Business Intelligence</h3>
                  <p className="text-text-gray text-xs mb-4">Data-driven decisions</p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {["Dashboards", "Custom reports", "KPI tracking", "Real-time analytics"].map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-[10px] text-white/50">
                        <div className="w-1 h-1 rounded-full bg-purple-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <DonutChart />
                  <div className="space-y-2">
                    {[
                      { label: "Sales", value: "45%", color: "bg-primary-purple" },
                      { label: "Operations", value: "28%", color: "bg-button-orange" },
                      { label: "Other", value: "27%", color: "bg-white/20" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white font-medium">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Compliance - with shield animation */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <BentoCard className="h-55">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Compliance</h3>
                <p className="text-text-gray text-[10px] mb-4">Audit & governance</p>

                {/* Shield icon */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <Shield className="w-12 h-12 text-red-400/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-red-400" />
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Integration - with connected icons */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard className="h-55">
              <div className="relative z-10 h-full">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Plug className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Integrations</h3>
                <p className="text-text-gray text-xs mb-4">Connect everything</p>

                {/* Connected integration icons with lines */}
                <div className="flex items-center justify-center gap-4 relative">
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                    <motion.line
                      x1="25%" y1="50%" x2="50%" y2="50%"
                      stroke="rgba(45, 212, 191, 0.3)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                    <motion.line
                      x1="50%" y1="50%" x2="75%" y2="50%"
                      stroke="rgba(45, 212, 191, 0.3)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    />
                  </svg>

                  {[
                    { Icon: Database, delay: 0.3 },
                    { Icon: Cloud, delay: 0.5 },
                    { Icon: Smartphone, delay: 0.7 },
                  ].map(({ Icon, delay }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-white/5 border border-teal-500/20 flex items-center justify-center relative z-10"
                    >
                      <Icon className="w-5 h-5 text-teal-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
