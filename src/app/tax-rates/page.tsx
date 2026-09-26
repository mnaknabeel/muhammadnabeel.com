"use client";

import { useState, useMemo } from "react";
import TaxNav from "@/components/tax/TaxNav";
import TaxFooter from "@/components/tax/TaxFooter";
import { favorit } from "@/app/gumroad/fonts";
import {
  SALARIED_SLABS_TY2026,
  NON_SALARIED_SLABS_TY2026,
  WITHHOLDING_TAX_CARD,
  type WithholdingItem,
} from "@/lib/taxCalculators";
import {
  ScrollReveal,
  TiltCard,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedElements";
import {
  MagnifyingGlass,
  Warning,
  CheckCircle,
  WhatsappLogo,
  ShieldCheck,
  FileText,
  Car,
  Bank,
  House,
  ChartLineUp,
} from "phosphor-react";

const lime = "#c8f603";
const yellow = "#ffc900";

export default function TaxRatesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [slabMode, setSlabMode] = useState<"salaried" | "non-salaried">("salaried");

  const categories = ["All", "Banking", "Automobile", "Property", "Investments", "Contracts & Exports"];

  const filteredWithholding = useMemo(() => {
    return WITHHOLDING_TAX_CARD.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query) ||
        item.ruleExplanation.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div
      className={`${favorit.variable} min-h-screen bg-[#f4f4f0] text-black antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <TaxNav />

      {/* Hero Section */}
      <section className="border-b border-black bg-white px-5 py-12 sm:px-8 sm:py-16">
        <ScrollReveal className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black bg-[#ffc900] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
            <span>Income Tax Ordinance 2001 (Amended 2026)</span>
            <span>✦</span>
            <span>FBR Master Rates</span>
          </div>
          <h1 className="mt-5 text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.03] tracking-[-0.03em] text-black">
            Tax Rates &amp; Withholding Card.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold text-black sm:text-lg">
            The definitive statutory tax slabs for Tax Year 2026 and the official Filer vs. Non-Filer Withholding Tax penalties comparison.
          </p>
        </ScrollReveal>
      </section>

      {/* Part 1: Statutory Tax Slabs Table */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <ScrollReveal className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              1. Statutory Income Tax Slabs (TY 2026)
            </h2>
            <p className="mt-1 text-sm font-bold text-black">
              First Schedule, Part I, Division I — Applicable for Fiscal Year 2025-2026
            </p>
          </div>

          {/* Slabs Mode Switcher */}
          <div className="inline-flex rounded-lg border border-black bg-white p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSlabMode("salaried")}
              className={`rounded-md px-4 py-2 transition ${
                slabMode === "salaried"
                  ? "bg-[#c8f603] text-black shadow-[2px_2px_0_#000]"
                  : "text-black hover:bg-neutral-100"
              }`}
            >
              Salaried Individuals (0% to 35%)
            </button>
            <button
              type="button"
              onClick={() => setSlabMode("non-salaried")}
              className={`rounded-md px-4 py-2 transition ${
                slabMode === "non-salaried"
                  ? "bg-[#c8f603] text-black shadow-[2px_2px_0_#000]"
                  : "text-black hover:bg-neutral-100"
              }`}
            >
              Non-Salaried &amp; AOPs (0% to 45%)
            </button>
          </div>
        </ScrollReveal>

        {/* Table Card */}
        <ScrollReveal delay={0.1}>
          <div className="overflow-hidden rounded-[20px] border border-black bg-white shadow-[6px_6px_0_#000]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-black bg-black text-white">
                <tr>
                  <th className="px-6 py-4 font-bold">Slab</th>
                  <th className="px-6 py-4 font-bold">Taxable Income Range (PKR)</th>
                  <th className="px-6 py-4 font-bold">Rate of Tax</th>
                  <th className="px-6 py-4 font-bold">Base Fixed Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {(slabMode === "salaried" ? SALARIED_SLABS_TY2026 : NON_SALARIED_SLABS_TY2026).map((slab) => (
                  <tr key={slab.slab} className="hover:bg-[#f4f4f0]/70 transition">
                    <td className="px-6 py-4 font-bold">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black bg-[#ffc900] text-xs font-bold">
                        {slab.slab}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium tabular-nums">
                      {slab.max === Infinity
                        ? `Exceeding Rs. ${slab.min.toLocaleString()}`
                        : `Rs. ${slab.min.toLocaleString()} — Rs. ${slab.max.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 font-bold text-black">
                      {slab.rate === 0 ? "0% (Exempt)" : `${Math.round(slab.rate * 100)}% of excess`}
                    </td>
                    <td className="px-6 py-4 tabular-nums font-bold text-black">
                      {slab.baseTax === 0 ? "Rs. 0" : `Rs. ${slab.baseTax.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-black bg-[#f4f4f0] p-4 text-xs font-bold text-black">
            <strong>Rule Distinction:</strong> An individual qualifies for salaried rates only if their salary represents <strong>more than 75%</strong> of their total taxable income for the year.
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Part 2: Searchable Withholding Tax Card */}
      <section id="withholding" className="border-t border-black bg-[#f4f4f0] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md border border-black bg-[#c8f603] px-2.5 py-0.5 text-xs font-bold text-black">
                <Warning size={14} weight="bold" />
                <span>Avoid Severe Penalties</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
                2. Withholding Tax Card (Filer vs. Non-Filer)
              </h2>
              <p className="mt-1 text-sm font-bold text-black">
                Compare withholding tax rates between Active Taxpayers (Filers) and Inactive persons (Non-Filers).
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search section or item (e.g. 236K, car, bank)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-black bg-white py-2.5 pl-10 pr-4 text-sm font-medium focus:border-black focus:outline-none focus:ring-2 focus:ring-[#c8f603]"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg border border-black px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat
                    ? "bg-black text-white shadow-[2px_2px_0_#c8f603]"
                    : "bg-white text-black hover:bg-[#c8f603]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Withholding Cards Grid */}
          <StaggerContainer staggerDelay={0.05} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredWithholding.map((item) => (
              <StaggerItem key={item.section + item.title}>
                <TiltCard maxTilt={4} className="h-full">
                  <div className="spotlight-card flex h-full flex-col justify-between rounded-[20px] border border-black bg-white p-6 shadow-[5px_5px_0_#000] transition hover:-translate-y-0.5">
                    <div>
                      <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <span className="rounded-md border border-black bg-[#ffc900] px-2 py-0.5 text-xs font-bold text-black">
                          Section {item.section}
                        </span>
                        <span className="text-xs font-black text-black uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold text-black">{item.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed font-bold text-black">
                        {item.ruleExplanation}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-black/10 pt-4">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Filer Rate */}
                        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-emerald-950">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                            <CheckCircle size={14} weight="fill" />
                            <span>FILER (ATL)</span>
                          </div>
                          <p className="mt-1 text-base font-black tabular-nums">{item.filerRate}</p>
                        </div>

                        {/* Non-Filer Rate */}
                        <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-950">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-rose-800">
                            <Warning size={14} weight="fill" />
                            <span>NON-FILER</span>
                          </div>
                          <p className="mt-1 text-base font-black tabular-nums">{item.nonFilerRate}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="font-bold text-black">Penalty Multiplier:</span>
                        <span className="rounded bg-black px-2 py-0.5 font-bold text-[#c8f603]">
                          {item.penaltyRatio}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredWithholding.length === 0 && (
            <div className="rounded-2xl border border-black bg-white p-12 text-center">
              <p className="text-base font-semibold text-black">No withholding tax items found matching &quot;{searchQuery}&quot;.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 rounded-md border border-black bg-[#c8f603] px-4 py-2 text-xs font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Bottom Banner */}
          <ScrollReveal className="mt-12">
            <TiltCard maxTilt={3}>
              <div className="rounded-[24px_24px_4px_24px] border border-black bg-black p-8 text-white shadow-[6px_6px_0_#c8f603] sm:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="rounded bg-[#c8f603] px-2.5 py-1 text-xs font-bold text-black">
                      Save Hundreds of Thousands
                    </span>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      Stop Paying Double and Triple Tax as a Non-Filer.
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">
                      Getting on the FBR Active Taxpayers List (ATL) takes 24 hours. A standard filing fee pays for itself on your very first bank transaction or vehicle registration.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a
                      href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20want%20to%20get%20on%20the%20FBR%20Active%20Taxpayers%20List%20to%20avoid%20non-filer%20withholding%20tax%20penalties."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-black bg-[#c8f603] px-6 py-4 text-sm font-bold text-black transition hover:bg-white hover:shadow-[4px_4px_0_#fff]"
                    >
                      <WhatsappLogo size={20} weight="fill" />
                      <span>Get on ATL List on WhatsApp →</span>
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      <TaxFooter />
    </div>
  );
}
