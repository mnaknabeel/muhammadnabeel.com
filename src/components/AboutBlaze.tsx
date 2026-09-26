"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle,
  WhatsappLogo,
  ArrowRight,
  Sparkle,
  Lightning,
  FileText,
} from "phosphor-react";

export default function AboutBlaze() {
  const credentials = [
    {
      title: "Finance Team Lead",
      org: "LeapAI Solution",
      desc: "Leading financial operations, automation pipelines, and multi-currency reconciliations.",
      icon: Lightning,
      badge: "Current Role",
    },
    {
      title: "QuickBooks ProAdvisor",
      org: "Intuit Certified",
      desc: "Certified expert in QuickBooks Online setup, historical clean-ups, and automated bank rules.",
      icon: CheckCircle,
      badge: "Certified",
    },
    {
      title: "10,000+ FBR Returns Filed",
      org: "Pakistan Tax Advisory",
      desc: "Zero audit penalty record across salaried, freelancer u/s 154A, and corporate tax returns.",
      icon: ShieldCheck,
      badge: "Verified Track Record",
    },
    {
      title: "Python & SQL Automation",
      org: "Finance Engineering",
      desc: "Automating data hygiene, settlement ingestion, and custom Power BI executive dashboards.",
      icon: FileText,
      badge: "Tech Stack",
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24">
      {/* Background radial aura */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #c8f603 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#c8f603] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
            <Sparkle size={14} weight="bold" />
            <span>The Practitioner Behind the Numbers</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
            Finance Engineer. Tax Consultant. Automation Specialist.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold text-black sm:text-lg">
            No junior account managers, no outsourced offshore mills, no bot responses.
            You work directly with an engineer who understands both ledger math and code.
          </p>
        </div>

        {/* Main Bento Grid — Inspired by Jiro About Us 01 Blaze */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Framed Profile Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              {/* Top-Right Floating Badge */}
              <div className="absolute -right-3 -top-3 z-10 rotate-3 rounded-xl border-2 border-black bg-[#ffc900] px-3.5 py-1.5 text-xs font-black text-black shadow-[3px_3px_0_#000]">
                ✓ 100% Personal Review
              </div>

              {/* Main Photo Card */}
              <div className="overflow-hidden rounded-[24px_24px_24px_4px] border-2 border-black bg-white shadow-[8px_8px_0_#000]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Muhammad Nabeel — Finance Engineer"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-white">
                    <span className="rounded bg-[#c8f603] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
                      Direct 1-on-1 Contact
                    </span>
                    <p className="mt-1.5 text-xl font-black">Muhammad Nabeel</p>
                    <p className="text-xs text-[#c8f603] font-semibold">
                      Finance Team Lead @ LeapAI Solution
                    </p>
                  </div>
                </div>

                {/* Card Sub-Banner */}
                <div className="border-t-2 border-black bg-[#f4f4f0] p-4 text-xs font-medium text-black">
                  <p className="italic font-bold text-black">
                    &ldquo;My philosophy is simple: clean books prevent costly audits, and automation frees you to grow your business.&rdquo;
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2 text-[11px] font-bold">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      Active on WhatsApp
                    </span>
                    <span className="text-black font-black">+92 341 0224988</span>
                  </div>
                </div>
              </div>

              {/* Bottom-Left Floating Pill */}
              <div className="absolute -bottom-3 -left-3 z-10 -rotate-2 rounded-xl border-2 border-black bg-[#c8f603] px-3.5 py-1.5 text-xs font-black text-black shadow-[3px_3px_0_#000]">
                ✦ $4M+ Client Revenue Reconciled
              </div>
            </div>
          </div>

          {/* Right Column: Credentials & Personal Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Manifesto Card */}
            <div className="rounded-[20px] border-2 border-black bg-white p-6 shadow-[6px_6px_0_#000] sm:p-8">
              <h3 className="text-xl font-black text-black sm:text-2xl">
                Bridging Finance, Python &amp; Tax Compliance
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-900 font-semibold sm:text-base">
                Over the past 5+ years, I have specialized in transforming neglected ledgers into audit-ready financial reporting systems. Whether you sell on Amazon FBA, operate a regional logistics fleet, or need to file 100% compliant Pakistan income tax returns under Section 116/154A, every transaction is reconciled with mathematical precision.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 pt-2">
                {[
                  "QuickBooks Online",
                  "Xero",
                  "FBR Iris 2.0",
                  "Python Financial ETL",
                  "Power BI",
                  "Amazon Settlement Reconciliation",
                  "Section 116 Wealth Balancing",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border-2 border-black bg-[#f4f4f0] px-3 py-1 text-xs font-black text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Credentials 2x2 Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-[18px] border-2 border-black bg-white p-5 shadow-[4px_4px_0_#000] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#c8f603]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#c8f603] text-black">
                        <Icon size={20} weight="bold" />
                      </div>
                      <span className="rounded border-2 border-black bg-neutral-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
                        {c.badge}
                      </span>
                    </div>
                    <h4 className="mt-3 text-base font-black text-black">{c.title}</h4>
                    <p className="text-xs font-black text-black">{c.org}</p>
                    <p className="mt-2 text-xs leading-relaxed font-bold text-black">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct Consultation Link Banner */}
            <div className="rounded-[18px] border-2 border-black bg-black p-5 text-white shadow-[6px_6px_0_#c8f603]">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div>
                  <p className="text-sm font-black text-[#c8f603]">
                    Have questions about your situation?
                  </p>
                  <p className="text-xs text-neutral-300">
                    Reach out on WhatsApp for a direct, confidential 15-minute review.
                  </p>
                </div>
                <a
                  href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20reviewed%20your%20credentials%20and%20would%20like%20to%20discuss%20working%20together."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-black bg-[#c8f603] px-5 py-2.5 text-xs font-black text-black shadow-[3px_3px_0_#ffffff] transition hover:-translate-y-0.5"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>Chat with Nabeel</span>
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
