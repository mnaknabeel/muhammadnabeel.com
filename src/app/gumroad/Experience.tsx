"use client";

/*
  Experience section (Gumroad style) — reuses the real work history
  from the main site build (src/components/sections/Experience.tsx).
*/

import { motion } from "motion/react";

const lime = "#c8f603";
const yellow = "#ffc900";

const roles = [
  {
    period: "Jan 2026 — Present",
    title: "Finance Team Lead",
    company: "LeapAI Solution",
    bg: "bg-white",
    radius: "rounded-[20px_20px_20px_4px]",
    bullets: [
      "Lead financial operations for a $2M+ portfolio spanning 30+ international clients across fintech, e-commerce, and SaaS verticals",
      "Reduced reconciliation turnaround by 70% with automated workflows for Amazon FBA settlements, multi-currency bank feeds, and platform payouts (Stripe, PayPal, Square)",
      "Spearheaded AI-driven financial analysis using LLMs and Python — real-time client reporting, anomaly flagging, cash-flow insights",
      "Month-end close, AR/AP, and board-ready financials for 10+ concurrent clients at 99.8% accuracy",
      "Designed SOPs and internal tooling that enabled a 2× increase in client capacity without new hires",
    ],
  },
  {
    period: "Jun 2022 — Dec 2025",
    title: "QuickBooks / Xero Specialist (Freelance)",
    company: "Remote — US Clients",
    bg: "bg-[#fafaf6]",
    radius: "rounded-[20px_20px_4px_20px]",
    bullets: [
      "Full-cycle bookkeeping for 20+ US small businesses across real estate, healthcare, professional services, and retail",
      "Converted 15+ clients from manual spreadsheets to QuickBooks Online with clean catch-up and migration workflows",
      "Quarterly financial statements and tax-ready P&Ls — close cycles cut from weeks to 3 days",
      "98% client retention over 3.5 years through proactive communication and process transparency",
    ],
  },
  {
    period: "Jun 2021 — May 2022",
    title: "Accountant",
    company: "Habibullah Enterprises — Dubai, UAE",
    bg: "bg-white",
    radius: "rounded-[20px_4px_20px_20px]",
    bullets: [
      "Full-cycle accounting for a group handling AED 18M annual revenue across trading, logistics, and retail divisions",
      "Built consolidated financial statements and variance reports used for quarterly board decisions",
      "Streamlined AP/AR workflows, cutting payment cycle times by 25% via vendor negotiation and automation",
    ],
  },
  {
    period: "Jan 2020 — May 2021",
    title: "Financial Analyst",
    company: "Let's Apex — Karachi, Pakistan",
    bg: "bg-[#fafaf6]",
    radius: "rounded-[4px_20px_20px_20px]",
    bullets: [
      "Led FP&A for a growing e-commerce operations firm — weekly cash-flow forecasts and monthly board packs",
      "Built a Python forecasting model that automated 80% of repetitive reporting, cutting month-end close from 10 days to 4",
      "Analyzed SKU-level profitability across 5 categories, surfacing margin leaks worth a 12% gross margin improvement",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-5 py-20 sm:py-28">
      <div className="mb-10 sm:mb-14">
        <p className="mb-4 text-[15px]">
          <span
            className="rounded-md border border-black px-2.5 py-1 text-sm font-semibold"
            style={{ background: lime }}
          >
            Experience
          </span>{" "}
          — 5+ years, 4 companies
        </p>
        <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em]">
          Where I&apos;ve worked.
        </h2>
      </div>

      <div className="space-y-5">
        {roles.map((role, i) => (
          <motion.article
            key={role.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`${role.bg} ${role.radius} border-2 border-black p-5 transition-shadow hover:shadow-[6px_6px_0_#000] sm:p-7`}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/20 pb-4">
              <span
                className="rounded-md border-2 border-black px-2.5 py-1 text-xs font-black tabular-nums text-black"
                style={{ background: i === 0 ? lime : yellow }}
              >
                {role.period}
              </span>
              <span className="text-xs font-black uppercase tracking-[0.14em] text-black">
                {role.company}
              </span>
            </div>
            <h3 className="mb-4 text-xl font-black tracking-tight text-black sm:text-2xl">
              {role.title}
            </h3>
            <ul className="space-y-2">
              {role.bullets.map((b) => (
                <li key={b} className="relative pl-4 text-[15px] font-bold leading-relaxed text-black">
                  <span
                    className="absolute left-0 top-[0.55em] h-2 w-2 rounded-full border border-black"
                    style={{ background: lime }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
