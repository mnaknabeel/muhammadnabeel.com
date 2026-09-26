"use client";

import { useState, useMemo } from "react";
import TaxNav from "@/components/tax/TaxNav";
import TaxFooter from "@/components/tax/TaxFooter";
import { favorit } from "@/app/gumroad/fonts";
import {
  calculateSalariedTax,
  calculateBusinessTax,
  calculateFreelanceTax,
  SALARIED_SLABS_TY2026,
  NON_SALARIED_SLABS_TY2026,
} from "@/lib/taxCalculators";
import { ScrollReveal, TiltCard } from "@/components/AnimatedElements";
import {
  Calculator,
  Money,
  Buildings,
  Laptop,
  CheckCircle,
  WarningCircle,
  WhatsappLogo,
  ArrowRight,
  Info,
  ShieldCheck,
} from "phosphor-react";

const lime = "#c8f603";
const yellow = "#ffc900";

export default function TaxCalculatorPage() {
  const [activeTab, setActiveTab] = useState<"salaried" | "freelance" | "business">("salaried");

  // Salaried inputs
  const [salaryInputMode, setSalaryInputMode] = useState<"monthly" | "annual">("monthly");
  const [rawSalary, setRawSalary] = useState<number>(200000); // 200k/mo default
  const [hasMedicalExemption, setHasMedicalExemption] = useState<boolean>(true);
  const [zakatPaid, setZakatPaid] = useState<number>(0);
  const [childrenFees, setChildrenFees] = useState<number>(0);
  const [numKids, setNumKids] = useState<number>(1);
  const [donations, setDonations] = useState<number>(0);
  const [pensionVps, setPensionVps] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Freelance inputs
  const [remittanceMode, setRemittanceMode] = useState<"pkr" | "usd">("pkr");
  const [rawRemittance, setRawRemittance] = useState<number>(5000000); // 5M PKR
  const [isPsebRegistered, setIsPsebRegistered] = useState<boolean>(true);

  // Business inputs
  const [rawBusinessIncome, setRawBusinessIncome] = useState<number>(4000000); // 4M PKR

  // Salaried computation
  const salariedResult = useMemo(() => {
    const grossMonthlySalary =
      salaryInputMode === "monthly" ? rawSalary : Math.round(rawSalary / 12);

    return calculateSalariedTax({
      grossMonthlySalary,
      hasMedicalAllowanceExemption: hasMedicalExemption,
      zakatPaid,
      childrenEducationFees: childrenFees,
      numberOfChildren: numKids,
      charitableDonations: donations,
      vpsPensionContribution: pensionVps,
    });
  }, [
    rawSalary,
    salaryInputMode,
    hasMedicalExemption,
    zakatPaid,
    childrenFees,
    numKids,
    donations,
    pensionVps,
  ]);

  // Freelance computation
  const freelanceResult = useMemo(() => {
    const annualPkr = remittanceMode === "pkr" ? rawRemittance : rawRemittance * 280;
    return calculateFreelanceTax(annualPkr, isPsebRegistered);
  }, [rawRemittance, remittanceMode, isPsebRegistered]);

  // Business computation
  const businessResult = useMemo(() => {
    return calculateBusinessTax(rawBusinessIncome);
  }, [rawBusinessIncome]);

  // Pre-filled WhatsApp string for salaried
  const whatsappSalariedText = encodeURIComponent(
    `Hi Nabeel! I computed my Pakistan Tax Year 2026 on your site:\n` +
      `- Gross Monthly Salary: Rs. ${(salaryInputMode === "monthly" ? rawSalary : Math.round(rawSalary / 12)).toLocaleString()}\n` +
      `- Taxable Income: Rs. ${salariedResult.taxableIncome.toLocaleString()}\n` +
      `- Estimated Annual Tax: Rs. ${salariedResult.netAnnualTax.toLocaleString()} (Rs. ${salariedResult.monthlyTax.toLocaleString()}/mo)\n` +
      `I want to file my tax return and claim my withholding deductions. Please help me file.`
  );

  return (
    <div
      className={`${favorit.variable} min-h-screen bg-[#f4f4f0] text-black antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <TaxNav />

      {/* Hero Header */}
      <section className="border-b border-black bg-white px-5 py-12 sm:px-8 sm:py-16">
        <ScrollReveal className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black bg-[#c8f603] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
            <span>FBR Income Tax Ordinance 2026</span>
            <span>✦</span>
            <span>Tax Year 2026 (FY 2025-26)</span>
          </div>
          <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[1.03] tracking-[-0.03em] text-black">
            Pakistan Income Tax Calculator.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-black/80 sm:text-lg">
            Real-time tax calculations with statutory exemptions, Section 139(b) 10% medical allowance relief, deductible Zakat, education fees, and tax credits.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("salaried")}
              className={`flex items-center gap-2 rounded-lg border border-black px-5 py-3 text-sm font-semibold transition ${
                activeTab === "salaried"
                  ? "bg-[#c8f603] shadow-[3px_3px_0_#000]"
                  : "bg-white hover:bg-[#f4f4f0]"
              }`}
            >
              <Money size={18} weight="bold" />
              <span>Salaried Individual</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("freelance")}
              className={`flex items-center gap-2 rounded-lg border border-black px-5 py-3 text-sm font-semibold transition ${
                activeTab === "freelance"
                  ? "bg-[#c8f603] shadow-[3px_3px_0_#000]"
                  : "bg-white hover:bg-[#f4f4f0]"
              }`}
            >
              <Laptop size={18} weight="bold" />
              <span>Freelancer &amp; IT Export (Sec 154A)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("business")}
              className={`flex items-center gap-2 rounded-lg border border-black px-5 py-3 text-sm font-semibold transition ${
                activeTab === "business"
                  ? "bg-[#c8f603] shadow-[3px_3px_0_#000]"
                  : "bg-white hover:bg-[#f4f4f0]"
              }`}
            >
              <Buildings size={18} weight="bold" />
              <span>Business &amp; AOP (Non-Salaried)</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* Main Calculator Body */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {activeTab === "salaried" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Inputs Column (7 Cols) */}
            <div className="space-y-6 lg:col-span-7">
              {/* Input Card */}
              <div className="rounded-[24px_24px_24px_4px] border border-black bg-white p-6 shadow-[5px_5px_0_#000] sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                  <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
                    1. Enter Your Salary
                  </h2>
                  {/* Mode Toggle */}
                  <div className="inline-flex rounded-md border border-black bg-[#f4f4f0] p-1 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        if (salaryInputMode === "annual") {
                          setRawSalary(Math.round(rawSalary / 12));
                        }
                        setSalaryInputMode("monthly");
                      }}
                      className={`rounded px-3 py-1.5 transition ${
                        salaryInputMode === "monthly" ? "bg-black text-white" : "text-black"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (salaryInputMode === "monthly") {
                          setRawSalary(rawSalary * 12);
                        }
                        setSalaryInputMode("annual");
                      }}
                      className={`rounded px-3 py-1.5 transition ${
                        salaryInputMode === "annual" ? "bg-black text-white" : "text-black"
                      }`}
                    >
                      Annual
                    </button>
                  </div>
                </div>

                {/* Salary Input & Slider */}
                <div className="mt-6">
                  <label htmlFor="gross-salary-input" className="block text-sm font-semibold text-black">
                    Gross {salaryInputMode === "monthly" ? "Monthly" : "Annual"} Salary (PKR)
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-black/60">
                      Rs.
                    </span>
                    <input
                      id="gross-salary-input"
                      type="number"
                      min={0}
                      step={5000}
                      value={rawSalary || ""}
                      onChange={(e) => setRawSalary(Number(e.target.value) || 0)}
                      className="w-full rounded-xl border border-black bg-[#f4f4f0] py-3.5 pl-14 pr-4 text-2xl font-bold tabular-nums text-black focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8f603]"
                    />
                  </div>

                  {/* Range Slider for Monthly */}
                  {salaryInputMode === "monthly" && (
                    <div className="mt-4">
                      <input
                        type="range"
                        min={30000}
                        max={1500000}
                        step={10000}
                        value={rawSalary}
                        onChange={(e) => setRawSalary(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/10 accent-black"
                        aria-label="Monthly Salary Slider"
                      />
                      <div className="mt-1 flex justify-between text-[11px] font-medium text-black/60">
                        <span>Rs. 50K</span>
                        <span>Rs. 300K</span>
                        <span>Rs. 750K</span>
                        <span>Rs. 1.5M+</span>
                      </div>
                    </div>
                  )}

                  {/* Quick Presets */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-black/60">Presets:</span>
                    {[100000, 150000, 250000, 400000, 600000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setSalaryInputMode("monthly");
                          setRawSalary(preset);
                        }}
                        className="rounded-md border border-black/20 bg-white px-2.5 py-1 text-xs font-semibold hover:border-black hover:bg-[#c8f603]"
                      >
                        Rs. {(preset / 1000).toLocaleString()}K/mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Statutory Relief Toggle */}
                <div className="mt-6 rounded-xl border border-black/20 bg-[#f4f4f0] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-black">
                        <span>Medical Allowance Exemption (10% of Basic)</span>
                        <span className="rounded bg-[#c8f603] px-1.5 py-0.5 text-[10px] font-bold">Recommended</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-black/70">
                        Under Clause (139)(b) Part I of the Second Schedule, up to 10% of basic salary is 100% tax-free if your company does not provide separate free hospitalization.
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={hasMedicalExemption}
                        onChange={(e) => setHasMedicalExemption(e.target.checked)}
                        className="peer sr-only"
                        aria-label="Toggle Medical Allowance Exemption"
                      />
                      <div className="peer h-6 w-11 rounded-full border border-black bg-white peer-checked:bg-[#c8f603] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-black after:bg-black after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-black"></div>
                    </label>
                  </div>
                  {hasMedicalExemption && (
                    <p className="mt-2 text-xs font-semibold text-emerald-800">
                      ✓ Saves you tax on Rs. {salariedResult.exemptMedicalAllowance.toLocaleString()} of salary!
                    </p>
                  )}
                </div>

                {/* Advanced Deductions Toggle */}
                <div className="mt-6 border-t border-black/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex w-full items-center justify-between text-sm font-semibold text-black hover:underline"
                  >
                    <span>
                      {showAdvanced ? "▲ Hide" : "▼ Add"} Tax Deductions &amp; Credits (Zakat, Tuition, VPS Pension)
                    </span>
                    <span className="text-xs text-black/60">
                      {showAdvanced ? "Active" : "Optional"}
                    </span>
                  </button>

                  {showAdvanced && (
                    <div className="mt-4 space-y-4 rounded-xl border border-black/15 bg-white p-4">
                      {/* Zakat */}
                      <div>
                        <label htmlFor="zakat-input" className="block text-xs font-bold text-black">
                          Zakat Paid under Ordinance (Section 60)
                        </label>
                        <input
                          id="zakat-input"
                          type="number"
                          placeholder="e.g. 50000"
                          value={zakatPaid || ""}
                          onChange={(e) => setZakatPaid(Number(e.target.value) || 0)}
                          className="mt-1 w-full rounded-md border border-black/30 p-2 text-sm"
                        />
                        <p className="mt-0.5 text-[11px] text-black/60">100% deductible from total income with official bank certificate.</p>
                      </div>

                      {/* Education fees */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="tuition-fees-input" className="block text-xs font-bold text-black">
                            Children School/Tuition Fees (Section 60D)
                          </label>
                          <span className="text-[11px] font-semibold text-amber-700">Eligible if taxable income &lt; Rs. 1.5M</span>
                        </div>
                        <div className="mt-1 grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <input
                              id="tuition-fees-input"
                              type="number"
                              placeholder="Total annual tuition fees paid"
                              value={childrenFees || ""}
                              onChange={(e) => setChildrenFees(Number(e.target.value) || 0)}
                              className="w-full rounded-md border border-black/30 p-2 text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              min={1}
                              max={6}
                              placeholder="Kids"
                              value={numKids}
                              onChange={(e) => setNumKids(Math.max(1, Number(e.target.value)))}
                              className="w-full rounded-md border border-black/30 p-2 text-sm"
                              title="Number of children"
                            />
                          </div>
                        </div>
                        <p className="mt-0.5 text-[11px] text-black/60">5% of tuition fees deducted, capped at Rs. 60K/child.</p>
                      </div>

                      {/* Approved Donations & VPS */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="donations-input" className="block text-xs font-bold text-black">
                            Donations to Approved NPOs (Sec 61)
                          </label>
                          <input
                            id="donations-input"
                            type="number"
                            placeholder="Donations via crossed cheque"
                            value={donations || ""}
                            onChange={(e) => setDonations(Number(e.target.value) || 0)}
                            className="mt-1 w-full rounded-md border border-black/30 p-2 text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="pension-vps-input" className="block text-xs font-bold text-black">
                            VPS Pension Contribution (Sec 63)
                          </label>
                          <input
                            id="pension-vps-input"
                            type="number"
                            placeholder="Voluntary Pension Fund"
                            value={pensionVps || ""}
                            onChange={(e) => setPensionVps(Number(e.target.value) || 0)}
                            className="mt-1 w-full rounded-md border border-black/30 p-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tax Slab Progress Bar Card */}
              <div className="rounded-[20px] border border-black bg-white p-6 shadow-[4px_4px_0_#000]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-black">Your Statutory Tax Bracket</h3>
                  <span className="rounded-md border border-black bg-[#ffc900] px-2.5 py-0.5 text-xs font-bold">
                    Slab {salariedResult.currentSlab.slab} of 6
                  </span>
                </div>
                <p className="mt-1 text-xs text-black/70">
                  {salariedResult.currentSlab.description}
                </p>

                {/* Visual Progress Bar across Slabs */}
                <div className="mt-4 grid grid-cols-6 gap-1">
                  {SALARIED_SLABS_TY2026.map((s, idx) => {
                    const isPassed = idx < salariedResult.currentSlabIndex;
                    const isCurrent = idx === salariedResult.currentSlabIndex;
                    return (
                      <div key={s.slab} className="flex flex-col items-center">
                        <div
                          className={`h-3.5 w-full rounded-sm border border-black transition-colors ${
                            isCurrent
                              ? "bg-[#c8f603] shadow-[0_0_10px_#c8f603]"
                              : isPassed
                              ? "bg-black"
                              : "bg-[#e5e5e0]"
                          }`}
                        />
                        <span className="mt-1 text-[10px] font-semibold text-black/70">
                          {idx === 0 ? "0%" : `${Math.round(s.rate * 100)}%`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 text-xs">
                  <span className="font-semibold text-black">Marginal Tax on next rupee:</span>
                  <span className="font-bold tabular-nums text-black">
                    {Math.round(salariedResult.currentSlab.rate * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right Output Summary Column (5 Cols) */}
            <div className="space-y-6 lg:col-span-5">
              {/* Highlight Results Card */}
              <div className="sticky top-20 space-y-6">
                <TiltCard maxTilt={4}>
                  <div className="spotlight-card spotlight-dark rounded-[24px_24px_4px_24px] border border-black bg-black p-6 text-white shadow-[6px_6px_0_#c8f603] sm:p-7">
                    <span className="rounded bg-[#c8f603] px-2.5 py-1 text-xs font-bold text-black">
                      Estimated Tax Payable
                    </span>

                    {/* Monthly Tax */}
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-wider text-white/70">Monthly Tax Deduction</p>
                      <p className="mt-1 text-4xl font-black tabular-nums text-[#c8f603] sm:text-5xl">
                        Rs. {salariedResult.monthlyTax.toLocaleString()}
                      </p>
                      <p className="mt-0.5 text-xs text-white/60">Deducted from your monthly payroll by employer</p>
                    </div>

                    {/* Annual Tax & Take Home */}
                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-white/60">Annual Tax</p>
                        <p className="text-xl font-bold tabular-nums text-white">
                          Rs. {salariedResult.netAnnualTax.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-white/60">Effective Rate</p>
                        <p className="text-xl font-bold tabular-nums text-[#ffc900]">
                          {salariedResult.effectiveTaxRate}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white/80">Monthly Take-Home:</span>
                        <span className="text-lg font-bold tabular-nums text-[#c8f603]">
                          Rs. {salariedResult.monthlyTakeHome.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action CTA */}
                    <div className="mt-6">
                      <a
                        href={`https://wa.me/923410224988?text=${whatsappSalariedText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-[#c8f603] py-3.5 text-sm font-bold text-black transition hover:bg-white hover:shadow-[3px_3px_0_#fff]"
                      >
                        <WhatsappLogo size={20} weight="fill" />
                        <span>File Return With These Numbers →</span>
                      </a>
                      <p className="mt-2 text-center text-[11px] text-white/60">
                        Claim back tax on mobile, electricity, school fees &amp; car purchases!
                      </p>
                    </div>
                  </div>
                </TiltCard>

                {/* Calculation Breakdown Sheet */}
                <div className="spotlight-card rounded-[20px] border border-black bg-white p-6 shadow-[4px_4px_0_#000]">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                    Statutory Computation Breakdown
                  </h4>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-black/5">
                      <span className="text-black/70">Gross Annual Salary:</span>
                      <span className="font-semibold tabular-nums">Rs. {salariedResult.grossAnnualSalary.toLocaleString()}</span>
                    </div>
                    {salariedResult.exemptMedicalAllowance > 0 && (
                      <div className="flex justify-between py-1 text-emerald-800 border-b border-black/5">
                        <span>Less: Medical Exemption u/s 139(b):</span>
                        <span className="font-semibold tabular-nums">- Rs. {salariedResult.exemptMedicalAllowance.toLocaleString()}</span>
                      </div>
                    )}
                    {salariedResult.totalDeductibleAllowances > 0 && (
                      <div className="flex justify-between py-1 text-emerald-800 border-b border-black/5">
                        <span>Less: Deductible Allowances (Zakat/Education):</span>
                        <span className="font-semibold tabular-nums">- Rs. {salariedResult.totalDeductibleAllowances.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 font-bold border-b border-black/10">
                      <span>Net Taxable Income:</span>
                      <span className="tabular-nums">Rs. {salariedResult.taxableIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-black/70">Gross Tax (Slab {salariedResult.currentSlab.slab}):</span>
                      <span className="font-semibold tabular-nums">Rs. {salariedResult.grossTax.toLocaleString()}</span>
                    </div>
                    {salariedResult.totalTaxCredits > 0 && (
                      <div className="flex justify-between py-1 text-emerald-800 border-b border-black/5">
                        <span>Less: Tax Credits (Donations/VPS):</span>
                        <span className="font-semibold tabular-nums">- Rs. {salariedResult.totalTaxCredits.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-black pt-2 text-sm font-bold text-black">
                      <span>Net Annual Tax Payable:</span>
                      <span className="tabular-nums">Rs. {salariedResult.netAnnualTax.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Freelancer & IT Export (Section 154A) */}
        {activeTab === "freelance" && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-[24px_24px_24px_4px] border border-black bg-white p-6 shadow-[6px_6px_0_#000] sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                <div>
                  <span className="rounded bg-[#ffc900] px-2.5 py-0.5 text-xs font-bold text-black">
                    Section 154A — Final Tax Regime (FTR)
                  </span>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
                    Freelance &amp; IT Export Tax Calculator
                  </h2>
                </div>
                {/* Currency Mode */}
                <div className="inline-flex rounded-md border border-black bg-[#f4f4f0] p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      if (remittanceMode === "usd") setRawRemittance(Math.round(rawRemittance * 280));
                      setRemittanceMode("pkr");
                    }}
                    className={`rounded px-3 py-1.5 transition ${
                      remittanceMode === "pkr" ? "bg-black text-white" : "text-black"
                    }`}
                  >
                    PKR
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (remittanceMode === "pkr") setRawRemittance(Math.round(rawRemittance / 280));
                      setRemittanceMode("usd");
                    }}
                    className={`rounded px-3 py-1.5 transition ${
                      remittanceMode === "usd" ? "bg-black text-white" : "text-black"
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* Remittance Input */}
              <div className="mt-6">
                <label htmlFor="remittance-input" className="block text-sm font-semibold text-black">
                  Annual Foreign Remittances Received via Banking Channels ({remittanceMode.toUpperCase()})
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-black/60">
                    {remittanceMode === "pkr" ? "Rs." : "$"}
                  </span>
                  <input
                    id="remittance-input"
                    type="number"
                    min={0}
                    value={rawRemittance || ""}
                    onChange={(e) => setRawRemittance(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-black bg-[#f4f4f0] py-3.5 pl-14 pr-4 text-2xl font-bold tabular-nums text-black focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8f603]"
                  />
                </div>
              </div>

              {/* PSEB Registration Switch */}
              <div className="mt-6 rounded-2xl border border-black bg-[#f4f4f0] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-black">Are you registered with PSEB? (Pakistan Software Export Board)</h3>
                    <p className="mt-1 text-xs text-black/70">
                      PSEB registration unlocks the concessional <strong>0.25% Final Tax</strong> rate under Section 154A. Without PSEB, FBR applies <strong>1% Final Tax</strong>.
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={isPsebRegistered}
                      onChange={(e) => setIsPsebRegistered(e.target.checked)}
                      className="peer sr-only"
                      aria-label="Toggle PSEB Registration"
                    />
                    <div className="peer h-7 w-12 rounded-full border border-black bg-white peer-checked:bg-[#c8f603] after:absolute after:left-[3px] after:top-[3px] after:h-5 after:w-5 after:rounded-full after:border after:border-black after:bg-black after:transition-all peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </div>

              {/* Freelancer Results Box */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <TiltCard maxTilt={5}>
                  <div className="h-full rounded-2xl border border-black bg-black p-6 text-white shadow-[4px_4px_0_#c8f603]">
                    <p className="text-xs uppercase tracking-wider text-white/70">
                      Your Final Tax Rate ({isPsebRegistered ? "PSEB Registered" : "Standard"})
                    </p>
                    <p className="mt-1 text-4xl font-black tabular-nums text-[#c8f603]">
                      {freelanceResult.taxRatePercentage}%
                    </p>
                    <div className="mt-4 border-t border-white/20 pt-3">
                      <span className="text-xs text-white/60">Annual Tax Liability:</span>
                      <p className="text-2xl font-bold tabular-nums text-white">
                        Rs. {freelanceResult.taxPayable.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard maxTilt={5}>
                  <div className="h-full rounded-2xl border border-black bg-[#c8f603] p-6 shadow-[4px_4px_0_#000]">
                    <p className="text-xs uppercase tracking-wider text-black">Tax Saved vs Regular Business Slabs</p>
                    <p className="mt-1 text-4xl font-black tabular-nums text-black">
                      Rs. {freelanceResult.taxSavingsVsNormal.toLocaleString()}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-black/80">
                      Under standard non-salaried business slabs, you would owe Rs. {freelanceResult.regularBusinessTax.toLocaleString()}. Section 154A protects 90%+ of your income!
                    </p>
                  </div>
                </TiltCard>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <a
                  href={`https://wa.me/923410224988?text=${encodeURIComponent(
                    `Hi Nabeel! I am a freelancer/IT exporter with annual remittances of Rs. ${freelanceResult.annualRemittancePkr.toLocaleString()} (${isPsebRegistered ? "PSEB Registered" : "Not PSEB"}). I need assistance filing my Tax Year 2026 return under Section 154A.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black py-4 text-base font-bold text-white transition hover:bg-[#c8f603] hover:text-black hover:shadow-[4px_4px_0_#000]"
                >
                  <WhatsappLogo size={22} weight="fill" />
                  <span>File Freelancer Return on WhatsApp →</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Business & AOP (Non-Salaried) */}
        {activeTab === "business" && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-[24px_24px_24px_4px] border border-black bg-white p-6 shadow-[6px_6px_0_#000] sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                <div>
                  <span className="rounded bg-[#c8f603] px-2.5 py-0.5 text-xs font-bold text-black">
                    Division I, Clause (1) — First Schedule
                  </span>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
                    Non-Salaried / Business &amp; AOP Tax
                  </h2>
                </div>
                <span className="rounded-md border border-black bg-[#ffc900] px-3 py-1 text-xs font-bold">
                  Slabs up to 45%
                </span>
              </div>

              <div className="mt-6">
                <label htmlFor="taxable-business-profit-input" className="block text-sm font-semibold text-black">
                  Annual Taxable Business Profit / Net Income (PKR)
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-black/60">
                    Rs.
                  </span>
                  <input
                    id="taxable-business-profit-input"
                    type="number"
                    min={0}
                    step={50000}
                    value={rawBusinessIncome || ""}
                    onChange={(e) => setRawBusinessIncome(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-black bg-[#f4f4f0] py-3.5 pl-14 pr-4 text-2xl font-bold tabular-nums text-black focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8f603]"
                  />
                </div>
              </div>

              {/* Warning Alert about 75% rule */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950">
                <WarningCircle size={22} className="shrink-0 text-amber-600" />
                <div className="text-xs leading-relaxed">
                  <strong className="font-bold">Consultant&apos;s Alert (The 75% Salary Rule):</strong> If you earn both salary and business/freelance income, your salary must exceed 75% of total income to enjoy the lower salaried tax slabs. If salary falls to 75% or below, the entire income is taxed under these heavier non-salaried slabs (up to 45%).
                </div>
              </div>

              {/* Business Results Display */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <TiltCard maxTilt={5}>
                  <div className="h-full rounded-2xl border border-black bg-black p-5 text-white shadow-[4px_4px_0_#c8f603]">
                    <p className="text-[11px] uppercase tracking-wider text-white/70">Annual Tax Liability</p>
                    <p className="mt-1 text-2xl font-black tabular-nums text-[#c8f603]">
                      Rs. {businessResult.netAnnualTax.toLocaleString()}
                    </p>
                  </div>
                </TiltCard>

                <TiltCard maxTilt={5}>
                  <div className="h-full rounded-2xl border border-black bg-white p-5 shadow-[4px_4px_0_#000]">
                    <p className="text-[11px] uppercase tracking-wider text-black/70">Monthly Tax Equivalent</p>
                    <p className="mt-1 text-2xl font-black tabular-nums text-black">
                      Rs. {businessResult.monthlyTax.toLocaleString()}
                    </p>
                  </div>
                </TiltCard>

                <TiltCard maxTilt={5}>
                  <div className="h-full rounded-2xl border border-black bg-[#ffc900] p-5 shadow-[4px_4px_0_#000]">
                    <p className="text-[11px] uppercase tracking-wider text-black">Effective Tax Rate</p>
                    <p className="mt-1 text-2xl font-black tabular-nums text-black">
                      {businessResult.effectiveTaxRate}%
                    </p>
                  </div>
                </TiltCard>
              </div>

              <div className="mt-8">
                <a
                  href={`https://wa.me/923410224988?text=${encodeURIComponent(
                    `Hi Nabeel! I have business/AOP profit of Rs. ${rawBusinessIncome.toLocaleString()} for Tax Year 2026. I would like to consult on business tax return filing, books preparation, and withholding tax adjustments.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-[#c8f603] py-4 text-base font-bold text-black transition hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000]"
                >
                  <WhatsappLogo size={22} weight="fill" />
                  <span>Consult with Nabeel on Business Filing →</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <TaxFooter />
    </div>
  );
}
