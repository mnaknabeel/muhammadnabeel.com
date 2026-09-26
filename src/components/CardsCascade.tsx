"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  CurrencyDollar,
  ChartBar,
  Code,
  ShieldCheck,
  Lightning,
} from "phosphor-react";

interface CascadeService {
  title: string;
  tagline: string;
  desc: string;
  href: string;
  bg: string;
  textColor: string;
  accentBg: string;
  accentText: string;
  icon: React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"; className?: string }>;
  tags: string[];
  metrics: string;
  deliverables: string[];
  shadowColor: string;
}

const services: CascadeService[] = [
  {
    title: "Bookkeeping & Historical Clean-up",
    tagline: "QuickBooks & Xero Perfection",
    desc: "Weekly transaction categorization, bank & credit card reconciliation, and catch-up work for accounts that sat neglected for months. Cleaned up once — then kept audit-ready every single week.",
    href: "/services#bookkeeping",
    bg: "bg-white",
    textColor: "text-black",
    accentBg: "bg-[#c8f603]",
    accentText: "text-black",
    icon: CurrencyDollar,
    tags: ["QuickBooks Online", "Xero", "1–18 Mo Catch-Up"],
    metrics: "Packages from $200/mo · 100% Tax-Ready",
    deliverables: [
      "Weekly transaction categorizations & account balancing",
      "Monthly Balance Sheet & Income Statement (P&L)",
      "Dedicated catch-up overhaul for neglected years",
    ],
    shadowColor: "#000000",
  },
  {
    title: "Financial Reporting & Dashboards",
    tagline: "Data You Can Actually Act On",
    desc: "Executive Power BI and advanced Excel models with real-time KPI tracking, SKU profitability, cash runway velocity, and month-end close delivered in 3 days rather than 3 weeks.",
    href: "/services#dashboards",
    bg: "bg-[#c8f603]",
    textColor: "text-black",
    accentBg: "bg-black",
    accentText: "text-white",
    icon: ChartBar,
    tags: ["Power BI", "Excel Financial Models", "13-Week Cash Flow"],
    metrics: "Close Cycle: 3w → 3d · SKU Profitability",
    deliverables: [
      "Automated Power BI dashboards connected to accounting feeds",
      "Product SKU-level contribution margin breakdown",
      "Working capital, cash burn & 13-week runway forecasts",
    ],
    shadowColor: "#000000",
  },
  {
    title: "E-Commerce Finance Automation",
    tagline: "Python & SQL Automated Pipelines",
    desc: "Automated ETL scripts that ingest raw Amazon settlement reports, Shopify payouts, multi-currency fees, and refund debits. Reconciles complex marketplaces with 70% less manual time.",
    href: "/services#ecommerce",
    bg: "bg-[#ffc900]",
    textColor: "text-black",
    accentBg: "bg-black",
    accentText: "text-[#c8f603]",
    icon: Code,
    tags: ["Amazon FBA", "Shopify Payouts", "Python ETL"],
    metrics: "70% Time Saved · Multi-Currency P&L",
    deliverables: [
      "Settlement batch auto-reconciliation to bank receipts",
      "Automated COGS and inventory valuation mapping",
      "Custom Python scripts for multi-platform fee tracking",
    ],
    shadowColor: "#000000",
  },
  {
    title: "Pakistan Income Tax Filing",
    tagline: "FBR Iris Advisory & Active ATL Status",
    desc: "Complete FBR income tax return preparation, Section 116 Wealth Statement balancing to zero discrepancy, and guaranteed Active Taxpayers List (ATL) maintenance for salaried, freelancers, and businesses.",
    href: "/tax-filing",
    bg: "bg-black",
    textColor: "text-white",
    accentBg: "bg-[#c8f603]",
    accentText: "text-black",
    icon: ShieldCheck,
    tags: ["Active Taxpayers List", "Section 154A", "Wealth Rec"],
    metrics: "10,000+ Returns Filed · 24-48h CPR Receipt",
    deliverables: [
      "FBR Iris return filed directly with official CPR receipt",
      "Wealth Statement (Sec 116) balanced to exact PKR 0 discrepancy",
      "10% medical allowance & advance tax deduction credit claims",
    ],
    shadowColor: "#c8f603",
  },
];

export default function CardsCascade() {
  return (
    <section id="services" className="relative px-5 pb-20 sm:pb-28 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0_#000]">
          <Lightning size={15} weight="fill" />
          <span>Cards Cascade · High-Impact Capabilities</span>
        </div>
        <h2 className="mt-3 text-[clamp(2.15rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-black">
          What I can take off your plate.
        </h2>
        <p className="mt-2 text-base text-black/75 max-w-xl sm:text-lg">
          Fixed monthly scope, zero hourly meter. Four dedicated disciplines engineered to keep your financial operations clean and audit-safe.
        </p>
      </div>

      {/* Cascading Cards Stack */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 + idx * 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full"
            >
              <div
                className={`group flex h-full flex-col justify-between rounded-[26px_26px_26px_4px] border-2 border-black ${item.bg} ${item.textColor} p-7 sm:p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_0_#000]`}
                style={{
                  boxShadow: `7px 7px 0 ${item.shadowColor}`,
                }}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/15 pb-5">
                    <span
                      className={`rounded-full border border-black px-3 py-0.5 text-xs font-bold ${item.accentBg} ${item.accentText}`}
                    >
                      {item.tagline}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black bg-white/20 text-current">
                      <Icon size={22} weight="bold" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed opacity-85">
                    {item.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 rounded-xl border border-black/10 bg-black/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-75">
                      What&apos;s Included:
                    </p>
                    <ul className="mt-2 space-y-2 text-xs sm:text-sm">
                      {item.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-2">
                          <CheckCircle
                            size={16}
                            weight="fill"
                            className="shrink-0 text-emerald-600 mt-0.5"
                          />
                          <span className="opacity-90">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-black/30 bg-black/5 px-2.5 py-1 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-5">
                  <span className="text-xs font-bold tracking-wide opacity-80">
                    ✦ {item.metrics}
                  </span>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-2 rounded-xl border border-black px-5 py-2.5 text-xs font-bold transition ${
                      item.bg === "bg-black"
                        ? "bg-[#c8f603] text-black hover:bg-white"
                        : "bg-black text-white hover:bg-[#c8f603] hover:text-black"
                    }`}
                  >
                    <span>Explore Service</span>
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
