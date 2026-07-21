"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const sections = ["hero", "summary", "experience", "cases", "skills", "contact"]

export default function Nav() {
  const [active, setActive] = useState("hero")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
      const scrollY = window.scrollY + 150
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollY) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="text-lime font-mono text-sm tracking-wider">
          MN
        </a>
        <div className="hidden sm:flex items-center gap-6">
          {sections.slice(1).map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={cn(
                "text-xs uppercase tracking-widest font-mono transition-colors duration-200",
                active === s ? "text-lime" : "text-muted hover:text-fg",
              )}
            >
              {s === "cases" ? "Case Studies" : s}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
