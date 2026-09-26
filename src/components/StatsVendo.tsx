"use client";

import React from "react";
import { AnimatedCounter } from "@/components/AnimatedElements";
import {
  CurrencyDollar,
  Receipt,
  CheckCircle,
  Clock,
  Sparkle,
  TrendUp,
} from "phosphor-react";

export default function StatsVendo() {
  const stats = [
    {
      label: "Client Revenue Managed",
      value: 4000000,
      prefix: "$",
      suffix: "+",
      subtext: "Across 50+ business & e-commerce client engagements",
      badge: "Reconciled",
      icon: CurrencyDollar,
      highlight: true,
    },
    {
      label: "FBR Tax Returns Filed",
      value: 10000,
      prefix: "",
      suffix: "+",
      subtext: "100% Active Taxpayer List (ATL) status guaranteed",
      badge: "Zero Penalties",
      icon: Receipt,
      highlight: false,
    },
    {
      label: "Reconciliation Accuracy",
      value: 98,
      prefix: "",
      suffix: "%",
      subtext: "First-pass audit-ready books in QuickBooks & Xero",
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
            <div className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#c8f603] shadow-[2px_2px_0_#c8f603]">
              <Sparkle size={14} weight="bold" />
              <span>Verified Financial Proof</span>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
              Proven Track Record. Measurable Impact.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-800">
            <span className="h-2.5 w-2.5 rounded-full bg-[#c8f603] border border-black animate-ping" />
            <span>Updated for Tax Year 2026</span>
          </div>
        </div>

        {/* 4-Card Bento Grid (Jiro Stats & Metrics Vendo) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`group relative flex flex-col justify-between rounded-[20px] border-2 border-black p-6 transition hover:-translate-y-1 ${
                  s.highlight
                    ? "bg-[#c8f603] shadow-[6px_6px_0_#000]"
                    : "bg-white shadow-[6px_6px_0_#000] hover:shadow-[6px_6px_0_#c8f603]"
                }`}
              >
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-black ${
                      s.highlight ? "bg-black text-[#c8f603]" : "bg-[#c8f603] text-black"
                    }`}
                  >
                    <Icon size={22} weight="bold" />
                  </div>
                  <span
                    className={`rounded-md border border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                      s.highlight ? "bg-white text-black" : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {s.badge}
                  </span>
                </div>

                {/* Big Metric Number */}
                <div className="mt-8">
                  <div className="text-4xl font-black tracking-tight text-black sm:text-5xl tabular-nums">
                    {s.display ? (
                      s.display
                    ) : (
                      <AnimatedCounter
                        to={s.value!}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        duration={2.0}
                      />
                    )}
                  </div>
                  <p className="mt-2 text-sm font-black text-black">{s.label}</p>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    {s.subtext}
                  </p>
                </div>

                {/* Bottom live meter bar */}
                <div className="mt-6 border-t border-black/15 pt-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800">
                    <span>Performance Reliability</span>
                    <span className="text-black">100%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full border border-black bg-white">
                    <div
                      className="h-full bg-black rounded-full"
                      style={{ width: idx === 0 ? "95%" : idx === 1 ? "99%" : idx === 2 ? "98%" : "96%" }}
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
