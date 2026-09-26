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
  Clock,
  Sparkle,
} from "phosphor-react";

interface RoadmapStep {
  step: string;
  tag: string;
  timing: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"; className?: string }>;
  deliverables: string[];
  nabeelRole: string;
}

const steps: RoadmapStep[] = [
  {
    step: "01",
    tag: "Document Intake",
    timing: "5 Minutes · Fast Kickoff",
    title: "Share Your Documents",
    subtitle: "You send what you have — WhatsApp or secure Drive folder",
    desc: "No confusing FBR portal logins, no password sharing. Simply send clear photos or PDFs of your CNIC, employer salary certificate (covering 1 July 2025 to 30 June 2026), and 30th June bank statements. If you're a freelancer, share your remittance PRCs.",
    icon: FileArrowUp,
    deliverables: [
      "CNIC copy (front & back)",
      "Annual Salary Certificate or foreign remittance PRCs",
      "Bank maintenance certificate or 30th June closing statement",
      "Mobile & utility advance tax certificates (if available)",
    ],
    nabeelRole: "I review and verify all documents within 2 hours of receipt.",
  },
  {
    step: "02",
    tag: "Audit & Optimization",
    timing: "Within 24 Hours",
    title: "I Prepare & Optimize Your Return",
    subtitle: "Every statutory deduction claimed under Ordinance, 2001",
    desc: "I personally audit your numbers and claim every legal exemption: Section 139(b) 10% medical allowance relief, Zakat, school fee allowances, and advance tax withholding (mobile bills, vehicle token, electricity) to legally minimize your tax or maximize your refund.",
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
    tag: "Transparency Review",
    timing: "Same-Day Review",
    title: "You Review & Approve the Draft",
    subtitle: "100% transparency — nothing touches FBR without your consent",
    desc: "You receive a clear, plain-English summary of your draft return alongside a fully reconciled Section 116 Wealth Statement. Every single rupee of assets, inflows, and living expenses is mathematically balanced. You review the draft, ask questions, and approve.",
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
    tag: "FBR Submission & CPR",
    timing: "24–48 Hours",
    title: "I File on FBR Iris & Issue Your CPR",
    subtitle: "Official FBR submission & Active Taxpayers List (ATL) status",
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
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="filing-roadmap"
      className="relative overflow-hidden border-b-2 border-black bg-[#05080f] px-5 py-24 sm:px-8 sm:py-32 text-white"
    >
      {/* Background Ambience: Cinematic Dark Field with Electric Lime Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#c8f603 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, #c8f603 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c8f603]/40 bg-[#c8f603]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#c8f603] backdrop-blur-md shadow-[0_0_20px_rgba(200,246,3,0.2)]">
            <Lightning size={16} weight="fill" className="text-[#c8f603] animate-pulse" />
            <span>Roadmap Ascent · 4-Step Filing Process</span>
          </div>

          <h2 className="mt-5 text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-[1.03] tracking-tight text-white">
            The 4-Step Process: <br className="hidden sm:inline" />
            <span className="rounded-lg bg-[#c8f603] px-3 py-0.5 text-black">
              From Documents to CPR.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Share your documents, I prepare the return, you review, I file. A seamless, 100% compliant process handled directly by Muhammad Nabeel.
          </p>
        </div>

        {/* The Ascent Timeline */}
        <div className="relative mt-16 sm:mt-24">
          {/* Vertical Glowing Progress Conduit */}
          <div className="absolute left-6 top-8 bottom-12 w-[3px] bg-white/10 sm:left-8">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-[#c8f603] via-[#ffc900] to-[#00ff66] shadow-[0_0_15px_#c8f603]"
            />
          </div>

          {/* Steps Stack */}
          <div className="space-y-10 sm:space-y-14">
            {steps.map((s, idx) => {
              const Icon = s.icon;

              return (
                <div key={s.step} className="relative flex items-start gap-6 sm:gap-10">
                  {/* Step Marker Node */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#c8f603] bg-[#0c101a] text-[#c8f603] shadow-[0_0_20px_rgba(200,246,3,0.3)] sm:h-16 sm:w-16 sm:rounded-[22px]">
                    <span className="font-mono text-base font-black sm:text-lg">{s.step}</span>
                  </div>

                  {/* Step Card in Cinematic Lime-on-Black */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex-1 rounded-[24px_24px_24px_6px] border border-white/15 bg-[#0a0f1d]/90 p-6 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#c8f603]/80 hover:shadow-[0_0_35px_rgba(200,246,3,0.18)] sm:p-8"
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-[#c8f603]/40 bg-[#c8f603]/10 px-3 py-0.5 text-xs font-bold text-[#c8f603]">
                          {s.tag}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <Clock size={14} className="text-[#c8f603]" />
                          <span>{s.timing}</span>
                        </span>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#c8f603]">
                        <Icon size={20} weight="bold" />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#c8f603]">
                      {s.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {s.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Key Deliverables &amp; Actions:
                      </p>
                      <ul className="mt-2.5 grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-2 sm:text-sm">
                        {s.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-slate-200">
                            <CheckCircle
                              size={17}
                              weight="fill"
                              className="shrink-0 text-[#c8f603] mt-0.5"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nabeel's Commitment */}
                    <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-medium text-slate-300">
                      <ShieldCheck size={18} weight="fill" className="text-[#c8f603] shrink-0" />
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
          className="mt-16 rounded-[24px_24px_24px_6px] border-2 border-black bg-[#c8f603] p-6 shadow-[8px_8px_0_#ffffff] sm:p-8 text-black"
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
