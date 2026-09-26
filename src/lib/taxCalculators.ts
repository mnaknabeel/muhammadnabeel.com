/**
 * Pakistan Income Tax Calculator Engine (Tax Year 2026 / FY 2025-26)
 * Based strictly on the Income Tax Ordinance, 2001 (Amended up to 2026)
 * Federal Board of Revenue (FBR)
 */

export interface SalariedTaxInput {
  grossMonthlySalary: number; // or annualized
  isAnnual?: boolean;
  basicSalaryPercent?: number; // default ~60%
  hasMedicalAllowanceExemption?: boolean; // Clause 139(b) - 10% of basic is exempt
  zakatPaid?: number; // Section 60
  childrenEducationFees?: number; // Section 60D
  numberOfChildren?: number;
  charitableDonations?: number; // Section 61
  vpsPensionContribution?: number; // Section 63
}

export interface SalariedTaxResult {
  grossAnnualSalary: number;
  exemptMedicalAllowance: number;
  deductibleZakat: number;
  deductibleEducation: number;
  totalDeductibleAllowances: number;
  taxableIncome: number;
  grossTax: number;
  donationTaxCredit: number;
  pensionTaxCredit: number;
  totalTaxCredits: number;
  netAnnualTax: number;
  monthlyTax: number;
  effectiveTaxRate: number;
  monthlyTakeHome: number;
  currentSlabIndex: number;
  currentSlab: (typeof SALARIED_SLABS_TY2026)[0];
}

export interface Slab {
  slab: number;
  min: number;
  max: number;
  baseTax: number;
  rate: number;
  description: string;
}

// First Schedule, Part I, Division I, Clause (2) - Salaried Individuals (Salary > 75% of Taxable Income)
export const SALARIED_SLABS_TY2026: Slab[] = [
  {
    slab: 1,
    min: 0,
    max: 600000,
    baseTax: 0,
    rate: 0,
    description: "Up to Rs. 600,000 — 0%",
  },
  {
    slab: 2,
    min: 600000,
    max: 1200000,
    baseTax: 0,
    rate: 0.01, // 1%
    description: "Rs. 600,001 to Rs. 1,200,000 — 1% of amount exceeding Rs. 600,000",
  },
  {
    slab: 3,
    min: 1200000,
    max: 2200000,
    baseTax: 6000,
    rate: 0.11, // 11%
    description: "Rs. 1,200,001 to Rs. 2,200,000 — Rs. 6,000 + 11% of excess over Rs. 1,200,000",
  },
  {
    slab: 4,
    min: 2200000,
    max: 3200000,
    baseTax: 116000,
    rate: 0.23, // 23%
    description: "Rs. 2,200,001 to Rs. 3,200,000 — Rs. 116,000 + 23% of excess over Rs. 2,200,000",
  },
  {
    slab: 5,
    min: 3200000,
    max: 4100000,
    baseTax: 346000,
    rate: 0.30, // 30%
    description: "Rs. 3,200,001 to Rs. 4,100,000 — Rs. 346,000 + 30% of excess over Rs. 3,200,000",
  },
  {
    slab: 6,
    min: 4100000,
    max: Infinity,
    baseTax: 616000,
    rate: 0.35, // 35%
    description: "Exceeding Rs. 4,100,000 — Rs. 616,000 + 35% of excess over Rs. 4,100,000",
  },
];

