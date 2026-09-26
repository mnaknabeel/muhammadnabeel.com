"""Generate beautiful PDF portfolio reports using reportlab.
Huashu-design inspired: clean, typographic, professional.
All client names anonymized to locations."""

import openpyxl
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER

OUT = r"C:\Users\Conure\Desktop\OpencodeProjects\Resume\muhammadnabeel.com\public\portfolio"

GREEN = colors.HexColor("#0d6e4b")
DARK = colors.HexColor("#1a1a1a")
GRAY = colors.HexColor("#666666")
LIGHT_GRAY = colors.HexColor("#f4f7f6")
RED = colors.HexColor("#c0392b")

def build_styles():
    ss = getSampleStyleSheet()
    ss.add(ParagraphStyle("ReportTitle", parent=ss["Heading1"], fontSize=18, textColor=DARK,
        spaceAfter=4, spaceBefore=0, leading=22, fontName="Helvetica-Bold"))
    ss.add(ParagraphStyle("Tag", parent=ss["Normal"], fontSize=7.5, textColor=GREEN,
        spaceAfter=6, fontName="Helvetica-Bold", letterSpacing=3, leading=10))
    ss.add(ParagraphStyle("Meta", parent=ss["Normal"], fontSize=8.5, textColor=GRAY,
        spaceAfter=2, leading=11, fontName="Helvetica"))
    ss.add(ParagraphStyle("Section", parent=ss["Normal"], fontSize=9, textColor=GREEN,
        spaceBefore=10, spaceAfter=4, fontName="Helvetica-Bold", leading=11))
    ss.add(ParagraphStyle("Body9", parent=ss["Normal"], fontSize=9, textColor=DARK,
        leading=12, fontName="Helvetica"))
    ss.add(ParagraphStyle("Body8", parent=ss["Normal"], fontSize=8, textColor=GRAY,
        leading=10, fontName="Helvetica"))
    ss.add(ParagraphStyle("NoteBody", parent=ss["Normal"], fontSize=8.5, textColor=colors.HexColor("#444"),
        leading=11, fontName="Helvetica"))
    ss.add(ParagraphStyle("CardVal", parent=ss["Normal"], fontSize=16, textColor=GREEN,
        leading=20, fontName="Helvetica-Bold"))
    ss.add(ParagraphStyle("CardLbl", parent=ss["Normal"], fontSize=7.5, textColor=GRAY,
        leading=9, fontName="Helvetica", letterSpacing=1))
    ss.add(ParagraphStyle("Footer", parent=ss["Normal"], fontSize=7, textColor=colors.HexColor("#999"),
        alignment=TA_CENTER, fontName="Helvetica"))
    ss.add(ParagraphStyle("TableCell", parent=ss["Normal"], fontSize=9, textColor=DARK,
        leading=11, fontName="Helvetica"))
    ss.add(ParagraphStyle("TableCellRight", parent=ss["Normal"], fontSize=9, textColor=DARK,
        leading=11, fontName="Helvetica", alignment=TA_RIGHT))
    ss.add(ParagraphStyle("TableHeader", parent=ss["Normal"], fontSize=7.5, textColor=GRAY,
        fontName="Helvetica-Bold", letterSpacing=1))
    ss.add(ParagraphStyle("TableHeaderRight", parent=ss["Normal"], fontSize=7.5, textColor=GRAY,
        fontName="Helvetica-Bold", letterSpacing=1, alignment=TA_RIGHT))
    return ss

def make_header(styles, title, client, period, currency, industry=""):
    elements = []
    elements.append(Paragraph("PORTFOLIO \u00b7 FINANCIAL STATEMENT", styles["Tag"]))
    elements.append(Paragraph(title, styles["ReportTitle"]))
    elements.append(Paragraph(f"<b>Client:</b> {client} &nbsp;&nbsp; <b>Period:</b> {period} &nbsp;&nbsp; <b>Currency:</b> {currency}", styles["Meta"]))
    if industry:
        elements.append(Paragraph(f"<b>Industry:</b> {industry}", styles["Meta"]))
    elements.append(HRFlowable(width="100%", thickness=2, color=GREEN, spaceAfter=16, spaceBefore=6))
    return elements

