"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { favorit } from "@/app/gumroad/fonts";
import { WhatsappLogo, List, X, CaretDown, ArrowUpRight } from "phosphor-react";

const lime = "#c8f603";
const yellow = "#ffc900";

export default function TaxNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close menus on route change or ESC
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setToolsOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const enterTools = () => {
    if (toolsTimer.current) clearTimeout(toolsTimer.current);
    setToolsOpen(true);
  };

  const leaveTools = () => {
    toolsTimer.current = setTimeout(() => setToolsOpen(false), 140);
  };

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Tax Filing", href: "/tax-filing", isHighlight: true },
    { label: "Tax Calculator", href: "/tax-calculator" },
    { label: "Tax Rates", href: "/tax-rates" },
    { label: "Work", href: "/#work" },
  ];

  return (
    <header
      className={`${favorit.variable} sticky top-0 z-50 border-b border-black bg-[#f4f4f0]/95 backdrop-blur-md antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-baseline gap-1.5 text-xl font-bold tracking-tight text-black">
            <span>Nabeel</span>
            <span style={{ color: lime }} className="text-2xl font-black">✦</span>
          </Link>
          <span className="hidden rounded-full border border-black/15 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-black/80 md:inline-block">
            Tax &amp; Finance Engineer
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-[15px] lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative font-medium transition ${
                  isActive
                    ? "font-semibold text-black underline decoration-black decoration-2 underline-offset-8"
                    : link.isHighlight
                    ? "rounded-md border border-black bg-[#c8f603]/30 px-2.5 py-1 text-black hover:bg-[#c8f603] hover:shadow-[2px_2px_0_#000]"
                    : "text-black/80 hover:text-black hover:underline hover:decoration-black/40 hover:underline-offset-8"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Tools Dropdown */}
          <div
            ref={toolsRef}
            className="relative"
            onMouseEnter={enterTools}
            onMouseLeave={leaveTools}
          >
            <button
              type="button"
              onClick={() => setToolsOpen(!toolsOpen)}
              className="inline-flex items-center gap-1 font-medium text-black/80 transition hover:text-black"
              aria-expanded={toolsOpen}
            >
              Tools
              <CaretDown size={14} className={`transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
            </button>

            {toolsOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-[16px_16px_16px_4px] border border-black bg-white p-2.5 shadow-[4px_4px_0_#000]">
                <a
                  href="https://crm.muhammadnabeel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg p-2.5 transition hover:bg-[#f4f4f0]"
                >
                  <div className="flex items-center justify-between text-[14px] font-semibold text-black">
                    <span>The Little CRM</span>
                    <ArrowUpRight size={14} />
                  </div>
                  <p className="mt-0.5 text-xs text-black/70">Lead &amp; client pipeline software</p>
                </a>
                <a
                  href="https://audit.muhammadnabeel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block rounded-lg p-2.5 transition hover:bg-[#f4f4f0]"
                >
                  <div className="flex items-center justify-between text-[14px] font-semibold text-black">
                    <span>Resume IQ</span>
                    <ArrowUpRight size={14} />
                  </div>
                  <p className="mt-0.5 text-xs text-black/70">AI-driven resume score &amp; audit</p>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <a
            href="/Nabeel_Resume_2026.pdf"
            download
            className="magnetic hidden h-9 items-center rounded-md border border-black bg-white px-3.5 text-xs font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#000] sm:inline-flex"
          >
            Resume
          </a>
          <a
            href="https://wa.me/923410224988?text=Hi%20Nabeel%2C%20I%20would%20like%20to%20file%20my%20Pakistan%20Income%20Tax%20Return."
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic inline-flex h-9 items-center gap-1.5 rounded-md border border-black px-3.5 text-xs font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#000] sm:text-sm"
            style={{ background: lime }}
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>File on WhatsApp</span>
            <span aria-hidden>→</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black bg-white text-black lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="border-t border-black bg-[#f4f4f0] px-4 py-5 lg:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between rounded-lg border border-black bg-white px-4 py-3 text-base font-semibold text-black shadow-[2px_2px_0_#000]"
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <span style={{ color: lime }}>→</span>
              </Link>
            ))}
            <div className="pt-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/60">Software Tools</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://crm.muhammadnabeel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-black bg-white p-3 text-xs font-semibold text-black hover:bg-[#c8f603]"
                >
                  The Little CRM ↗
                </a>
                <a
                  href="https://audit.muhammadnabeel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-black bg-white p-3 text-xs font-semibold text-black hover:bg-[#ffc900]"
                >
                  Resume IQ ↗
                </a>
              </div>
            </div>
            <div className="pt-3">
              <a
                href="/Nabeel_Resume_2026.pdf"
                download
                className="flex w-full items-center justify-center rounded-md border border-black bg-white py-2.5 text-sm font-semibold text-black"
              >
                Download Resume PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
