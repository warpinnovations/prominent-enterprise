"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, Calculator, Download, User, Receipt, ArrowLeft } from "lucide-react";
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

export default function PayrollPrototype() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      "Juan Dela Cruz", "Maria Clara", "Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo",
      "Apolinario Mabini", "Gabriela Silang", "Melchora Aquino", "Marcelo del Pilar", "Juan Luna",
      "Antonio Luna", "Gregorio del Pilar", "Lapu-Lapu", "Francisco Balagtas", "Sultan Kudarat",
      "Corazon Aquino", "Benigno Aquino Jr.", "Ramon Magsaysay", "Diosdado Macapagal", "Manuel Quezon",
      "Sergio Osmeña", "Jose Laurel", "Manuel Roxas", "Elpidio Quirino", "Carlos Garcia",
      "Ferdinand Marcos", "Fidel Ramos", "Joseph Estrada", "Gloria Macapagal Arroyo", "Rodrigo Duterte",
      "Leni Robredo", "Bongbong Marcos", "Teresa Magbanua", "Agueda Kahabagan", "Trinidad Tecson",
      "Marina Dizon", "Gregoria de Jesus", "Patrocinio Gamboa", "Librada Avelino", "Rosa Sevilla",
      "Josefa Llanes Escoda", "Concepcion Felix", "Pura Villanueva Kalaw", "Paz Marquez Benitez", "Angela Manalang Gloria",
      "Edith Tiempo", "Sionil Jose", "Nick Joaquin", "Carlos Romulo", "Lea Salonga"
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

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Payroll <span className="text-primary-purple">Prototype</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Experience how The Prominent automates complex payroll calculations. 
              Upload an employee list to generate instant payslips with SSS, Pag-ibig, and Tax deductions.
            </p>
          </div>

          {!employees.length && !isProcessing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300",
                dragActive ? "border-primary-purple bg-primary-purple/5 scale-[1.01]" : "border-white/10 hover:border-white/20 bg-white/5"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 bg-primary-purple/20 rounded-2xl flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-primary-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Employee Data</h3>
              <p className="text-white/40 mb-8 text-center max-w-sm">
                Drag and drop your Excel file here, or click to browse. 
                Must include columns: Name, Salary.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3 bg-white text-bg-layout-purple font-bold rounded-full hover:bg-white/90 transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Select File
                </button>
                <button
                  onClick={downloadTemplate}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Template
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
            <div className="flex flex-col items-center justify-center py-32 relative">
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
                className="w-24 h-24 bg-primary-purple/10 rounded-3xl flex items-center justify-center mb-8"
              >
                <Calculator className="w-12 h-12 text-primary-purple" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Calculating Payroll</h3>
              <p className="text-white/40 animate-pulse">Running TRAIN Law compliance checks...</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Generated Payslips</h2>
                  <p className="text-white/40 text-sm">Processed {employees.length} employees</p>
                </div>
                <button 
                  onClick={() => setEmployees([])}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-all"
                >
                  Clear and Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {employees.map((emp, idx) => (
                    <motion.div
                      key={emp.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ 
                        delay: Math.min(idx * 0.05, 1), 
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      className={cn(
                        "bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden transition-all duration-500",
                        expandedId === emp.id ? "ring-2 ring-primary-purple/40 bg-white/[0.05]" : "hover:border-white/20"
                      )}
                    >
                      <div 
                        className="p-8 cursor-pointer"
                        onClick={() => setExpandedId(expandedId === emp.id ? null : emp.id)}
                      >
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-purple/20 to-primary-purple/5 rounded-2xl flex items-center justify-center border border-primary-purple/20">
                              <User className="w-7 h-7 text-primary-purple" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xl tracking-tight">{emp.name}</h4>
                              <p className="text-white/40 text-xs font-mono uppercase tracking-widest">{emp.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-white/40 uppercase font-bold tracking-tighter mb-1">Monthly Net Pay</p>
                            <p className="text-2xl font-black text-white tracking-tight">
                              ₱{emp.netSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-primary-purple font-medium">
                            <Receipt className="w-4 h-4" />
                            {expandedId === emp.id ? "Hide Breakdown" : "View Calculations"}
                          </div>
                          <motion.div
                            animate={{ rotate: expandedId === emp.id ? 180 : 0 }}
                            className="w-5 h-5 flex items-center justify-center text-white/40"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {expandedId === emp.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-white/40 italic">Earnings</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-white/60">Basic Salary</span>
                                  <span className="font-medium">₱{emp.basicSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                
                                <div className="pt-4 flex justify-between text-sm border-t border-white/5">
                                  <span className="text-white/40 italic">Deductions (Statutory)</span>
                                </div>
                                <div className="flex justify-between text-sm group/calc relative">
                                  <span className="text-white/60">SSS Contribution</span>
                                  <span className="text-red-400 font-medium">-₱{emp.sss.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  <div className="absolute left-0 -top-8 bg-black border border-white/10 px-2 py-1 rounded text-[10px] opacity-0 group-hover/calc:opacity-100 transition-opacity pointer-events-none">
                                    4.5% of Monthly Credit
                                  </div>
                                </div>
                                <div className="flex justify-between text-sm group/calc relative">
                                  <span className="text-white/60">PhilHealth</span>
                                  <span className="text-red-400 font-medium">-₱{emp.philHealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  <div className="absolute left-0 -top-8 bg-black border border-white/10 px-2 py-1 rounded text-[10px] opacity-0 group-hover/calc:opacity-100 transition-opacity pointer-events-none">
                                    2.5% Employee Share
                                  </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-white/60">Pag-ibig Fund</span>
                                  <span className="text-red-400 font-medium">-₱{emp.pagIbig.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>

                                <div className="pt-4 flex justify-between text-sm border-t border-white/5">
                                  <span className="text-white/40 italic">Taxation</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-white/60">Taxable Income</span>
                                  <span className="font-medium text-white/80">₱{emp.taxableIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm group/calc relative">
                                  <span className="text-white/60 font-semibold text-primary-purple/80">Withholding Tax (TRAIN)</span>
                                  <span className="text-red-400 font-bold">-₱{emp.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  <div className="absolute left-0 -top-8 bg-black border border-white/10 px-2 py-1 rounded text-[10px] opacity-0 group-hover/calc:opacity-100 transition-opacity pointer-events-none w-max">
                                    {emp.taxableIncome <= 20833 ? "Tax Exempt (<₱250k/yr)" : "Calculated via TRAIN brackets"}
                                  </div>
                                </div>

                                <div className="mt-6 p-4 bg-primary-purple/10 rounded-2xl border border-primary-purple/20">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary-purple">Net Payout</span>
                                    <span className="text-xl font-black">₱{emp.netSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
