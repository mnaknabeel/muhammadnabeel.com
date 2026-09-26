"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  ShieldCheck,
  Lightning,
  Sparkle,
  WhatsappLogo,
  ArrowRight,
  Info,
} from "phosphor-react";

interface ComparisonRow {
  feature: string;
  category: string;
  diy: { text: string; status: "bad" | "warning" | "neutral" };
  typist: { text: string; status: "bad" | "warning" | "neutral" };
  agency: { text: string; status: "warning" | "neutral" | "good" };
  nabeel: { text: string; status: "good"; highlight?: boolean };
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Section 116 Wealth Reconciliation",
    category: "Audit Safety",
    diy: { text: "Frequently unbalanced; triggers FBR audit flags", status: "bad" },
    typist: { text: "Fabricated cash/expense figures with zero audit trail", status: "bad" },
    agency: { text: "Reconciled, but delegated to junior trainees", status: "warning" },
    nabeel: { text: "100% mathematically balanced down to the rupee", status: "good", highlight: true },
  },
  {
    feature: "Turnaround Time",
    category: "Speed",
    diy: { text: "6–12 hours of frustrating Iris portal errors", status: "bad" },
    typist: { text: "Unpredictable; ignores messages once paid", status: "bad" },
    agency: { text: "10 to 14 business days queue", status: "warning" },
    nabeel: { text: "Guaranteed 24 to 48-hour delivery", status: "good", highlight: true },
  },
  {
    feature: "Audit & Notice Protection",
    category: "Audit Safety",
    diy: { text: "Zero protection against Section 111/122 notices", status: "bad" },
    typist: { text: "Zero liability; ghosted when FBR sends notices", status: "bad" },
    agency: { text: "Billed at steep hourly rates (Rs. 10k+/hr)", status: "warning" },
    nabeel: { text: "Audit-proof documentation + notice consultation included", status: "good", highlight: true },
  },
  {
    feature: "Tax Optimization & Legal Deductions",
    category: "Value",
    diy: { text: "Misses medical, Zakat & school fee rebates", status: "warning" },
    typist: { text: "Blindly copies previous year without optimization", status: "bad" },
    agency: { text: "Standard deductions applied", status: "neutral" },
    nabeel: { text: "Full statutory deduction audit (10% medical, Zakat, 154A IT)", status: "good", highlight: true },
  },
  {
    feature: "Active Taxpayer List (ATL) Guarantee",
    category: "Compliance",
    diy: { text: "Dependent on knowing correct surcharge rules", status: "warning" },
    typist: { text: "High error rate; missed challan deadlines", status: "bad" },
    agency: { text: "Included", status: "good" },
    nabeel: { text: "Instant CPR payment & ATL verification proof provided", status: "good", highlight: true },
  },
  {
    feature: "Direct Communication Channel",
    category: "Support",
    diy: { text: "None (Helpdesk forums)", status: "bad" },
    typist: { text: "Inconsistent phone calls", status: "bad" },
    agency: { text: "Support tickets & account manager delays", status: "warning" },
    nabeel: { text: "Direct 1-on-1 WhatsApp access with Finance Team Lead", status: "good", highlight: true },
  },
  {
    feature: "Transparent Flat Pricing",
    category: "Value",
    diy: { text: "'Free' until costly penalties arrive", status: "warning" },
    typist: { text: "Rs. 1,500 – 2,500 (ghost filing risks)", status: "bad" },
    agency: { text: "Rs. 25,000+ with hidden consultation fees", status: "warning" },
    nabeel: { text: "Fixed transparent plans from Rs. 3,500", status: "good", highlight: true },
  },
];

