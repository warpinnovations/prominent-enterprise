export interface Plan {
  id: string;
  name: string;
  pricePrefix?: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  cta: string;
  ctaVariant: "primary" | "ghost";
}

export interface FAQItem {
  q: string;
  a: string;
}

export const PLANS: Plan[] = [
  {
    id: "start",
    name: "Start",
    price: "Free",
    period: "30-day trial",
    description: "For small teams testing ERP for the first time.",
    features: [
      "Core finance",
      "HR-lite",
      "1 user seat",
      "Community support",
    ],
    cta: "Get started",
    ctaVariant: "ghost",
  },
  {
    id: "scale",
    name: "Scale",
    pricePrefix: "₱",
    price: "9,900",
    period: "per month",
    description: "For growing SMEs with 20–200 employees.",
    features: [
      "Everything in Start",
      "All core modules",
      "25 user seats",
      "Payroll + inventory",
      "Priority support",
    ],
    featured: true,
    badge: "Most popular",
    cta: "Get started",
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For multi-branch, multi-entity operators.",
    features: [
      "Everything in Scale",
      "Every module",
      "SSO + audit trails",
      "Dedicated CSM",
      "Custom integrations",
    ],
    cta: "Talk to us",
    ctaVariant: "ghost",
  },
];

export const PRICING_FAQ: FAQItem[] = [
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrade or downgrade at any time. Changes take effect on your next billing cycle with no penalties or data loss.",
  },
  {
    q: "Is there a setup fee?",
    a: "Early access customers get their installation fee waived. Enterprise plans include dedicated onboarding support at no extra cost.",
  },
  {
    q: "How many users can I add?",
    a: "Start includes 1 seat. Scale includes 25. Enterprise is seat-priced based on your headcount with unlimited flexibility.",
  },
  {
    q: "Do you support multi-currency and multi-entity?",
    a: "Yes. The Prominent is built for Philippine businesses operating across branches, entities, and currencies — including BIR compliance.",
  },
  {
    q: "What happens after the free trial?",
    a: "After 30 days, your data stays intact and you choose a plan to continue. No credit card is required to start the trial.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is encrypted at rest and in transit. We maintain SOC 2-aligned controls with full audit trails on every plan.",
  },
];
