"use client";

import { useState } from "react";
import Image from "next/image";
import TaxNav from "@/components/tax/TaxNav";
import TaxFooter from "@/components/tax/TaxFooter";
import { favorit } from "@/app/gumroad/fonts";
import TaxHeroCanvas from "@/components/tax/TaxHeroCanvas";
import RoadmapAscent from "@/components/tax/RoadmapAscent";
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
  ShieldCheck,
  FileText,
  Clock,
  CurrencyDollar,
  Sparkle,
  ArrowRight,
  Question,
  IdentificationCard,
  CreditCard,
  Buildings,
  AirplaneTilt,
  LockKey,
  Laptop,
} from "phosphor-react";

const lime = "#c8f603";
const yellow = "#ffc900";

interface PricingPlan {
  name: string;
  price: string;
  tag?: string;
  desc: string;
  features: string[];
  ctaText: string;
  highlight?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Salaried Individual",
    price: "PKR 3,500",
    desc: "Single salary source (employed professionals). Complete return preparation, withholding adjustments, and FBR Iris filing.",
    features: [
      "FBR Iris Income Tax Return Filing",
      "Wealth Statement (Sec 116) Reconciliation",
      "Salary Certificate (Sec 149) Analysis",
      "Medical Allowance 10% exemption claim",
      "Mobile, vehicle, & utility tax adjustments",
      "Guaranteed Active Taxpayer List (ATL) status",
      "Official FBR CPR Acknowledgement",
    ],
    ctaText: "Start Salaried Filing →",
  },
  {
    name: "Salaried + Multiple Incomes",
    price: "PKR 4,500",
    tag: "Popular",
    highlight: true,
    desc: "Salaried employees with extra income streams: rental property, bank profit on debt, stock dividends, or prize bonds.",
    features: [
      "All Salaried Package features included",
      "Rental Income calculation (Sec 15)",
      "Bank Profit on Debt (Sec 7B) adjustment",
      "Dividend & Capital Gains reporting",
      "Full Asset & Liability Wealth reconciliation",
      "Cross-check for Section 7E deemed rent",
      "Audit-proof documentation pack",
    ],
    ctaText: "Choose Multi-Income Plan →",
  },
  {
    name: "Freelancers & IT Exporters",
    price: "PKR 5,000",
    desc: "Upwork, Fiverr, remote software engineers, and digital contractors earning foreign or local remittances.",
    features: [
      "Filing under Section 154A (0.25% or 1% FTR)",
      "PSEB registration tax guidance",
      "Foreign Remittance PRC bank certificate match",
      "Wealth statement reconciliation with zero discrepancy",
      "Tax exemption certificates for international clients",
      "Active Taxpayers List maintenance",
    ],
    ctaText: "Choose Freelancer Plan →",
  },
  {
    name: "Overseas Pakistanis",
    price: "PKR 7,000",
    desc: "Non-resident Pakistanis with assets, bank accounts, or property in Pakistan who need ATL status for property & banking.",
    features: [
      "Residency status determination (Sec 82)",
      "Foreign income remittance exemption",
      "Pakistani bank accounts & property declaration",
      "Avoid 10.5% - 15% non-filer tax on property purchases",
      "NRP banking facilitation",
      "Remote filing via WhatsApp & email",
    ],
    ctaText: "Choose Overseas Plan →",
  },
  {
    name: "Business & Sole Proprietor",
    price: "PKR 8,000",
    desc: "Sole proprietors, retail, e-commerce, and service businesses requiring formal profit & loss and balance sheet filings.",
    features: [
      "Business Income & Expense Statement",
      "Balance Sheet preparation for FBR",
      "Reconciliation of sales and bank inflows",
      "Withholding tax credits (Sec 153, 236G/H)",
      "Multi-year catch-up filing if behind",
      "Tax advisory to minimize audit risk",
    ],
    ctaText: "Get Business Plan →",
  },
];

