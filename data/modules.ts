export type Industry =
  | "retail"
  | "fnb"
  | "wholesale"
  | "construction"
  | "manufacturing"
  | "services";

export type BusinessSize = "sme" | "mid" | "enterprise";

export type ModuleIconName =
  | "Calculator"
  | "Users"
  | "Package"
  | "Monitor"
  | "ShoppingCart"
  | "UserCircle"
  | "Truck"
  | "Clock"
  | "FolderKanban"
  | "BarChart3"
  | "Building2"
  | "FileText";

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: ModuleIconName;
  iconGradient: string;
  tagline: string;
  features: string[];
  industries: Industry[];
  sizes: BusinessSize[];
  soon?: boolean;
}

export const MODULES: Module[] = [
  {
    id: "finance",
    slug: "finance",
    title: "Finance & Accounting",
    description: "Double-entry general ledger, AP/AR, and bank reconciliation.",
    iconName: "Calculator",
    iconGradient: "from-emerald-400 to-teal-500",
    tagline: "A complete accounting engine built for Philippine businesses.",
    features: [
      "Multi-entity general ledger",
      "Accounts payable & receivable",
      "Bank reconciliation",
      "Chart of accounts with PH defaults",
      "Journal entries & adjustments",
      "Financial statements (P&L, BS, CF)",
    ],
    industries: ["retail", "fnb", "wholesale", "construction", "manufacturing", "services"],
    sizes: ["sme", "mid", "enterprise"],
  },
  {
    id: "hr",
    slug: "hr",
    title: "Human Resources",
    description: "Employee records, attendance, leave, and monthly payroll.",
    iconName: "Users",
    iconGradient: "from-blue-400 to-indigo-500",
    tagline: "Manage your team from hire through monthly payroll.",
    features: [
      "Employee 201 files",
      "Attendance & timekeeping",
      "Leave management",
      "Payroll computation",
      "Overtime & shift differentials",
      "Payslip generation",
    ],
    industries: ["retail", "fnb", "wholesale", "construction", "manufacturing", "services"],
    sizes: ["sme", "mid", "enterprise"],
  },
  {
    id: "inventory",
    slug: "inventory",
    title: "Inventory & Warehouse",
    description: "Multi-location stock with transfers and cycle counts.",
    iconName: "Package",
    iconGradient: "from-amber-400 to-orange-500",
    tagline: "Know what you have and where it sits, across every branch.",
    features: [
      "Multi-warehouse tracking",
      "Stock transfers & adjustments",
      "Low-stock alerts",
      "Cycle counting",
      "Stock movement history",
      "Item categorization",
    ],
    industries: ["retail", "fnb", "wholesale", "construction", "manufacturing"],
    sizes: ["sme", "mid", "enterprise"],
  },
  {
    id: "pos",
    slug: "pos",
    title: "Point of Sale",
    description: "Counter checkout synced with stock and the ledger.",
    iconName: "Monitor",
    iconGradient: "from-pink-400 to-rose-500",
    tagline: "Counter-ready POS that talks to inventory and accounting in real time.",
    features: [
      "Touch-friendly checkout",
      "Multi-payment methods",
      "Discounts & promos",
      "Real-time stock deduction",
      "Daily sales summary",
      "Receipt printing",
    ],
    industries: ["retail", "fnb"],
    sizes: ["sme", "mid", "enterprise"],
  },
  {
    id: "sales",
    slug: "sales",
    title: "Sales & Orders",
    description: "Quote to order to invoice in one pipeline.",
    iconName: "ShoppingCart",
    iconGradient: "from-violet-400 to-purple-500",
    tagline: "Move every deal from quote to paid invoice.",
    features: [
      "Sales quotes",
      "Order management",
      "Invoice generation",
      "Customer records",
      "Order status tracking",
      "Tax computation",
    ],
    industries: ["retail", "fnb", "wholesale", "manufacturing", "services"],
    sizes: ["mid", "enterprise"],
  },
  {
    id: "crm",
    slug: "crm",
    title: "CRM",
    description: "Customer profiles, contacts, and interaction history.",
    iconName: "UserCircle",
    iconGradient: "from-cyan-400 to-blue-500",
    tagline: "Every customer touchpoint, in one place.",
    features: [
      "Contact & company records",
      "Interaction timeline",
      "Deal stages",
      "Lead capture",
      "Activity history",
      "Customer notes",
    ],
    industries: ["retail", "wholesale", "services", "manufacturing"],
    sizes: ["mid", "enterprise"],
  },
  {
    id: "procurement",
    slug: "procurement",
    title: "Procurement",
    description: "Vendor records and purchase orders end to end.",
    iconName: "Truck",
    iconGradient: "from-orange-400 to-amber-500",
    tagline: "From purchase request to vendor payment — fully tracked.",
    features: [
      "Vendor records",
      "Purchase requisitions",
      "Purchase orders",
      "Goods receipt",
      "PO status tracking",
      "Vendor payment terms",
    ],
    industries: ["wholesale", "construction", "manufacturing", "services"],
    sizes: ["mid", "enterprise"],
  },
  {
    id: "queue",
    slug: "queue",
    title: "Queue Management",
    description: "Customer flow with priority queues and counter routing.",
    iconName: "Clock",
    iconGradient: "from-rose-400 to-red-500",
    tagline: "Cut wait times. Keep customers informed.",
    features: [
      "Digital queuing",
      "Display screen support",
      "Priority queues",
      "Counter routing",
      "Queue analytics",
      "Restaurant table mode",
    ],
    industries: ["retail", "fnb", "services"],
    sizes: ["mid", "enterprise"],
  },
  {
    id: "pm",
    slug: "pm",
    title: "Project Management",
    description: "Projects, tasks, phases, milestones, and time tracking.",
    iconName: "FolderKanban",
    iconGradient: "from-indigo-400 to-blue-500",
    tagline: "Run projects on a Kanban board with time logs and milestones.",
    features: [
      "Projects with members",
      "Kanban & list views",
      "Phases & milestones",
      "Task comments with @mentions",
      "Time tracking (start/stop)",
      "Activity log & notifications",
    ],
    industries: ["construction", "services", "manufacturing"],
    sizes: ["mid", "enterprise"],
  },
  {
    id: "bi",
    slug: "bi",
    title: "Dashboard & BI",
    description: "Operational dashboards across modules.",
    iconName: "BarChart3",
    iconGradient: "from-purple-400 to-pink-500",
    tagline: "One screen for the numbers that move your business.",
    features: [
      "Sales dashboard",
      "Inventory dashboard",
      "Cash position view",
      "Employee headcount",
      "KPI tracking",
      "Period comparisons",
    ],
    industries: ["retail", "fnb", "wholesale", "construction", "manufacturing", "services"],
    sizes: ["mid", "enterprise"],
  },
  {
    id: "branches",
    slug: "branches",
    title: "Multi-Branch Operations",
    description: "Run multiple branches and entities from one tenant.",
    iconName: "Building2",
    iconGradient: "from-teal-400 to-cyan-500",
    tagline: "One platform, every branch — with the right people in the right roles.",
    features: [
      "Multi-tenant setup",
      "Branch-level permissions",
      "Role-based access control",
      "Branch-level reporting",
      "User invites & seats",
      "Activity & audit logs",
    ],
    industries: ["retail", "fnb", "wholesale", "construction", "manufacturing", "services"],
    sizes: ["enterprise"],
  },
  {
    id: "files",
    slug: "files",
    title: "Files & Documents",
    description: "Central document hub for employee files, item images, and attachments.",
    iconName: "FileText",
    iconGradient: "from-slate-400 to-gray-500",
    tagline: "A shared file layer for every module. In active development.",
    features: [
      "Centralized file storage",
      "Employee document vault",
      "Item image attachments",
      "Receipt attachments",
      "Access-controlled folders",
      "Versioning",
    ],
    industries: ["retail", "fnb", "wholesale", "construction", "manufacturing", "services"],
    sizes: ["enterprise"],
    soon: true,
  },
];