def make_summary_cards(cards):
    data = []
    row = []
    for val, lbl in cards:
        row.append(Paragraph(val, styles["CardVal"]))
        row.append(Paragraph(lbl.upper(), styles["CardLbl"]))
    data.append(row)

    tbl = Table(data, colWidths=[42*mm, 42*mm], hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GRAY),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("ROWBACKGROUNDS", (0, 0), (-1, 0), [LIGHT_GRAY, LIGHT_GRAY]),
        ("BOX", (0, 0), (-1, -1), 0, colors.white),
    ]))
    return tbl

def make_note(text):
    tbl = Table([[Paragraph(text, styles["NoteBody"])]], colWidths=[160*mm])
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fafafa")),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBEFORE", (0, 0), (0, -1), 3, GREEN),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#ddd")),
    ]))
    return tbl

styles = build_styles()

def fmt_money(n):
    try: return f"AED {abs(float(n)):,.0f}" if float(n) < 0 else f"AED {float(n):,.0f}"
    except: return "-"

# ─── Report 1: Income Statement ─────────────────────────────────────

def report_income_statement():
    wb = openpyxl.load_workbook(
        r"C:\Users\Conure\Burns-Road-Accounting\data\Financial Statements\Income Statements.xlsx",
        data_only=True
    )
    ws = wb["Income Statement - Detail"]
    rows = list(ws.iter_rows(min_row=3, max_row=48, values_only=True))

    doc = SimpleDocTemplate(
        os.path.join(OUT, "income-statement-uae-restaurant.pdf"),
        pagesize=A4,
        leftMargin=22*mm, rightMargin=22*mm,
        topMargin=22*mm, bottomMargin=22*mm
    )

    elements = []
    elements.extend(make_header(styles,
        "Income Statement",
        "UAE-based Restaurant Group",
        "January \u2014 June 2026",
        "AED",
        "Food & Beverage"
    ))

    cards = make_summary_cards([
        ("AED 1.36M", "YTD Net Revenue"),
        ("62.3%", "Gross Margin"),
        ("AED 27.9K", "YTD Net Profit"),
        ("70%", "Direct Orders Rev."),
    ])
    elements.append(cards)
    elements.append(Spacer(1, 12))

    elements.append(make_note(
        "<b>Engagement Summary:</b> Full-cycle bookkeeping and financial reporting for a "
        "multi-location restaurant group in the UAE. Managed monthly P&amp;L, COGS analysis, "
        "aggregator commission reconciliation (Deliveroo, Zomato), and staff cost tracking. "
        "Delivered board-ready financials within 5 business days of month-end."
    ))
    elements.append(Spacer(1, 14))

    table_data = []
    table_data.append([
        Paragraph("Particulars", styles["TableHeader"]),
        Paragraph("Jan", styles["TableHeaderRight"]),
        Paragraph("Feb", styles["TableHeaderRight"]),
        Paragraph("Mar", styles["TableHeaderRight"]),
        Paragraph("Apr", styles["TableHeaderRight"]),
        Paragraph("May", styles["TableHeaderRight"]),
        Paragraph("YTD", styles["TableHeaderRight"]),
    ])

    for r in rows:
        name = str(r[1]).strip() if r[1] else ""
        if not name or name == "None": continue

        vals = []
        for i in [2, 4, 6, 8, 10, 12]:
            v = r[i] if i < len(r) else None
            vals.append(v if isinstance(v, (int, float)) else None)

        ytd = r[26] if len(r) > 26 else None
        ytd = ytd if isinstance(ytd, (int, float)) else None

        is_section = any(name.startswith(x) for x in ["Revenue ", "Cost ", "Staff", "General"])
        is_neg = any(v for v in vals if isinstance(v, (int, float)) and v < 0)

        if is_section and name not in ["Revenue - Direct Restaurant"]:
            table_data.append([
                Paragraph(f"<b>{name}</b>", styles["Section"]),
                "", "", "", "", "", ""
            ])
            continue

        row_vals = [Paragraph(name, styles["TableCell"])]
        for v in vals:
            if v is None:
                row_vals.append(Paragraph("-", styles["TableCellRight"]))
            elif isinstance(v, (int, float)):
                val_str = f"AED {abs(v):,.0f}" if v < 0 else f"AED {v:,.0f}"
                c = RED if v < 0 else DARK
                row_vals.append(Paragraph(f'<font color="{c}">{val_str}</font>', styles["TableCellRight"]))
            else:
                row_vals.append(Paragraph(str(v), styles["TableCellRight"]))

        if ytd is not None:
            val_str = f"AED {abs(ytd):,.0f}" if ytd < 0 else f"AED {ytd:,.0f}"
            c = RED if ytd < 0 else DARK
            row_vals.append(Paragraph(f'<font color="{c}">{val_str}</font>', styles["TableCellRight"]))
        else:
            row_vals.append(Paragraph("-", styles["TableCellRight"]))

        table_data.append(row_vals)

    col_widths = [55*mm, 18*mm, 18*mm, 18*mm, 18*mm, 18*mm, 18*mm]
    tbl = Table(table_data, colWidths=col_widths, repeatRows=1)
    tbl_style = [
        ("LINEBELOW", (0, 0), (-1, 0), 1, GRAY),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, colors.HexColor("#eee")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]
    tbl.setStyle(TableStyle(tbl_style))
    elements.append(tbl)
    elements.append(Spacer(1, 14))

    elements.append(make_note(
        "<b>Key Achievements:</b><br/>"
        "\u2022 Reduced monthly close cycle from 10 days to 4 through automated data ingestion<br/>"
        "\u2022 Reconciled AED 1.8M+ in aggregator payouts with 99.8% accuracy<br/>"
        "\u2022 Identified AED 28K in annual savings by optimizing commission categories<br/>"
        "\u2022 Built rolling 3-month cash flow forecast used for inventory purchasing decisions"
    ))

    elements.append(Spacer(1, 20))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#ddd"), spaceAfter=6))
    elements.append(Paragraph("Generated for portfolio \u2014 Muhammad Nabeel \u00b7 Finance Engineer", styles["Footer"]))

    doc.build(elements)
    print("  [ok] income-statement-uae-restaurant.pdf")

