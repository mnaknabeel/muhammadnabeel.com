"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import PhotoPlaceholder from "@/components/PhotoPlaceholder"

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "$4M+", label: "Revenue Managed" },
  { value: "50+", label: "Clients Served" },
  { value: "98%", label: "Accuracy Rate" },
]

function AnimatedNumber({ to }: { to: string }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={cn("inline-block", visible && "animate-scroll-reveal")}>
      <span className="text-lime text-3xl sm:text-4xl font-bold tabular-nums">{to}</span>
    </span>
  )
}

export default function Summary() {
  return (
    <section id="summary" className="py-20 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-20">
          <div>
            <PhotoPlaceholder
              name="profile-about.jpeg"
              className="w-full aspect-[4/5] max-w-sm mx-auto md:mx-0"
            />
          </div>
          <div>
            <p className="text-lime font-mono text-sm tracking-widest uppercase mb-3">
              About
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Data-driven finance meets systems thinking.
            </h2>
            <div className="text-muted space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                I lead financial operations at LeapAI Solution, managing a $2M+
                portfolio of 30+ international clients. I cut reconciliation time
                by 70% with automated pipelines for Amazon FBA, multi-currency
                bookkeeping, and SaaS metrics.
              </p>
              <p>
                Before that, I rebuilt the books for 20+ US QuickBooks clients,
                handled full-cycle accounting for Habibullah Enterprises (AED 18M
                revenue), and led FP&A at Let&apos;s Apex — where I built a
                Python-powered forecasting engine that reduced close time by 60%.
              </p>
              <p>
                I speak finance, Python, and SQL fluently — and I build bridges
                between them.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-border pt-10 md:pt-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedNumber to={stat.value} />
              <p className="text-muted text-xs sm:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
