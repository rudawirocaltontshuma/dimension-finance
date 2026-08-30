import { leafAccounts } from "@/data/accounts";
import { assets } from "@/data/assets";
import { bankAccounts } from "@/data/banking";
import { transactions } from "@/data/transactions";
import type { ReportMeta } from "@/types/finance";

const creditNormalTypes = new Set(["Liability", "Revenue", "Equity"]);

export interface TrialBalanceRow {
  code: string;
  name: string;
  type: string;
  debit: number;
  credit: number;
  balance: number;
}

/**
 * Built from the General Ledger transaction feed (not the standalone Chart of
 * Accounts balances) so debits always equal credits — every journal entry
 * behind these transactions is balanced by construction.
 */
function buildTrialBalance(): TrialBalanceRow[] {
  const totals = new Map<string, { debit: number; credit: number }>();
  for (const account of leafAccounts) totals.set(account.code, { debit: 0, credit: 0 });

  for (const transaction of transactions) {
    const entry = totals.get(transaction.accountCode);
    if (!entry) continue;
    entry.debit += transaction.debit;
    entry.credit += transaction.credit;
  }

  return leafAccounts
    .map((account) => {
      const entry = totals.get(account.code) ?? { debit: 0, credit: 0 };
      const isCreditNormal = creditNormalTypes.has(account.type);
      const net = isCreditNormal ? entry.credit - entry.debit : entry.debit - entry.credit;
      return {
        code: account.code,
        name: account.name,
        type: account.type,
        debit: isCreditNormal ? Math.max(0, -net) : Math.max(0, net),
        credit: isCreditNormal ? Math.max(0, net) : Math.max(0, -net),
        balance: net,
      } satisfies TrialBalanceRow;
    })
    .filter((row) => row.debit !== 0 || row.credit !== 0);
}

export const trialBalanceRows = buildTrialBalance();
export const trialBalanceTotals = trialBalanceRows.reduce(
  (totals, row) => {
    totals.debit += row.debit;
    totals.credit += row.credit;
    return totals;
  },
  { debit: 0, credit: 0 },
);

export const reportCatalog: ReportMeta[] = [
  {
    id: "profit-loss",
    name: "Profit & Loss",
    description: "Revenue, cost of sales, operating expenses, and net profit for the selected period.",
    category: "Financial Statements",
    period: "August 2026",
    lastUpdated: "2026-08-29",
    href: "/reports/profit-loss",
  },
  {
    id: "balance-sheet",
    name: "Balance Sheet",
    description: "Assets, liabilities, and equity position as at the end of the selected period.",
    category: "Financial Statements",
    period: "August 2026",
    lastUpdated: "2026-08-29",
    href: "/reports/balance-sheet",
  },
  {
    id: "cash-flow",
    name: "Cash Flow",
    description: "Operating, investing, and financing cash movements for the selected period.",
    category: "Financial Statements",
    period: "August 2026",
    lastUpdated: "2026-08-28",
    href: "/reports/cash-flow",
  },
  {
    id: "trial-balance",
    name: "Trial Balance",
    description: "Debit and credit balances across every account, grouped by category.",
    category: "Accounting",
    period: "August 2026",
    lastUpdated: "2026-08-28",
    href: "/reports/trial-balance",
  },
  {
    id: "general-ledger",
    name: "General Ledger",
    description: "Full transaction history across every account, journal, and cost center.",
    category: "Accounting",
    period: "Year to date",
    lastUpdated: "2026-08-30",
    href: "/reports/general-ledger",
  },
  {
    id: "ar-aging",
    name: "AR Aging",
    description: "Outstanding customer balances grouped by current, 30, 60, and 90+ day buckets.",
    category: "Receivables",
    period: "As at 30 Aug 2026",
    lastUpdated: "2026-08-30",
    href: "/reports/ar-aging",
  },
  {
    id: "ap-aging",
    name: "AP Aging",
    description: "Outstanding supplier balances grouped by current, 30, 60, and 90+ day buckets.",
    category: "Payables",
    period: "As at 30 Aug 2026",
    lastUpdated: "2026-08-30",
    href: "/reports/ap-aging",
  },
  {
    id: "tax-summary",
    name: "Tax Summary",
    description: "Output tax, input tax, and net tax position by category — display only.",
    category: "Tax",
    period: "Q3 2026",
    lastUpdated: "2026-08-27",
    href: "/reports/tax-summary",
  },
  {
    id: "budget-vs-actual",
    name: "Budget vs Actual",
    description: "Departmental budget performance and variance across every cost center.",
    category: "Budgeting",
    period: "FY2026",
    lastUpdated: "2026-08-25",
    href: "/reports/budget-vs-actual",
  },
  {
    id: "expense-report",
    name: "Expense Report",
    description: "Employee spend by category, department, and approval status.",
    category: "Expenses",
    period: "August 2026",
    lastUpdated: "2026-08-29",
    href: "/expenses",
  },
  {
    id: "revenue-report",
    name: "Revenue Report",
    description: "Revenue performance by customer, product line, and region.",
    category: "Analytics",
    period: "Year to date",
    lastUpdated: "2026-08-30",
    href: "/analytics/revenue",
  },
];

