"use client";

import React, { useState } from "react";
import {
  Calculator,
  WhatsappLogo,
  CheckCircle,
  Sparkle,
  ArrowRight,
  ShieldCheck,
  Clock,
  CurrencyDollar,
  Receipt,
} from "phosphor-react";

export default function FeeEstimator() {
  const [serviceType, setServiceType] = useState<"bookkeeping" | "tax">("tax");

  // Bookkeeping inputs
  const [transactions, setTransactions] = useState<number>(150);
  const [accounts, setAccounts] = useState<number>(2);
  const [isEcommerce, setIsEcommerce] = useState<boolean>(false);
  const [needsCatchUp, setNeedsCatchUp] = useState<boolean>(false);

  // Tax inputs
  const [taxTier, setTaxTier] = useState<
    "salaried" | "salaried_plus" | "freelancer" | "overseas" | "business"
  >("salaried");

  // Calculations for Bookkeeping
  let planName = "Standard Bookkeeping";
  let planPrice = "$300";
  let planPeriod = "per month";
  let turnaround = "Weekly reconciliations & 3-day monthly close";
  let deliverables = [
    "Reconciliation of up to 2 bank & credit card accounts",
    "Categorization & error checking up to 200 txns",
    "Monthly P&L, Balance Sheet, and cash runway updates",
    "Books kept in QuickBooks Online or Xero",
  ];

  if (transactions <= 100 && accounts === 1 && !isEcommerce) {
    planName = "Basic Bookkeeping";
    planPrice = "$200";
    turnaround = "Monthly close in 3 to 4 business days";
    deliverables = [
      "Reconciliation of 1 bank account",
      "Categorization of up to 100 transactions/mo",
      "Monthly Profit & Loss (P&L) statement",
      "Annual tax-ready financial summary",
    ];
  } else if (transactions > 250 || accounts >= 4 || isEcommerce) {
    planName = "Advanced / E-Commerce Bookkeeping";
    planPrice = "$450";
    turnaround = "Daily / Weekly syncs & 3-day close";
    deliverables = [
      "Reconciliation of up to 4 bank, credit card & gateway accounts",
      "Categorization of up to 350+ transactions/mo",
      "SKU-level gross margin analysis & inventory tracking",
      "Full P&L, Balance Sheet & Cash Flow forecasting",
    ];
  }

  // Tax details
  const taxDetails = {
    salaried: {
      name: "Salaried Individual Return",
      price: "PKR 3,500",
      turnaround: "24-Hour Turnaround",
      features: [
        "Single employer salary slip & tax deduction review",
        "Section 116 Wealth Statement balanced to the rupee",
        "Statutory 10% medical expense & Zakat deductions claimed",
        "Active Taxpayer List (ATL) status guaranteed",
      ],
      waText: "Hi Nabeel, I want to file my Salaried Tax Year 2026 return (PKR 3,500). Let's get started.",
    },
    salaried_plus: {
      name: "Salaried + Multiple Income",
      price: "PKR 4,500",
      turnaround: "24 to 36-Hour Turnaround",
      features: [
        "Salary + rental yield, bank profit, or dividends",
        "Reconciliation of withholding tax deductions across multiple banks",
        "Section 116 complete asset & liability balancing",
        "Active Taxpayer List (ATL) verification",
      ],
      waText: "Hi Nabeel, I have salaried and secondary income sources and want to file my Tax Year 2026 return (PKR 4,500).",
    },
    freelancer: {
      name: "IT Exporter & Freelancer (u/s 154A)",
      price: "PKR 5,000",
      turnaround: "24 to 48-Hour Turnaround",
      features: [
        "Foreign remittances & PRC reconciliation",
        "Section 154A 1% / 0.25% PSEB tax exemption optimization",
        "Full Wealth Statement asset matching",
        "No non-filer banking deduction penalties",
      ],
      waText: "Hi Nabeel, I am an IT freelancer/exporter looking to file under Section 154A (PKR 5,000).",
    },
    overseas: {
      name: "Overseas Pakistani (NRP)",
      price: "PKR 7,000",
      turnaround: "48-Hour Turnaround",
      features: [
        "Non-resident status verification & foreign asset handling",
        "Pakistan property and Roshan Digital Account (RDA) reporting",
        "100% remote filing via WhatsApp with zero embassy visits",
        "Protection from non-filer property purchase taxes",
      ],
      waText: "Hi Nabeel, I am an Overseas Pakistani and need my Tax Year 2026 return filed (PKR 7,000).",
    },
    business: {
      name: "Business & Sole Proprietorship",
      price: "PKR 8,000",
      turnaround: "48-Hour Turnaround",
      features: [
        "P&L calculation and commercial bank feed analysis",
        "Withholding tax deduction adjustments & Section 116 balancing",
        "Full business asset, inventory & cash reconciliation",
        "Audit-ready documentation for future compliance",
      ],
      waText: "Hi Nabeel, I operate a business/sole proprietorship and need my Tax Year 2026 return filed (PKR 8,000).",
    },
  };

  const currentTax = taxDetails[taxTier];

  const bookkeepingWaText = `Hi Nabeel, I estimated my bookkeeping scope on your site: ~${transactions} txns/mo, ${accounts} accounts${isEcommerce ? ", e-commerce seller" : ""}${needsCatchUp ? ", needs catch-up" : ""}. Recommended plan is ${planName} (${planPrice}/mo). Let's discuss.`;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
            <Calculator size={14} weight="bold" />
            <span>Scope &amp; Fee Estimator</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
            Instant Scope &amp; Transparent Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold text-black sm:text-lg">
            No ambiguous quotes or surprise hourly meters. Select your parameters below for an instant, transparent fee estimate.
          </p>

          {/* Service Toggle */}
          <div className="mt-8 inline-flex rounded-full border-2 border-black bg-white p-1 shadow-[4px_4px_0_#000]">
            <button
              onClick={() => setServiceType("tax")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition ${
                serviceType === "tax"
                  ? "bg-black text-[#c8f603]"
                  : "bg-transparent text-black hover:bg-neutral-100"
              }`}
            >
              <Receipt size={16} weight="bold" />
              <span>Pakistan Tax Return</span>
            </button>
            <button
              onClick={() => setServiceType("bookkeeping")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition ${
                serviceType === "bookkeeping"
                  ? "bg-black text-[#c8f603]"
                  : "bg-transparent text-black hover:bg-neutral-100"
              }`}
            >
              <CurrencyDollar size={16} weight="bold" />
              <span>Monthly Bookkeeping</span>
            </button>
          </div>
        </div>

        {/* Interactive Estimator Box */}
        <div className="mt-12 overflow-hidden rounded-[24px] border-2 border-black bg-white shadow-[8px_8px_0_#000]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Controls */}
            <div className="border-b-2 border-black p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r-2">
              {serviceType === "tax" ? (
                <div>
                  <h3 className="text-xl font-black text-black">
                    1. Select Your Taxpayer Category
                  </h3>
                  <p className="mt-1 text-xs font-bold text-black sm:text-sm">
                    FBR Tax Year 2026 filings (Period: 1 July 2025 to 30 June 2026).
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      { id: "salaried", label: "Salaried Individual", price: "PKR 3,500", desc: "Single employer salary slips" },
                      { id: "salaried_plus", label: "Salaried + Multiple Income", price: "PKR 4,500", desc: "Salary + rent, bank profits, dividends" },
                      { id: "freelancer", label: "Freelancer / IT Exporter", price: "PKR 5,000", desc: "Section 154A 1% / 0.25% PSEB exemptions" },
                      { id: "overseas", label: "Overseas Pakistani (NRP)", price: "PKR 7,000", desc: "Foreign remittance & domestic property" },
                      { id: "business", label: "Business & Sole Prop", price: "PKR 8,000", desc: "P&L preparation & commercial bank feeds" },
                    ].map((item) => (
                      <label
                        key={item.id}
                        onClick={() => setTaxTier(item.id as typeof taxTier)}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border-2 border-black p-3.5 transition ${
                          taxTier === item.id
                            ? "bg-[#c8f603]/30 shadow-[3px_3px_0_#000]"
                            : "bg-[#fafaf8] hover:bg-neutral-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="taxTier"
                            checked={taxTier === item.id}
                            onChange={() => setTaxTier(item.id as typeof taxTier)}
                            className="h-4 w-4 accent-black"
                          />
                          <div>
                            <p className="text-sm font-black text-black">{item.label}</p>
                            <p className="text-xs font-bold text-black">{item.desc}</p>
                          </div>
                        </div>
                        <span className="rounded-md border border-black bg-black px-2.5 py-1 text-xs font-black text-[#c8f603]">
                          {item.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-black text-black">
                    1. Configure Your Transaction Volume
                  </h3>
                  <p className="mt-1 text-xs font-bold text-black sm:text-sm">
                    Drag the sliders to reflect your monthly activity.
                  </p>

                  {/* Monthly Transactions Slider */}
                  <div className="mt-6 rounded-xl border-2 border-black bg-[#fafaf8] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-black">
                        Monthly Transactions
                      </span>
                      <span className="rounded border border-black bg-[#c8f603] px-2 py-0.5 text-xs font-black text-black">
                        {transactions} {transactions >= 500 ? "+" : ""} txns/mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={500}
                      step={10}
                      value={transactions}
                      onChange={(e) => setTransactions(Number(e.target.value))}
                      className="mt-3 w-full accent-black cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[10px] font-black text-black">
                      <span>30 (Small)</span>
                      <span>200 (Growing)</span>
                      <span>500+ (High Volume)</span>
                    </div>
                  </div>

                  {/* Bank Accounts Slider */}
                  <div className="mt-4 rounded-xl border-2 border-black bg-[#fafaf8] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-black">
                        Bank &amp; Credit Card Accounts
                      </span>
                      <span className="rounded border border-black bg-[#c8f603] px-2 py-0.5 text-xs font-black text-black">
                        {accounts} {accounts >= 5 ? "+" : ""} accounts
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      step={1}
                      value={accounts}
                      onChange={(e) => setAccounts(Number(e.target.value))}
                      className="mt-3 w-full accent-black cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[10px] font-black text-black">
                      <span>1 Account</span>
                      <span>3 Accounts</span>
                      <span>6+ Accounts</span>
                    </div>
                  </div>

                  {/* Add-on toggles */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label
                      onClick={() => setIsEcommerce(!isEcommerce)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-black p-3 transition ${
                        isEcommerce ? "bg-[#c8f603]/30 shadow-[2px_2px_0_#000]" : "bg-[#fafaf8]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isEcommerce}
                        onChange={() => {}}
                        className="h-4 w-4 accent-black"
                      />
                      <span className="text-xs font-black text-black">
                        E-commerce / Amazon Seller
                      </span>
                    </label>

                    <label
                      onClick={() => setNeedsCatchUp(!needsCatchUp)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-black p-3 transition ${
                        needsCatchUp ? "bg-[#c8f603]/30 shadow-[2px_2px_0_#000]" : "bg-[#fafaf8]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={needsCatchUp}
                        onChange={() => {}}
                        className="h-4 w-4 accent-black"
                      />
                      <span className="text-xs font-black text-black">
                        Needs Past Months Catch-Up
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Card */}
            <div className="flex flex-col justify-between bg-neutral-950 p-6 text-white sm:p-8 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#c8f603] bg-[#c8f603]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#c8f603]">
                    Recommended Solution
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400">
                    <Clock size={14} className="text-[#c8f603]" />
                    <span>
                      {serviceType === "tax" ? currentTax.turnaround : turnaround}
                    </span>
                  </div>
                </div>

                <h4 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                  {serviceType === "tax" ? currentTax.name : planName}
                </h4>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#c8f603] sm:text-5xl">
                    {serviceType === "tax" ? currentTax.price : planPrice}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {serviceType === "tax" ? "flat fee / TY2026" : planPeriod}
                  </span>
                </div>

                <div className="mt-6 border-t border-neutral-800 pt-6">
                  <p className="text-xs font-black uppercase tracking-wider text-neutral-400">
                    Included Deliverables:
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                    {(serviceType === "tax" ? currentTax.features : deliverables).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={16} weight="fill" className="shrink-0 text-[#c8f603] mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-neutral-800 pt-6">
                <a
                  href={`https://wa.me/923410224988?text=${encodeURIComponent(
                    serviceType === "tax" ? currentTax.waText : bookkeepingWaText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#c8f603] py-3.5 text-sm font-black text-black shadow-[4px_4px_0_#ffffff] transition hover:-translate-y-0.5"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  <span>Lock in This Scope on WhatsApp</span>
                  <ArrowRight size={16} weight="bold" />
                </a>
                <p className="mt-2 text-center text-[11px] text-neutral-400">
                  Direct message with Muhammad Nabeel · No junior handoffs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
