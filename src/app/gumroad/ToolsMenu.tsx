"use client";

/*
  Tools dropdown for the gumroad nav — Gumroad-styled panel,
  hover (desktop) + click/tap, ESC + click-outside to close.
*/

import { useEffect, useRef, useState } from "react";

const tools = [
  {
    name: "The Little CRM",
    sub: "Lead & client management",
    href: "https://crm.muhammadnabeel.com",
  },
  {
    name: "Resume IQ",
    sub: "AI resume audit",
    href: "https://audit.muhammadnabeel.com",
  },
];

export default function ToolsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hover intent — small delay so the panel doesn't flicker
  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
      >
        Tools
        <span
          aria-hidden
          className={`text-[11px] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 rounded-[12px_12px_12px_4px] border border-black bg-white p-2 shadow-[4px_4px_0_#000]">
          {tools.map((t) => (
            <a
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2.5 transition hover:bg-[#f4f4f0]"
            >
              <span className="block text-[15px] font-semibold leading-tight">
                {t.name} <span aria-hidden>→</span>
              </span>
              <span className="block text-[13px] text-black">{t.sub}</span>
            </a>
          ))}
          <div className="mt-1 border-t border-black/10 px-3 pb-1 pt-2 text-[12px] text-black">
            More tools coming soon
          </div>
        </div>
      )}
    </div>
  );
}