// First Schedule, Part I, Division I, Clause (1) - Non-Salaried Individuals & AOPs
export const NON_SALARIED_SLABS_TY2026: Slab[] = [
  {
    slab: 1,
    min: 0,
    max: 600000,
    baseTax: 0,
    rate: 0,
    description: "Up to Rs. 600,000 — 0%",
  },
  {
    slab: 2,
    min: 600000,
    max: 1200000,
    baseTax: 0,
    rate: 0.15, // 15%
    description: "Rs. 600,001 to Rs. 1,200,000 — 15% of amount exceeding Rs. 600,000",
  },
  {
    slab: 3,
    min: 1200000,
    max: 1600000,
    baseTax: 90000,
    rate: 0.20, // 20%
    description: "Rs. 1,200,001 to Rs. 1,600,000 — Rs. 90,000 + 20% of excess over Rs. 1,200,000",
  },
  {
    slab: 4,
    min: 1600000,
    max: 3200000,
    baseTax: 170000,
    rate: 0.30, // 30%
    description: "Rs. 1,600,001 to Rs. 3,200,000 — Rs. 170,000 + 30% of excess over Rs. 1,600,000",
  },
  {
    slab: 5,
    min: 3200000,
    max: 5600000,
    baseTax: 650000,
    rate: 0.40, // 40%
    description: "Rs. 3,200,001 to Rs. 5,600,000 — Rs. 650,000 + 40% of excess over Rs. 3,200,000",
  },
  {
    slab: 6,
    min: 5600000,
    max: Infinity,
    baseTax: 1610000,
    rate: 0.45, // 45%
    description: "Exceeding Rs. 5,600,000 — Rs. 1,610,000 + 45% of excess over Rs. 5,600,000",
  },
];

/**
 * Computes Tax for Salaried Individual strictly according to ITO 2026
 */
export function calculateSalariedTax(input: SalariedTaxInput): SalariedTaxResult {
  const grossAnnualSalary = input.isAnnual
    ? input.grossMonthlySalary
    : input.grossMonthlySalary * 12;

  // Basic salary estimation (default 60% of gross if not specified)
  const basicSalaryPercent = (input.basicSalaryPercent ?? 60) / 100;
  const annualBasicSalary = grossAnnualSalary * basicSalaryPercent;

  // Clause (139)(b) Part I Second Schedule: Medical allowance up to 10% of basic is exempt
  const exemptMedicalAllowance = input.hasMedicalAllowanceExemption
    ? annualBasicSalary * 0.10
    : 0;

  const salaryAfterExemption = Math.max(0, grossAnnualSalary - exemptMedicalAllowance);

  // Section 60: Zakat paid under Zakat & Ushr Ordinance 1980
  const deductibleZakat = input.zakatPaid ?? 0;

  // Section 60D: Education expenses (Only if taxable income < 1,500,000)
  let deductibleEducation = 0;
  if (salaryAfterExemption < 1500000 && (input.childrenEducationFees ?? 0) > 0) {
    const tuitionPaid = input.childrenEducationFees ?? 0;
    const numKids = Math.max(1, input.numberOfChildren ?? 1);
    const limitA = tuitionPaid * 0.05; // 5% of tuition fees
    const limitB = salaryAfterExemption * 0.25; // 25% of taxable income
    const limitC = 60000 * numKids; // Rs. 60,000 per child
    deductibleEducation = Math.min(limitA, limitB, limitC);
  }

  const totalDeductibleAllowances = deductibleZakat + deductibleEducation;
  const taxableIncome = Math.max(0, salaryAfterExemption - totalDeductibleAllowances);

  // Find applicable slab
  let slabIndex = 0;
  for (let i = 0; i < SALARIED_SLABS_TY2026.length; i++) {
    const s = SALARIED_SLABS_TY2026[i];
    if (taxableIncome > s.min && taxableIncome <= s.max) {
      slabIndex = i;
      break;
    }
  }

  const currentSlab = SALARIED_SLABS_TY2026[slabIndex];
  const grossTax =
    currentSlab.baseTax +
    Math.max(0, taxableIncome - currentSlab.min) * currentSlab.rate;

  // Tax Credits: Formula = (Gross Tax / Taxable Income) * Eligible Amount
  let donationTaxCredit = 0;
  if ((input.charitableDonations ?? 0) > 0 && taxableIncome > 0 && grossTax > 0) {
    // Section 61: max 30% of taxable income
    const eligibleDonation = Math.min(
      input.charitableDonations ?? 0,
      taxableIncome * 0.30
    );
    donationTaxCredit = (grossTax / taxableIncome) * eligibleDonation;
  }

  let pensionTaxCredit = 0;
  if ((input.vpsPensionContribution ?? 0) > 0 && taxableIncome > 0 && grossTax > 0) {
    // Section 63: max 20% of taxable income
    const eligiblePension = Math.min(
      input.vpsPensionContribution ?? 0,
      taxableIncome * 0.20
    );
    pensionTaxCredit = (grossTax / taxableIncome) * eligiblePension;
  }

  const totalTaxCredits = donationTaxCredit + pensionTaxCredit;
  const netAnnualTax = Math.max(0, Math.round(grossTax - totalTaxCredits));
  const monthlyTax = Math.round(netAnnualTax / 12);
  const effectiveTaxRate =
    taxableIncome > 0 ? Number(((netAnnualTax / taxableIncome) * 100).toFixed(2)) : 0;
  const monthlyTakeHome = Math.max(
    0,
    Math.round(grossAnnualSalary / 12 - monthlyTax)
  );

  return {
    grossAnnualSalary,
    exemptMedicalAllowance,
    deductibleZakat,
    deductibleEducation,
    totalDeductibleAllowances,
    taxableIncome,
    grossTax,
    donationTaxCredit,
    pensionTaxCredit,
    totalTaxCredits,
    netAnnualTax,
    monthlyTax,
    effectiveTaxRate,
    monthlyTakeHome,
    currentSlabIndex: slabIndex,
    currentSlab,
  };
}

