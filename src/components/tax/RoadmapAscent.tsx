"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  FileArrowUp,
  MagnifyingGlass,
  CheckCircle,
  WhatsappLogo,
  ArrowRight,
  ShieldCheck,
  Lightning,
  Eye,
  FileText,
} from "phosphor-react";

interface RoadmapStep {
  step: string;
  tag: string;
  tagColor: string;
  title: string;
  actor: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"; className?: string }>;
  deliverables: string[];
  nabeelRole: string;
}

const steps: RoadmapStep[] = [
  {
    step: "01",
    tag: "Step 1 · 5 Minutes",
    tagColor: "#c8f603",
    title: "Share Your Documents",
    actor: "You send what you have — WhatsApp or secure Drive",
    desc: "No confusing FBR portals, no account passwords required upfront. Simply send clear photos or PDFs of your CNIC, employer salary certificate (covering 1 July 2025 to 30 June 2026), and 30th June bank statements. If you're a freelancer, share your remittance PRCs.",
    icon: FileArrowUp,
    deliverables: [
      "CNIC copy (front & back)",
      "Annual Salary Certificate or foreign remittance PRCs",
      "Bank maintenance certificate or 30th June closing statement",
      "Mobile / utility advance tax deduction certificates (if available)",
    ],
    nabeelRole: "I verify all documents within 2 hours of receipt.",
  },
  {
    step: "02",
    tag: "Step 2 · 24 Hours",
    tagColor: "#ffc900",
    title: "I Prepare & Optimize Your Return",
    actor: "I audit every line item under the Income Tax Ordinance, 2001",
    desc: "I personally compute your gross taxable income and claim all statutory deductions: Section 139(b) 10% medical allowance exemption, Zakat, children education fee allowances, and all advance tax withholding (mobile, vehicle, utilities) to minimize your tax or maximize your refund.",
    icon: MagnifyingGlass,
    deliverables: [
      "Section 139(b) 10% medical allowance statutory exemption claimed",
      "Advance withholding tax reconciled across mobile, car, & electricity",
      "Section 60 deductible allowances (Zakat & school fees) applied",
      "Net tax liability minimized legally with zero audit risk",
    ],
    nabeelRole: "Full audit to ensure not a single legal rupee of exemption is missed.",
  },
  {
    step: "03",
    tag: "Step 3 · Same Day",
    tagColor: "#c8f603",
    title: "You Review & Approve the Draft",
    actor: "100% transparency — nothing touches FBR without your consent",
    desc: "You receive a clear, plain-English summary of your draft return and a fully reconciled Section 116 Wealth Statement. Every rupee of assets, declared inflows, and living expenses is mathematically balanced. You review the draft, ask questions, and approve.",
    icon: Eye,
    deliverables: [
      "Plain-English summary of taxable income, deductions, and credits",
      "Section 116 Wealth Statement with balanced reconciliation",
      "Full opportunity to review every figure before submission",
      "Direct 1-on-1 explanation over WhatsApp for any question",
    ],
    nabeelRole: "Nothing is submitted to FBR until you review and give 100% approval.",
  },
  {
    step: "04",
    tag: "Step 4 · 24–48 Hours",
    tagColor: "#00ff66",
    title: "I File on FBR Iris & Issue Your CPR",
    actor: "Official FBR submission & Active Taxpayers List (ATL) status",
    desc: "Once you approve, I officially submit your return directly into FBR's Iris portal. You receive your official FBR Computerized Payment Receipt (CPR) acknowledgment within 24 to 48 hours, and your active status is confirmed on the ATL.",
    icon: FileText,
    deliverables: [
      "Official FBR Iris CPR acknowledgment receipt",
      "Guaranteed listing on the Active Taxpayers List (ATL)",
      "Protection from 100% non-filer withholding tax surcharges",
      "Encrypted PDF copies delivered directly to your WhatsApp",
    ],
    nabeelRole: "Guaranteed official FBR filing and ATL compliance.",
  },
];

