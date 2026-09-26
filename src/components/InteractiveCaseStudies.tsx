"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkle,
  ArrowRight,
  CheckCircle,
  WarningCircle,
  Code,
  ChartLineUp,
  WhatsappLogo,
  ShieldCheck,
  TrendUp,
} from "phosphor-react";

interface CaseStudy {
  id: string;
  category: string;
  tag: string;
  title: string;
  client: string;
  summary: string;
  challenge: string;
  solution: string[];
  metrics: { value: string; label: string; subtext: string }[];
  quote?: string;
  quoteAuthor?: string;
  whatsappMsg: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "amazon-fba",
    category: "E-Commerce Finance Automation",
    tag: "$1.2M/yr Amazon FBA Brand",
    title: "Amazon FBA multi-marketplace settlement transformation & SKU-level P&L",
    client: "Multi-channel Amazon US & UK Seller",
    summary:
      "Automated bi-weekly settlement ingestion pipeline, eliminating 3-week closing delays and giving the founder real-time gross margin by ASIN.",
    challenge:
      "6 months of delayed bank reconciliation. Settlement reports were dumped as lump sums into QuickBooks, hiding high advertising costs, FBA storage fee spikes, and inaccurate inventory valuation.",
    solution: [
      "Engineered automated Python ingestion script parsing bi-weekly Amazon flat files directly into QuickBooks Online.",
      "Separated gross sales, Amazon referral fees, FBA pick & pack, PPC ad spend, and inventory adjustments by SKU.",
      "Implemented automated landed-cost COGS tracking to provide real-time contribution margin per product.",
    ],
    metrics: [
      { value: "3w → 3d", label: "Monthly Close Cycle", subtext: "85% reduction in closing time" },
      { value: "$18.4K", label: "Discrepancies Recovered", subtext: "Unreconciled Amazon reimbursement claims" },
      { value: "100%", label: "SKU-Level Visibility", subtext: "Real-time contribution margin by ASIN" },
    ],
    quote:
      "Nabeel didn't just clean up 6 months of messy books; he built an automated machine that gave us our sanity back. We finally know our exact profit per SKU.",
    quoteAuthor: "Managing Director, E-Commerce Brand",
    whatsappMsg:
      "Hi Nabeel, I run an e-commerce business and want to automate my bookkeeping and SKU margins like in your Amazon case study.",
  },
  {
    id: "multi-entity",
    category: "Process Scalability & Systems",
    tag: "25+ Business Entities",
    title: "Multi-entity accounting standardization: absorbing 30% growth with zero new hires",
    client: "Boutique Advisory & Holding Firm",
    summary:
      "Overhauled financial SOPs and automated reconciliation feeds across 25+ client accounts in QuickBooks and Xero.",
    challenge:
      "Every client account had bespoke, inconsistent chart of accounts. Month-end closes took 70+ manual hours of repetitive data matching, capping the firm's growth.",
    solution: [
      "Standardized chart of accounts and automated bank feed rules across 25+ client files.",
      "Engineered multi-currency clearing workflows for seamless Stripe, PayPal, and wire matching.",
      "Built automated month-end reconciliation checklists and variance review dashboards.",
    ],
    metrics: [
      { value: "+30%", label: "Capacity Absorption", subtext: "Zero additional staff hired" },
      { value: "-70%", label: "Manual Closing Hours", subtext: "From 70 hours to under 20 hours" },
      { value: "100%", label: "Audit Readiness", subtext: "Zero reconciliation gaps at year-end" },
    ],
    quote:
      "We took on 8 new enterprise clients without hiring an extra bookkeeper. Nabeel's processes are bulletproof.",
    quoteAuthor: "Founding Partner, Multi-Client Firm",
    whatsappMsg:
      "Hi Nabeel, I manage multiple entities and need help standardizing and automating our financial processes.",
  },
  {
    id: "margin-audit",
    category: "Audit & Turnaround",
    tag: "$850K Regional Operations",
    title: "Delivery fleet financial review: uncovering hidden losses and expanding margins by +15%",
    client: "Regional Logistics & Fleet Operator",
    summary:
      "Deep 18-month operational audit identifying unprofitable territories, restructuring pricing models, and rebuilding cash reserves.",
    challenge:
      "The business was growing top-line revenue but consistently burning cash. The founder had zero visibility into unit economics per delivery zone or fleet vehicle.",
    solution: [
      "Conducted forensic audit of 18 months of operational expenses, fuel logs, and driver payout data.",
      "Allocated direct vehicle depreciation, maintenance, and dispatch overhead to individual delivery zones.",
      "Identified that 3 of 8 operational zones were severely cash-flow negative and recommended immediate repricing.",
    ],
    metrics: [
      { value: "+15%", label: "Operating Margin Gain", subtext: "Restored positive monthly cash flow" },
      { value: "3 of 8", label: "Zones Fixed / Repriced", subtext: "Unprofitable contracts restructured" },
      { value: "13-Week", label: "Cash Forecast Model", subtext: "Accurate rolling runway visibility" },
    ],
    quote:
      "His audit saved our business from bleeding out. We stopped subsidizing unprofitable routes and turned our margins around in 60 days.",
    quoteAuthor: "Chief Operations Officer",
    whatsappMsg:
      "Hi Nabeel, I need a comprehensive financial review and cash flow model for my business operations.",
  },
  {
    id: "fbr-tax-defense",
    category: "Pakistan Tax Advisory",
    tag: "High-Net-Worth IT Exporter",
    title: "Section 111 FBR notice resolution & audit-proof wealth statement reconstruction",
    client: "Tech Founder & IT Exporter",
    summary:
      "Resolved an FBR unexplained wealth notice caused by a roadside typist's fabricated figures, legally restoring Active Taxpayer List (ATL) status.",
    challenge:
      "Client was slammed with a punitive FBR audit notice u/s 111 due to previous typist entering arbitrary wealth numbers that mismatched bank inflows and property purchases.",
    solution: [
      "Forensically reconciled 3 years of foreign IT remittance PRC certificates under Section 154A (1% / 0.25% PSEB exemption).",
      "Rebuilt Section 116 Wealth Reconciliation statement down to the exact rupee, matching bank balances and registered assets.",
      "Submitted formal legal response and revised returns through FBR Iris portal with comprehensive audit trails.",
    ],
    metrics: [
      { value: "Rs. 0", label: "FBR Penalties Paid", subtext: "Notice dropped with full compliance" },
      { value: "24h", label: "ATL Status Restored", subtext: "100% withholding tax penalty eliminated" },
      { value: "Rs. 480K+", label: "Withholding Tax Saved", subtext: "Exempt from non-filer cash deduction" },
    ],
    quote:
      "Nabeel saved me from what could have been a financial nightmare with the FBR. His mathematical rigor on wealth reconciliation is unmatched.",
    quoteAuthor: "Tech Founder & Overseas Investor",
    whatsappMsg:
      "Hi Nabeel, I have an issue with my Pakistan tax return or need Section 116 wealth statement reconciliation.",
  },
];

