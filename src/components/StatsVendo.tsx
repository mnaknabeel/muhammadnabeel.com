"use client";

import React from "react";
import {
  CurrencyDollar,
  Receipt,
  CheckCircle,
  Clock,
  Sparkle,
} from "phosphor-react";

export default function StatsVendo() {
  const stats = [
    {
      label: "Client Revenue Managed",
      display: "$4M+",
      subtext: "Over $4,000,000 reconciled across 50+ business & e-commerce client engagements",
      badge: "Reconciled",
      icon: CurrencyDollar,
      highlight: true,
    },
    {
      label: "FBR Tax Returns Filed",
      display: "10,000+",
      subtext: "100% Active Taxpayer List (ATL) status guaranteed with zero penalties",
      badge: "Zero Penalties",
      icon: Receipt,
      highlight: false,
    },
    {
      label: "Reconciliation Accuracy",
      display: "98%",
      subtext: "First-pass audit-ready books and balanced Wealth Statements",
      badge: "Audit Proof",
      icon: CheckCircle,
      highlight: false,
    },
    {
      label: "Filing & Close Turnaround",
      display: "24–48h",
      subtext: "Month-end close cycles reduced from 3 weeks to 3 days",
      badge: "Fast Delivery",
      icon: Clock,
      highlight: false,
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b-2 border-black pb-8 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#c8f603] shadow-[2px_2px_0_#c8f603]">
              <Sparkle size={14} weight="bold" />
              <span>Verified Financial Proof</span>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
              Proven Track Record. Measurable Impact.
            </h2>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#c8f603] border border-black" />
            <span className="whitespace-nowrap">Updated for Tax Year 2026</span>
          </div>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[20px] border-2 border-black p-6 transition hover:-translate-y-1 ${
                  s.highlight
                    ? "bg-[#c8f603] shadow-[6px_6px_0_#000]"
                    : "bg-white shadow-[6px_6px_0_#000] hover:shadow-[6px_6px_0_#c8f603]"
                }`}
              >
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 border-black ${
                      s.highlight ? "bg-black text-[#c8f603]" : "bg-[#c8f603] text-black"
                    }`}
                  >
                    <Icon size={24} weight="bold" />
                  </div>
                  <span
                    className={`rounded-md border-2 border-black px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider ${
                      s.highlight ? "bg-white text-black shadow-[1px_1px_0_#000]" : "bg-neutral-100 text-black shadow-[1px_1px_0_#000]"
                    }`}
                  >
                    {s.badge}
                  </span>
                </div>

                {/* Big Metric Number — Fits 100% cleanly without overflow */}
                <div className="mt-7">
                  <div className="text-4xl font-black tracking-tight text-black sm:text-5xl tabular-nums leading-none">
                    {s.display}
                  </div>
                  <p className="mt-3 text-base font-black text-black leading-snug">
                    {s.label}
                  </p>
                  <p
                    className={`mt-2 text-xs leading-relaxed font-bold ${
                      s.highlight ? "text-black" : "text-neutral-900"
                    }`}
                  >
                    {s.subtext}
                  </p>
                </div>

                {/* Bottom live meter bar */}
                <div className={`mt-6 border-t-2 pt-3 ${s.highlight ? "border-black/30" : "border-black/15"}`}>
                  <div className="flex items-center justify-between text-xs font-black text-black">
                    <span>Performance Reliability</span>
                    <span className="text-black">100%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full border-2 border-black bg-white">
                    <div
                      className="h-full bg-black rounded-full"
                      style={{ width: idx === 0 ? "96%" : idx === 1 ? "99%" : idx === 2 ? "98%" : "97%" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