export default function RoadmapAscent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="filing-roadmap"
      className="relative overflow-hidden border-b-2 border-black bg-[#f4f4f0] px-5 py-20 sm:px-8 sm:py-28"
    >
      {/* Background Ambience Dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-4 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0_#000]">
            <Lightning size={16} weight="fill" className="text-black animate-pulse" />
            <span>Roadmap Ascent · 4-Step Filing Process</span>
          </div>

          <h2 className="mt-4 text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-black">
            The 4-Step Process: <br className="hidden sm:inline" />
            <span className="relative inline-block rounded-lg bg-black px-3 py-0.5 text-[#c8f603]">
              From Documents to CPR.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-black/80 sm:text-lg">
            Share your documents, I prepare the return, you review, I file. That simple.
          </p>
        </div>

        {/* The Ascent Timeline */}
        <div className="relative mt-16 sm:mt-24">
          {/* Vertical Glowing Progress Line */}
          <div className="absolute left-6 top-8 bottom-12 w-1 bg-black/15 sm:left-8">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-[#c8f603] via-[#ffc900] to-[#00ff66] shadow-[0_0_12px_#c8f603]"
            />
          </div>

          {/* Steps Stack */}
          <div className="space-y-10 sm:space-y-14">
            {steps.map((s, idx) => {
              const Icon = s.icon;

              return (
                <div key={s.step} className="relative flex items-start gap-6 sm:gap-10">
                  {/* Step Marker Node */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-white shadow-[3px_3px_0_#000] sm:h-16 sm:w-16 sm:rounded-[20px] sm:shadow-[4px_4px_0_#000]">
                    <span className="text-base font-black text-black sm:text-lg">{s.step}</span>
                  </div>

                  {/* Step Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex-1 rounded-[24px_24px_24px_4px] border-2 border-black bg-white p-6 shadow-[6px_6px_0_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[9px_9px_0_#c8f603] sm:p-8"
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="rounded-full border border-black px-3 py-0.5 text-xs font-bold text-black"
                          style={{ backgroundColor: s.tagColor }}
                        >
                          {s.tag}
                        </span>
                        <span className="text-xs font-semibold text-black/60">
                          {s.actor}
                        </span>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-black bg-[#f4f4f0] text-black">
                        <Icon size={20} weight="bold" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-black sm:text-2xl">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-black/80 sm:text-base">
                      {s.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mt-5 rounded-xl border border-black/10 bg-[#fafaf7] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-black">
                        Key Deliverables &amp; Actions:
                      </p>
                      <ul className="mt-2.5 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 sm:text-sm">
                        {s.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-black/85">
                            <CheckCircle
                              size={16}
                              weight="fill"
                              className="shrink-0 text-emerald-600 mt-0.5"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nabeel's Commitment */}
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-black/75">
                      <ShieldCheck size={16} weight="fill" className="text-emerald-700 shrink-0" />
                      <span>{s.nabeelRole}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Roadmap Ascent Kickoff Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-[24px_24px_24px_4px] border-2 border-black bg-[#c8f603] p-6 shadow-[8px_8px_0_#000] sm:p-8 text-black"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:text-left text-center">
            <div>
              <span className="rounded-md border border-black bg-black px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Step 1 starts on WhatsApp
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-black">
                Have your documents ready?
              </h3>
              <p className="mt-1 text-sm text-black/80 max-w-xl">
                Send a quick WhatsApp message with your CNIC to start Step 1 directly with Muhammad Nabeel.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20want%20to%20start%20Step%201%20of%20tax%20filing.%20What%20documents%20should%20I%20send%20over%20WhatsApp%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-black bg-black px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-[4px_4px_0_#000] sm:text-base"
              >
                <WhatsappLogo size={20} weight="fill" className="text-[#25d366]" />
                <span>Launch Step 1 on WhatsApp</span>
              </a>
              <a
                href="#pricing"
                className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-black bg-white px-5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ffc900] hover:shadow-[4px_4px_0_#000] sm:text-base"
              >
                <span>View Flat Pricing</span>
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
