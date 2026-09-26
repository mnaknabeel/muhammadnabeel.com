import type { Metadata } from "next";
import Link from "next/link";
import { favorit } from "@/app/gumroad/fonts";
import TaxNav from "@/components/tax/TaxNav";
import TaxFooter from "@/components/tax/TaxFooter";
import Hero from "@/app/gumroad/Hero";
import Portfolio from "@/app/gumroad/Portfolio";
import Experience from "@/app/gumroad/Experience";
import CardsCascade from "@/components/CardsCascade";
import TestimonialsSpotlight from "@/components/TestimonialsSpotlight";
import InteractiveCaseStudies from "@/components/InteractiveCaseStudies";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import FeeEstimator from "@/components/FeeEstimator";
import StatsVendo from "@/components/StatsVendo";
import AboutBlaze from "@/components/AboutBlaze";
import {
  AnimatedCounter,
  ScrollReveal,
  TiltCard,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedElements";


export const metadata: Metadata = {
  title: "Muhammad Nabeel | Finance Engineer & Pakistan Tax Advisory",
  description:
    "Remote bookkeeper, financial reporting specialist, and Pakistan income tax filing consultant. 10,000+ tax returns filed, $4M+ client revenue tracked across 50+ business engagements.",
  keywords: [
    "Muhammad Nabeel",
    "Finance Engineer",
    "Remote bookkeeper",
    "QuickBooks Pro",
    "Xero accountant",
    "Pakistan income tax return filing",
    "FBR tax filing",
    "Tax Year 2026 calculator",
    "Active Taxpayer List ATL",
    "Amazon FBA accounting",
    "FP&A advisory",
  ],
  openGraph: {
    title: "Muhammad Nabeel | Finance Engineer & Pakistan Tax Advisory",
    description:
      "Financial systems, automated bookkeeping workflows, and 100% compliant FBR tax return filing.",
    type: "website",
  },
};

const lime = "#c8f603";
const yellow = "#ffc900";

const ticker = [
  "BOOKKEEPING", "PAKISTAN TAX FILING", "QUICKBOOKS", "XERO", "AMAZON FBA",
  "FP&A", "FBR ACTIVE TAXPAYER LIST", "RECONCILIATION", "PYTHON", "SQL", "POWER BI",
];



const cases = [
  {
    tag: "E-commerce finance automation",
    title: "Amazon FBA bookkeeping transformation",
    desc: "Automated pipeline ingesting settlement reports, mapping SKU-level COGS, reconciling with Python. Real-time P&L by ASIN.",
    metrics: [["Close cycle", "3w → 3d"], ["Revenue", "$1.2M/yr"], ["Automated", "85%"]],
  },
  {
    tag: "Process design & scalability",
    title: "Multi-client process overhaul",
    desc: "Standardized SOPs and automated bank feeds for 25+ entities. The firm absorbed 30% more clients with zero new hires.",
    metrics: [["Capacity", "+30%"], ["Time saved", "-70%"], ["Team", "5 people"]],
  },
  {
    tag: "Audit & restructuring",
    title: "Delivery business financial review",
    desc: "Full audit of 18 months of ops. Found 3 of 8 delivery zones losing money, repriced them, restored margins.",
    metrics: [["Revenue", "$850K"], ["Margin gain", "+15%"], ["Zones fixed", "3 of 8"]],
  },
];

const faqs = [
  {
    q: "What software do you work in?",
    a: "QuickBooks Online and Xero, daily. Excel and Power BI for reporting and dashboards. If your books live somewhere else, I've migrated clients off worse — the catch-up process handles that too.",
  },
  {
    q: "Do you also handle Pakistan Income Tax Return filing?",
    a: "Yes! Alongside international bookkeeping, I run a dedicated Pakistan Tax Advisory practice. We file 100% compliant FBR Iris income tax returns, reconcile Wealth Statements (Section 116), claim statutory deductions (10% medical, Zakat, school fees), and maintain Active Taxpayer List (ATL) status.",
  },
  {
    q: "How much does bookkeeping cost?",
    a: "It depends on transaction volume and how far behind the books are. Most monthly engagements land somewhere between a few hundred and a couple thousand dollars. After I look at your books, you get a fixed monthly number — not an hourly meter.",
  },
  {
    q: "Can you catch up a year of missed bookkeeping?",
    a: "Yes — catch-up and clean-up is a specialty. 15+ clients have gone from neglected files or raw spreadsheets to clean, current QuickBooks or Xero files with reconciled accounts and tax-ready reports.",
  },
  {
    q: "Do you work with e-commerce sellers?",
    a: "That's the bulk of my current portfolio: Amazon FBA settlements, Shopify payouts, multi-currency bank feeds, SKU-level P&Ls. If you sell on a marketplace, I've probably reconciled it.",
  },
];

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

export default function Home() {
  return (
    <div
      className={`${favorit.variable} min-h-screen bg-[#f4f4f0] text-black antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <style>{`
        @keyframes gmarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .gmarquee { animation: gmarquee 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .gmarquee { animation: none; } }
      `}</style>

      {/* Universal Neo-Brutalist Navigation */}
      <TaxNav />

      {/* 3D Scroll Hero with interactive growing charts and floating coins */}
      <Hero />

      {/* ── Pakistan Tax Filing & Calculator Spotlight Banner ── */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-4">
        <ScrollReveal>
          <TiltCard maxTilt={3}>
            <div className="spotlight-card spotlight-dark relative overflow-hidden rounded-[24px_24px_24px_4px] border border-black bg-black p-5 text-white shadow-[6px_6px_0_#c8f603] sm:p-10 lg:p-12 sm:shadow-[8px_8px_0_#c8f603]">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black bg-[#c8f603] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
                    <span className="h-2 w-2 rounded-full bg-black animate-ping" />
                    <span>Pakistan Tax Advisory Practice</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Need your Pakistan Income Tax Return filed?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base text-white/80 leading-relaxed sm:text-lg">
                    Stay on the FBR Active Taxpayers List (ATL), prevent 100% non-filer withholding tax penalties on bank cash and property, and calculate your exact tax with statutory 10% medical and Zakat deductions.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-white/90">
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 shrink-0 text-[#c8f603]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Salaried Plans from PKR 3,500</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 shrink-0 text-[#c8f603]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Freelancers u/s 154A</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 shrink-0 text-[#c8f603]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>24-Hour Turnaround</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:col-span-4">
                  <Link
                    href="/tax-filing"
                    className="magnetic flex items-center justify-center gap-2 rounded-xl border border-black bg-[#c8f603] py-4 text-base font-bold text-black transition hover:bg-white hover:shadow-[4px_4px_0_#fff]"
                  >
                    <span>File Tax Return Now</span>
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/tax-calculator"
                    className="magnetic flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                  >
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <line x1="8" y1="6" x2="16" y2="6" />
                      <line x1="16" y1="14" x2="16" y2="18" />
                      <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
                    </svg>
                    <span>Open Tax Calculator (TY 2026)</span>
                  </Link>
                  <Link
                    href="/tax-rates"
                    className="text-center text-xs text-white/70 hover:text-white hover:underline mt-1"
                  >
                    View FBR Withholding Tax Card ↗
                  </Link>
                </div>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* ── Intro Video: How outsourcing works ──────────────── */}
      <section className="mx-auto max-w-4xl px-5 pb-20 sm:pb-28">
        <ScrollReveal>
          <p className="mb-4 text-[15px]">
            <span
              className="rounded-md border border-black px-2.5 py-1 text-sm font-semibold"
              style={{ background: yellow }}
            >
              10 seconds
            </span>{" "}
            — me, on camera
          </p>
          <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]">
            How outsourcing your bookkeeping works.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-black leading-relaxed">
            Accurate, hassle-free accounting without hiring in-house. Here&apos;s
            the short version of what I take over and what you get back.
          </p>
          <div className="mt-8 overflow-hidden rounded-[20px_20px_20px_4px] border border-black bg-black shadow-[8px_8px_0_#c8f603]">
            <video
              src="/video/Nabeel_bookkeeper.mp4"
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Marquee / skills ticker ─────────────────────── */}
      <div id="skills" className="bg-black text-[#f4f4f0] overflow-hidden py-3.5 border-y border-black" aria-hidden>
        <div className="gmarquee flex w-max text-sm font-semibold tracking-[0.12em]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {ticker.map((t) => (
                <span key={`${copy}-${t}`} className="flex items-center px-5">
                  {t} <span className="ml-10" style={{ color: lime }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Portfolio — the main focus ──────────────────── */}
      <Portfolio />

      {/* ── Verified Stats & Metrics (Jiro Stats Vendo Pattern) ── */}
      <StatsVendo />

      {/* ── Cards Cascade — Services Section ────────────── */}
      <CardsCascade />

      {/* ── Interactive Case Studies (Jiro Challenge-Solution-ROI) ── */}
      <div id="cases">
        <InteractiveCaseStudies />
      </div>

      {/* ── Carousel Spotlight — Verified Client Proof ──── */}
      <TestimonialsSpotlight />

      {/* ── Experience: where I've worked ───────────────── */}
      <Experience />

      {/* ── Why Muhammad Nabeel vs The Alternatives (Jiro Fintech Matrix) ── */}
      <ComparisonMatrix />

      {/* ── The Practitioner Behind the Numbers (Jiro About Us 01 Blaze) ── */}
      <AboutBlaze />

      {/* ── Tools I've built ────────────────────────────── */}
      <section id="tools" className="px-5 pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="mb-4 text-[15px]">
              <span
                className="rounded-md border border-black px-2.5 py-1 text-sm font-semibold"
                style={{ background: lime }}
              >
                Tools
              </span>{" "}
              — software I&apos;ve built and shipped
            </p>
            <h2 className="mb-4 text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              I build tools, not just reports.
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-black sm:mb-14">
              The same automation mindset that cleans your books also ships
              products. Two are live right now — both free to try.
            </p>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.15} className="grid gap-5 md:grid-cols-2">
            <StaggerItem>
              <TiltCard maxTilt={4} className="h-full">
                <a
                  href="https://crm.muhammadnabeel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-black bg-white p-7 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] sm:p-9 rounded-[24px_24px_24px_4px] h-full"
                >
                  <p className="mb-2 text-[13px] uppercase tracking-[0.08em] text-black">SaaS · Live</p>
                  <h3 className="mb-3 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
                    The Little CRM
                  </h3>
                  <p className="mb-6 max-w-md text-base leading-relaxed text-black">
                    One dashboard for leads, prospects, clients, invoices, and
                    reports. Google Maps lead finder and AI proposal writer built
                    in. Free tier — 50 leads on signup.
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-black px-4 py-2 text-[15px] font-medium" style={{ background: lime }}>
                    Try the CRM <span aria-hidden>→</span>
                  </span>
                </a>
              </TiltCard>
            </StaggerItem>

            <StaggerItem>
              <TiltCard maxTilt={4} className="h-full">
                <a
                  href="https://audit.muhammadnabeel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-black p-7 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] sm:p-9 rounded-[24px_24px_4px_24px] h-full"
                  style={{ background: yellow }}
                >
                  <p className="mb-2 text-[13px] uppercase tracking-[0.08em] text-black">AI · Live</p>
                  <h3 className="mb-3 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
                    Resume IQ
                  </h3>
                  <p className="mb-6 max-w-md text-base leading-relaxed text-black">
                    Four AI agents score your CV the way an ATS, a recruiter, and a
                    hiring manager would — then rewrite your weakest bullets. Free
                    report in under a minute.
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-black bg-white px-4 py-2 text-[15px] font-medium">
                    Try Resume IQ <span aria-hidden>→</span>
                  </span>
                </a>
              </TiltCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Instant Scope & Fee Estimator (Jiro PayUp Pattern) ── */}
      <FeeEstimator />

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-4xl px-5 pb-20 sm:pb-28">
        <ScrollReveal>
          <p className="mb-4 text-[15px]">
            <span
              className="rounded-md border border-black px-2.5 py-1 text-sm font-semibold"
              style={{ background: yellow }}
            >
              FAQ
            </span>{" "}
            — the questions clients actually ask
          </p>
          <h2 className="text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em] mb-10 sm:mb-14">
            Before you reach out.
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 0.08}>
              <details
                className="group border border-black bg-white rounded-[16px_16px_16px_4px] open:shadow-[6px_6px_0_#000] transition-shadow"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 text-lg font-medium tracking-[-0.01em]">
                  {f.q}
                  <span
                    className="shrink-0 rounded-md border border-black px-2 py-0.5 text-sm font-semibold transition group-open:rotate-45"
                    style={{ background: lime }}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-[15px] leading-relaxed text-black">
                  {f.a}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Big quote ───────────────────────────────────── */}
      <section className="px-5 py-20 sm:py-28 max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p
            className="font-medium leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            &ldquo;I speak finance, Python, and SQL fluently — and I build{" "}
            <span className="mx-2 inline-block rounded-md px-3 py-0.5" style={{ background: yellow }}>
              bridges
            </span>{" "}
            between them.&rdquo;
          </p>
        </ScrollReveal>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="px-5 pb-24 pt-6 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-[clamp(2.25rem,6.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] mb-6">
            Your books &amp; taxes, handled.
          </h2>
          <p className="text-lg text-black mb-8 leading-relaxed">
            Tell me what&apos;s messy — books behind, reports late, or unfiled FBR taxes.
            I&apos;ll look at your situation and tell you exactly what it takes to solve it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20would%20like%20to%20talk%20about%20my%20bookkeeping%20or%20Pakistan%20tax%20filing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-md border border-black text-base font-medium transition hover:-translate-y-px hover:shadow-[4px_4px_0_#000]"
              style={{ background: "#25d366" }}
            >
              <WaIcon />
              WhatsApp me <span aria-hidden>→</span>
            </a>
            <a
              href="mailto:mnak.nabeel@gmail.com?subject=Inquiry"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-md border border-black bg-white text-base font-medium transition hover:-translate-y-px hover:shadow-[4px_4px_0_#000]"
            >
              Email instead <span aria-hidden>→</span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Giant NABEEL wordmark + Directory Footer */}
      <div className="border-t border-black bg-white">
        <div className="max-w-6xl mx-auto px-5 pt-10">
          <div
            className="font-semibold tracking-[-0.04em] leading-[0.85] select-none text-center"
            style={{ fontSize: "clamp(2.8rem, 16vw, 15rem)" }}
            aria-hidden
          >
            NABEE<span style={{ color: lime }}>L</span>
          </div>
        </div>
      </div>

      <TaxFooter />
    </div>
  );
}
