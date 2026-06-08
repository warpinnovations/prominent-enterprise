export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export interface FooterGroup {
  title: string;
  items: { label: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Modules", href: "/modules" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Customers", href: "/customers" },
  { label: "Free Trial", href: "/payroll", highlight: true },
];

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Product",
    items: [
      { label: "Modules", href: "/modules" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Book a Demo", href: "/#book" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "hello@theprominent.ph", href: "mailto:hello@theprominent.ph" },
      { label: "+63 (2) 8888-0000", href: "tel:+6328888000" },
      { label: "Manila, Philippines", href: "#" },
    ],
  },
];
