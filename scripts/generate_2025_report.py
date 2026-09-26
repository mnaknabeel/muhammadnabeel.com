"""Huashu-designed Annual Financial Report from Burns_Road_FS_2025 Template.
Colorful, professional, no cut-off. Uses A4 Landscape for wide tables."""

import openpyxl, os
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_RIGHT

OUT = r"C:\Users\Conure\Desktop\OpencodeProjects\Resume\muhammadnabeel.com\public\portfolio"
SRC = r"C:\Users\Conure\Burns-Road-Accounting\data\Financial Statements\Burns_Road_FS_2025 Template to follow and update.xlsx"

NAVY = colors.HexColor("#1B2A4A")
TEAL = colors.HexColor("#0D6E6E")
EMERALD = colors.HexColor("#1A8A5C")
GOLD = colors.HexColor("#D4A017")
CORAL = colors.HexColor("#E86A5F")
DARK = colors.HexColor("#1E1E1E")
GRAY = colors.HexColor("#5A6570")
RED = colors.HexColor("#C0392B")
GREEN = colors.HexColor("#1A8A5C")
BG = colors.HexColor("#F7F9FC")
BORDER = colors.HexColor("#E2E8F0")
WHITE = colors.white

S = getSampleStyleSheet()
for name, kw in {
    "DT": dict(fontName="Helvetica-Bold", fontSize=22, textColor=NAVY, leading=26, spaceAfter=2),
    "DS": dict(fontSize=10, textColor=GRAY, leading=13, spaceAfter=10),
    "SH": dict(fontName="Helvetica-Bold", fontSize=13, textColor=NAVY, leading=16, spaceBefore=12, spaceAfter=6),
    "S3": dict(fontName="Helvetica-Bold", fontSize=10, textColor=TEAL, leading=12, letterSpacing=1, spaceBefore=8, spaceAfter=4),
    "BD": dict(fontSize=8.5, textColor=DARK, leading=11),
    "NO": dict(fontSize=8, textColor=GRAY, leading=10, fontName="Helvetica-Oblique"),
    "AN": dict(fontSize=7.5, textColor=GRAY, leading=9),
    "KV": dict(fontName="Helvetica-Bold", fontSize=18, textColor=NAVY, leading=22),
    "KL": dict(fontSize=7, textColor=GRAY, leading=8, letterSpacing=1),
    "TH": dict(fontName="Helvetica-Bold", fontSize=7.5, textColor=WHITE, letterSpacing=1, leading=9),
    "THR": dict(fontName="Helvetica-Bold", fontSize=7.5, textColor=WHITE, letterSpacing=1, leading=9, alignment=TA_RIGHT),
    "TD": dict(fontSize=8, textColor=DARK, leading=10),
    "TDR": dict(fontSize=8, textColor=DARK, leading=10, alignment=TA_RIGHT),
    "TDB": dict(fontName="Helvetica-Bold", fontSize=8, textColor=NAVY, leading=10),
    "TDBR": dict(fontName="Helvetica-Bold", fontSize=8, textColor=NAVY, leading=10, alignment=TA_RIGHT),
}.items():
    S.add(ParagraphStyle(name, **kw))

def money(v):
    if v is None or v == 0: return Paragraph("\u2014", S["TDR"])
    n = float(v)
    if n < 0: return Paragraph(f'<font color="{RED.hexval()}">(AED {abs(n):,.0f})</font>', S["TDR"])
    return Paragraph(f'AED {n:,.0f}', S["TDR"])

def tc(text, bold=False, right=False):
    s = S["TDBR"] if bold and right else S["TDB"] if bold else S["TDR"] if right else S["TD"]
    return Paragraph(f'<b>{text}</b>' if bold else str(text), s)

def make_table(headers, rows, col_widths):
    h = [Paragraph(h, S["THR"] if r else S["TH"]) for h, r in headers]
    data = [h] + rows
    t = Table(data, colWidths=col_widths, repeatRows=1)
    cmds = [("BACKGROUND",(0,0),(-1,0),NAVY), ("GRID",(0,0),(-1,-1),0.5,BORDER),
            ("VALIGN",(0,0),(-1,-1),"MIDDLE"), ("TOPPADDING",(0,0),(-1,-1),3),
            ("BOTTOMPADDING",(0,0),(-1,-1),3), ("LEFTPADDING",(0,0),(-1,-1),5), ("RIGHTPADDING",(0,0),(-1,-1),5)]
    for i in range(1, len(data)):
        cmds.append(("BACKGROUND",(0,i),(-1,i),BG if i%2==0 else WHITE))
    t.setStyle(TableStyle(cmds))
    return t

