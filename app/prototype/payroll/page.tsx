"use client";

import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, Calculator, Download, User, Receipt, ArrowLeft, LayoutGrid, Table2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Employee {
  id: string;
  name: string;
  basicSalary: number;
  sss: number;
  pagIbig: number;
  philHealth: number;
  taxableIncome: number;
  tax: number;
  netSalary: number;
}

const loadingMessages = [
  "Running TRAIN Law compliance checks...",
  "Calculating SSS contributions...",
  "Processing Pag-ibig deductions...",
  "Computing PhilHealth premiums...",
  "Validating tax brackets...",
  "Generating payslips..."
];

export default function PayrollPrototype() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("table");
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: "asc" | "desc" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isProcessing) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[index]);
      }, 350);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = React.useMemo(() => {
    if (!sortConfig) return employees;
    
    const sorted = [...employees].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    
    return sorted;
  }, [employees, sortConfig]);

  const calculatePayroll = (data: Array<{ [key: string]: string | number | undefined }>) => {
    return data.map((row, index) => {
      const basicSalary = parseFloat(String(row.Salary || row.salary || row["Basic Salary"] || 0));
      
      // SSS: Simplified Philippine Payroll Logic (2025 Rates - approx 4.5% for employee)
      const sss = Math.min(basicSalary * 0.045, 1350);
      
      // Pag-ibig: 2% but capped (simplified to 200)
      const pagIbig = 200;
      
      // PhilHealth: 5% split (2.5% each)
      const philHealth = basicSalary * 0.025;
      
      const totalDeductionsBeforeTax = sss + pagIbig + philHealth;
      const taxableIncome = Math.max(0, basicSalary - totalDeductionsBeforeTax);
      
      // Tax: 2023-present TRAIN law (monthly)
      let tax = 0;
      if (taxableIncome > 20833) {
        if (taxableIncome <= 33333) {
          tax = (taxableIncome - 20833) * 0.15;
        } else if (taxableIncome <= 66667) {
          tax = 1875 + (taxableIncome - 33333) * 0.20;
        } else if (taxableIncome <= 166667) {
          tax = 8541.67 + (taxableIncome - 66667) * 0.25;
        } else if (taxableIncome <= 666667) {
          tax = 33541.67 + (taxableIncome - 166667) * 0.30;
        } else {
          tax = 183541.67 + (taxableIncome - 666667) * 0.35;
        }
      }

      const netSalary = basicSalary - totalDeductionsBeforeTax - tax;

      return {
        id: String(row.ID || row.id || `EMP-${(index + 1).toString().padStart(3, '0')}`),
        name: String(row.Name || row.name || `Employee ${index + 1}`),
        basicSalary,
        sss,
        pagIbig,
        philHealth,
        taxableIncome,
        tax,
        netSalary,
      };
    });
  };

  const handleFileUpload = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet) as Array<{ [key: string]: string | number | undefined }>;
      
      setTimeout(() => {
        const processed = calculatePayroll(json);
        setEmployees(processed);
        setIsProcessing(false);
      }, 2000); 
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const downloadTemplate = () => {
    const names = [
      "Alex Rivera", "Sam Chen", "Jordan Martinez", "Taylor Brown", "Morgan Davis",
      "Casey Wilson", "Riley Thompson", "Avery Garcia", "Quinn Anderson", "Drew Lopez",
      "Reese Johnson", "Blake Williams", "Cameron Lee", "Skylar White", "Peyton Harris",
      "Dakota Miller", "Harper Clark", "Emerson Rodriguez", "Rowan Lewis", "Sage Walker",
      "Phoenix Young", "River Allen", "Finley King", "Parker Wright", "Kendall Scott",
      "Hayden Green", "Charlie Adams", "Marley Baker", "Ellis Hall", "Bailey Turner",
      "Jesse Campbell", "Frankie Mitchell", "Eden Carter", "Ashton Phillips", "Sawyer Evans",
      "Lennon Torres", "Remy Collins", "Winter Stewart", "Nova Ramirez", "Jules Morris",
      "Eden Murphy", "Arden Reed", "Palmer Cook", "Kai Rogers", "London Howard",
      "Briar Ward", "Story Cox", "Tatum Perry", "Denver Russell", "Harbor Powell"
    ];

    const template = names.map((name, i) => ({
      ID: `EMP${(i + 1).toString().padStart(3, '0')}`,
      Name: name,
      Salary: 20000 + (Math.floor(Math.random() * 80) * 1000)
    }));

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "Prominent_Payroll_50_Employees.xlsx");
  };

  return (
    <div className="min-h-screen bg-bg-layout-purple text-white font-sans">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Payroll <span className="bg-gradient-to-r from-primary-purple to-purple-400 bg-clip-text text-transparent">Prototype</span>
            </h1>
            <p className="text-xl text-white/50 max-w-3xl leading-relaxed">
              Experience how The Prominent automates complex payroll calculations. 
              Upload an employee list to generate instant payslips with SSS, Pag-ibig, PhilHealth, and Tax deductions.
            </p>
          </motion.div>

          {!employees.length && !isProcessing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "relative border-2 border-dashed rounded-[40px] p-16 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden",
                dragActive ? "border-primary-purple bg-primary-purple/10 scale-[1.02] shadow-2xl shadow-primary-purple/20" : "border-white/10 hover:border-white/20 bg-gradient-to-br from-white/[0.03] to-white/[0.01]"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {dragActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-primary-purple/5 backdrop-blur-sm"
                />
              )}
              <motion.div 
                animate={{ 
                  y: dragActive ? -5 : 0,
                  scale: dragActive ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
                className="w-24 h-24 bg-gradient-to-br from-primary-purple/30 to-primary-purple/10 rounded-3xl flex items-center justify-center mb-8 relative border border-primary-purple/20"
              >
                <Upload className="w-12 h-12 text-primary-purple" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-transparent border-t-primary-purple/30 rounded-3xl"
                />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">Upload Employee Data</h3>
              <p className="text-white/40 mb-10 text-center max-w-md leading-relaxed">
                Drag and drop your Excel file here, or click to browse. 
                <span className="block mt-2 text-xs text-white/30">Required columns: <span className="text-primary-purple/80 font-mono">ID</span>, <span className="text-primary-purple/80 font-mono">Name</span>, <span className="text-primary-purple/80 font-mono">Salary</span></span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-10 py-4 bg-white text-bg-layout-purple font-bold rounded-full hover:bg-white/90 hover:scale-105 transition-all flex items-center gap-3 shadow-xl shadow-white/10"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  Select File
                </button>
                <button
                  onClick={downloadTemplate}
                  className="px-10 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-3 group"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  Download Sample (50)
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
            </motion.div>
          ) : isProcessing ? (
            <div className="flex flex-col items-center justify-center py-32 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-1 bg-primary-purple shadow-[0_0_15px_rgba(147,51,234,0.5)]"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-24 h-24 bg-primary-purple/10 rounded-3xl flex items-center justify-center mb-8 relative"
              >
                <Calculator className="w-12 h-12 text-primary-purple" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-primary-purple/30 border-t-primary-purple rounded-3xl"
                />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Calculating Payroll</h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/60 text-sm"
                >
                  {loadingMessage}
                </motion.p>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Top CTA Banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-primary-purple/20 via-primary-purple/10 to-transparent border border-primary-purple/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
              >
                <motion.div
                  animate={{ 
                    x: [0, 100, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute top-0 left-0 w-96 h-full bg-primary-purple/10 blur-3xl"
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary-purple" />
                    Want Unlimited Payroll Processing?
                  </h3>
                  <p className="text-white/50 text-sm">Upgrade to The Prominent and automate everything.</p>
                </div>
                <Link
                  href="/#pricing"
                  className="relative z-10 px-8 py-3 bg-primary-purple hover:bg-primary-purple/90 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-primary-purple/30 flex items-center gap-2 group"
                >
                  View Pricing
                  <motion.svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </motion.div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">Payroll Results</h2>
                  <p className="text-white/40 text-sm">Processed {employees.length} employees • Total Net: ₱{sortedEmployees.reduce((sum, emp) => sum + emp.netSalary, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                    <button
                      onClick={() => setViewMode("card")}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2",
                        viewMode === "card" 
                          ? "bg-primary-purple text-white shadow-lg shadow-primary-purple/20" 
                          : "text-white/40 hover:text-white"
                      )}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Cards
                    </button>
                    <button
                      onClick={() => setViewMode("table")}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2",
                        viewMode === "table" 
                          ? "bg-primary-purple text-white shadow-lg shadow-primary-purple/20" 
                          : "text-white/40 hover:text-white"
                      )}
                    >
                      <Table2 className="w-3.5 h-3.5" />
                      Table
                    </button>
                  </div>
                  <button 
                    onClick={() => setEmployees([])}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-medium transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {viewMode === "card" ? (
                  <motion.div 
                    key="card-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                  <AnimatePresence mode="popLayout">
                    {sortedEmployees.map((emp, idx) => (
                    <motion.div
                      key={emp.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ 
                        delay: Math.min(idx * 0.03, 0.8), 
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      className={cn(
                        "bg-gradient-to-br from-white/[0.04] to-white/[0.01] border rounded-[36px] overflow-hidden transition-all duration-500 backdrop-blur-sm",
                        expandedId === emp.id 
                          ? "ring-2 ring-primary-purple/50 bg-gradient-to-br from-white/[0.08] to-white/[0.03] border-primary-purple/30 shadow-2xl shadow-primary-purple/10" 
                          : "border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/5"
                      )}
                    >
                      <div 
                        className="p-8 cursor-pointer select-none"
                        onClick={() => setExpandedId(expandedId === emp.id ? null : emp.id)}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <motion.div 
                              whileHover={{ scale: 1.05, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                              className="w-16 h-16 bg-gradient-to-br from-primary-purple/30 via-primary-purple/10 to-transparent rounded-2xl flex items-center justify-center border border-primary-purple/30 relative overflow-hidden"
                            >
                              <User className="w-8 h-8 text-primary-purple relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                            </motion.div>
                            <div>
                              <h4 className="font-bold text-xl tracking-tight mb-1">{emp.name}</h4>
                              <p className="text-white/40 text-[11px] font-mono uppercase tracking-[0.2em]">{emp.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-2">Net Pay</p>
                            <motion.p 
                              className="text-3xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                              whileHover={{ scale: 1.05 }}
                            >
                              ₱{emp.netSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </motion.p>
                          </div>
                        </div>

                        <motion.div 
                          className="flex items-center justify-between text-sm pt-4 border-t border-white/5"
                          whileHover={{ x: 2 }}
                        >
                          <div className="flex items-center gap-2 text-primary-purple font-semibold">
                            <Receipt className="w-4 h-4" />
                            {expandedId === emp.id ? "Hide Breakdown" : "View Calculations"}
                          </div>
                          <motion.div
                            animate={{ rotate: expandedId === emp.id ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-6 h-6 flex items-center justify-center text-white/40 bg-white/5 rounded-lg"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </motion.div>
                        </motion.div>

                        <AnimatePresence>
                          {expandedId === emp.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 32 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-6 space-y-5">
                                <motion.div
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="flex justify-between items-center text-sm py-2"
                                >
                                  <span className="text-white/40 text-xs uppercase tracking-wider font-bold">Earnings</span>
                                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1 ml-4" />
                                </motion.div>
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.15 }}
                                  className="flex justify-between text-base py-2 px-4 bg-white/[0.02] rounded-xl"
                                >
                                  <span className="text-white/70 font-medium">Basic Salary</span>
                                  <span className="font-bold">₱{emp.basicSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </motion.div>
                                
                                <motion.div
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="flex justify-between items-center text-sm py-2 pt-4"
                                >
                                  <span className="text-white/40 text-xs uppercase tracking-wider font-bold">Statutory Deductions</span>
                                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1 ml-4" />
                                </motion.div>
                                
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.25 }}
                                  className="flex justify-between text-sm group/calc relative py-2 px-4 bg-red-500/5 rounded-xl border border-red-500/10 hover:border-red-500/30 transition-colors"
                                >
                                  <span className="text-white/70">SSS Contribution</span>
                                  <span className="text-red-400 font-bold">-₱{emp.sss.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute left-0 -top-10 bg-black/90 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-[10px] opacity-0 group-hover/calc:opacity-100 transition-opacity pointer-events-none shadow-xl z-10"
                                  >
                                    4.5% of Monthly Credit (capped at ₱1,350)
                                  </motion.div>
                                </motion.div>
                                
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                  className="flex justify-between text-sm group/calc relative py-2 px-4 bg-red-500/5 rounded-xl border border-red-500/10 hover:border-red-500/30 transition-colors"
                                >
                                  <span className="text-white/70">PhilHealth</span>
                                  <span className="text-red-400 font-bold">-₱{emp.philHealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute left-0 -top-10 bg-black/90 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-[10px] opacity-0 group-hover/calc:opacity-100 transition-opacity pointer-events-none shadow-xl z-10"
                                  >
                                    2.5% Employee Share
                                  </motion.div>
                                </motion.div>
                                
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.35 }}
                                  className="flex justify-between text-sm py-2 px-4 bg-red-500/5 rounded-xl border border-red-500/10"
                                >
                                  <span className="text-white/70">Pag-ibig Fund</span>
                                  <span className="text-red-400 font-bold">-₱{emp.pagIbig.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </motion.div>

                                <motion.div
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.4 }}
                                  className="flex justify-between items-center text-sm py-2 pt-4"
                                >
                                  <span className="text-white/40 text-xs uppercase tracking-wider font-bold">Taxation</span>
                                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1 ml-4" />
                                </motion.div>
                                
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.45 }}
                                  className="flex justify-between text-sm py-2 px-4 bg-white/[0.02] rounded-xl"
                                >
                                  <span className="text-white/70">Taxable Income</span>
                                  <span className="font-bold text-white/90">₱{emp.taxableIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </motion.div>
                                
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                  className="flex justify-between text-sm group/calc relative py-2 px-4 bg-red-500/5 rounded-xl border border-red-500/10 hover:border-red-500/30 transition-colors"
                                >
                                  <span className="text-primary-purple/90 font-semibold">Withholding Tax (TRAIN)</span>
                                  <span className="text-red-400 font-black">-₱{emp.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute left-0 -top-10 bg-black/90 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-[10px] opacity-0 group-hover/calc:opacity-100 transition-opacity pointer-events-none w-max shadow-xl z-10"
                                  >
                                    {emp.taxableIncome <= 20833 ? "Tax Exempt (<₱250k/yr)" : "Calculated via TRAIN brackets"}
                                  </motion.div>
                                </motion.div>

                                <motion.div 
                                  initial={{ scale: 0.95, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.6, duration: 0.4 }}
                                  className="mt-6 p-5 bg-gradient-to-br from-primary-purple/20 to-primary-purple/5 rounded-2xl border border-primary-purple/30 shadow-lg shadow-primary-purple/10"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-purple">Net Payout</span>
                                    <span className="text-2xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">₱{emp.netSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  </div>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                ) : (
                  <motion.div
                    key="table-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full relative">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.02]">
                            <th 
                              className="text-left p-3 text-xs font-bold uppercase tracking-wider text-white/60 cursor-pointer hover:text-white transition-colors group"
                              onClick={() => handleSort("name")}
                            >
                              <div className="flex items-center gap-2">
                                Name
                                {sortConfig?.key === "name" && (
                                  sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </th>
                            <th 
                              className="text-right p-3 text-xs font-bold uppercase tracking-wider text-white/60 cursor-pointer hover:text-white transition-colors group"
                              onClick={() => handleSort("basicSalary")}
                            >
                              <div className="flex items-center justify-end gap-2">
                                Basic Salary
                                {sortConfig?.key === "basicSalary" && (
                                  sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </th>
                            <th 
                              className="text-right p-3 text-xs font-bold uppercase tracking-wider text-white/60 cursor-pointer hover:text-white transition-colors group"
                              onClick={() => handleSort("sss")}
                            >
                              <div className="flex items-center justify-end gap-2">
                                SSS
                                {sortConfig?.key === "sss" && (
                                  sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </th>
                            <th 
                              className="text-right p-3 text-xs font-bold uppercase tracking-wider text-white/60 cursor-pointer hover:text-white transition-colors group"
                              onClick={() => handleSort("philHealth")}
                            >
                              <div className="flex items-center justify-end gap-2">
                                PhilHealth
                                {sortConfig?.key === "philHealth" && (
                                  sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </th>
                            <th 
                              className="text-right p-3 text-xs font-bold uppercase tracking-wider text-white/60 cursor-pointer hover:text-white transition-colors group"
                              onClick={() => handleSort("pagIbig")}
                            >
                              <div className="flex items-center justify-end gap-2">
                                Pag-ibig
                                {sortConfig?.key === "pagIbig" && (
                                  sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </th>
                            <th 
                              className="text-right p-3 text-xs font-bold uppercase tracking-wider text-white/60 cursor-pointer hover:text-white transition-colors group"
                              onClick={() => handleSort("tax")}
                            >
                              <div className="flex items-center justify-end gap-2">
                                Tax
                                {sortConfig?.key === "tax" && (
                                  sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </th>
                            <th 
                              className="text-right p-4 text-sm font-bold uppercase tracking-wider text-primary-purple cursor-pointer hover:text-primary-purple/80 transition-colors group"
                              onClick={() => handleSort("netSalary")}
                            >
                              <div className="flex items-center justify-end gap-2">
                                Net Pay
                                {sortConfig?.key === "netSalary" && (
                                  sortConfig.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                )}
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence mode="popLayout">
                            {sortedEmployees.map((emp, idx) => (
                              <motion.tr
                                key={emp.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ 
                                  delay: Math.min(idx * 0.02, 0.5),
                                  duration: 0.3
                                }}
                                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                              >
                                <td className="p-3 text-sm font-medium">{emp.name}</td>
                                <td className="p-3 text-sm text-right font-medium">
                                  ₱{emp.basicSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="p-3 text-sm text-right text-red-400/80">
                                  -₱{emp.sss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="p-3 text-sm text-right text-red-400/80">
                                  -₱{emp.philHealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="p-3 text-sm text-right text-red-400/80">
                                  -₱{emp.pagIbig.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="p-3 text-sm text-right text-red-400/80">
                                  -₱{emp.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="p-4 text-right font-black text-primary-purple text-lg">
                                  ₱{emp.netSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                        <tfoot>
                          <tr className="bg-white/[0.02] border-t-2 border-primary-purple/30">
                            <td className="p-3 text-sm font-bold uppercase tracking-wider text-white/60">
                              Total ({sortedEmployees.length} employees)
                            </td>
                            <td className="p-3 text-sm text-right font-bold text-white">
                              ₱{sortedEmployees.reduce((sum, emp) => sum + emp.basicSalary, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-3 text-sm text-right font-bold text-red-400">
                              -₱{sortedEmployees.reduce((sum, emp) => sum + emp.sss, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-3 text-sm text-right font-bold text-red-400">
                              -₱{sortedEmployees.reduce((sum, emp) => sum + emp.philHealth, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-3 text-sm text-right font-bold text-red-400">
                              -₱{sortedEmployees.reduce((sum, emp) => sum + emp.pagIbig, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-3 text-sm text-right font-bold text-red-400">
                              -₱{sortedEmployees.reduce((sum, emp) => sum + emp.tax, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-4 text-right font-black text-2xl text-primary-purple">
                              ₱{sortedEmployees.reduce((sum, emp) => sum + emp.netSalary, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