export default function ComparisonMatrix() {
  const [activeTab, setActiveTab] = useState<"all" | "audit" | "speed" | "value">("all");

  const filteredRows = COMPARISON_ROWS.filter((row) => {
    if (activeTab === "all") return true;
    if (activeTab === "audit") return row.category === "Audit Safety" || row.category === "Compliance";
    if (activeTab === "speed") return row.category === "Speed" || row.category === "Support";
    if (activeTab === "value") return row.category === "Value";
    return true;
  });

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
            <Sparkle size={14} weight="bold" />
            <span>The Value Distinction</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
            Why Hire a Finance Engineer vs The Alternatives?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-700 sm:text-lg">
            A tax return isn&apos;t just paperwork—it&apos;s your permanent financial record with the state.
            See how precision engineering compares to shortcuts and corporate overhead.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Comparisons" },
              { id: "audit", label: "Audit Safety & Wealth" },
              { id: "speed", label: "Speed & Communication" },
              { id: "value", label: "Deductions & Pricing" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`rounded-full border-2 border-black px-4 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                  activeTab === t.id
                    ? "bg-black text-[#c8f603] shadow-[2px_2px_0_#c8f603]"
                    : "bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0_#000]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Comparison Table */}
        <div className="mt-12 hidden overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-[8px_8px_0_#000] lg:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-black bg-neutral-900 text-white">
                <th className="p-5 font-bold uppercase tracking-wider text-neutral-300 w-1/4">
                  Feature / Capability
                </th>
                <th className="border-l-2 border-black p-5 font-bold uppercase tracking-wider text-neutral-300 w-[22%]">
                  DIY Iris Filing
                </th>
                <th className="border-l-2 border-black p-5 font-bold uppercase tracking-wider text-neutral-300 w-[22%]">
                  Street Typists / Cheap Agents
                </th>
                <th className="border-l-2 border-black p-5 font-bold uppercase tracking-wider text-neutral-300 w-[22%]">
                  Traditional Large Firm
                </th>
                <th className="border-l-2 border-black bg-[#c8f603] p-5 font-black uppercase tracking-wider text-black w-[28%] relative">
                  <div className="absolute -top-3 right-4 rounded-md border border-black bg-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#c8f603] shadow-[1px_1px_0_#fff]">
                    Recommended
                  </div>
                  Muhammad Nabeel
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neutral-200">
              {filteredRows.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={`transition-colors hover:bg-neutral-50/80 ${
                    idx % 2 === 0 ? "bg-white" : "bg-neutral-50/40"
                  }`}
                >
                  <td className="p-4 font-bold text-black flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-black" />
                    <span>{row.feature}</span>
                  </td>

                  {/* DIY */}
                  <td className="border-l-2 border-black p-4 text-xs text-neutral-600 align-top">
                    <div className="flex items-start gap-2">
                      <XCircle size={18} className="shrink-0 text-red-500 mt-0.5" weight="fill" />
                      <span>{row.diy.text}</span>
                    </div>
                  </td>

                  {/* Cheap Typist */}
                  <td className="border-l-2 border-black p-4 text-xs text-neutral-600 align-top">
                    <div className="flex items-start gap-2">
                      <XCircle size={18} className="shrink-0 text-red-600 mt-0.5" weight="fill" />
                      <span>{row.typist.text}</span>
                    </div>
                  </td>

                  {/* Agency */}
                  <td className="border-l-2 border-black p-4 text-xs text-neutral-600 align-top">
                    <div className="flex items-start gap-2">
                      <Info size={18} className="shrink-0 text-amber-500 mt-0.5" weight="fill" />
                      <span>{row.agency.text}</span>
                    </div>
                  </td>

                  {/* Muhammad Nabeel (Highlighted Column) */}
                  <td className="border-l-2 border-black bg-[#c8f603]/15 p-4 text-xs font-semibold text-black align-top">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={19} className="shrink-0 text-black fill-[#c8f603]" weight="fill" />
                      <span className="font-extrabold text-black">{row.nabeel.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Responsive Cards Layout */}
        <div className="mt-8 space-y-4 lg:hidden">
          {filteredRows.map((row) => (
            <div
              key={row.feature}
              className="rounded-[16px] border-2 border-black bg-white p-5 shadow-[4px_4px_0_#000]"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  {row.category}
                </span>
                <span className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-[#c8f603]">
                  Comparison
                </span>
              </div>
              <h3 className="mt-2 text-base font-black text-black">{row.feature}</h3>

              {/* Nabeel Highlighted Card */}
              <div className="mt-4 rounded-xl border-2 border-black bg-[#c8f603] p-3.5 shadow-[2px_2px_0_#000]">
                <p className="text-[11px] font-black uppercase tracking-wider text-black">
                  Muhammad Nabeel (Finance Engineer)
                </p>
                <div className="mt-1.5 flex items-start gap-2 text-xs font-extrabold text-black">
                  <CheckCircle size={18} weight="fill" className="shrink-0 text-black mt-0.5" />
                  <span>{row.nabeel.text}</span>
                </div>
              </div>

              {/* Alternatives List */}
              <div className="mt-3 space-y-2 text-xs text-neutral-600">
                <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-2.5">
                  <span className="font-bold text-neutral-800">DIY Iris: </span>
                  <span>{row.diy.text}</span>
                </div>
                <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-2.5">
                  <span className="font-bold text-neutral-800">Cheap Street Typist: </span>
                  <span>{row.typist.text}</span>
                </div>
                <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-2.5">
                  <span className="font-bold text-neutral-800">Traditional Firm: </span>
                  <span>{row.agency.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-10 rounded-[18px] border-2 border-black bg-black p-6 text-white shadow-[6px_6px_0_#c8f603] sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#c8f603]">
                <ShieldCheck size={18} weight="fill" />
                <span>100% Audit-Proof FBR Guarantee</span>
              </div>
              <p className="text-lg font-black text-white sm:text-xl">
                Ready to file with zero guesswork and zero audit risk?
              </p>
              <p className="text-xs text-neutral-400 sm:text-sm">
                Get your Tax Year 2026 return prepared, reconciled, and submitted within 24 hours.
              </p>
            </div>
            <a
              href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20reviewed%20your%20comparison%20matrix%20and%20want%20to%20file%20my%20Tax%20Year%202026%20return%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border-2 border-black bg-[#c8f603] px-6 py-3 text-sm font-black text-black shadow-[3px_3px_0_#ffffff] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#ffffff]"
            >
              <WhatsappLogo size={20} weight="fill" />
              <span>Start on WhatsApp</span>
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