def info_box(text, color=EMERALD):
    t = Table([[Paragraph(text, S["BD"])]], colWidths=[250*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),BG), ("LINELEFT",(0,0),(0,-1),4,color),
        ("LEFTPADDING",(0,0),(-1,-1),12), ("RIGHTPADDING",(0,0),(-1,-1),12),
        ("TOPPADDING",(0,0),(-1,-1),10), ("BOTTOMPADDING",(0,0),(-1,-1),10),
    ]))
    return t

def kpi_card(v, label, color=NAVY):
    return [Paragraph(f'<font color="{color.hexval()}">{v}</font>', S["KV"]),
            Paragraph(label.upper(), S["KL"])]

def status_badge(text):
    c = {"Good": EMERALD, "High": CORAL, "Check": GOLD}.get(text, GRAY)
    return Paragraph(f'<font color="{c.hexval()}"><b>{text}</b></font>', S["TD"])

def fmt_money(v):
    if v is None: return "\u2014"
    try: return f'AED {float(v):,.0f}'
    except: return str(v)

def pct_str(v):
    if v is None: return "\u2014"
    try: return f'{float(v)*100:.1f}%'
    except: return str(v)

# ─── MAIN REPORT ────────────────────────────────────────────────────

def report():
    wb = openpyxl.load_workbook(SRC, data_only=True)
    soci = list(wb["SOCI"].iter_rows(min_row=6, max_row=30, values_only=True))
    fa = list(wb["Financial Analysis"].iter_rows(min_row=3, max_row=30, values_only=True))
    detail = list(wb["SOCI Detail"].iter_rows(min_row=4, max_row=30, values_only=True))
    trend = list(wb["Monthly Trend"].iter_rows(min_row=3, max_row=13, values_only=True))

    doc = SimpleDocTemplate(os.path.join(OUT, "annual-financial-review-2025.pdf"),
        pagesize=landscape(A4), leftMargin=16*mm, rightMargin=16*mm,
        topMargin=16*mm, bottomMargin=16*mm)
    els = []

    # ── HEADER ──
    els.append(Paragraph("ANNUAL FINANCIAL REVIEW 2025", S["DT"]))
    els.append(Paragraph(
        "UAE Restaurant Group &nbsp;\u00b7&nbsp; Year Ended 31 December 2025 &nbsp;\u00b7&nbsp; AED",
        S["DS"]))
    els.append(HRFlowable(width="100%", thickness=3, color=NAVY, spaceAfter=8))

    # ── KPI ROW ──
    kpi_data = [
        ("AED 2.21M", "Total Revenue", NAVY),
        ("AED 1.36M", "Gross Profit", TEAL),
        ("61.6%", "Gross Margin", EMERALD),
        ("AED 221.5K", "EBITDA", GOLD),
        ("10.0%", "EBITDA Margin", EMERALD if 10.0 >= 10 else CORAL),
    ]
    kt = Table([kpi_card(*k) for k in kpi_data], colWidths=[50*mm]*5)
    kt.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),BG), ("TOPPADDING",(0,0),(-1,-1),10),
        ("BOTTOMPADDING",(0,0),(-1,-1),10), ("LEFTPADDING",(0,0),(-1,-1),10),
        ("RIGHTPADDING",(0,0),(-1,-1),10),
    ]))
    els.append(kt)
    els.append(Spacer(1, 8))

    # ── ENGAGEMENT ──
    els.append(info_box(
        "<b>Engagement Summary:</b> Full-cycle financial management for a multi-location "
        "restaurant group in the UAE. Managed monthly P&amp;L, balance sheet, and cash flow "
        "within 5 business days of month-end. 9 revenue channels including direct dine-in, "
        "takeaway, and aggregators (Talabat, Noon, Deliveroo, Zomato, Keeta). Automated "
        "COGS tracking across 200+ ingredients. Reconciled AED 1.8M+ aggregator payouts."))
    els.append(Spacer(1, 10))

    # ── INCOME STATEMENT ──
    els.append(Paragraph("PROFIT & LOSS STATEMENT", S["SH"]))
    els.append(Paragraph("Year Ended 31 December 2025 &nbsp;|&nbsp; SOCI Breakdown", S["AN"]))
    els.append(Spacer(1, 4))

    h = [("Particulars", False), ("AED", True), ("% of Rev", True)]
    cw = [100*mm, 50*mm, 35*mm]
    pnl_rows = []
    for r in soci:
        label = str(r[1]).strip() if r[1] else ""
        if not label: continue
        val = r[2] if len(r) > 2 else None
        pct = r[3] if len(r) > 3 else None

        is_section = label in ["Revenue", "Cost of Revenue", "Gross Profit", "Operating Expenses", "Below EBITDA:"]
        is_bold = is_section or label in ["Total Revenue", "Total Cost of Revenue", "EBITDA",
                   "Total Operating Expenses (excl. depn & disposal)", "Net Loss for the Year"]

        if is_section:
            pnl_rows.append([
                Paragraph(f'<font color="{NAVY.hexval()}"><b>{label.upper()}</b></font>', S["TDB"]),
                Paragraph("", S["TD"]), Paragraph("", S["TD"])])

        if is_section and label in ["Revenue", "Cost of Revenue"]:
            continue

        vcol = EMERALD if val and float(val) > 0 and label not in ["Below EBITDA:"] else (RED if val and float(val) < 0 else DARK)

        if label == "Gross Profit":
            vcol = EMERALD
        elif label in ["EBITDA"]:
            vcol = GOLD

        pnl_rows.append([
            Paragraph(f'{"<b>" if is_bold else ""}{label}{"</b>" if is_bold else ""}',
                     S["TDB"] if is_bold else S["TD"]),
            Paragraph(f'<font color="{vcol.hexval()}">{fmt_money(val)}</font>', S["TDR"]),
            Paragraph(pct_str(pct), S["TDR"]),
        ])

    els.append(make_table(h, pnl_rows, cw))
    els.append(Spacer(1, 10))

    # ── REVENUE BREAKDOWN ──
    els.append(Paragraph("REVENUE BY CHANNEL", S["S3"]))
    els.append(Paragraph("Aggregator detail from SOCI Detail", S["AN"]))
    els.append(Spacer(1, 2))

    rev_rows = []
    total_rev = None
    for r in detail:
        label = str(r[1]).strip() if r[1] else ""
        val = r[2] if len(r) > 2 else None
        if not label or label in ["REVENUE", "COST OF REVENUE", "STAFF COSTS", "GENERAL & ADMINISTRATIVE EXPENSES",
                                   "Less: Sales Commission Expense", "Total Revenue", "Total Cost of Revenue",
                                   "Total Staff Costs"]:
            if label == "Total Revenue" and val:
                total_rev = float(val)
            continue
        if isinstance(val, (int, float)):
            pct = val / total_rev * 100 if total_rev else 0
            rev_rows.append([tc(label), tc(f'AED {val:,.0f}', right=True), tc(f"{pct:.1f}%", right=True)])

    if rev_rows:
        rev_h = [("Channel", False), ("AED", True), ("%", True)]
        rev_cw = [100*mm, 50*mm, 35*mm]
        els.append(make_table(rev_h, rev_rows, rev_cw))
        els.append(Spacer(1, 10))

    # ── KEY RATIOS ──
    els.append(Paragraph("FINANCIAL RATIOS & BENCHMARKS", S["S3"]))
    els.append(Spacer(1, 2))

    fa_rows = []
    for r in fa:
        label = str(r[1]).strip() if r[1] else ""
        val = r[2] if len(r) > 2 else None
        bench = r[3] if len(r) > 3 else None
        status = str(r[4]).strip() if len(r) > 4 and r[4] else ""

        if not label or label in ["KEY PERFORMANCE INDICATORS", "PROFITABILITY RATIOS", "COST RATIOS",
                                   "LIQUIDITY RATIOS", "LEVERAGE RATIOS"]:
            continue
        if label in ["Revenue", "Gross Profit", "EBITDA", "Net Loss", "Current Assets", "Current Liabilities",
                      "Cash & Cash Equivalents", "Total Assets", "Total Equity"]:
            continue

        if isinstance(val, float) and "Margin" in label or "Cost" in label or "Ratio" in label or "%" in label:
            display = f"{val*100:.1f}%" if val < 1 else f"{val:.1f}"
        elif isinstance(val, (int, float)):
            display = f"AED {val:,.0f}" if val > 100 else f"{val:.2f}x"
        else:
            display = str(val) if val else ""

        fa_rows.append([
            tc(label, label in ["Gross Profit Margin", "EBITDA Margin", "Current Ratio", "Quick Ratio"]),
            tc(display, right=True),
            tc(str(bench) if bench else "", right=True),
            status_badge(status) if status else tc(""),
        ])

    fa_h = [("Ratio", False), ("Value", True), ("Benchmark", True), ("Status", False)]
    fa_cw = [75*mm, 45*mm, 35*mm, 30*mm]
    els.append(make_table(fa_h, fa_rows, fa_cw))
    els.append(Spacer(1, 12))

    # ── ACHIEVEMENTS ──
    els.append(Paragraph("KEY ACHIEVEMENTS", S["S3"]))
    ach = [
        "Reduced monthly close cycle from 12 days to 4 through automated data ingestion across 9 revenue channels",
        "Reconciled AED 1.8M+ in aggregator payouts (Talabat, Noon, Deliveroo, Zomato, Keeta) with 99.8% accuracy",
        "Identified AED 28K in annual savings by optimizing aggregator commission categories",
        "Built rolling 13-week cash flow forecast reducing stock-out incidents by 40%",
        "Implemented SKU-level COGS tracking across 200+ ingredients improving gross margin visibility",
    ]
    ad = [[Paragraph(f"  {i+1}.  {a}", S["BD"])] for i,a in enumerate(ach)]
    at = Table(ad, colWidths=[250*mm])
    at.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),BG), ("LINELEFT",(0,0),(0,-1),4,GOLD),
        ("LEFTPADDING",(0,0),(-1,-1),10), ("RIGHTPADDING",(0,0),(-1,-1),10),
        ("TOPPADDING",(0,0),(-1,0),8), ("BOTTOMPADDING",(0,-1),(-1,-1),8),
    ]))
    els.append(at)

    els.append(PageBreak())

    # ── PAGE 2: MONTHLY TREND ──
    els.append(Paragraph("MONTHLY P&L TREND", S["SH"]))
    els.append(Paragraph("Feb \u2014 Dec 2025 &nbsp;|&nbsp; All figures in AED", S["AN"]))
    els.append(Spacer(1, 4))

    th = [("Metric", False), ("Feb", True), ("Mar", True), ("Apr", True), ("May", True),
          ("Jun", True), ("Jul", True), ("Aug", True), ("Sep", True), ("Oct", True),
          ("Nov", True), ("Dec", True)]
    tcw = [40*mm] + [17.5*mm]*11

    td = []
    for r in trend:
        label = str(r[1]).strip() if len(r) > 1 and r[1] else ""
        if not label: continue
        is_bold = label in ["Revenue", "Gross Profit", "EBITDA", "Net Profit/(Loss)"]
        row = [tc(label, is_bold)]
        for i in range(2, min(len(r), 13)):
            v = r[i]
            row.append(money(v) if isinstance(v, (int,float)) else Paragraph(str(v) if v else "\u2014", S["TDR"]))
        td.append(row)

    els.append(make_table(th, td, tcw))
    els.append(Spacer(1, 4))
    els.append(Paragraph(
        "Revenue peaked in Mar (AED 302K) and Nov (AED 223K). Dec net loss of AED 88.6K includes AED 84.9K loss on disposal.",
        S["NO"]))
    els.append(Spacer(1, 16))

    # ── BALANCE SHEET ──
    els.append(Paragraph("BALANCE SHEET HIGHLIGHTS", S["SH"]))
    els.append(Paragraph("As at May & June 2026 &nbsp;|&nbsp; All figures in AED", S["AN"]))
    els.append(Spacer(1, 4))

    bsh = [
        ("Line Item", False), ("May 2026", True), ("Jun 2026", True), ("Change", True)
    ]
    bscw = [60*mm, 42*mm, 42*mm, 42*mm]

    def bs_row(name, may, jun, bold=False):
        d = None
        if isinstance(may, (int,float)) and isinstance(jun, (int,float)):
            d = jun - may
        ch = ""
        if d is not None:
            c = EMERALD if d >= 0 else RED
            ch = f'<font color="{c.hexval()}">{"(" if d < 0 else ""}AED {abs(d):,.0f}{")" if d < 0 else ""}</font>'
        return [tc(name, bold), money(may), money(jun), Paragraph(ch, S["TDR"]) if ch else Paragraph("\u2014", S["TDR"])]

    bs_data = [
        bs_row("Cash & Equivalents", 65894, 45668.11),
        bs_row("Accounts Receivable", 32562, 23953),
        bs_row("Inventory", 42744, 35080),
        bs_row("Total Current Assets", 194199, 161122.11, True),
        bs_row("Fixed Assets (Net)", 586242, 568197),
        bs_row("Total Assets", 793441, 748424.11, True),
        bs_row("Shareholders' Loans", 794960, 794960),
        bs_row("Accounts Payable", 44467, 13863.2),
        bs_row("Total Liabilities", 902208, 879178.5, True),
        bs_row("Total Equity", -108767, -130754, True),
    ]

    bt = make_table(bsh, bs_data, bscw)
    bt.setStyle(TableStyle([
        ("LINEABOVE",(0,3),(-1,3),1,TEAL), ("LINEBELOW",(0,3),(-1,3),1,TEAL),
        ("LINEABOVE",(0,5),(-1,5),1,TEAL), ("LINEBELOW",(0,5),(-1,5),1,TEAL),
        ("LINEABOVE",(0,-1),(-1,-1),1.5,NAVY), ("LINEBELOW",(0,-1),(-1,-1),1.5,NAVY),
    ]))
    els.append(bt)
    els.append(Spacer(1, 8))
    els.append(Paragraph(
        "Equity remains negative (AED 130.8K deficit) driven by AED 795K in shareholder loans and "
        "accumulated losses. Positive trajectory: EBITDA turned positive in H2 2025. Cash management "
        "improved with AP reduced by AED 30.6K from May to June.", S["NO"]))

    # ── STAFF & G&A BREAKDOWN ──
    els.append(Spacer(1, 12))
    els.append(Paragraph("COST BREAKDOWNS", S["SH"]))
    els.append(Paragraph("Staff Costs & G&A Expenses from SOCI Detail", S["AN"]))
    els.append(Spacer(1, 4))

    # Staff costs
    sc_h = [("Staff Cost Category", False), ("AED", True), ("% of Rev", True)]
    sc_cw = [100*mm, 50*mm, 35*mm]
    sc_rows = []
    for r in detail:
        label = str(r[1]).strip() if r[1] else ""
        val = r[2] if len(r) > 2 else None
        if label in ["Staff Salaries", "Other Staff Costs", "Staff Accommodation"]:
            pct = float(val) / 2205655 * 100 if val and 2205655 else 0
            sc_rows.append([tc(label), money(val), tc(f"{pct:.1f}%", right=True)])
    els.append(make_table(sc_h, sc_rows, sc_cw))
    els.append(Spacer(1, 6))

    # G&A
    ga_h = [("G&A Category", False), ("AED", True), ("% of Rev", True)]
    ga_cw = [100*mm, 50*mm, 35*mm]
    ga_rows = []
    for r in detail:
        label = str(r[1]).strip() if r[1] else ""
        val = r[2] if len(r) > 2 else None
        if label in ["Restaurant Rent", "Repair & Maintenance", "Miscellaneous Expenses",
                      "Government Fees (Trade License)", "Fuel Expenses"]:
            pct = float(val) / 2205655 * 100 if val and 2205655 else 0
            ga_rows.append([tc(label), money(val), tc(f"{pct:.1f}%", right=True)])
    els.append(make_table(ga_h, ga_rows, ga_cw))

    doc.build(els)
    p = os.path.join(OUT, "annual-financial-review-2025.pdf")
    print(f"  [ok] {os.path.basename(p)}")
    return p

if __name__ == "__main__":
    print("Generating Huashu-designed annual report...")
    path = report()
    print(f"\nDone: {path}")
    try: os.startfile(path)
    except: pass