export interface ReportLineItem {
  label: string;
  current: number;
  previous: number;
  emphasis?: boolean;
}

function withVariance(items: ReportLineItem[]) {
  return items.map((item) => ({
    ...item,
    variance: item.current - item.previous,
    variancePercent: item.previous !== 0 ? ((item.current - item.previous) / Math.abs(item.previous)) * 100 : 0,
  }));
}

const revenueLines = withVariance([
  { label: "Product Sales - Local", current: 5_412_000, previous: 5_018_400 },
  { label: "Product Sales - Export", current: 1_648_300, previous: 1_502_900 },
  { label: "Service Revenue", current: 1_214_600, previous: 1_096_200 },
  { label: "Rental & Other Income", current: 207_600, previous: 189_100 },
]);
const totalRevenue = 8_482_500;

const costOfSalesLines = withVariance([
  { label: "Cost of Goods Sold", current: 3_612_400, previous: 3_388_100 },
  { label: "Direct Labour", current: 428_600, previous: 402_700 },
  { label: "Freight & Delivery", current: 224_700, previous: 210_400 },
]);
const totalCostOfSales = 4_265_700;
const grossProfit = 4_216_800;

const operatingExpenseLines = withVariance([
  { label: "Salaries & Wages", current: 1_384_200, previous: 1_298_600 },
  { label: "Employee Benefits", current: 312_400, previous: 296_800 },
  { label: "Occupancy Costs", current: 286_900, previous: 274_100 },
  { label: "Office & Administration", current: 168_300, previous: 159_700 },
  { label: "Technology & Software", current: 214_600, previous: 187_300 },
  { label: "Marketing & Advertising", current: 248_700, previous: 231_400 },
  { label: "Travel & Entertainment", current: 96_800, previous: 88_200 },
  { label: "Professional Services", current: 142_600, previous: 128_900 },
  { label: "Depreciation & Amortization", current: 77_900, previous: 71_200 },
]);
const totalOperatingExpenses = 2_932_400;
const operatingProfit = 1_284_400;

const otherIncome = 45_000;
const otherExpenses = 44_900;
const netProfit = 1_284_500;

export const profitAndLoss = {
  period: "August 2026",
  previousPeriod: "July 2026",
  revenueLines,
  totalRevenue,
  costOfSalesLines,
  totalCostOfSales,
  grossProfit,
  grossMargin: (grossProfit / totalRevenue) * 100,
  operatingExpenseLines,
  totalOperatingExpenses,
  operatingProfit,
  otherIncome,
  otherExpenses,
  netProfit,
  netMargin: (netProfit / totalRevenue) * 100,
};

const cashPosition = bankAccounts.reduce((sum, account) => sum + account.balance, 0);
const fixedAssetsNet = Math.round(
  assets.filter((a) => a.status !== "Disposed").reduce((sum, a) => sum + a.netBookValue, 0),
);

const accountsReceivableBS = 2_184_300;
const inventoryBS = 1_286_400;
const otherCurrentAssetsBS = 312_600;
const currentAssets = cashPosition + accountsReceivableBS + inventoryBS + otherCurrentAssetsBS;

const intangibleAssetsBS = 420_000;
const nonCurrentAssets = fixedAssetsNet + intangibleAssetsBS;
const totalAssetsBS = currentAssets + nonCurrentAssets;