const checklistCategories = [
  {
    id: "salaried",
    label: "Salaried Employees",
    icon: IdentificationCard,
    items: [
      "CNIC copy (front & back)",
      "Annual Salary Certificate from employer (covering 1 July 2025 to 30 June 2026)",
      "Bank Account Maintenance Certificate & statement balance as of 30th June",
      "Annual Tax Deduction Certificate for mobile phones (downloadable from Jazz, Zong, Telenor, Ufone apps)",
      "Paid Vehicle Token Tax receipt or registration book (if car registered in your name)",
      "Electricity Bill tax deduction certificate (if residential connection in your name)",
      "Tuition fee receipts with school NTN (if claiming Section 60D education deduction)",
      "List of personal assets owned as of 30th June (cash, bank balance, property, vehicle, gold)",
    ],
  },
  {
    id: "freelancer",
    label: "Freelancers & IT",
    icon: Laptop,
    items: [
      "CNIC copy (front & back)",
      "Proceeds Realization Certificates (PRCs) or bank remittance advices for foreign receipts",
      "PSEB Registration Certificate (for concessional 0.25% tax rate)",
      "Bank Account statement showing closing balance as of 30th June",
      "Details of business expenses (software subscriptions, hardware, internet)",
      "Annual Tax Deduction Certificate for mobile & internet bills",
      "List of personal assets & savings as of 30th June",
    ],
  },
  {
    id: "business",
    label: "Business & Sole Proprietors",
    icon: Buildings,
    items: [
      "CNIC copy & Business NTN",
      "Total Annual Sales / Gross Revenue for the fiscal year",
      "Summary of Cost of Goods Sold (COGS) & Operating Expenses",
      "12-month Bank Statements of all business accounts",
      "Closing Bank Balance as of 30th June",
      "Withholding tax deduction certificates from clients / suppliers (CPR copies)",
      "Fixed asset schedule (machinery, office equipment, vehicles)",
    ],
  },
  {
    id: "overseas",
    label: "Overseas Pakistanis",
    icon: AirplaneTilt,
    items: [
      "CNIC / NICOP copy & Passport pages showing entry/exit stamps",
      "Proof of foreign residency / work visa (to establish Non-Resident status)",
      "Details of foreign remittances sent to Pakistan through official banking channels",
      "Pakistani bank statements showing balance as of 30th June",
      "Details of immovable property, plots, or vehicles owned in Pakistan",
    ],
  },
];

const faqs = [
  {
    q: "Why do I need to be on the Active Taxpayers List (ATL)?",
    a: "Being on the Active Taxpayers List (ATL) cuts your withholding tax by 50% to 80% across everyday financial transactions. Non-filers pay 0.9% tax on bank cash withdrawals, double tax (30%) on bank savings and dividends, triple tax on vehicle registration, and up to 15% tax on buying property compared to just 3% for filers.",
  },
  {
    q: "How long does it take to file and appear on ATL?",
    a: "We prepare and file your return within 24 to 48 hours of receiving your documents. Once filed on FBR's Iris portal, your name appears on the Active Taxpayers List immediately or upon payment of the FBR ATL surcharge for late filers.",
  },
  {
    q: "Can I get a refund for the tax deducted on my mobile phone, electricity, or car?",
    a: "Yes! Every rupee of advance withholding tax deducted on your mobile phone, internet, home electricity bills, school fees, and vehicle token tax is adjustable against your final tax liability. If your employer already deducted your full salary tax, these advance deductions create a tax refund or carry-forward balance with FBR.",
  },
  {
    q: "I haven't filed tax returns for the past 2-3 years. Can you fix it?",
    a: "Absolutely. Catch-up and back-tax filing is a core specialty. We review your bank statements and asset acquisitions for the missing years, reconstruct your Wealth Statements year-by-year, and file all pending returns with FBR so your tax record is 100% clean and compliant.",
  },
  {
    q: "What is a Wealth Statement (Section 116) and why is it important?",
    a: "A Wealth Statement is a mandatory snapshot of everything you own (bank balances, property, car, cash, gold) as of 30th June, plus a reconciliation of your annual inflows vs personal expenses. If your wealth doesn't reconcile mathematically, FBR can flag your return. We calculate every figure to the exact rupee so your reconciliation is bulletproof.",
  },
];

