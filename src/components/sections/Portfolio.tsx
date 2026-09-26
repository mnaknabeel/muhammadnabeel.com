"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Download } from "phosphor-react"

export const items = [
  {
    title: "Annual Financial Review — F&B Group",
    subtitle: "Multi-Location Restaurant",
    description:
      "Full-year financial review: AED 2.21M revenue, 61.6% gross margin, AED 221.5K EBITDA. Monthly P&L trends, balance sheet, ratio analysis, and revenue breakdown across 6 channels. Includes automated aggregator reconciliation across 5 platforms.",
    file: "/portfolio/annual-financial-review-2025.html",
    thumb: "/images/res%20report.png",
    tags: ["P&L", "Annual Review", "F&B"],
  },
  {
    title: "Accounts Payable Schedule — F&B Group",
    subtitle: "Vendor Management",
    description:
      "AP aging for 168 supplier accounts across a multi-location restaurant group. AED 25.9K outstanding, AED 12.1K in credits identified and recovered. Includes aging profile, over-payment detection, and supplier categorization.",
    file: "/portfolio/accounts-payable-uae-restaurant.html",
    thumb: "/images/payable%20report.png",
    tags: ["AP", "Vendors", "F&B"],
  },
  {
    title: "Financial Review — Delivery Startup",
    subtitle: "Startup Profit Turnaround",
    description:
      "223.5% profit swing from a $19.2K loss to $23.7K net income in one year. YoY comparative P&L, expense benchmarking, revenue channel analysis, and quarterly performance. Zero debt with 14+ months cash runway.",
    file: "/portfolio/income-statement-ghostro-delivery.html",
    thumb: "/images/delivery%20startup.png",
    tags: ["Startup", "Logistics", "Turnaround"],
  },
  {
    title: "Profit & Loss — Amazon FBA Seller",
    subtitle: "E-Commerce Accounting",
    description:
      "YTD P&L for a multi-category Amazon FBA operator. $228.3K total income, 75.2% gross margin, 10.3% net margin. Automated ingestion of 6,000+ Amazon settlement transactions with SKU-level margin tracking across 5+ product lines.",
    file: "/portfolio/pnl-amazon-fba-seller.html",
    thumb: "/images/fin%20analysis.png",
    tags: ["Amazon FBA", "E-Commerce", "Profit & Loss"],
  },
  {
    title: "Aggregator Reconciliation Dashboard",
    subtitle: "Multi-Platform Sales Reconciliation",
    description:
      "Interactive dashboard reconciling daily sales across 5 aggregator platforms (Talabat, Noon, Deliveroo, Keeta, Zomato) against bank deposits. 82.8% auto-matched rate, AED 26.6K exceptions flagged, and AED 104.8K total reconciled in a single month.",
    file: "/portfolio/restaurant-dashboard.html",
    thumb: "/images/restaurant%20dashboard.png",
    tags: ["Dashboard", "Reconciliation", "F&B"],
  },
  {
    title: "Financial Review — Delivery Startup",
    subtitle: "Full-Year Financial Analysis",
    description:
      "$77.5K revenue, 223.5% profit swing, 30.6% net margin. Interactive dashboard with 12 Chart.js visualizations covering P&L, cash flow, seasonality, DCF valuation ($372K equity), expense analysis, and risk assessment across 7 sections.",
    file: "/portfolio/delivery-startup-financial-review.html",
    thumb: "/images/ghostro%20review.png",
    tags: ["Dashboard", "Startup", "Turnaround"],
  },
  {
    title: "Financial Forecast Model",
    subtitle: "Amazon.com — Automated PDF-to-Forecast Pipeline",
    description:
      "End-to-end financial model extracting 882 line items from 10 earnings releases into a driver-based quarterly forecast engine. 3 scenarios (Base/Upside/Downside), 8 integrated sheets, full P&L/BS/CF, segment data, and 100% formula-driven projections with editable assumptions.",
    file: "/portfolio/amazon-financial-forecast-model.html",
    thumb: "/images/financial%20model.png",
    tags: ["Forecast", "Financial Model", "Amazon"],
  },
  {
    title: "Trial Balance Variance Analysis",
    subtitle: "Construction Company — QBD vs QBO Reconciliation",
    description:
      "System-to-system variance analysis comparing QuickBooks Desktop vs QuickBooks Online trial balances for a Canadian construction company. $2.1M in discrepancies identified: $1.52M missing bank account, $1.07M retained earnings gap, $141K tax liability mismatch, and $356K revenue recognition issue. Includes actionable recommendations.",
    file: "/portfolio/sletten-variance-analysis.html",
    thumb: "/images/varaince.jpg",
    tags: ["Variance", "Reconciliation", "Construction"],
  },
  {
    title: "FBA Inventory Report",
    subtitle: "E-Commerce Company — $21.8K Inventory at Cost",
    description:
      "Complete FBA inventory valuation for 54 SKUs across 4 categories. $21,810 total inventory at PO-confirmed costs, 5,649 available units, Amazon account balance waterfall ($5,051 closing, +122% sales MoM), bank transfers, and 24 open receiving shipments worth $41,951 with 184-unit counting gap analysis.",
    file: "/portfolio/fba-inventory-report.html",
    thumb: "/images/inventory%20report.jpg",
    tags: ["Amazon FBA", "Inventory", "Valuation"],
  },
  {
    title: "Weekly Analytics Brief",
    subtitle: "E-Commerce Company — Covenant Compliance",
    description:
      "Comprehensive Amazon operations brief covering a $50,921 covenant shortfall ($75,079 vs $126K target). Component breakdown (cash, inventory, gift cards), 3 scenario analyses, monthly sales trends (+122% Jan→Feb), inventory valuation methodology, and 12 prioritized action items with 4 critical flags.",
    file: "/portfolio/analytics-brief.html",
    thumb: "/images/Amazon_Weekly_Analytics_Brief.jpeg",
    tags: ["Analytics", "Compliance", "Covenant"],
  },
  {
    title: "Financial Review & Audit Findings",
    subtitle: "E-Commerce Company — Revenue Recognition Audit",
    description:
      "Critical audit finding: $1.9M revenue underreporting due to incorrect sales account debiting. Corrected net operating income of $1,048,760 vs uncorrected ($480,869) loss. Includes freight-to-sales ratio analysis (11.14% avg, 18.11% peak), break-even analysis ($449,593/month), and margin of safety.",
    file: "/portfolio/ipas-financial-review.html",
    thumb: "/images/Financial_audit.jpeg",
    tags: ["Audit", "Revenue Recognition", "E-Commerce"],
  },
  {
    title: "Shipping Cost Analysis",
    subtitle: "Multi-Client Fulfillment Optimization",
    description:
      "Fulfillment cost breakdown across carriers and stores: $11,434 tracked costs, UPS (46.4%) and USPS (31.6%) dominate at 78% combined. Fulfillment = 94.3% of carrier fees. Top two stores (HTLT Supplements + Jenny Packham) drive 76% of costs. Carrier concentration risk and rate negotiation opportunities identified.",
    file: "/portfolio/shipping-cost-analysis.html",
    thumb: "/images/shipping_cost.jpg",
    tags: ["Logistics", "Fulfillment", "Cost Analysis"],
  },
]

function PortfolioCard({ item, index }: { item: (typeof items)[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120)
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-2xl border border-border bg-surface/50 overflow-hidden transition-all duration-700 hover:border-lime/30",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      )}
    >
      <a href={item.file} target="_blank" rel="noopener noreferrer" className="block">
        <div className="aspect-[4/3] bg-elevated overflow-hidden relative">
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-lime text-ink px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Download size={14} />
            View Report
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-lime font-mono text-[10px] tracking-widest uppercase mb-1">
            {item.subtitle}
          </p>
          <h3 className="text-sm sm:text-base font-semibold leading-tight mb-2 group-hover:text-lime transition-colors">
            {item.title}
          </h3>
          <p className="text-muted text-xs leading-relaxed mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-muted border border-border px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-lime font-mono text-sm tracking-widest uppercase mb-3 text-center">
          Portfolio
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight">
          Reports & deliverables
        </h2>
        <p className="text-muted text-sm sm:text-base text-center max-w-xl mx-auto mb-10 sm:mb-16">
           Real client work. Anonymized. Each report is a sample of the financial
           reporting, analysis, and process design I deliver.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <PortfolioCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
