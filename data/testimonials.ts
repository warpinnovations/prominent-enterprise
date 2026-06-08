export interface Testimonial {
  id: string;
  shortQuote: string;
  fullQuote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  gradient: string;
  personImage: string;
  logoImage: string;
}

export interface CompanyLogo {
  id: string;
  name: string;
  displayName: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    shortQuote:
      "Having everything in one platform has improved efficiency across our team and helped us focus more on delivering results for our clients.",
    fullQuote:
      "As a full-service marketing agency, staying organized across projects, people, and processes is essential in Prometheus Enterprises. Since implementing THE PROMINENT ENTERPRISE, managing leave requests, approvals, employee records, project updates, and payroll has become significantly easier. I spend less time chasing documents and double-checking records, and more time focusing on work that actually adds value to the business. Having everything in one platform has improved efficiency across our team and helped us focus more on delivering results for our clients.",
    name: "Jayvee Bayaban",
    role: "Finance Officer",
    company: "Prometheus Enterprises",
    initials: "PE",
    gradient: "from-[#290143] via-[#4a0880] to-[#9838D9]",
    personImage: "/testimonials/key-person/prometheus.jpg",
    logoImage: "/testimonials/logo/prometheus.png",
  },
  {
    id: "2",
    shortQuote:
      "We needed a simple, reliable system we could depend on to keep our stocks flowing. That solution became The Prominent Enterprise.",
    fullQuote:
      "In 101 Food, we believe that physical and mental health should be supported in every fitness journey. However, as the business grew, managing inventory through the 101 Food Tank became stressful. Delays and inaccurate tracking caused by a lack of centralized and organized inventory monitoring affected us as a small business with growing demand. As a fitness enthusiast myself, I also want everything on the menu to be available to ensure the best possible customer experience. We needed a simple, reliable system we could depend on to keep our stocks flowing. That solution became The Prominent Enterprise.",
    name: "Jona Mae Antiquiera",
    role: "Co-Owner & Co-Founder",
    company: "101 Food",
    initials: "101",
    gradient: "from-emerald-900 via-teal-800 to-emerald-600",
    personImage: "/testimonials/key-person/101-food.png",
    logoImage: "/testimonials/logo/101-food.png",
  },
  {
    id: "3",
    shortQuote:
      "We worked to modernize our backend by optimizing our HR, payroll, and admin processes. That part was easy thanks to THE PROMINENT.",
    fullQuote:
      "When I first took over as Publisher from my father, our operations were still the same legacy processes from the past 25 years. We worked to innovate our service, while delivering the same credible and competent journalism DG is known for. With that finished, we worked to modernize our backend by optimizing our HR, payroll, and admin processes. That part was easy thanks to THE PROMINENT.",
    name: "Lawrence Clark Fernandez",
    role: "Publisher",
    company: "Daily Guardian",
    initials: "DG",
    gradient: "from-blue-950 via-blue-900 to-indigo-700",
    personImage: "/testimonials/key-person/dg.jpg",
    logoImage: "/testimonials/logo/dg.png",
  },
];

export const COMPANY_LOGOS: CompanyLogo[] = [
  { id: "1", name: "prometheus", displayName: "PROMETHEUS" },
  { id: "2", name: "101-food", displayName: "101 FOOD" },
  { id: "3", name: "daily-guardian", displayName: "DAILY GUARDIAN" },
];