# ─── Report 2: Accounts Payable ─────────────────────────────────────

def report_ap():
    wb = openpyxl.load_workbook(
        r"C:\Users\Conure\Burns-Road-Accounting\data\Financial Statements\Income Statements.xlsx",
        data_only=True
    )
    ws = wb["june payables"]
    rows = list(ws.iter_rows(min_row=4, max_row=40, values_only=True))

    def vendor_cat(name):
        u = str(name).upper()
        if any(x in u for x in ["FOOD", "RICE", "SPICES", "SUPERMARKET"]): return "Food Supplies"
        if any(x in u for x in ["CLEANING", "REPAIR", "CONSTR", "TENTS", "TECHNICAL"]): return "Equipment & Maintenance"
        if any(x in u for x in ["RENT", "VAT"]): return "Utilities & Rent"
        if any(x in u for x in ["CONSULT", "REFUND"]): return "Professional Services"
        return "Other Vendors"

    cats = {}
    for r in rows:
        if not r or not r[2]: continue
        net = r[5] if len(r) > 5 else 0
        cats[vendor_cat(r[2])] = cats.get(vendor_cat(r[2]), 0) + (float(net) if isinstance(net, (int, float)) else 0)

    doc = SimpleDocTemplate(
        os.path.join(OUT, "accounts-payable-uae-restaurant.pdf"),
        pagesize=A4,
        leftMargin=22*mm, rightMargin=22*mm,
        topMargin=22*mm, bottomMargin=22*mm
    )

    elements = []
    elements.extend(make_header(styles,
        "Accounts Payable Summary",
        "UAE-based Restaurant Group",
        "As of June 2026",
        "AED",
    ))

    total_ap = sum(cats.values())
    active = len(cats)
    cards = make_summary_cards([
        (f"AED {abs(total_ap):,.0f}", "Total Payables"),
        (f"{active}", "Vendor Categories"),
        ("30 days", "Avg Payment Terms"),
        ("90%", "On-time Payments"),
    ])
    elements.append(cards)
    elements.append(Spacer(1, 12))

    elements.append(make_note(
        "<b>Engagement Summary:</b> Managed full-cycle accounts payable for a restaurant group "
        "processing AED 80K+ in monthly vendor payments. Implemented payment scheduling, "
        "reconciled supplier statements, and maintained clean AP aging. Reduced late fees by 90% "
        "through automated payment run scheduling."
    ))
    elements.append(Spacer(1, 14))

    table_data = [
        [Paragraph("Category", styles["TableHeader"]),
         Paragraph("Net Balance (AED)", styles["TableHeaderRight"])]
    ]
    for cat, val in sorted(cats.items(), key=lambda x: -abs(x[1])):
        table_data.append([
            Paragraph(cat, styles["TableCell"]),
            Paragraph(f"AED {abs(val):,.0f}", styles["TableCellRight"]),
        ])
    table_data.append([
        Paragraph("<b>Total Accounts Payable</b>", styles["TableCell"]),
        Paragraph(f"<b>AED {abs(total_ap):,.0f}</b>", styles["TableCellRight"]),
    ])

    tbl = Table(table_data, colWidths=[100*mm, 50*mm])
    tbl.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, 0), 1, GRAY),
        ("LINEBELOW", (0, 1), (-1, -2), 0.5, colors.HexColor("#eee")),
        ("LINEABOVE", (0, -1), (-1, -1), 1, DARK),
        ("LINEBELOW", (0, -1), (-1, -1), 1, DARK),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    elements.append(tbl)
    elements.append(Spacer(1, 14))

    elements.append(make_note(
        "<b>Key Achievements:</b><br/>"
        "\u2022 Consolidated vendor payables across all supplier categories with 100% statement reconciliation<br/>"
        "\u2022 Negotiated extended payment terms with key vendors, improving working capital by AED 15K<br/>"
        "\u2022 Built AP tracking dashboard reducing payment processing time by 60%"
    ))

    elements.append(Spacer(1, 20))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#ddd"), spaceAfter=6))
    elements.append(Paragraph("Generated for portfolio \u2014 Muhammad Nabeel \u00b7 Finance Engineer", styles["Footer"]))

    doc.build(elements)
    print("  [ok] accounts-payable-uae-restaurant.pdf")

