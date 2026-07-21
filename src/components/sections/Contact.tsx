"use client"

import { Envelope, LinkedinLogo, DownloadSimple } from "phosphor-react"

const links = [
  {
    label: "Email",
    href: "mailto:nabeel@muhammadnabeel.com",
    icon: Envelope,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammad-nabeel-finance-engineer",
    icon: LinkedinLogo,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lime font-mono text-sm tracking-widest uppercase mb-3">
          Contact
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
          Let&apos;s work together
        </h2>
        <p className="text-muted text-base max-w-lg mx-auto mb-10">
          Whether you need fractional finance leadership, a messy cleanup, or
          an automated pipeline — I&apos;d love to hear about it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-surface/50 text-fg hover:border-lime/50 hover:text-lime transition-all duration-300 text-sm font-medium"
            >
              <link.icon size={18} />
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/Nabeel_Resume_2026.pdf"
          download
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime text-ink font-semibold text-sm hover:shadow-[0_0_30px_#c8f60344] transition-all duration-300"
        >
          <DownloadSimple size={18} className="group-hover:translate-y-0.5 transition-transform" />
          Download Resume (PDF)
        </a>
      </div>
    </section>
  )
}