export default function TaxFilingPage() {
  const [selectedChecklist, setSelectedChecklist] = useState<string>("salaried");

  const currentChecklist = checklistCategories.find((c) => c.id === selectedChecklist)!;

  return (
    <div
      className={`${favorit.variable} min-h-screen bg-[#f4f4f0] text-black antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <TaxNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-black bg-[#05080f] px-5 py-12 sm:px-8 sm:py-20 text-white">
        {/* Authentic Financial Matrix Rain Canvas */}
        <TaxHeroCanvas />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column (7 Cols) */}
            <ScrollReveal className="text-left lg:col-span-7">
              {/* ATL Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-[3px_3px_0_#000]">
                <span className="h-2 w-2 rounded-full bg-emerald-700 animate-pulse" />
                <span>FBR Active Taxpayers List (ATL) Filing — Tax Year 2026</span>
              </div>

              <h1 className="mt-5 text-[clamp(2.4rem,5.5vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
                Your Tax Return. Filed Right.<br />
                <span className="rounded-lg bg-[#c8f603] px-3 py-0.5 text-black">Optimized Legally.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Expert FBR income tax return filing for salaried professionals, freelancers, overseas Pakistanis, and businesses. Stay on the Active Taxpayers List, claim all legal deductions, and get your official CPR acknowledgement in 24 hours.
              </p>

              {/* Founder Trust Micro-Bar */}
              <div className="mt-6 flex items-center gap-3.5 rounded-xl border border-white/20 bg-black/70 p-3 backdrop-blur-md shadow-[3px_3px_0_#c8f603]">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#c8f603]">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Muhammad Nabeel"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">
                    Handled directly by Muhammad Nabeel
                  </p>
                  <p className="text-slate-300">
                    Finance Engineer &amp; Tax Specialist · 10,000+ Returns Filed · 100% Iris Accuracy
                  </p>
                </div>
              </div>

              {/* Quick CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#pricing"
                  className="magnetic inline-flex h-12 items-center gap-2 rounded-xl border-2 border-white/40 bg-white px-7 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#c8f603] hover:text-black hover:shadow-[4px_4px_0_#00ff66] sm:text-base"
                >
                  <span>View Flat-Rate Plans</span>
                  <ArrowRight size={18} weight="bold" />
                </a>
                <a
                  href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20want%20to%20file%20my%20Pakistan%20Income%20Tax%20Return.%20Please%20guide%20me%20on%20how%20to%20start."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic inline-flex h-12 items-center gap-2 rounded-xl border-2 border-black bg-[#c8f603] px-6 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#ffffff] sm:text-base"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  <span>Instant File on WhatsApp</span>
                </a>
              </div>

              {/* Trust Value Props */}
              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 sm:grid-cols-4">
                <div>
                  <span className="text-xl font-black text-white">10,000+</span>
                  <p className="text-[11px] text-slate-300">Returns Filed</p>
                </div>
                <div>
                  <span className="text-xl font-black text-white">24-48h</span>
                  <p className="text-[11px] text-slate-300">Fast Turnaround</p>
                </div>
                <div>
                  <span className="rounded bg-[#c8f603] px-1.5 py-0.5 text-xl font-black text-black">Active</span>
                  <p className="mt-0.5 text-[11px] text-slate-300">Guaranteed ATL</p>
                </div>
                <div>
                  <span className="text-xl font-black text-white">100%</span>
                  <p className="text-[11px] text-slate-300">Audit Safe</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Hero Profile Trust Card (5 Cols) */}
            <ScrollReveal delay={0.15} className="flex justify-center lg:col-span-5 lg:justify-end">
              <TiltCard maxTilt={8} className="relative w-full max-w-[340px] sm:max-w-[380px]">
                {/* Floating Trust Chip top-right */}
                <FloatElement duration={2.8} y={5} className="absolute -right-3 -top-3 z-10">
                  <div className="rounded-lg border border-black bg-[#ffc900] px-3 py-1.5 text-xs font-bold text-black shadow-[3px_3px_0_#000]">
                    ✓ 100% Personal Review
                  </div>
                </FloatElement>

                {/* Main Card with Nabeel's photo */}
                <div className="spotlight-card tilt-card overflow-hidden rounded-[24px_24px_24px_4px] border-2 border-black bg-white shadow-[8px_8px_0_#c8f603]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
                    <Image
                      src="/images/profile.jpeg"
                      alt="Muhammad Nabeel — Tax Return Specialist"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 768px) 100vw, 380px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
                      <span className="rounded bg-[#c8f603] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                        Direct 1-on-1 Handling
                      </span>
                      <p className="mt-1 text-base font-bold">Muhammad Nabeel</p>
                      <p className="text-xs text-white/80">Lead Finance &amp; Tax Consultant</p>
                    </div>
                  </div>

                  <div className="border-t border-black bg-[#f4f4f0] p-4 text-xs leading-relaxed text-black">
                    <p className="font-semibold text-black">
                      &ldquo;You work directly with me — not an anonymous call center or automated bot. I personally audit every line item and reconcile your wealth to keep you safe from FBR notices.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2 text-[11px] text-black/70">
                      <span className="flex items-center gap-1 font-semibold text-emerald-800">
                        <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block" />
                        Online on WhatsApp
                      </span>
                      <span>+92 341 0224988</span>
                    </div>
                  </div>
                </div>

                {/* Floating guarantee chip bottom-left */}
                <FloatElement duration={3.2} y={-5} className="absolute -bottom-3 -left-3 z-10">
                  <div className="rounded-lg border border-black bg-white px-3 py-1.5 text-xs font-bold text-black shadow-[3px_3px_0_#000]">
                    ✦ 10,000+ Returns Filed
                  </div>
                </FloatElement>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cinematic Scroll-Animated Roadmap Ascent Section */}
      <RoadmapAscent />

      {/* Pricing Packages Section */}
      <section id="pricing" className="border-b border-black bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="text-center">
            <span className="rounded-md border border-black bg-[#c8f603] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
              Transparent Pricing
            </span>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black">
              Simple, flat-rate filing plans.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-black/75">
              Clear fees. What you see is what you pay. No consultation fees after the fact, no surprise add-ons.
            </p>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => {
              const whatsappPlanText = encodeURIComponent(
                `Hi Nabeel! I would like to choose the "${p.name}" package (${p.price}) for my Pakistan tax return filing. What documents should I send?`
              );
              return (
                <StaggerItem key={p.name}>
                  <TiltCard maxTilt={5} className="h-full">
                    <div
                      className={`spotlight-card flex h-full flex-col justify-between rounded-[24px_24px_24px_4px] border border-black p-7 transition hover:-translate-y-1 ${
                        p.highlight
                          ? "bg-[#f4f4f0] shadow-[7px_7px_0_#000] border-2"
                          : "bg-white shadow-[5px_5px_0_#000]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold tracking-tight text-black">{p.name}</h3>
                          {p.tag && (
                            <span className="rounded-full border border-black bg-[#c8f603] px-2.5 py-0.5 text-xs font-bold text-black">
                              {p.tag}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-3xl font-black tabular-nums text-black">{p.price}</p>
                        <p className="mt-3 text-xs leading-relaxed text-black/75">{p.desc}</p>

                        <div className="mt-6 border-t border-black/10 pt-5">
                          <p className="text-xs font-bold uppercase tracking-wider text-black/60">Includes:</p>
                          <ul className="mt-3 space-y-2 text-xs">
                            {p.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-2 text-black/85">
                                <Check size={16} weight="bold" className="shrink-0 text-emerald-600 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-black/10">
                        <a
                          href={`https://wa.me/923410224988?text=${whatsappPlanText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`magnetic flex w-full items-center justify-center gap-2 rounded-xl border border-black py-3 text-sm font-bold transition ${
                            p.highlight
                              ? "bg-[#c8f603] text-black hover:bg-black hover:text-white"
                              : "bg-black text-white hover:bg-[#c8f603] hover:text-black"
                          }`}
                        >
                          <WhatsappLogo size={18} weight="fill" />
                          <span>{p.ctaText}</span>
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="mt-8 rounded-xl border border-black/20 bg-[#f4f4f0] p-4 text-xs text-black/75 text-center">
            * Note for late filers: FBR charges a statutory surcharge of PKR 1,000 for individuals to appear on the Active Taxpayers List (ATL) after the official deadline. This is an official FBR government fee separate from our service fee.
          </div>
        </div>
      </section>

      {/* Interactive Document Checklist Section */}
      <section id="documents" className="border-b border-black bg-[#f4f4f0] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center">
            <span className="rounded-md border border-black bg-[#ffc900] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
              Checklist
            </span>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black">
              What you need to prepare.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-black/75">
              Select your category below to view the simple document checklist. Have these ready and we can complete your return fast.
            </p>
          </ScrollReveal>

          {/* Checklist Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {checklistCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedChecklist(cat.id)}
                  className={`flex items-center gap-2 rounded-xl border border-black px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                    selectedChecklist === cat.id
                      ? "bg-black text-white shadow-[3px_3px_0_#c8f603]"
                      : "bg-white text-black hover:bg-[#c8f603]"
                  }`}
                >
                  <Icon size={18} weight="bold" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Checklist Card */}
          <ScrollReveal delay={0.1}>
            <div className="mt-8 rounded-[24px_24px_24px_4px] border border-black bg-white p-7 shadow-[6px_6px_0_#000] sm:p-10">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <h3 className="text-xl font-bold text-black">{currentChecklist.label} Checklist</h3>
                <span className="rounded-md bg-[#c8f603] px-2.5 py-0.5 text-xs font-bold text-black">
                  {currentChecklist.items.length} Required Items
                </span>
              </div>

              <ul className="mt-6 space-y-3.5 text-sm">
                {currentChecklist.items.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3 rounded-lg border border-black/5 bg-[#f4f4f0]/60 p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black bg-[#ffc900] text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-black/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row">
                <p className="text-xs text-black/70">
                  Have these documents or questions about an item? Send them right away:
                </p>
                <a
                  href={`https://wa.me/923410224988?text=${encodeURIComponent(
                    `Hi Nabeel! I have my ${currentChecklist.label} documents ready for Tax Year 2026. Can you review and file?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-black bg-[#c8f603] px-5 py-2.5 text-xs font-bold text-black transition hover:shadow-[3px_3px_0_#000]"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>Send Documents on WhatsApp →</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="border-b border-black bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center">
            <span className="rounded-md border border-black bg-[#c8f603] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
              Common Questions
            </span>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-black">
              Frequently asked questions.
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {faqs.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.08}>
                <details
                  className="group rounded-2xl border border-black bg-[#f4f4f0] p-5 transition [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-black sm:text-base">
                    <span>{f.q}</span>
                    <span className="rounded-full border border-black bg-white px-2 py-0.5 text-sm transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-black/80 border-t border-black/10 pt-3">
                    {f.a}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Your Tax Practitioner Section ──────────────── */}
      <section className="border-b border-black bg-[#f4f4f0] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <TiltCard maxTilt={5}>
              <div className="overflow-hidden rounded-[24px_24px_24px_4px] border-2 border-black bg-white shadow-[8px_8px_0_#000]">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="relative min-h-[320px] md:min-h-full md:col-span-5 bg-black/5">
                    <Image
                      src="/images/profile-about.jpeg"
                      alt="Muhammad Nabeel — Tax Practitioner"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute top-4 left-4 rounded-md border border-black bg-[#c8f603] px-3 py-1 text-xs font-bold text-black shadow-[2px_2px_0_#000]">
                      Your Dedicated Tax Practitioner
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-10 md:col-span-7">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#ffc900] px-2.5 py-0.5 text-xs font-bold">Verified Practitioner</span>
                        <span className="text-xs text-black/60 font-semibold">10,000+ Returns Filed · 5+ Yrs</span>
                      </div>
                      <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-black">
                        Hi, I&apos;m Muhammad Nabeel.
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-black/80">
                        I am a <strong>Finance Engineer &amp; Tax Practitioner</strong> (Finance Team Lead at LeapAI Solution). Over the last 5 years, I have reconciled over <strong>$4M+ in client revenue</strong> and successfully filed over <strong>10,000+ tax returns</strong> with mathematical precision.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-black/80">
                        Most tax problems in Pakistan happen when people hire unqualified brokers who rush submissions without reconciling wealth statements, leaving clients exposed to FBR audit notices.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-black/80">
                        When you file with me, I personally verify your salary certificate, apply every statutory deduction allowed under the Income Tax Ordinance 2026, and ensure your closing wealth reconciles to the exact rupee.
                      </p>
                    </div>

                    <div className="mt-6 border-t border-black/10 pt-4 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-black">Muhammad Nabeel</p>
                        <p className="text-[11px] text-black/70">LeapAI Finance Lead · FBR Tax Practitioner</p>
                      </div>
                      <a
                        href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20saw%20your%20profile%20and%20want%20to%20file%20my%20tax%20return%20with%20you."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic inline-flex items-center gap-2 rounded-lg border border-black bg-[#c8f603] px-4 py-2 text-xs font-bold text-black transition hover:shadow-[3px_3px_0_#000]"
                      >
                        <WhatsappLogo size={16} weight="fill" />
                        <span>Chat 1-on-1 with Me →</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Final Action Banner */}
      <section className="bg-black px-5 py-16 sm:px-8 sm:py-24 text-white">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <span className="rounded bg-[#c8f603] px-3 py-1 text-xs font-bold text-black">
            Stress-Free FBR Filing
          </span>
          <h2 className="mt-4 text-[clamp(2.25rem,6vw,4.25rem)] font-bold tracking-tight text-white leading-tight">
            Ready to file your return?<br />
            We&apos;ll take it from here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Send a quick message on WhatsApp. We confirm your plan, collect your documents, optimize your deductions, and file directly on FBR Iris.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20want%20to%20file%20my%20Pakistan%20Income%20Tax%20Return."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-black bg-[#c8f603] px-8 text-base font-bold text-black transition hover:bg-white hover:shadow-[4px_4px_0_#fff]"
            >
              <WhatsappLogo size={22} weight="fill" />
              <span>Chat Directly with Nabeel on WhatsApp →</span>
            </a>
          </div>
          <p className="mt-4 text-xs text-white/60">
            Confidentiality guaranteed. All personal data handled in accordance with professional accounting standards.
          </p>
        </ScrollReveal>
      </section>

      <TaxFooter />
    </div>
  );
}