export default function InteractiveCaseStudies() {
  const [activeId, setActiveId] = useState<string>("amazon-fba");

  const currentCase = CASE_STUDIES.find((c) => c.id === activeId) || CASE_STUDIES[0];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
            <Sparkle size={14} weight="bold" />
            <span>Proven Engineering Case Studies</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
            Real Financial Bottlenecks. Engineered Solutions.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-700 sm:text-lg">
            Explore how mathematical rigor, automated Python workflows, and precision accounting transform chaotic books into high-margin growth engines.
          </p>

          {/* Case Navigation Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CASE_STUDIES.map((c) => {
              const active = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`rounded-full border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition ${
                    active
                      ? "bg-black text-[#c8f603] shadow-[3px_3px_0_#c8f603]"
                      : "bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0_#000]"
                  }`}
                >
                  {c.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Case Study Detail Card */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[24px] border-2 border-black bg-white shadow-[8px_8px_0_#000]"
            >
              {/* Card Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black bg-neutral-900 px-6 py-4 text-white sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="rounded-md border border-black bg-[#c8f603] px-2.5 py-1 text-xs font-black uppercase tracking-wider text-black">
                    {currentCase.tag}
                  </span>
                  <span className="text-xs font-bold text-neutral-300">
                    Client: {currentCase.client}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#c8f603]">
                  <span className="h-2 w-2 rounded-full bg-[#c8f603] animate-ping" />
                  Verified Engagement
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl font-black text-black sm:text-3xl lg:text-4xl">
                  {currentCase.title}
                </h3>
                <p className="mt-3 text-base text-neutral-700 sm:text-lg">
                  {currentCase.summary}
                </p>

                {/* Challenge & Solution Grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* The Bottleneck / Challenge */}
                  <div className="rounded-[18px] border-2 border-black bg-[#fafaf8] p-6 shadow-[4px_4px_0_#000] lg:col-span-5">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600">
                      <WarningCircle size={18} weight="fill" />
                      <span>The Initial Bottleneck</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                      {currentCase.challenge}
                    </p>
                  </div>

                  {/* The Engineering Solution */}
                  <div className="rounded-[18px] border-2 border-black bg-neutral-950 p-6 text-white shadow-[4px_4px_0_#c8f603] lg:col-span-7">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#c8f603]">
                      <Code size={18} weight="bold" />
                      <span>The Engineering Solution</span>
                    </div>
                    <ul className="mt-3 space-y-2.5 text-sm text-neutral-300">
                      {currentCase.solution.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle size={18} weight="fill" className="shrink-0 text-[#c8f603] mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Verified Metrics Row */}
                <div className="mt-8">
                  <p className="text-xs font-black uppercase tracking-wider text-neutral-500">
                    Verified Performance Metrics
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {currentCase.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-[16px] border-2 border-black bg-[#c8f603]/20 p-5 shadow-[4px_4px_0_#000]"
                      >
                        <p className="text-3xl font-black text-black sm:text-4xl tabular-nums">
                          {m.value}
                        </p>
                        <p className="mt-1 text-sm font-black text-black">
                          {m.label}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-600">
                          {m.subtext}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote & CTA Footer */}
                {currentCase.quote && (
                  <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-[16px] border-2 border-black bg-[#f4f4f0] p-6 sm:flex-row">
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="text-sm font-bold italic text-neutral-800">
                        &ldquo;{currentCase.quote}&rdquo;
                      </p>
                      <p className="text-xs font-black uppercase tracking-wider text-neutral-600">
                        — {currentCase.quoteAuthor}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/923410224988?text=${encodeURIComponent(currentCase.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-black bg-black px-5 py-2.5 text-xs font-black text-[#c8f603] shadow-[3px_3px_0_#c8f603] transition hover:-translate-y-0.5"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      <span>Discuss Your Operations</span>
                      <ArrowRight size={14} weight="bold" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