export const SME_BUNDLES: Record<string, string[]> = {
  _default: ["finance", "hr", "inventory"],
  retail: ["finance", "pos", "inventory"],
  fnb: ["finance", "pos", "queue"],
  wholesale: ["finance", "inventory", "sales"],
  construction: ["finance", "hr", "pm"],
  manufacturing: ["finance", "inventory", "hr"],
  services: ["finance", "hr", "crm"],
};

export const MID_BUNDLES: Record<string, string[]> = {
  _default: ["finance", "hr", "inventory", "sales", "crm", "bi"],
  retail: ["finance", "pos", "inventory", "sales", "crm", "bi"],
  fnb: ["finance", "pos", "queue", "inventory", "hr", "bi"],
  wholesale: ["finance", "inventory", "sales", "procurement", "crm", "hr"],
  construction: ["finance", "hr", "pm", "procurement", "files", "bi"],
  manufacturing: ["finance", "inventory", "hr", "procurement", "sales", "pm"],
  services: ["finance", "hr", "crm", "pm", "sales", "bi"],
};

export const INDUSTRY_LABELS: Record<Industry, string> = {
  retail: "Retail",
  fnb: "F&B",
  wholesale: "Wholesale",
  construction: "Construction",
  manufacturing: "Manufacturing",
  services: "Services",
};
