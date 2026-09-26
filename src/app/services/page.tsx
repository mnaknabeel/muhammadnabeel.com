"use client";

import { useState, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import TaxNav from "@/components/tax/TaxNav";
import TaxFooter from "@/components/tax/TaxFooter";
import { favorit } from "@/app/gumroad/fonts";
import FeeEstimator from "@/components/FeeEstimator";
import {
  ScrollReveal,
  TiltCard,
  StaggerContainer,
  StaggerItem,
  FloatElement,
} from "@/components/AnimatedElements";
import {
  Check,
  WhatsappLogo,
  EnvelopeSimple,
  ChartBar,
  Receipt,
  Storefront,
  ArrowsClockwise,
  TrendUp,
  Database,
  FileText,
  ShieldCheck,
  Clock,
  Sparkle,
  ArrowRight,
  Calculator,
  Sliders,
  WarningCircle,
  CurrencyDollar,
} from "phosphor-react";

const lime = "#c8f603";
const yellow = "#ffc900";

interface BookkeepingPlan {
  name: string;
  price: string;
  cadence: string;
  badge?: string;
  highlight?: boolean;
  bestFor: string;
  features: string[];
  ctaUrl: string;
}

const bookkeepingPlans: BookkeepingPlan[] = [
  {
    name: "Basic Bookkeeping",
    price: "$200",
    cadence: "per month",
    bestFor: "Freelancers, consultants, & very small businesses",
    features: [
      "Transaction categorization (up to 100 transactions/mo)",
      "Reconciliation of 1 bank account",
      "Monthly Profit & Loss (P&L) report",
      "Error checking and corrections",
      "Books maintained in QuickBooks Online or Xero",
      "Email support for basic questions",
      "Annual tax-ready financial summary",
    ],
    ctaUrl:
      "https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20am%20interested%20in%20the%20Basic%20Bookkeeping%20plan%20(%24200%2Fmo).%20Let%27s%20discuss%20my%20books.",
  },
  {
    name: "Standard Bookkeeping",
    price: "$300",
    cadence: "per month",
    badge: "Most Popular",
    highlight: true,
    bestFor:
      "Small service businesses, contractors, real estate agents, & growing businesses",
    features: [
      "Transaction categorization (up to 200 transactions/mo)",
      "Reconciliation of up to 2 bank accounts",
      "Reconciliation of up to 2 credit cards",
      "Monthly bank & credit card reconciliation",
      "Monthly Profit & Loss and Balance Sheet reports",
      "Error review & corrections",
      "Books maintained in QuickBooks Online or Xero",
      "Email & WhatsApp chat support",
      "1099 vendor payment tracking",
    ],
    ctaUrl:
      "https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20am%20interested%20in%20the%20Standard%20Bookkeeping%20plan%20(%24300%2Fmo).%20Let%27s%20discuss%20my%20books.",
  },
  {
    name: "Advanced Bookkeeping",
    price: "$450",
    cadence: "per month",
    bestFor:
      "Established small businesses, e-commerce sellers, & high-volume operators",
    features: [
      "Transaction categorization (up to 350 transactions/mo)",
      "Reconciliation of up to 3 bank accounts",
      "Reconciliation of up to 3 credit cards",
      "Monthly bank & credit card reconciliation",
      "Profit & Loss, Balance Sheet, and Cash Flow reports",
      "Quarterly financial review & strategic call",
      "Books maintained in QuickBooks Online or Xero",
      "Priority email & direct WhatsApp support",
      "Custom accounts mapping & class tracking",
    ],
    ctaUrl:
      "https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20am%20interested%20in%20the%20Advanced%20Bookkeeping%20plan%20(%24450%2Fmo).%20Let%27s%20discuss%20my%20books.",
  },
];

const addOnServices = [
  {
    title: "Inventory Tracking",
    price: "$100 – $200",
    cadence: "per month",
    desc: "For e-commerce and retail businesses holding stock. We track inventory adjustments, calculate accurate Cost of Goods Sold (COGS), and reconcile inventory asset accounts.",
    items: ["Inventory adjustments", "Cost of Goods Sold tracking", "Inventory account monitoring"],
  },
  {
    title: "Bookkeeping Cleanup",
    price: "$200 – $1,500",
    cadence: "one-time",
    desc: "If your books have sat neglected, messy, or unreconciled for months, we reconstruct historical transactions and deliver pristine, audit-ready accounts.",
    items: [
      "1–3 months cleanup: $200 – $400",
      "6 months cleanup: $400 – $800",
      "12 months cleanup: $800 – $1,500",
    ],
  },
  {
    title: "Catch-Up Bookkeeping",
    price: "$100 – $200",
    cadence: "per month behind",
    desc: "Fast, accurate retroactive bookkeeping so you can file your overdue tax returns or present current numbers to investors, banks, or buyers.",
    items: [
      "Categorization of historical transactions",
      "Retroactive bank & card reconciliations",
      "Prior year tax-ready financial packages",
    ],
  },
];

const dashboardKPIs = [
  {
    label: "Net Profit Margin",
    value: "28.4%",
    delta: "+4.2% MoM",
    trend: "up",
    sub: "Trailing 90 days across 3 storefronts",
  },
  {
    label: "Cash Runway",
    value: "8.6 Months",
    delta: "+1.5 Months",
    trend: "up",
    sub: "Based on $42.5K current monthly burn",
  },
  {
    label: "Top ASIN Contribution",
    value: "$18,420",
    delta: "36.8% of GP",
    trend: "neutral",
    sub: "After Amazon FBA fee deductions & PPC",
  },
  {
    label: "Reconciliation Latency",
    value: "24 Hours",
    delta: "down from 14d",
    trend: "up",
    sub: "Automated Python settlement ingestion",
  },
];

export default function ServicesPage() {
  // Scope Calculator State
  const [txVolume, setTxVolume] = useState<number>(180);
  const [bankAccounts, setBankAccounts] = useState<number>(2);
  const [creditCards, setCreditCards] = useState<number>(1);
  const [needsInventory, setNeedsInventory] = useState<boolean>(false);
  const [cleanupMonths, setCleanupMonths] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("all");

  const txVolumeId = useId();
  const bankAccountsId = useId();
  const creditCardsId = useId();
  const cleanupMonthsId = useId();

  // Calculate estimated monthly fee
  let baseMonthly = 200;
  if (txVolume > 100 && txVolume <= 200) baseMonthly = 300;
  else if (txVolume > 200 && txVolume <= 350) baseMonthly = 450;
  else if (txVolume > 350) baseMonthly = 450 + Math.ceil((txVolume - 350) / 100) * 80;

  // Extra accounts beyond plan defaults
  const totalAccounts = bankAccounts + creditCards;
  const extraAccountCost = Math.max(0, totalAccounts - 4) * 35;
  const inventoryCost = needsInventory ? 150 : 0;
  const estimatedMonthlyTotal = baseMonthly + extraAccountCost + inventoryCost;

  // One-time cleanup estimate
  const cleanupEstimate =
    cleanupMonths === 0
      ? 0
      : cleanupMonths <= 3
      ? 300
      : cleanupMonths <= 6
      ? 600
      : cleanupMonths <= 12
      ? 1100
      : cleanupMonths * 100;

  const calculatorWhatsAppUrl = `https://wa.me/923410224988?text=${encodeURIComponent(
    `Hi Nabeel, I used your scope calculator on muhammadnabeel.com/services.\n- Transactions/mo: ~${txVolume}\n- Bank Accounts: ${bankAccounts}\n- Credit Cards: ${creditCards}\n- Inventory Tracking: ${
      needsInventory ? "Yes" : "No"
    }\n- Cleanup Needed: ${cleanupMonths} months\nEstimated Monthly: ~$${estimatedMonthlyTotal}/mo${
      cleanupEstimate > 0 ? ` + ~$${cleanupEstimate} cleanup` : ""
    }.\nI'd like to get a formal quote.`
  )}`;

  return (
    <div
      className={`${favorit.variable} min-h-screen bg-[#f4f4f0] text-black antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <TaxNav />

      {/* ── Page Hero Header ────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-black bg-[#f4f4f0] px-5 pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-black bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
                  <span className="h-2 w-2 rounded-full bg-[#c8f603] animate-pulse" />
                  <span>E-Commerce Accounting &amp; Bookkeeping Expert</span>
                </div>

                <h1 className="mt-5 text-[clamp(2.5rem,6.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-black">
                  Services built to turn messy finances into{" "}
                  <span
                    className="inline-block px-2 rounded-md"
                    style={{ background: lime }}
                  >
                    clarity.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/90">
                  I&apos;m <strong>Muhammad Nabeel</strong> — with 10+ years of
                  e-commerce experience across Amazon, Etsy, Shopify, QuickBooks
                  Online, and Xero. Transparent monthly packages, audit-proof
                  books, custom Power BI dashboards, and compliant tax filings.
                </p>

                {/* Founder trust mini-bar */}
                <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-black bg-white p-3.5 shadow-[4px_4px_0_#c8f603]">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-black">
                    <Image
                      src="/images/profile.jpeg"
                      alt="Muhammad Nabeel"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-black">
                      Direct 1-on-1 execution by Muhammad Nabeel
                    </p>
                    <p className="text-black/70">
                      No junior handoffs · QuickBooks ProAdvisor · 10,000+ returns filed · $4M+ tracked
                    </p>
                    <p className="mt-0.5 font-medium text-black">
                      Contact:{" "}
                      <a
                        href="mailto:mnak.nabeel@gmail.com"
                        className="underline hover:text-black font-semibold"
                      >
                        mnak.nabeel@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Quick Action Row */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#bookkeeping"
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-black px-6 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000] sm:h-12 sm:text-base"
                    style={{ background: lime }}
                  >
                    <span>View Bookkeeping Plans</span>
                    <span aria-hidden>↓</span>
                  </a>
                  <a
                    href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20would%20like%20to%20discuss%20outsourcing%20my%20bookkeeping."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-black bg-[#25d366] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000] sm:h-12 sm:text-base"
                  >
                    <WhatsappLogo size={20} weight="bold" />
                    <span>WhatsApp Consultation</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Quick Service Anchor Navigation Bento */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="rounded-[24px_24px_24px_4px] border-2 border-black bg-white p-6 shadow-[8px_8px_0_#000]">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/60">
                    Directory of Services
                  </p>
                  <p className="mt-1 text-xl font-bold tracking-tight">
                    What can I take off your desk?
                  </p>

                  <div className="mt-5 space-y-2.5">
                    <a
                      href="#bookkeeping"
                      className="group flex items-center justify-between rounded-lg border border-black/30 bg-[#f4f4f0] p-3 text-sm font-medium transition hover:border-black hover:bg-[#c8f603] hover:shadow-[2px_2px_0_#000]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Receipt size={20} weight="bold" />
                        <div>
                          <p className="font-bold leading-tight">Monthly Bookkeeping</p>
                          <p className="text-[11px] text-black/70">From $200/mo · QBO &amp; Xero</p>
                        </div>
                      </div>
                      <span className="font-bold group-hover:translate-x-0.5 transition">→</span>
                    </a>

                    <a
                      href="#dashboards"
                      className="group flex items-center justify-between rounded-lg border border-black/30 bg-[#f4f4f0] p-3 text-sm font-medium transition hover:border-black hover:bg-[#ffc900] hover:shadow-[2px_2px_0_#000]"
                    >
                      <div className="flex items-center gap-2.5">
                        <ChartBar size={20} weight="bold" />
                        <div>
                          <p className="font-bold leading-tight">Dashboard &amp; BI Development</p>
                          <p className="text-[11px] text-black/70">Power BI, Excel, SQL automation</p>
                        </div>
                      </div>
                      <span className="font-bold group-hover:translate-x-0.5 transition">→</span>
                    </a>

                    <a
                      href="#ecommerce"
                      className="group flex items-center justify-between rounded-lg border border-black/30 bg-[#f4f4f0] p-3 text-sm font-medium transition hover:border-black hover:bg-[#c8f603] hover:shadow-[2px_2px_0_#000]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Storefront size={20} weight="bold" />
                        <div>
                          <p className="font-bold leading-tight">E-Commerce &amp; Marketplace</p>
                          <p className="text-[11px] text-black/70">Amazon FBA, Shopify, COGS, Payouts</p>
                        </div>
                      </div>
                      <span className="font-bold group-hover:translate-x-0.5 transition">→</span>
                    </a>

                    <a
                      href="#tax"
                      className="group flex items-center justify-between rounded-lg border border-black/30 bg-[#f4f4f0] p-3 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white hover:shadow-[2px_2px_0_#c8f603]"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={20} weight="bold" />
                        <div>
                          <p className="font-bold leading-tight">Pakistan Tax Filing Practice</p>
                          <p className="text-[11px] text-black/70 group-hover:text-white/80">
                            FBR Iris · ATL Status · Wealth Statements
                          </p>
                        </div>
                      </div>
                      <span className="font-bold group-hover:translate-x-0.5 transition">→</span>
                    </a>

                    <a
                      href="#fpa"
                      className="group flex items-center justify-between rounded-lg border border-black/30 bg-[#f4f4f0] p-3 text-sm font-medium transition hover:border-black hover:bg-[#c8f603] hover:shadow-[2px_2px_0_#000]"
                    >
                      <div className="flex items-center gap-2.5">
                        <TrendUp size={20} weight="bold" />
                        <div>
                          <p className="font-bold leading-tight">FP&amp;A &amp; Cash Flow Modeling</p>
                          <p className="text-[11px] text-black/70">13-week forecast · Unit economics</p>
                        </div>
                      </div>
                      <span className="font-bold group-hover:translate-x-0.5 transition">→</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1: Core Bookkeeping Packages (Directly From Flyer) ── */}
      <section id="bookkeeping" className="scroll-mt-20 px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-[14px]">
                  <span
                    className="rounded-md border border-black px-2.5 py-0.5 font-bold uppercase tracking-wider text-xs"
                    style={{ background: lime }}
                  >
                    Pricing &amp; Plans
                  </span>
                </p>
                <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                  Monthly Bookkeeping Services
                </h2>
                <p className="mt-3 max-w-2xl text-base text-black/80 sm:text-lg">
                  Transparent, predictable monthly fees based on your transaction volume. No ticking clocks, no hourly surprise invoices.
                </p>
              </div>
              <div className="hidden rounded-lg border border-black bg-white px-4 py-2 sm:block text-xs font-semibold shadow-[3px_3px_0_#000]">
                QuickBooks Online · Xero · Dedicated Support
              </div>
            </div>
          </ScrollReveal>

          {/* 3 Main Pricing Cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {bookkeepingPlans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative flex h-full flex-col rounded-[24px_24px_24px_4px] border-2 border-black bg-white p-7 transition hover:-translate-y-1 ${
                    plan.highlight
                      ? "shadow-[8px_8px_0_#c8f603]"
                      : "shadow-[6px_6px_0_#000]"
                  }`}
                >
                  {plan.badge && (
                    <div
                      className="absolute -top-3.5 right-6 rounded-md border-2 border-black px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-black shadow-[2px_2px_0_#000]"
                      style={{ background: lime }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                    <p className="mt-1 text-xs text-black/70">
                      <strong className="text-black">Best for:</strong> {plan.bestFor}
                    </p>
                    <div className="mt-5 flex items-baseline gap-1.5 border-b border-black/15 pb-5">
                      <span className="text-4xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-sm font-medium text-black/70">
                        / {plan.cadence}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black text-[10px]"
                          style={{ background: plan.highlight ? lime : "#e5e5e0" }}
                        >
                          <Check size={11} weight="bold" />
                        </span>
                        <span className="leading-snug text-black/90">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-4">
                    <a
                      href={plan.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex w-full items-center justify-center gap-2 rounded-lg border border-black py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
                        plan.highlight
                          ? "bg-[#c8f603] hover:bg-black hover:text-white hover:shadow-[3px_3px_0_#000]"
                          : "bg-white hover:bg-[#c8f603] hover:shadow-[3px_3px_0_#000]"
                      }`}
                    >
                      <WhatsappLogo size={18} weight="bold" />
                      <span>Select {plan.name}</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Interactive Fee Estimator & Scope Calculator (Jiro Pattern) */}
          <div className="mt-14">
            <FeeEstimator />
          </div>

          {/* Add-On Services Grid (From Flyer) */}
          <div className="mt-14">
            <ScrollReveal>
              <div className="rounded-[24px_24px_4px_24px] border-2 border-black bg-white p-7 sm:p-10 shadow-[8px_8px_0_#000]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/20 pb-5">
                  <div>
                    <span className="rounded bg-[#ffc900] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-black">
                      Flyer Specials
                    </span>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                      Add-On Services &amp; Catch-Up Bookkeeping
                    </h3>
                  </div>
                  <p className="text-xs text-black/70 max-w-sm">
                    Can be bundled with your monthly plan or booked as a standalone sprint.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {addOnServices.map((addon) => (
                    <div
                      key={addon.title}
                      className="flex flex-col justify-between rounded-xl border border-black bg-[#f4f4f0] p-5 shadow-[3px_3px_0_#000]"
                    >
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h4 className="text-lg font-bold">{addon.title}</h4>
                          <span className="text-xs font-semibold text-black/70">
                            {addon.cadence}
                          </span>
                        </div>
                        <p className="mt-1 text-2xl font-extrabold text-black">
                          {addon.price}
                        </p>
                        <p className="mt-3 text-xs leading-relaxed text-black/80">
                          {addon.desc}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-black/15 pt-3">
                        <ul className="space-y-1.5 text-xs font-medium text-black">
                          {addon.items.map((item) => (
                            <li key={item} className="flex items-center gap-1.5">
                              <span className="text-[#c8f603]">✦</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scope Transparency Notice (As indicated on flyer) */}
                <div className="mt-8 flex items-start gap-3 rounded-lg border border-black/30 bg-[#fff9d6] p-4 text-xs">
                  <WarningCircle size={20} weight="bold" className="shrink-0 text-amber-800" />
                  <div>
                    <strong className="font-bold text-amber-900">
                      Scope Transparency Notice (from flyer):
                    </strong>{" "}
                    <span className="text-amber-950">
                      We focus on general bookkeeping, historical reconciliations, inventory accounting, and Pakistan income tax filing. We do <strong>not</strong> currently offer payroll disbursement management or state-level US sales tax nexus filings.
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Section 2: Financial Dashboard & BI Development ── */}
      <section id="dashboards" className="scroll-mt-20 border-y border-black bg-white px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-black bg-[#ffc900] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                  <ChartBar size={16} weight="bold" />
                  <span>Business Intelligence &amp; Reporting</span>
                </div>

                <h2 className="mt-4 text-[clamp(2.15rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                  Executive Financial Dashboards.
                </h2>

                <p className="mt-4 text-base leading-relaxed text-black/80 sm:text-lg">
                  Most founders look at their P&amp;L 3 weeks after month-end and try to make decisions in the rearview mirror. I build automated <strong>Power BI, Looker Studio, and dynamic Excel cockpits</strong> that refresh automatically.
                </p>

                <div className="mt-6 space-y-3.5 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-[#c8f603] text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold">Real-Time Gross &amp; Net Margin Tracking</p>
                      <p className="text-xs text-black/70">
                        See true profit after gateway fees, returns, shipping, and ad spend.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-[#c8f603] text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold">SKU &amp; ASIN Unit Economics Breakdown</p>
                      <p className="text-xs text-black/70">
                        Identify your cash cows vs. products silently draining capital.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-[#c8f603] text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold">Automated Data Pipelines (SQL &amp; Python)</p>
                      <p className="text-xs text-black/70">
                        No manual CSV copy-pasting. Direct APIs to QuickBooks, Shopify, and Amazon.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20am%20interested%20in%20building%20a%20custom%20Financial%20Dashboard%20(Power%20BI%2FExcel)%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-md border border-black px-6 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000]"
                    style={{ background: yellow }}
                  >
                    <ChartBar size={18} weight="bold" />
                    <span>Commission a Dashboard</span>
                  </a>
                  <span className="text-xs text-black/70">
                    Standalone builds from $500 or bundled with bookkeeping.
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Interactive Live Mock Dashboard Card */}
            <div className="lg:col-span-6">
              <ScrollReveal delay={0.15}>
                <div className="overflow-hidden rounded-[24px_24px_24px_4px] border-2 border-black bg-[#141414] p-5 text-white shadow-[10px_10px_0_#c8f603] sm:p-7">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#c8f603] animate-pulse" />
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#c8f603]">
                        Live Executive Cockpit (Demo)
                      </p>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/80">
                      Power BI Engine
                    </span>
                  </div>

                  {/* 4 Mini KPI Tiles */}
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                    {dashboardKPIs.map((kpi) => (
                      <div
                        key={kpi.label}
                        className="rounded-xl border border-white/15 bg-white/5 p-3.5"
                      >
                        <p className="text-[11px] font-medium text-white/60">
                          {kpi.label}
                        </p>
                        <p className="mt-1 text-2xl font-bold font-mono tracking-tight text-white">
                          {kpi.value}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="rounded bg-[#c8f603]/20 px-1.5 py-0.5 font-semibold text-[#c8f603]">
                            {kpi.delta}
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] text-white/50 leading-tight">
                          {kpi.sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Visual Sparkline Bars */}
                  <div className="mt-5 rounded-xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span>Monthly Revenue vs. Net Operating Cash</span>
                      <span className="text-[#c8f603] font-mono">12-Mo Trend</span>
                    </div>
                    <div className="mt-3 flex h-14 items-end gap-1.5 sm:gap-2">
                      {[40, 52, 48, 65, 58, 72, 68, 85, 92, 88, 96, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end h-full">
                          <div
                            className={`w-full rounded-t-sm transition-all duration-500 ${
                              i === 11
                                ? "bg-[#c8f603]"
                                : i % 2 === 0
                                ? "bg-[#ffc900]"
                                : "bg-white/40"
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-center text-xs text-white/60">
                    ⚡ Integrated directly with QuickBooks API, Shopify GraphQL, and Amazon SP-API.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: E-Commerce Accounting & Automation Pipeline ── */}
      <section id="ecommerce" className="scroll-mt-20 px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-md border border-black bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#000]">
                E-Commerce Finance Specialization
              </span>
              <h2 className="mt-4 text-[clamp(2.15rem,5.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                Amazon FBA, Shopify &amp; Multi-Channel Reconciliation
              </h2>
              <p className="mt-4 text-base text-black/80 sm:text-lg">
                Most general bookkeepers treat Amazon deposits as single lumps of revenue. That is how sellers get blindsided by unexpected taxes or negative cash flow.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0.05}>
              <div className="h-full rounded-[20px] border-2 border-black bg-white p-7 shadow-[6px_6px_0_#000]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black bg-[#c8f603]">
                  <Receipt size={24} weight="bold" />
                </div>
                <h3 className="mt-5 text-xl font-bold">Settlement Report Ingestion</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-black/80">
                  Every 14-day Amazon settlement is split into gross sales, promotional rebates, FBA fulfillment fees, storage, refunds, and reserve holds. Everything reconciles down to the penny.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="h-full rounded-[20px] border-2 border-black bg-white p-7 shadow-[6px_6px_0_#000]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black bg-[#ffc900]">
                  <Storefront size={24} weight="bold" />
                </div>
                <h3 className="mt-5 text-xl font-bold">Multi-Currency Payout Clearing</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-black/80">
                  Shopify Payments, PayPal, Stripe, Wise, and Payoneer clearances. Tracking currency conversion fees and clearing accounts so un-deposited funds match the balance sheet.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="h-full rounded-[20px] border-2 border-black bg-white p-7 shadow-[6px_6px_0_#000]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black bg-white">
                  <Database size={24} weight="bold" />
                </div>
                <h3 className="mt-5 text-xl font-bold">Python / SQL Pipeline Automation</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-black/80">
                  Custom scripts handle high-volume transaction mapping and automated category assignment, cutting close cycles from 3 weeks to 3 days while boosting accuracy to 98%+.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Section 4: Pakistan Income Tax Return Filing (Integrated) ── */}
      <section id="tax" className="scroll-mt-20 border-y border-black bg-black text-white px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-black bg-[#c8f603] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
                  <ShieldCheck size={16} weight="bold" />
                  <span>Pakistan Tax Advisory Practice</span>
                </div>

                <h2 className="mt-4 text-[clamp(2.15rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.02]">
                  100% Iris Compliant Income Tax Return Filing.
                </h2>

                <p className="mt-4 text-base text-white/80 leading-relaxed sm:text-lg">
                  Protect your wealth, maintain your <strong>Active Taxpayer List (ATL)</strong> status, prevent 100% withholding tax penalties on bank cash and properties, and legally claim all deductions.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs font-semibold text-white/90">
                  <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 p-3">
                    <span className="text-[#c8f603]">✓</span>
                    <span>Salaried Individuals: From PKR 3,500</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 p-3">
                    <span className="text-[#c8f603]">✓</span>
                    <span>Freelancers &amp; IT Exporters: PKR 5,000</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 p-3">
                    <span className="text-[#c8f603]">✓</span>
                    <span>Wealth Statement (Sec 116) Reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 p-3">
                    <span className="text-[#c8f603]">✓</span>
                    <span>Official FBR CPR Acknowledgement in 24h</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/tax-filing"
                    className="inline-flex h-12 items-center gap-2 rounded-md border border-black bg-[#c8f603] px-7 text-sm font-bold text-black transition hover:bg-white hover:shadow-[4px_4px_0_#fff]"
                  >
                    <span>Explore Complete Tax Filing Suite</span>
                    <ArrowRight size={18} weight="bold" />
                  </Link>
                  <Link
                    href="/tax-calculator"
                    className="inline-flex h-12 items-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                  >
                    <Calculator size={18} weight="bold" />
                    <span>Open Tax Calculator (TY 2026)</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={0.15}>
                <div className="rounded-[24px_24px_24px_4px] border-2 border-white/30 bg-[#171717] p-7 text-white shadow-[8px_8px_0_#c8f603]">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#c8f603]">
                    10,000+ Returns Filed
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">Why File With Nabeel?</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Tax returns are not just data entry. A mismatched Wealth Statement triggers automatic Section 121 and 122 audit notices. Every asset and cash inflow is balanced to zero discrepancy.
                  </p>

                  <div className="mt-5 space-y-2.5 text-xs">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="font-bold text-white">10% Medical &amp; Zakat Deductions</p>
                      <p className="text-white/60">Clause 139 Second Schedule &amp; Section 60 tax rebates claimed.</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="font-bold text-white">IT Export Rate (Sec 154A)</p>
                      <p className="text-white/60">0.25% fixed regime filing with PSEB registration advice.</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/15 pt-4 text-center">
                    <a
                      href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20want%20to%20file%20my%20Pakistan%20Income%20Tax%20Return."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white bg-white py-3 text-xs font-bold text-black transition hover:bg-[#c8f603]"
                    >
                      <WhatsappLogo size={16} weight="bold" />
                      <span>Direct WhatsApp Tax Filing</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: FP&A & Cash Flow Modeling ── */}
      <section id="fpa" className="scroll-mt-20 px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span
                  className="rounded-md border border-black px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                  style={{ background: lime }}
                >
                  Forward-Looking Strategy
                </span>
                <h2 className="mt-2 text-[clamp(2.15rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                  FP&amp;A &amp; 13-Week Cash Flow Forecasts.
                </h2>
                <p className="mt-3 max-w-2xl text-base text-black/80 sm:text-lg">
                  Bookkeeping tells you where your money went. FP&amp;A tells you where it is going next so you never wake up to an empty payroll account.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[20px] border-2 border-black bg-white p-7 shadow-[6px_6px_0_#000]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-black bg-[#ffc900]">
                <Clock size={22} weight="bold" />
              </div>
              <h3 className="mt-4 text-xl font-bold">13-Week Rolling Cash Flow</h3>
              <p className="mt-2 text-sm text-black/80 leading-relaxed">
                Direct-method cash model projecting weekly receipts, disbursements, inventory deposits, and tax payments.
              </p>
            </div>

            <div className="rounded-[20px] border-2 border-black bg-white p-7 shadow-[6px_6px_0_#000]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-black bg-[#c8f603]">
                <TrendUp size={22} weight="bold" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Scenario &amp; Hiring Modeling</h3>
              <p className="mt-2 text-sm text-black/80 leading-relaxed">
                Should you hire two reps, increase ad spend by $10K, or purchase container stock? We model the exact break-even timeline.
              </p>
            </div>

            <div className="rounded-[20px] border-2 border-black bg-white p-7 shadow-[6px_6px_0_#000]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-black bg-white">
                <FileText size={22} weight="bold" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Budget vs. Actual Variance</h3>
              <p className="mt-2 text-sm text-black/80 leading-relaxed">
                Monthly variance analysis dissecting why revenue missed target or why COGS expanded, with corrective action steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Interactive Scope & Pricing Calculator ── */}
      <section id="calculator" className="scroll-mt-20 border-t border-black bg-[#f0f0eb] px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="text-center">
              <span className="rounded-md border border-black bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#000]">
                Interactive Tool
              </span>
              <h2 className="mt-3 text-[clamp(2.15rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                Estimate Your Custom Bookkeeping Package
              </h2>
              <p className="mt-3 text-base text-black/80">
                Adjust your transaction volume and account count to see an instant monthly estimate.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 rounded-[28px_28px_28px_4px] border-2 border-black bg-white p-6 shadow-[10px_10px_0_#000] sm:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Controls */}
              <div className="space-y-6 lg:col-span-7">
                <div>
                  <div className="flex items-center justify-between text-sm font-bold">
                    <label htmlFor={txVolumeId}>Monthly Transaction Volume</label>
                    <span className="rounded bg-[#c8f603] px-2 py-0.5 font-mono text-sm">
                      {txVolume} txns/mo
                    </span>
                  </div>
                  <input
                    id={txVolumeId}
                    type="range"
                    min="30"
                    max="600"
                    step="10"
                    value={txVolume}
                    onChange={(e) => setTxVolume(Number(e.target.value))}
                    className="mt-3 w-full accent-black cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-black/60">
                    <span>&lt; 50 (Micro)</span>
                    <span>100 (Basic)</span>
                    <span>200 (Standard)</span>
                    <span>350+ (Advanced)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={bankAccountsId} className="block text-xs font-bold uppercase text-black/70">
                      Bank Accounts
                    </label>
                    <select
                      id={bankAccountsId}
                      value={bankAccounts}
                      onChange={(e) => setBankAccounts(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-lg border-2 border-black bg-[#f4f4f0] p-2.5 text-sm font-semibold"
                    >
                      <option value={1}>1 Bank Account</option>
                      <option value={2}>2 Bank Accounts</option>
                      <option value={3}>3 Bank Accounts</option>
                      <option value={4}>4+ Bank Accounts</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={creditCardsId} className="block text-xs font-bold uppercase text-black/70">
                      Credit Cards
                    </label>
                    <select
                      id={creditCardsId}
                      value={creditCards}
                      onChange={(e) => setCreditCards(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-lg border-2 border-black bg-[#f4f4f0] p-2.5 text-sm font-semibold"
                    >
                      <option value={0}>0 Credit Cards</option>
                      <option value={1}>1 Credit Card</option>
                      <option value={2}>2 Credit Cards</option>
                      <option value={3}>3+ Credit Cards</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/15">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/70 mb-3">
                    Optional Add-Ons (From Flyer)
                  </p>

                  <label className="flex items-center gap-3 cursor-pointer select-none rounded-lg border border-black/20 p-3 hover:bg-[#f4f4f0]">
                    <input
                      type="checkbox"
                      checked={needsInventory}
                      onChange={(e) => setNeedsInventory(e.target.checked)}
                      className="h-4 w-4 rounded accent-black"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-black">Inventory &amp; COGS Tracking (+$150/mo)</p>
                      <p className="text-black/60">For e-commerce sellers managing stock across warehouses.</p>
                    </div>
                  </label>

                  <div className="mt-3">
                    <label htmlFor={cleanupMonthsId} className="block text-xs font-semibold text-black/80">
                      Historical Books Behind / Cleanup Needed?
                    </label>
                    <select
                      id={cleanupMonthsId}
                      value={cleanupMonths}
                      onChange={(e) => setCleanupMonths(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-lg border-2 border-black bg-[#f4f4f0] p-2.5 text-xs font-semibold"
                    >
                      <option value={0}>No cleanup needed — current books only</option>
                      <option value={3}>1 to 3 Months Behind (+$300 one-time)</option>
                      <option value={6}>6 Months Behind (+$600 one-time)</option>
                      <option value={12}>12 Months Behind (+$1,100 one-time)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Estimate Result Display */}
              <div className="flex flex-col justify-between rounded-2xl border-2 border-black bg-[#f4f4f0] p-6 lg:col-span-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/60">
                    Calculated Estimate
                  </p>
                  <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                    ${estimatedMonthlyTotal}
                    <span className="text-base font-medium text-black/70">/mo</span>
                  </p>

                  {cleanupEstimate > 0 && (
                    <div className="mt-3 rounded-lg border border-black/30 bg-[#fff9d6] p-2.5 text-xs">
                      <p className="font-bold text-black">
                        + ${cleanupEstimate} one-time historical cleanup
                      </p>
                      <p className="text-black/70">Covers {cleanupMonths} months of retroactive catch-up.</p>
                    </div>
                  )}

                  <div className="mt-5 space-y-2 border-t border-black/15 pt-4 text-xs">
                    <p className="flex justify-between">
                      <span className="text-black/70">Suggested Tier:</span>
                      <strong className="font-bold">
                        {txVolume <= 100
                          ? "Basic ($200)"
                          : txVolume <= 200
                          ? "Standard ($300)"
                          : "Advanced ($450+)"}
                      </strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-black/70">Reconciliation:</span>
                      <span>{totalAccounts} accounts total</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-black/70">Software:</span>
                      <span>QuickBooks Online / Xero</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-black/70">Reporting:</span>
                      <span>Monthly P&amp;L + Balance Sheet</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/15">
                  <a
                    href={calculatorWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-[#25d366] py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000]"
                  >
                    <WhatsappLogo size={18} weight="bold" />
                    <span>Inquire This Scope on WhatsApp</span>
                  </a>
                  <p className="mt-2 text-center text-[10px] text-black/60">
                    Final proposal confirmed after a 15-minute diagnostic review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: FAQ ──────────────────────────────── */}
      <section className="px-5 py-20 sm:py-28 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <span
              className="rounded-md border border-black px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{ background: yellow }}
            >
              Client Questions
            </span>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              Frequently Asked Questions.
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-4">
          <ScrollReveal delay={0.05}>
            <details className="group rounded-[16px] border border-black bg-white shadow-[4px_4px_0_#000]">
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-lg">
                <span>How do you get access to my financial software?</span>
                <span className="rounded-full border border-black px-2 py-0.5 text-xs transition group-open:rotate-45" style={{ background: lime }}>+</span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-black/80">
                You invite me as an external <strong>Accountant User</strong> inside QuickBooks Online or Xero. For bank and credit card accounts, you provide read-only / view-only accountant access. I never have authority or access to disburse funds, write checks, or execute transfers.
              </p>
            </details>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <details className="group rounded-[16px] border border-black bg-white shadow-[4px_4px_0_#000]">
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-lg">
                <span>How quickly can you catch up messy or overdue books?</span>
                <span className="rounded-full border border-black px-2 py-0.5 text-xs transition group-open:rotate-45" style={{ background: lime }}>+</span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-black/80">
                A typical catch-up of 6 to 12 months is usually completed within <strong>5 to 7 business days</strong> once bank feeds or statements are connected. You receive fully reconciled statements ready for your CPA or tax filer immediately.
              </p>
            </details>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <details className="group rounded-[16px] border border-black bg-white shadow-[4px_4px_0_#000]">
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-lg">
                <span>Can you build a custom Power BI dashboard using my existing QuickBooks?</span>
                <span className="rounded-full border border-black px-2 py-0.5 text-xs transition group-open:rotate-45" style={{ background: lime }}>+</span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-black/80">
                Yes. I connect QuickBooks Online directly via API or automated export pipelines into Power BI or interactive Excel. We track gross margin, SKU profitability, overhead trends, and rolling cash flow automatically.
              </p>
            </details>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <details className="group rounded-[16px] border border-black bg-white shadow-[4px_4px_0_#000]">
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-lg">
                <span>What countries and currencies do you support?</span>
                <span className="rounded-full border border-black px-2 py-0.5 text-xs transition group-open:rotate-45" style={{ background: lime }}>+</span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-black/80">
                I support businesses in the <strong>US, UK, Canada, Australia, UAE, and Pakistan</strong>. I regularly handle multi-currency accounts in USD, GBP, EUR, CAD, AED, and PKR with proper foreign exchange realization.
              </p>
            </details>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 8: Final Booking CTA ────────────────── */}
      <section className="border-t border-black bg-[#f4f4f0] px-5 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="text-[clamp(2.25rem,6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              Ready to fix your numbers once and for all?
            </h2>
            <p className="mt-4 text-base text-black/80 sm:text-lg">
              Send me a message with a quick note on your current accounting setup. I will review your situation and send you a fixed, transparent quote.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20would%20like%20to%20discuss%20outsourcing%20my%20bookkeeping."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-black bg-[#25d366] px-8 text-base font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000]"
              >
                <WhatsappLogo size={20} weight="bold" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href="mailto:mnak.nabeel@gmail.com?subject=Bookkeeping%20Inquiry"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-black bg-white px-8 text-base font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000]"
              >
                <EnvelopeSimple size={20} weight="bold" />
                <span>Email mnak.nabeel@gmail.com</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TaxFooter />
    </div>
  );
}