/**
 * Computes Tax for Non-Salaried Individual / AOP / Business
 */
export function calculateBusinessTax(taxableIncome: number): {
  taxableIncome: number;
  netAnnualTax: number;
  monthlyTax: number;
  effectiveTaxRate: number;
  currentSlab: (typeof NON_SALARIED_SLABS_TY2026)[0];
  currentSlabIndex: number;
} {
  let slabIndex = 0;
  for (let i = 0; i < NON_SALARIED_SLABS_TY2026.length; i++) {
    const s = NON_SALARIED_SLABS_TY2026[i];
    if (taxableIncome > s.min && taxableIncome <= s.max) {
      slabIndex = i;
      break;
    }
  }

  const currentSlab = NON_SALARIED_SLABS_TY2026[slabIndex];
  const netAnnualTax = Math.round(
    currentSlab.baseTax +
      Math.max(0, taxableIncome - currentSlab.min) * currentSlab.rate
  );
  const monthlyTax = Math.round(netAnnualTax / 12);
  const effectiveTaxRate =
    taxableIncome > 0 ? Number(((netAnnualTax / taxableIncome) * 100).toFixed(2)) : 0;

  return {
    taxableIncome,
    netAnnualTax,
    monthlyTax,
    effectiveTaxRate,
    currentSlab,
    currentSlabIndex: slabIndex,
  };
}

/**
 * Computes Freelancer & IT Export Tax under Section 154A
 */
export function calculateFreelanceTax(annualRemittancePkr: number, isPsebRegistered: boolean) {
  // PSEB Registered: 0.25% Final Tax Regime
  // Non-PSEB: 1% Final Tax Regime
  const taxRate = isPsebRegistered ? 0.0025 : 0.01;
  const taxPayable = Math.round(annualRemittancePkr * taxRate);
  const regularBusinessTax = calculateBusinessTax(annualRemittancePkr).netAnnualTax;
  const taxSavingsVsNormal = Math.max(0, regularBusinessTax - taxPayable);

  return {
    annualRemittancePkr,
    isPsebRegistered,
    taxRatePercentage: isPsebRegistered ? 0.25 : 1.0,
    taxPayable,
    monthlyTax: Math.round(taxPayable / 12),
    regularBusinessTax,
    taxSavingsVsNormal,
  };
}

/**
 * Withholding Tax Card Data: Filer vs Non-Filer Penalty Comparison
 */
export interface WithholdingItem {
  section: string;
  category: "Banking" | "Automobile" | "Property" | "Investments" | "Contracts & Exports";
  title: string;
  filerRate: string;
  nonFilerRate: string;
  penaltyRatio: string;
  ruleExplanation: string;
}

