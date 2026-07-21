"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "Financial Systems",
    skills: [
      "Full-cycle Accounting",
      "Financial Reporting & FP&A",
      "Multi-currency Bookkeeping",
      "Month-end Close",
      "AR/AP Management",
      "Financial Forecasting",
    ],
  },
  {
    name: "Automation & Tooling",
    skills: [
      "Python (pandas, openpyxl)",
      "SQL & T-SQL",
      "Google Sheets Scripting",
      "Excel / VBA",
      "Power BI & DAX",
      "REST API Integration",
    ],
  },
  {
    name: "Platforms & Compliance",
    skills: [
      "QuickBooks Online / Desktop",
      "Xero",
      "Zoho Books",
      "Amazon FBA Settlements",
      "Stripe / PayPal / Square",
      "US GAAP / IFRS",
    ],
  },
  {
    name: "AI & Emerging",
    skills: [
      "LLM-powered Analysis",
      "AI Workflow Design",
      "Process Automation",
      "Data Pipeline Architecture",
      "SaaS Metrics & NRR/ARR",
      "Unit Economics Analysis",
    ],
  },
]

function SkillCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0]
  index: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-surface/50 p-6 transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="text-lime font-mono text-xs tracking-widest uppercase mb-4">
        {cat.name}
      </p>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill) => (
          <span
            key={skill}
            className="text-sm text-fg-secondary bg-elevated px-3 py-1.5 rounded-lg border border-border/50"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-lime font-mono text-sm tracking-widest uppercase mb-3 text-center">
          Skills
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center tracking-tight">
          What I bring
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-16">
          Finance expertise automated through code. Systems thinking applied to
          every engagement.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <SkillCard key={i} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