const accountsPayableBS = 1_842_600;
const accruedExpensesBS = 486_200;
const currentLiabilities = accountsPayableBS + accruedExpensesBS;

const longTermLiabilitiesBS = 2_140_000;
const totalLiabilitiesBS = currentLiabilities + longTermLiabilitiesBS;

const shareCapitalBS = 500_000;
const netIncomeBS = netProfit;
const retainedEarningsBS = Math.max(0, totalAssetsBS - totalLiabilitiesBS - shareCapitalBS - netIncomeBS);
const totalEquityBS = shareCapitalBS + retainedEarningsBS + netIncomeBS;

export const balanceSheet = {
  asOf: "31 August 2026",
  currentAssets: [
    { label: "Cash and Cash Equivalents", amount: cashPosition },
    { label: "Accounts Receivable", amount: accountsReceivableBS },
    { label: "Inventory", amount: inventoryBS },
    { label: "Other Current Assets", amount: otherCurrentAssetsBS },
  ],
  totalCurrentAssets: currentAssets,
  nonCurrentAssets: [
    { label: "Fixed Assets (Net Book Value)", amount: fixedAssetsNet },
    { label: "Intangible Assets", amount: intangibleAssetsBS },
  ],
  totalNonCurrentAssets: nonCurrentAssets,
  totalAssets: totalAssetsBS,
  currentLiabilities: [
    { label: "Accounts Payable", amount: accountsPayableBS },
    { label: "Accrued Expenses", amount: accruedExpensesBS },
  ],
  totalCurrentLiabilities: currentLiabilities,
  longTermLiabilities: [{ label: "Long-Term Loans", amount: longTermLiabilitiesBS }],
  totalLongTermLiabilities: longTermLiabilitiesBS,
  totalLiabilities: totalLiabilitiesBS,
  equity: [
    { label: "Share Capital", amount: shareCapitalBS },
    { label: "Retained Earnings", amount: retainedEarningsBS },
    { label: "Current Year Net Income", amount: netIncomeBS },
  ],
  totalEquity: totalEquityBS,
  totalLiabilitiesAndEquity: totalLiabilitiesBS + totalEquityBS,
};

const operatingActivities = [
  { label: "Net Profit for the Period", amount: netProfit },
  { label: "Depreciation & Amortization", amount: 77_900 },
  { label: "Increase in Accounts Receivable", amount: -184_200 },
  { label: "Increase in Accounts Payable", amount: 142_600 },
  { label: "Increase in Inventory", amount: -96_400 },
  { label: "Other Working Capital Movements", amount: 31_200 },
];
const netCashFromOperating = operatingActivities.reduce((sum, l) => sum + l.amount, 0);

const investingActivities = [
  { label: "Purchase of Fixed Assets", amount: -298_600 },
  { label: "Proceeds from Asset Disposals", amount: 42_800 },
];
const netCashFromInvesting = investingActivities.reduce((sum, l) => sum + l.amount, 0);

const financingActivities = [
  { label: "Long-Term Loan Repayments", amount: -128_400 },
  { label: "Dividends Paid", amount: -95_000 },
];
const netCashFromFinancing = financingActivities.reduce((sum, l) => sum + l.amount, 0);

const netChangeInCash = netCashFromOperating + netCashFromInvesting + netCashFromFinancing;
const openingCash = cashPosition - netChangeInCash;

export const cashFlowStatement = {
  period: "August 2026",
  operatingActivities,
  netCashFromOperating,
  investingActivities,
  netCashFromInvesting,
  financingActivities,
  netCashFromFinancing,
  openingCash,
  netChangeInCash,
  closingCash: cashPosition,
};

export const taxSummary = {
  period: "Q3 2026",
  taxableRevenue: 7_940_200,
  outputTax: 1_191_030,
  taxableExpenses: 4_812_600,
  inputTax: 721_890,
  netTax: 1_191_030 - 721_890,
  categories: [
    { name: "Standard-Rated Sales (15%)", base: 7_412_800, tax: 1_111_920 },
    { name: "Zero-Rated Exports", base: 527_400, tax: 0 },
    { name: "Standard-Rated Purchases (15%)", base: 4_120_600, tax: 618_090 },
    { name: "Import VAT", base: 692_000, tax: 103_800 },
  ],
};
