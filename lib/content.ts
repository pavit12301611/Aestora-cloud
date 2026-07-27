/**
 * Single source of truth for all site copy.
 * Updated to match exact Aestora Cloud brand positioning, value props,
 * pricing tiers, stats, FAQ and CTAs from provided brand context.
 */

export const nav = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "My Storage", href: "/storage" },
];

export const hero = {
  badge: "Premium • Ridiculously simple",
  titleLead: "Your cloud,",
  titleAccent: "beautifully simple.",
  subtitle:
    "Aestora is fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.",
  primaryCta: { label: "Start for free", href: "/register" },
  secondaryCta: { label: "See pricing", href: "#pricing" },
};

export const heroStats = [
  { label: "Storage Allocation", value: "248 MB", hint: "of 1 GB today", pct: 24.8 },
  { label: "Active Uploads", value: "27", hint: "in progress", pct: 68 },
  { label: "Retention", value: "30 days", hint: "auto-managed", pct: 100 },
];

export const featuresSection = {
  titleLead: "Everything you need.",
  titleAccent: "Nothing you don't.",
  subtitle: "A storage experience designed around what actually matters.",
};

export type Feature = {
  title: string;
  body: string;
  icon: "upload" | "shield" | "bolt" | "broom";
};

export const features: Feature[] = [
  {
    title: "Drag & Drop Uploads",
    body: "Upload any file in seconds with a clean, focused interface.",
    icon: "upload",
  },
  {
    title: "Private by Default",
    body: "Files are only accessible to you unless you choose to share.",
    icon: "shield",
  },
  {
    title: "Lightning Fast CDN",
    body: "Globally distributed delivery for instant downloads anywhere.",
    icon: "bolt",
  },
  {
    title: "Automatic Cleanup",
    body: "Expired files are permanently removed — no clutter, no surprises.",
    icon: "broom",
  },
];

export const stats = [
  { value: "1,000+", label: "Active Users", hint: "Growing daily" },
  { value: "5k+", label: "Files Stored", hint: "And counting" },
  { value: "99.9%", label: "Uptime Guarantee", hint: "Reliable storage" },
];

export const pricingSection = {
  title: "Simple, honest pricing",
  subtitle: "Start free. Upgrade when you outgrow it.",
};

export type Plan = {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  cta: { label: string; href: string };
  badge?: string;
  featured?: boolean;
  muted?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Free",
    tagline: "Perfect for casual storage and sharing.",
    price: "$0",
    period: "forever",
    features: [
      "1 GB daily upload limit",
      "200 MB max file size limit",
      "30-day file retention",
      "Basic file preview",
      "Standard email support",
    ],
    cta: { label: "Get started", href: "/register" },
  },
  {
    name: "Cloud Pro",
    tagline: "For creators who need more room to work.",
    price: "$5.99",
    period: "/month",
    badge: "🔥 Hot",
    featured: true,
    features: [
      "5 GB daily upload limit",
      "400 MB max file size limit",
      "60-day file retention",
      "10 GB daily share limit",
      "Priority support",
    ],
    cta: { label: "Upgrade to Pro", href: "/membership/patreon" },
  },
  {
    name: "Cloud Exclusive",
    tagline: "Unlimited power for teams and pros.",
    price: "$9.99",
    period: "/month",
    badge: "🚀 Coming soon",
    muted: true,
    features: [
      "Unlimited uploads",
      "No file size limit",
      "Files never expire",
      "Full API access",
      "Unlimited sharing",
    ],
    cta: { label: "Notify me", href: "/" },
  },
];

export const faqSection = { title: "Questions, answered" };

export const faqs = [
  {
    q: "What happens after 30 days on the free plan?",
    a: "Files are permanently deleted and become inaccessible. Upgrade to Cloud Pro for 60-day retention, or Cloud Exclusive for unlimited storage.",
  },
  {
    q: "Is there a per-file size limit?",
    a: "Free: 200 MB. Cloud Pro: 400 MB. Cloud Exclusive: no limit.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel from your dashboard with one click. No questions asked.",
  },
  {
    q: "Are my files private?",
    a: "Yes. Files are only accessible to you unless you generate a share link.",
  },
];

export const finalCta = {
  title: "Ready to store smarter?",
  subtitle: "Create your free Aestora account in seconds. No credit card required.",
  cta: { label: "Get 1 GB free", href: "/register" },
};

/**
 * Ticker items between the hero and features.
 */
export const marqueeItems = [
  "Drag & Drop Uploads",
  "Private by Default",
  "Lightning Fast CDN",
  "Automatic Cleanup",
  "1 GB free daily uploads",
  "99.9% uptime",
  "No credit card required",
];
