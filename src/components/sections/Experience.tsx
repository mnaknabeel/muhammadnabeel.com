"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const roles = [
  {
    period: "Jan 2026 — Present",
    title: "Finance Team Lead",
    company: "LeapAI Solution",
    bullets: [
      "Lead financial operations for a $2M+ portfolio spanning 30+ international clients across fintech, e-commerce, and SaaS verticals",
      "Reduced reconciliation turnaround by 70% by building automated workflows for Amazon FBA settlements, multi-currency bank feeds, and platform payouts (Stripe, PayPal, Square)",
      "Spearheaded AI-driven financial analysis initiatives leveraging LLMs and Python to produce real-time client reporting, flag anomalies, and surface cash-flow insights",
      "Delivered month-end close, AR/AP management, and board-ready financials for 10+ concurrent clients with 99.8% accuracy",
      "Designed scalable SOPs and internal tooling that enabled a 2× increase in client capacity without headcount growth",
    ],
  },
  {
    period: "Jun 2022 — Dec 2025",
    title: "QuickBooks / Xero Specialist (Freelance)",
    company: "Remote — US Clients",
    bullets: [
      "Managed full-cycle bookkeeping for 20+ US-based small businesses across real estate, healthcare, professional services, and retail",
      "Converted 15+ clients from manual spreadsheets to QuickBooks Online with clean catch-up, clean-up, and migration workflows",
      "Prepared quarterly financial statements and tax-ready P&Ls, cutting client close cycles from weeks to 3 days",
      "Maintained 98% client retention rate over 3.5 years through proactive communication and process transparency",
    ],
  },
  {
    period: "Jun 2021 — May 2022",
    title: "Accountant",
    company: "Habibullah Enterprises — Dubai, UAE",
    bullets: [
      "Managed full-cycle accounting for a group handling AED 18M in annual revenue across trading, logistics, and retail divisions",
      "Built consolidated financial statements and variance reports used for quarterly board decisions",
      "Streamlined accounts payable and receivable workflows, reducing payment cycle times by 25% through vendor negotiation and automation",
    ],
  },
  {
    period: "Jan 2020 — May 2021",
    title: "Financial Analyst",
    company: "Let's Apex — Karachi, Pakistan",
    bullets: [
      "Led FP&A for a growing e-commerce operations firm, delivering weekly cash-flow forecasts and monthly board packs",
      "Built a Python-based financial forecasting model that automated 80% of repetitive reporting, cutting month-end close from 10 days to 4",
      "Analyzed SKU-level profitability across 5 product categories, identifying margin leaks that led to a 12% gross margin improvement",
    ],
  },
]

function TimelineItem({
  role,
  index,
}: {
  role: (typeof roles)[0]
  index: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120)
        }
      },
      { threshold: 0.15 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-8 pb-16 last:pb-0 border-l border-border transition-all duration-700",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 w-3 h-3 -translate-x-[6.5px] rounded-full border-2 transition-all duration-500",
          visible
            ? "bg-lime border-lime shadow-[0_0_10px_#c8f60355]"
            : "bg-surface border-border",
        )}
      />
      <span className="text-lime font-mono text-xs tracking-wider">
        {role.period}
      </span>
      <h3 className="text-xl font-semibold mt-1">{role.title}</h3>
      <p className="text-muted text-sm mb-4">{role.company}</p>
      <ul className="space-y-2">
        {role.bullets.map((bullet, i) => (
          <li
            key={i}
            className={cn(
              "text-muted text-sm leading-relaxed pl-4 relative transition-all duration-500",
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
            style={{
              transitionDelay: visible ? `${300 + i * 100}ms` : "0ms",
            }}
          >
            <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-lime/50" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-lime font-mono text-sm tracking-widest uppercase mb-3 text-center">
          Experience
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center tracking-tight">
          Where I&apos;ve worked
        </h2>
        <div>
          {roles.map((role, i) => (
            <TimelineItem key={i} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
