"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  FileArrowUp,
  MagnifyingGlass,
  Scales,
  CheckCircle,
  WhatsappLogo,
  ArrowRight,
  ShieldCheck,
  Lightning,
  Sparkle,
} from "phosphor-react";

interface RoadmapStep {
  number: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"; className?: string }>;
  deliverables: string[];
  timing: string;
  stat: { value: string; label: string };
}

const steps: RoadmapStep[] = [
  {
    number: "01",
    badge: "Fast Intake",
    badgeColor: "#c8f603",
    title: "Secure Document Intake",
    subtitle: "Zero Paperwork Friction",
    description:
      "Send your basic documents directly via WhatsApp or encrypted Drive: CNIC, annual employer salary certificate (covering 1 July 2025 to 30 June 2026), and 30th June bank statements. No confusing FBR portal logins or messy spreadsheets required.",
    icon: FileArrowUp,
    deliverables: [
      "CNIC & Employer Salary Certificate verification",
      "Bank maintenance certificates & 30th June closing balances",
      "Mobile & utility tax deduction certificates extraction",
      "Foreign remittance PRCs match (for Freelancers & IT exporters)",
    ],
    timing: "Day 1 — Within 2 Hours",
    stat: { value: "10 mins", label: "Average client time required" },
  },
  {
    number: "02",
    badge: "Tax Optimization",
    badgeColor: "#ffc900",
    title: "Diagnostic & Deductions Audit",
    subtitle: "Claim Every Statutory Exemption",
    description:
      "We audit your records against the Income Tax Ordinance, 2001 to claim every legal rupee of tax relief: 10% medical allowance under Section 139(b), Zakat deductions, school fee allowances, and withholding credits across utilities, vehicles, and banking.",
    icon: MagnifyingGlass,
    deliverables: [
      "Section 139(b) 10% medical allowance exemption claimed",
      "Section 60 deductible allowances (Zakat & children education)",
      "Withholding tax slip reconciliation (mobile, electricity, car token)",
      "Advance tax credits computed to minimize net liability",
    ],
    timing: "Day 1–2 — In-depth Audit",
    stat: { value: "Up to 35%", label: "Average tax saved legally" },
  },
  {
    number: "03",
    badge: "Reconciliation",
    badgeColor: "#c8f603",
    title: "Wealth Statement (Sec 116) Balancing",
    subtitle: "Mathematical Zero-Discrepancy Proof",
    description:
      "A Wealth Statement snapshot of everything you own (bank accounts, real estate, vehicles, cash, gold) is reconciled against your annual income and household expenses. We balance your wealth equation to exact zero, protecting you from automated FBR scrutiny.",
    icon: Scales,
    deliverables: [
      "Opening wealth to closing wealth asset reconciliation",
      "Declared inflows balanced against declared living expenses",
      "Mathematical proof of zero un-reconciled discrepancy",
      "Audit-proof documentation pack organized for records",
    ],
    timing: "Day 2 — Precision Balancing",
    stat: { value: "PKR 0", label: "Discrepancy tolerance" },
  },
  {
    number: "04",
    badge: "FBR Submission",
    badgeColor: "#00ff66",
    title: "Official Iris Filing & CPR Issuance",
    subtitle: "Active Taxpayers List (ATL) Guaranteed",
    description:
      "You review and approve the final computation. We submit your return directly into FBR Iris. You receive the official FBR Computerized Payment Receipt (CPR) acknowledgement within 24 to 48 hours, ensuring instant Active Taxpayer List (ATL) status.",
    icon: ShieldCheck,
    deliverables: [
      "Official FBR Iris acknowledgment CPR receipt",
      "Immediate verification on FBR Active Taxpayers List (ATL)",
      "Protection from 100% non-filer withholding tax surcharges",
      "Permanent encrypted PDF copies delivered to your WhatsApp",
    ],
    timing: "Day 2–3 — Official Iris Seal",
    stat: { value: "24-48h", label: "Guaranteed turnaround" },
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
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-4 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0_#000]">
            <Lightning size={16} weight="fill" className="text-black animate-pulse" />
            <span>Roadmap Ascent · 4-Stage Filing System</span>
          </div>

          <h2 className="mt-4 text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-black">
            The 4-Step Journey to <br className="hidden sm:inline" />
            <span className="relative inline-block rounded-lg bg-black px-3 py-0.5 text-[#c8f603]">
              100% Compliant Filing.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/80 sm:text-lg">
            No endless back-and-forth. No legal jargon. Watch how your documents transform into an official FBR Iris CPR acknowledgment in 4 transparent stages.
          </p>
        </div>

        {/* The Ascent Timeline */}
        <div className="relative mt-16 sm:mt-24">
          {/* Vertical Progress Line (Desktop & Tablet) */}
          <div className="absolute left-6 top-6 bottom-10 hidden w-1 bg-black/15 md:left-1/2 md:-ml-0.5 md:block">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-[#c8f603] via-[#ffc900] to-[#00ff66] shadow-[0_0_12px_#c8f603]"
            />
          </div>

          {/* Steps List */}
          <div className="space-y-12 sm:space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
                >
                  {/* Center Node Badge on Desktop */}
                  <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:flex md:h-14 md:w-14 md:items-center md:justify-center md:rounded-2xl md:border-2 md:border-black md:bg-white md:shadow-[4px_4px_0_#000] md:z-10">
                    <span className="text-base font-black text-black">{step.number}</span>
                  </div>

                  {/* Left Column (Even: Card, Odd: Metric Overview) */}
                  <div
                    className={`md:col-span-6 ${
                      isEven ? "md:order-1 md:pr-10" : "md:order-2 md:pl-10"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative rounded-[24px_24px_24px_4px] border-2 border-black bg-white p-6 shadow-[6px_6px_0_#000] transition-all hover:-translate-y-1 hover:shadow-[9px_9px_0_#c8f603] sm:p-8"
                    >
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded-full border border-black px-3 py-0.5 text-xs font-bold text-black"
                            style={{ backgroundColor: step.badgeColor }}
                          >
                            {step.badge}
                          </span>
                          <span className="text-xs font-semibold text-black/60">
                            {step.timing}
                          </span>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-black bg-[#f4f4f0] text-black md:hidden font-bold">
                          {step.number}
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mt-4 flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-[#f4f4f0] text-black shadow-[2px_2px_0_#000]">
                          <Icon size={24} weight="bold" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-black/60">
                            {step.subtitle}
                          </p>
                          <h3 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-sm leading-relaxed text-black/80 sm:text-base">
                        {step.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="mt-6 rounded-xl border border-black/10 bg-[#fafaf7] p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-black">
                          Key Deliverables:
                        </p>
                        <ul className="mt-2.5 space-y-2 text-xs sm:text-sm">
                          {step.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-black/85">
                              <CheckCircle
                                size={17}
                                weight="fill"
                                className="shrink-0 text-emerald-600 mt-0.5"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Opposite Column: Metric Spotlight Card */}
                  <div
                    className={`md:col-span-6 ${
                      isEven ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="flex flex-col justify-center rounded-2xl border-2 border-black bg-black p-6 text-white shadow-[5px_5px_0_#ffc900] sm:p-7"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#c8f603]">
                          Stage {step.number} Impact Metric
                        </span>
                        <Sparkle size={18} weight="fill" className="text-[#ffc900]" />
                      </div>
                      <div className="mt-3">
                        <p className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">
                          {step.stat.value}
                        </p>
                        <p className="mt-1 text-xs text-white/70 sm:text-sm">
                          {step.stat.label}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-3 text-[11px] text-white/60">
                        <ShieldCheck size={16} weight="bold" className="text-[#c8f603]" />
                        <span>FBR Income Tax Ordinance, 2001 Statutory Standard</span>
                      </div>
                    </motion.div>
                  </div>
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
                Ready to ascend?
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-black">
                Start Step 01 today. Have your CPR receipt by tomorrow.
              </h3>
              <p className="mt-1 text-sm text-black/80 max-w-xl">
                Send a quick WhatsApp message with your CNIC to initiate your confidential file review directly with Muhammad Nabeel.
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
                <span>Launch Step 01 on WhatsApp</span>
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