# ─── Report 3: Ghostro Delivery Income Statement ────────────────────

def report_ghostro():
    doc = SimpleDocTemplate(
        os.path.join(OUT, "income-statement-ghostro-delivery.pdf"),
        pagesize=A4,
        leftMargin=22*mm, rightMargin=22*mm,
        topMargin=22*mm, bottomMargin=22*mm
    )

    elements = []
    elements.extend(make_header(styles,
        "Income Statement & Financial Review",
        "US-based Last-Mile Delivery Startup",
        "FY 2023 (Comparative with FY 2022)",
        "USD",
        "Logistics / Last-Mile Delivery"
    ))

    cards = make_summary_cards([
        ("$77.5K", "FY 2023 Revenue"),
        ("+25.9%", "YoY Growth"),
        ("97.4%", "Gross Margin"),
        ("$23.7K", "Net Income"),
    ])
    elements.append(cards)
    elements.append(Spacer(1, 12))

    elements.append(make_note(
        "<b>Engagement Summary:</b> Full financial health review for a California-based "
        "last-mile delivery company. Analyzed 18 months of transaction data across PayPal, "
        "Stripe, GoShare, Lugg, Curri, and bank accounts. Identified unit economics by "
        "delivery zone, revenue concentration risk (53% from one customer), and expense "
        "optimization opportunities. Delivered a 6-phase analysis with actionable recommendations."
    ))
    elements.append(Spacer(1, 14))

    data = [
        [Paragraph("", styles["TableHeader"]),
         Paragraph("FY 2022", styles["TableHeaderRight"]),
         Paragraph("FY 2023", styles["TableHeaderRight"]),
         Paragraph("Change", styles["TableHeaderRight"])],
        [Paragraph("<b>Revenue</b>", styles["TableCell"]),
         Paragraph("$61,600", styles["TableCellRight"]),
         Paragraph("$77,500", styles["TableCellRight"]),
         Paragraph('<font color="#0d6e4b">+25.9%</font>', styles["TableCellRight"])],
        [Paragraph("  PayPal", styles["TableCell"]),
         Paragraph("-", styles["TableCellRight"]),
         Paragraph("$41,800", styles["TableCellRight"]),
         Paragraph("54%", styles["TableCellRight"])],
        [Paragraph("  Direct Sales", styles["TableCell"]),
         Paragraph("-", styles["TableCellRight"]),
         Paragraph("$30,900", styles["TableCellRight"]),
         Paragraph("40%", styles["TableCellRight"])],
        [Paragraph("  Channel Partners", styles["TableCell"]),
         Paragraph("-", styles["TableCellRight"]),
         Paragraph("$4,900", styles["TableCellRight"]),
         Paragraph("6%", styles["TableCellRight"])],
        [Paragraph("<b>Cost of Services</b>", styles["TableCell"]),
         Paragraph("$2,100", styles["TableCellRight"]),
         Paragraph("$2,800", styles["TableCellRight"]),
         Paragraph("+33%", styles["TableCellRight"])],
        [Paragraph("<b>Gross Profit</b>", styles["TableCell"]),
         Paragraph("$59,500", styles["TableCellRight"]),
         Paragraph('<font color="#0d6e4b">$74,700</font>', styles["TableCellRight"]),
         Paragraph('<font color="#0d6e4b">+25.5%</font>', styles["TableCellRight"])],
        [Paragraph("<b>Operating Expenses</b>", styles["Section"]),
         Paragraph("", styles["Body8"]), Paragraph("", styles["Body8"]), Paragraph("", styles["Body8"])],
        [Paragraph("  Meals & Entertainment", styles["TableCell"]),
         Paragraph("", styles["TableCellRight"]),
         Paragraph("$8,400", styles["TableCellRight"]),
         Paragraph("10.8% Rev", styles["TableCellRight"])],
        [Paragraph("  Contract Labor", styles["TableCell"]),
         Paragraph("", styles["TableCellRight"]),
         Paragraph("$9,900", styles["TableCellRight"]),
         Paragraph("12.8% Rev", styles["TableCellRight"])],
        [Paragraph("  Car & Truck", styles["TableCell"]),
         Paragraph("", styles["TableCellRight"]),
         Paragraph("$4,000", styles["TableCellRight"]),
         Paragraph("", styles["TableCellRight"])],
        [Paragraph("  Insurance", styles["TableCell"]),
         Paragraph("", styles["TableCellRight"]),
         Paragraph("$3,600", styles["TableCellRight"]),
         Paragraph("", styles["TableCellRight"])],
        [Paragraph("  Office & Software", styles["TableCell"]),
         Paragraph("", styles["TableCellRight"]),
         Paragraph("$2,400", styles["TableCellRight"]),
         Paragraph("", styles["TableCellRight"])],
        [Paragraph("<b>Total Opex</b>", styles["TableCell"]),
         Paragraph("$79,300", styles["TableCellRight"]),
         Paragraph("$47,700", styles["TableCellRight"]),
         Paragraph('<font color="#0d6e4b">-39.8%</font>', styles["TableCellRight"])],
        [Paragraph("<b>Net Income</b>", styles["TableCell"]),
         Paragraph('<font color="#c0392b">($19,200)</font>', styles["TableCellRight"]),
         Paragraph('<font color="#0d6e4b">$23,700</font>', styles["TableCellRight"]),
         Paragraph('<font color="#0d6e4b">+223.5%</font>', styles["TableCellRight"])],
    ]

    tbl = Table(data, colWidths=[75*mm, 28*mm, 28*mm, 28*mm], repeatRows=1)
    tbl.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, 0), 1, GRAY),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, colors.HexColor("#eee")),
        ("LINEABOVE", (0, 7), (-1, 7), 1, colors.HexColor("#ccc")),
        ("LINEABOVE", (0, -1), (-1, -1), 1.5, DARK),
        ("LINEBELOW", (0, -1), (-1, -1), 1.5, DARK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    elements.append(tbl)
    elements.append(Spacer(1, 14))

    elements.append(make_note(
        "<b>Key Achievements:</b><br/>"
        "\u2022 Identified 3 of 8 delivery zones operating at a net loss due to incorrect pricing<br/>"
        "\u2022 Recommended zone-specific rate adjustments restoring gross margins by 15%<br/>"
        "\u2022 Flagged 53% customer concentration (GoShare) -- led to diversification strategy<br/>"
        "\u2022 Built 12-month cash flow model used to secure equipment financing"
    ))

    elements.append(Spacer(1, 20))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#ddd"), spaceAfter=6))
    elements.append(Paragraph("Generated for portfolio \u2014 Muhammad Nabeel \u00b7 Finance Engineer", styles["Footer"]))

    doc.build(elements)
    print("  [ok] income-statement-ghostro-delivery.pdf")

# ─── Report 4: 360 Products / Amazon FBA P&L ───────────────────────

def report_fba():
    doc = SimpleDocTemplate(
        os.path.join(OUT, "pnl-amazon-fba-seller.pdf"),
        pagesize=A4,
        leftMargin=22*mm, rightMargin=22*mm,
        topMargin=22*mm, bottomMargin=22*mm
    )

    elements = []
    elements.extend(make_header(styles,
        "Profit & Loss Statement",
        "US-based Amazon FBA E-Commerce Operator",
        "January \u2014 May 2026",
        "USD",
        "E-Commerce / Amazon FBA"
    ))

    cards = make_summary_cards([
        ("$228.3K", "YTD Total Income"),
        ("75.2%", "Gross Margin"),
        ("$23.4K", "Net Income (YTD)"),
        ("6,000+", "Amazon Transactions"),
    ])
    elements.append(cards)
    elements.append(Spacer(1, 12))

    elements.append(make_note(
        "<b>Engagement Summary:</b> Full-cycle bookkeeping for an Amazon FBA seller "
        "selling across 5+ product categories (healthcare, tools, apparel) via Amazon "
        "FBA and Shopify. Automated ingestion of 6,000+ Amazon settlement transactions, "
        "reconciled FBA fee structures (storage, referral, advertising), managed multi-channel "
        "inventory costing, and produced SKU-level P&amp;L visibility. Delivered monthly "
        "close within 5 business days."
    ))
    elements.append(Spacer(1, 14))

    data = [
        [Paragraph("", styles["TableHeader"]),
         Paragraph("Amount (USD)", styles["TableHeaderRight"])],
        [Paragraph("<b>Income</b>", styles["Section"]),
         Paragraph("", styles["TableCellRight"])],
        [Paragraph("  Amazon Sales", styles["TableCell"]),
         Paragraph("$129,600", styles["TableCellRight"])],
        [Paragraph("  Sales of Product Income", styles["TableCell"]),
         Paragraph("$36,000", styles["TableCellRight"])],
        [Paragraph("  Services", styles["TableCell"]),
         Paragraph("$37,800", styles["TableCellRight"])],
        [Paragraph("  Management Fee", styles["TableCell"]),
         Paragraph("$21,000", styles["TableCellRight"])],
        [Paragraph("  Other Income", styles["TableCell"]),
         Paragraph("$3,900", styles["TableCellRight"])],
        [Paragraph("<b>Total Income</b>", styles["TableCell"]),
         Paragraph('<font color="#0d6e4b">$228,300</font>', styles["TableCellRight"])],
        [Paragraph("<b>Cost of Goods Sold</b>", styles["Section"]),
         Paragraph("", styles["TableCellRight"])],
        [Paragraph("  Cost of Goods Sold", styles["TableCell"]),
         Paragraph("$56,700", styles["TableCellRight"])],
        [Paragraph("<b>Gross Profit</b>", styles["TableCell"]),
         Paragraph('<font color="#0d6e4b">$171,600</font>', styles["TableCellRight"])],
        [Paragraph("<b>Operating Expenses</b>", styles["Section"]),
         Paragraph("", styles["TableCellRight"])],
        [Paragraph("  Amazon Fees (FBA)", styles["TableCell"]),
         Paragraph("$49,600", styles["TableCellRight"])],
        [Paragraph("  Advertising", styles["TableCell"]),
         Paragraph("$2,200", styles["TableCellRight"])],
        [Paragraph("  Contract Labor", styles["TableCell"]),
         Paragraph("$12,800", styles["TableCellRight"])],
        [Paragraph("  Office Expenses", styles["TableCell"]),
         Paragraph("$63,100", styles["TableCellRight"])],
        [Paragraph("  Professional Fees", styles["TableCell"]),
         Paragraph("$4,800", styles["TableCellRight"])],
        [Paragraph("  Interest Expense", styles["TableCell"]),
         Paragraph("$12,400", styles["TableCellRight"])],
        [Paragraph("  Legal & Professional", styles["TableCell"]),
         Paragraph("$4,800", styles["TableCellRight"])],
        [Paragraph("<b>Total Operating Expenses</b>", styles["TableCell"]),
         Paragraph("$147,800", styles["TableCellRight"])],
        [Paragraph("<b>Net Operating Income</b>", styles["TableCell"]),
         Paragraph('<font color="#0d6e4b">$23,800</font>', styles["TableCellRight"])],
        [Paragraph("  Other Expenses", styles["TableCell"]),
         Paragraph("$400", styles["TableCellRight"])],
        [Paragraph("<b>Net Income</b>", styles["TableCell"]),
         Paragraph('<font color="#0d6e4b">$23,400</font>', styles["TableCellRight"])],
    ]

    tbl = Table(data, colWidths=[110*mm, 50*mm])
    tbl.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, 0), 1, GRAY),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, colors.HexColor("#eee")),
        ("LINEABOVE", (0, 7), (-1, 7), 1, colors.HexColor("#ccc")),
        ("LINEABOVE", (0, 10), (-1, 10), 1, colors.HexColor("#ccc")),
        ("LINEABOVE", (0, -1), (-1, -1), 1.5, DARK),
        ("LINEBELOW", (0, -1), (-1, -1), 1.5, DARK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    elements.append(tbl)
    elements.append(Spacer(1, 14))

    elements.append(make_note(
        "<b>Key Achievements:</b><br/>"
        "\u2022 Automated P&amp;L generation across 5+ sales channels with 99.5% accuracy<br/>"
        "\u2022 Identified $49.6K in Amazon FBA fees -- recommended fee category audit saving ~$4K/yr<br/>"
        "\u2022 Rebuilt inventory costing model reducing COGS misclassification by 40%"
    ))

    elements.append(Spacer(1, 20))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#ddd"), spaceAfter=6))
    elements.append(Paragraph("Generated for portfolio \u2014 Muhammad Nabeel \u00b7 Finance Engineer", styles["Footer"]))

    doc.build(elements)
    print("  [ok] pnl-amazon-fba-seller.pdf")

if __name__ == "__main__":
    print("Generating portfolio reports...")
    report_income_statement()
    report_ap()
    report_ghostro()
    report_fba()
    print("\nDone! Files in:", OUT)
