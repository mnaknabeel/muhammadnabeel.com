"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "phosphor-react"

const cases = [
  {
    title: "Amazon FBA Bookkeeping Transformation",
    subtitle: "E-commerce Finance Automation",
    description:
      "A US-based Amazon FBA seller with $1.2M in annual revenue was drowning in manual reconciliation across Amazon settlements, bank feeds, and credit card statements. I built an automated pipeline that ingested Amazon settlement reports, mapped SKU-level transactions to COGS categories, reconciled against bank data using Python, and generated profit-and-loss statements by ASIN. The client went from 3-week close cycles to real-time visibility.",
    metrics: [
      { label: "Close cycle", value: "3w → 3d" },
      { label: "Revenue", value: "$1.2M/yr" },
      { label: "Automation", value: "85%" },
    ],
    tags: ["Python", "Amazon FBA", "Reconciliation", "QuickBooks"],
    gradient: "from-lime/10 to-transparent",
  },
  {
    title: "Multi-Client Process Overhaul",
    subtitle: "Process Design & Scalability",
    description:
      "A boutique accounting firm serving 40+ e-commerce and SaaS clients needed to scale without hiring. I designed and implemented standardized SOPs, automated bank feed reconciliation for 25+ client entities, built a centralized dashboard for tracking AR/AP status across the portfolio, and trained the team on the new workflows. The firm absorbed 30% more clients with zero additional headcount.",
    metrics: [
      { label: "Capacity", value: "+30%" },
      { label: "Time saved", value: "-70%" },
      { label: "Team", value: "5 people" },
    ],
    tags: ["Process Design", "Automation", "Dashboard", "Training"],
    gradient: "from-lime/5 to-transparent",
  },
  {
    title: "Delivery Business Financial Health Review",
    subtitle: "Financial Audit & Restructuring",
    description:
      "A last-mile delivery startup with rapid growth but deteriorating unit economics. I performed a full financial audit of their 18-month operating history, identified that 3 of 8 delivery zones were operating at a net loss due to incorrect pricing models, and recommended zone-specific rate adjustments and route optimization that restored gross margins. Presented findings to the founding team with a 12-month cash-flow model.",
    metrics: [
      { label: "Revenue", value: "$850K" },
      { label: "Margin gain", value: "+15%" },
      { label: "Zones fixed", value: "3 of 8" },
    ],
    tags: ["Financial Audit", "Unit Economics", "Forecasting", "Advisory"],
    gradient: "from-lime/8 to-transparent",
  },
]

function CaseCard({
  c,
  index,
}: {
  c: (typeof cases)[0]
  index: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150)
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-2xl border border-border bg-surface/50 p-5 sm:p-8 transition-all duration-700 hover:border-lime/30",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12",
      )}
    >
      <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", c.gradient)} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div>
            <p className="text-lime font-mono text-[11px] tracking-widest uppercase mb-1">
              {c.subtitle}
            </p>
            <h3 className="text-base sm:text-xl font-semibold leading-tight">{c.title}</h3>
          </div>
          <ArrowUpRight
            size={20}
            className="text-muted group-hover:text-lime transition-colors mt-1 shrink-0 hidden sm:block"
          />
        </div>

        <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
          {c.description}
        </p>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {c.metrics.map((m) => (
            <div key={m.label} className="bg-ink/50 rounded-lg p-2 sm:p-3">
              <p className="text-lime text-sm sm:text-lg font-bold tabular-nums leading-tight">{m.value}</p>
              <p className="text-muted text-[10px] sm:text-[11px] leading-tight mt-0.5">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs text-muted border border-border px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="cases" className="py-20 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-lime font-mono text-sm tracking-widest uppercase mb-3 text-center">
          Case Studies
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight">
          Problems I&apos;ve solved
        </h2>
        <p className="text-muted text-sm sm:text-base text-center max-w-xl mx-auto mb-10 sm:mb-16">
          Real engagements. Real results. Each project involved messy data,
          tight timelines, and measurable outcomes.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cases.map((c, i) => (
            <CaseCard key={i} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