export const WITHHOLDING_TAX_CARD: WithholdingItem[] = [
  {
    section: "231AB",
    category: "Banking",
    title: "Cash Withdrawal from Bank (exceeding Rs. 50,000/day)",
    filerRate: "0% (Exempt)",
    nonFilerRate: "0.9%",
    penaltyRatio: "Infinite (Filers pay 0)",
    ruleExplanation: "Active filers withdraw any cash amount completely free of advance tax. Non-filers suffer 0.9% deduction at source.",
  },
  {
    section: "7B",
    category: "Banking",
    title: "Profit on Debt (Savings Account / Fixed Deposits)",
    filerRate: "15%",
    nonFilerRate: "30%",
    penaltyRatio: "2x (100% Surcharge)",
    ruleExplanation: "Bank profit earned by non-filers is taxed at double the standard rate, cutting returns in half.",
  },
  {
    section: "5",
    category: "Investments",
    title: "Dividend Income (Mutual Funds / Listed Stocks)",
    filerRate: "15%",
    nonFilerRate: "30%",
    penaltyRatio: "2x (100% Surcharge)",
    ruleExplanation: "Dividends distributed by companies and mutual funds face an automatic 30% deduction for non-filers.",
  },
  {
    section: "231B",
    category: "Automobile",
    title: "Motor Vehicle Purchase / Registration (Up to 1000cc)",
    filerRate: "Rs. 10,000",
    nonFilerRate: "Rs. 30,000",
    penaltyRatio: "3x Penalty",
    ruleExplanation: "Advance tax payable at registration or transfer doubles or triples for non-filers.",
  },
  {
    section: "231B",
    category: "Automobile",
    title: "Motor Vehicle Purchase / Registration (1301cc to 1600cc)",
    filerRate: "Rs. 50,000",
    nonFilerRate: "Rs. 150,000",
    penaltyRatio: "3x Penalty",
    ruleExplanation: "Buying a 1.3L to 1.6L vehicle as a non-filer costs an extra Rs. 100,000 in unrecoverable tax.",
  },
  {
    section: "231B",
    category: "Automobile",
    title: "Motor Vehicle Purchase / Registration (> 2000cc)",
    filerRate: "Rs. 200,000",
    nonFilerRate: "Rs. 600,000",
    penaltyRatio: "3x Penalty",
    ruleExplanation: "High-end cars carry a staggering Rs. 400,000 extra tax burden for non-filers.",
  },
  {
    section: "236K",
    category: "Property",
    title: "Purchase of Immovable Property",
    filerRate: "3%",
    nonFilerRate: "10.5% - 15%",
    penaltyRatio: "Up to 5x Penalty",
    ruleExplanation: "Purchasing a Rs. 10M plot as a filer costs Rs. 300K tax. A non-filer pays up to Rs. 1.5M tax!",
  },
  {
    section: "236C",
    category: "Property",
    title: "Sale / Transfer of Immovable Property",
    filerRate: "3%",
    nonFilerRate: "6% - 10%",
    penaltyRatio: "Up to 3.3x Penalty",
    ruleExplanation: "Sellers on the Active Taxpayers List pay just 3% adjustable advance tax upon registering property deed.",
  },
  {
    section: "156",
    category: "Investments",
    title: "Prize Bonds & Lottery Winnings",
    filerRate: "15%",
    nonFilerRate: "30%",
    penaltyRatio: "2x Penalty",
    ruleExplanation: "FBR deducts 30% from any prize bond win if your CNIC is not verified on the Active Taxpayers List.",
  },
  {
    section: "154A",
    category: "Contracts & Exports",
    title: "IT & Freelance Foreign Remittances (PSEB Registered)",
    filerRate: "0.25% (Final Tax)",
    nonFilerRate: "1% - Normal Slabs",
    penaltyRatio: "4x to 15x Penalty",
    ruleExplanation: "PSEB registered IT exporters on ATL enjoy a 0.25% final tax rate. Non-filers lose this facility entirely.",
  },
];
