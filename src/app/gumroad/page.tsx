import type { Metadata } from "next";
import { favorit } from "./fonts";
import ToolsMenu from "./ToolsMenu";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Experience from "./Experience";

export const metadata: Metadata = {
  title: "Remote Bookkeeper & Financial Reporting | Muhammad Nabeel",
  description:
    "Clean books, fast closes, and reports you can actually use. Bookkeeping, accounting, and financial reporting for e-commerce and small-business owners — 5+ years, $4M+ managed.",
  keywords: [
    "remote bookkeeper",
    "bookkeeping services",
    "financial reporting services",
    "QuickBooks bookkeeper",
    "Xero accountant",
    "e-commerce bookkeeping",
    "Amazon FBA accounting",
    "month-end close",
    "financial statements",
    "fractional CFO",
  ],
  openGraph: {
    title: "Remote Bookkeeper & Financial Reporting | Muhammad Nabeel",
    description:
      "Bookkeeping, accounting, and financial reporting for e-commerce and small-business owners. $4M+ managed across 50+ clients.",
    type: "website",
  },
};

const faqs = [
  {
    q: "What software do you work in?",
    a: "QuickBooks Online and Xero, daily. Excel and Power BI for reporting and dashboards. If your books live somewhere else, I've migrated clients off worse — the catch-up process handles that too.",
  },
  {
    q: "How much does a remote bookkeeper cost?",
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

/* JSON-LD: Person + services — helps Google & AI assistants surface this page
   for "remote bookkeeper / financial reporting" type queries. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://muhammadnabeel.com/#nabeel",
      name: "Muhammad Nabeel",
      jobTitle: "Bookkeeper & Financial Reporting Specialist",
      description:
        "Remote bookkeeper and financial reporting specialist for e-commerce and small businesses. QuickBooks, Xero, Python automation, FP&A.",
      url: "https://muhammadnabeel.com/gumroad",
      sameAs: ["https://linkedin.com/in/muhammad-nabeel-finance-engineer"],
      knowsAbout: [
        "Bookkeeping",
        "Financial reporting",
        "QuickBooks Online",
        "Xero",
        "Amazon FBA accounting",
        "Financial forecasting",
        "Month-end close",
      ],
      worksFor: { "@id": "https://muhammadnabeel.com/#service" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://muhammadnabeel.com/#service",
      name: "Muhammad Nabeel — Bookkeeping & Financial Reporting",
      description:
        "Remote bookkeeping, month-end close, financial reporting, and FP&A for e-commerce sellers and small businesses. QuickBooks Online and Xero.",
      url: "https://muhammadnabeel.com/gumroad",
      areaServed: ["US", "AE", "PK", "Worldwide"],
      serviceType: [
        "Bookkeeping",
        "Financial reporting",
        "Accounting automation",
        "FP&A and forecasting",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/*
  GUMROAD-STYLE MOCKUP
  Tokens extracted live from gumroad.com:
  - bg cream #f4f4f0, text black, 1px black borders, radius 4px buttons / 16-24px cards
  - single grotesque family, display sizes 72-192px, leading ~1, tracking -0.02em
  - primary CTA: accent bg + 1px black border + black text + "→"
  - pink #ff90e8 replaced with brand lime #c8f603
*/

/* ponytail: inline WhatsApp glyph — phosphor-react needs client components,
   and the final CTA lives in a server component */
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

const lime = "#c8f603";
const yellow = "#ffc900";

const ticker = [
  "BOOKKEEPING", "FINANCIAL REPORTING", "QUICKBOOKS", "XERO", "AMAZON FBA",
  "FP&A", "FORECASTING", "RECONCILIATION", "PYTHON", "SQL", "POWER BI",
];

const capabilities = [
  {
    title: "Bookkeeping & clean-up",
    desc: "QuickBooks and Xero, done right: weekly categorization, bank reconciliation, and catch-up work for books that sat ignored for a year. Fixed once — then it stays fixed.",
    href: "#work",
    bg: "bg-white",
    radius: "rounded-[24px_24px_24px_4px]",
  },
  {
    title: "Financial reporting",
    desc: "Month-end close, P&L, balance sheet, and cash flow delivered in days, not weeks. Statements built for decisions — not just for the tax preparer.",
    href: "#cases",
    bg: "bg-[#c8f603]",
    radius: "rounded-[24px_24px_4px_24px]",
  },
  {
    title: "Automation & reconciliation",
    desc: "Python and SQL handle the boring parts: Amazon settlement ingestion, multi-currency bank feeds, platform payouts. 70% less reconciliation time on real engagements.",
    href: "#cases",
    bg: "bg-[#ffc900]",
    radius: "rounded-[24px_4px_24px_24px]",
  },
  {
    title: "FP&A & advisory",
    desc: "Forecasts, budgets, and a clear read on margins and runway — the kind of visibility a fractional CFO would give you, without the fractional-CFO invoice.",
    href: "#experience",
    bg: "bg-black text-[#f4f4f0]",
    radius: "rounded-[4px_24px_24px_24px]",
  },
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

export default function GumroadMockup() {
  return (
    <div
      className={`${favorit.variable} min-h-screen bg-[#f4f4f0] text-black antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, Montserrat, sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        @keyframes gmarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .gmarquee { animation: gmarquee 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .gmarquee { animation: none; } }
      `}</style>
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
        <a href="/gumroad" className="text-lg font-semibold tracking-tight">
          Nabeel<span style={{ color: lime }}>*</span>
        </a>
        <nav className="hidden items-center gap-7 text-[15px] md:flex">
          <a href="#services" className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black">Services</a>
          <a href="#work" className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black">Work</a>
          <a href="#experience" className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black">Experience</a>
          <ToolsMenu />
          <a href="#faq" className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/Nabeel_Resume_2026.pdf"
            download
            className="hidden h-10 items-center rounded-md border border-black bg-white px-5 text-[15px] font-medium transition hover:-translate-y-px hover:shadow-[3px_3px_0_#000] sm:inline-flex"
          >
            Resume
          </a>
          <a
            href="mailto:mnak.nabeel@gmail.com"
            className="inline-flex h-10 items-center gap-1.5 rounded-md border border-black px-5 text-[15px] font-medium transition hover:-translate-y-px hover:shadow-[3px_3px_0_#000]"
            style={{ background: lime }}
          >
            Get in touch <span aria-hidden>→</span>
          </a>
        </div>
      </header>

      {/* ── 3D scroll hero ──────────────────────────────── */}
      <Hero />

      {/* ── Intro video — how outsourcing works ─────────── */}
      <section className="mx-auto max-w-4xl px-5 pb-20 sm:pb-28">
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

      {/* ── Big stat (Gumroad's $2,195,695 moment) ──────── */}
      <section className="px-5 py-20 sm:py-28 text-center">
        <p
          className="font-medium tracking-[-0.03em] leading-none tabular-nums"
          style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
        >
          $4,000,000<span style={{ color: lime }}>+</span>
        </p>
        <p className="mt-6 text-lg sm:text-xl text-black max-w-xl mx-auto leading-relaxed">
          in client revenue tracked across 50+ engagements — with a{" "}
          <strong className="font-semibold text-black">98% accuracy rate</strong> on the books behind it.
        </p>
      </section>

      {/* ── Services bento ──────────────────────────────── */}
      <section id="services" className="px-5 pb-20 sm:pb-28 max-w-6xl mx-auto">
        <p className="mb-4 text-[15px]">
          <span
            className="rounded-md border border-black px-2.5 py-1 text-sm font-semibold"
            style={{ background: lime }}
          >
            Services
          </span>{" "}
          — fixed monthly scope, no hourly meter
        </p>
        <h2 className="text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] mb-10 sm:mb-14">
          What I can take off your plate.
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {capabilities.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className={`${c.bg} ${c.radius} border border-black p-7 sm:p-9 block transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#000]`}
            >
              <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.01em] mb-3">{c.title}</h3>
              <p className="text-base leading-relaxed text-black mb-6 max-w-md">{c.desc}</p>
              <span className="inline-flex items-center gap-1.5 font-medium underline decoration-black/30 underline-offset-4 hover:decoration-black transition">
                See the work <span aria-hidden>→</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Case studies ────────────────────────────────── */}
      <section id="cases" className="px-5 pb-20 sm:pb-28 max-w-6xl mx-auto">
        <h2 className="text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] mb-4">
          Proof, not promises.
        </h2>
        <p className="text-lg text-black max-w-xl mb-10 sm:mb-14">
          Bookkeeping clean-ups, automation builds, and financial reviews — messy
          data in, numbers you can act on out.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <article
              key={c.title}
              className="bg-white border border-black rounded-[20px] p-6 sm:p-7 flex flex-col transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#000]"
            >
              <p className="text-[13px] uppercase tracking-[0.08em] text-black mb-3">{c.tag}</p>
              <h3 className="text-xl font-medium leading-snug mb-3">{c.title}</h3>
              <p className="text-[15px] leading-relaxed text-black mb-6">{c.desc}</p>
              <div className="mt-auto border-t border-black pt-4 space-y-2">
                {c.metrics.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between text-[15px]">
                    <span className="text-black">{label}</span>
                    <span className="font-semibold tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Experience: where I've worked ───────────────── */}
      <Experience />

      {/* ── Tools I've built ────────────────────────────── */}
      <section id="tools" className="px-5 pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl">
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
          <div className="grid gap-5 md:grid-cols-2">
            <a
              href="https://crm.muhammadnabeel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-black bg-white p-7 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] sm:p-9 rounded-[24px_24px_24px_4px]"
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
            <a
              href="https://audit.muhammadnabeel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-black p-7 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] sm:p-9 rounded-[24px_24px_4px_24px]"
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
            <div className="flex flex-col items-start justify-center border border-dashed border-black/40 p-7 sm:p-9 rounded-[24px_4px_24px_24px] md:col-span-2">
              <h3 className="mb-2 text-xl font-medium tracking-[-0.01em] text-black">
                Next tool — coming soon
              </h3>
              <p className="text-base leading-relaxed text-black">
                Currently in the build queue: client reporting automation. If
                there&apos;s a workflow you wish existed,{" "}
                <a
                  href="mailto:mnak.nabeel@gmail.com?subject=Tool%20idea"
                  className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
                >
                  tell me about it
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (also feeds AI answers & featured snippets) ─ */}
      <section id="faq" className="mx-auto max-w-4xl px-5 pb-20 sm:pb-28">
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
          Before you email me.
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
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
          ))}
        </div>
      </section>

      {/* ── Big quote (Gumroad 72px statement) ──────────── */}
      <section className="px-5 py-20 sm:py-28 max-w-5xl mx-auto text-center">
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
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="px-5 pb-24 pt-6 text-center max-w-3xl mx-auto">
        <h2 className="text-[clamp(2.25rem,6.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] mb-6">
          Your books, handled.
        </h2>
        <p className="text-lg text-black mb-8 leading-relaxed">
          Tell me what&apos;s messy — books behind, reports late, margins unclear.
          I&apos;ll look at your file and tell you exactly what it takes to fix it.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%27d%20like%20to%20talk%20about%20outsourcing%20my%20bookkeeping"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-md border border-black text-base font-medium transition hover:-translate-y-px hover:shadow-[4px_4px_0_#000]"
            style={{ background: "#25d366" }}
          >
            <WaIcon />
            WhatsApp me <span aria-hidden>→</span>
          </a>
          <a
            href="mailto:mnak.nabeel@gmail.com?subject=Bookkeeping%20%2F%20Financial%20reporting%20inquiry"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-md border border-black bg-white text-base font-medium transition hover:-translate-y-px hover:shadow-[4px_4px_0_#000]"
          >
            Email instead <span aria-hidden>→</span>
          </a>
          <a
            href="https://linkedin.com/in/muhammad-nabeel-finance-engineer"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-black/30 underline-offset-4 hover:decoration-black text-base transition"
          >
            Find me on LinkedIn
          </a>
        </div>
      </section>

      {/* ── Footer: giant wordmark ──────────────────────── */}
      <footer className="border-t border-black">
        <div className="max-w-6xl mx-auto px-5 pt-10">
          <div
            className="font-semibold tracking-[-0.04em] leading-[0.85] select-none"
            style={{ fontSize: "clamp(4rem, 17vw, 15rem)" }}
            aria-hidden
          >
            NABEE<span style={{ color: lime }}>L</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-black">
            <p>© {new Date().getFullYear()} Muhammad Nabeel — Remote bookkeeping, accounting & financial reporting</p>
            <div className="flex gap-6">
              <a href="https://wa.me/923410224988" target="_blank" rel="noopener noreferrer" className="underline decoration-black/30 underline-offset-4 hover:decoration-black transition">WhatsApp</a>
              <a href="mailto:mnak.nabeel@gmail.com" className="underline decoration-black/30 underline-offset-4 hover:decoration-black transition">Email</a>
              <a href="https://linkedin.com/in/muhammad-nabeel-finance-engineer" target="_blank" rel="noopener noreferrer" className="underline decoration-black/30 underline-offset-4 hover:decoration-black transition">LinkedIn</a>
              <a href="/" className="underline decoration-black/30 underline-offset-4 hover:decoration-black transition">Main site</a>
            </div>
          </div>
        </div>
      </footer>




    </div>
  );
}
