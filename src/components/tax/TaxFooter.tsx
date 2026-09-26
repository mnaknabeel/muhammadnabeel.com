import Link from "next/link";
import { favorit } from "@/app/gumroad/fonts";

const lime = "#c8f603";

export default function TaxFooter() {
  return (
    <footer
      className={`${favorit.variable} border-t border-black bg-white text-black antialiased`}
      style={{ fontFamily: "var(--font-favorit), 'ABC Favorit', Avenir, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-baseline gap-1.5 text-2xl font-bold tracking-tight text-black">
              <span>Muhammad Nabeel</span>
              <span style={{ color: lime }}>✦</span>
            </Link>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-black/80">
              Finance Engineer &amp; Pakistan Tax Advisory Specialist. Streamlining bookkeeping for international businesses and filing 100% compliant FBR income tax returns for salaried professionals, freelancers, and businesses.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/923410224988"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-black bg-[#c8f603] px-3.5 py-1.5 text-xs font-semibold text-black transition hover:shadow-[3px_3px_0_#000]"
              >
                WhatsApp: +92 341 0224988
              </a>
            </div>
          </div>

          {/* Pakistan Tax Filing */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Pakistan Tax Suite</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/tax-filing" className="text-black/80 transition hover:text-black hover:underline">
                  File Income Tax Return
                </Link>
              </li>
              <li>
                <Link href="/tax-filing#pricing" className="text-black/80 transition hover:text-black hover:underline">
                  Filing Packages &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/tax-filing#documents" className="text-black/80 transition hover:text-black hover:underline">
                  Required Documents
                </Link>
              </li>
              <li>
                <Link href="/tax-filing#atl" className="text-black/80 transition hover:text-black hover:underline">
                  Active Taxpayer List (ATL)
                </Link>
              </li>
              <li>
                <Link href="/tax-filing#faq" className="text-black/80 transition hover:text-black hover:underline">
                  Tax Return FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Tax Calculators & Slabs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Calculators &amp; Slabs</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/tax-calculator" className="text-black/80 transition hover:text-black hover:underline">
                  Salary Tax Calculator 2026
                </Link>
              </li>
              <li>
                <Link href="/tax-calculator?tab=freelance" className="text-black/80 transition hover:text-black hover:underline">
                  Freelancer u/s 154A Calculator
                </Link>
              </li>
              <li>
                <Link href="/tax-calculator?tab=business" className="text-black/80 transition hover:text-black hover:underline">
                  Business &amp; AOP Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/tax-rates" className="text-black/80 transition hover:text-black hover:underline">
                  Official Tax Slabs TY 2026
                </Link>
              </li>
              <li>
                <Link href="/tax-rates#withholding" className="text-black/80 transition hover:text-black hover:underline">
                  Withholding Tax Card (Filer vs Non-Filer)
                </Link>
              </li>
            </ul>
          </div>

          {/* International Bookkeeping & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">Global &amp; Software</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="text-black/80 transition hover:text-black hover:underline">
                  QuickBooks &amp; Xero Bookkeeping
                </Link>
              </li>
              <li>
                <Link href="/#work" className="text-black/80 transition hover:text-black hover:underline">
                  12 Portfolio Financial Deliverables
                </Link>
              </li>
              <li>
                <a href="https://crm.muhammadnabeel.com" target="_blank" rel="noopener noreferrer" className="text-black/80 transition hover:text-black hover:underline">
                  The Little CRM ↗
                </a>
              </li>
              <li>
                <a href="https://audit.muhammadnabeel.com" target="_blank" rel="noopener noreferrer" className="text-black/80 transition hover:text-black hover:underline">
                  Resume IQ Tool ↗
                </a>
              </li>
              <li>
                <a href="/Nabeel_Resume_2026.pdf" download className="text-black/80 transition hover:text-black hover:underline">
                  Download Resume PDF
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer & copyright */}
        <div className="mt-12 border-t border-black/10 pt-8 text-xs text-black/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-3xl leading-relaxed">
              {"© "}{new Date().getFullYear()}{" Muhammad Nabeel. All calculations are grounded in the Income Tax Ordinance, 2001 (Amended up to Tax Year 2026) as issued by the Federal Board of Revenue (FBR)."}
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <a href="mailto:mnak.nabeel@gmail.com" className="hover:underline">mnak.nabeel@gmail.com</a>
              <span>·</span>
              <a href="https://linkedin.com/in/muhammad-nabeel-finance-engineer" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
