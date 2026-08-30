import { amountBetween, createRng } from "@/lib/mock/random";
import type { Account, AccountType } from "@/types/finance";

const rng = createRng(19837);

type AccountSeed = readonly [code: string, name: string, type: AccountType, parentCode: string | null];

// Chart of accounts hierarchy: 1000 Assets, 2000 Liabilities, 3000 Equity,
// 4000 Revenue, 5000 Cost of Sales, 6000 Operating Expenses.
const accountSeeds: AccountSeed[] = [
  ["1000", "Assets", "Asset", null],
  ["1100", "Current Assets", "Asset", "1000"],
  ["1110", "Petty Cash", "Asset", "1100"],
  ["1120", "Cash on Hand", "Asset", "1100"],
  ["1200", "Accounts Receivable", "Asset", "1000"],
  ["1210", "Trade Receivables - Local", "Asset", "1200"],
  ["1220", "Trade Receivables - Export", "Asset", "1200"],
  ["1230", "Allowance for Doubtful Debts", "Asset", "1200"],
  ["1300", "Inventory", "Asset", "1000"],
  ["1310", "Raw Materials Inventory", "Asset", "1300"],
  ["1320", "Work in Progress", "Asset", "1300"],
  ["1330", "Finished Goods Inventory", "Asset", "1300"],
  ["1340", "Inventory in Transit", "Asset", "1300"],
  ["1400", "Cash", "Asset", "1000"],
  ["1410", "Argent Operating Account", "Asset", "1400"],
  ["1420", "Argent Payroll Account", "Asset", "1400"],
  ["1430", "Argent Reserve Account", "Asset", "1400"],
  ["1440", "Foreign Currency Account - USD", "Asset", "1400"],
  ["1500", "Prepaid Expenses", "Asset", "1000"],
  ["1510", "Prepaid Insurance", "Asset", "1500"],
  ["1520", "Prepaid Rent", "Asset", "1500"],
  ["1530", "Prepaid Subscriptions", "Asset", "1500"],
  ["1600", "Non-Current Assets", "Asset", "1000"],
  ["1610", "Property, Plant & Equipment", "Asset", "1600"],
  ["1620", "Motor Vehicles", "Asset", "1600"],
  ["1630", "Computer Equipment", "Asset", "1600"],
  ["1640", "Furniture & Fittings", "Asset", "1600"],
  ["1650", "Accumulated Depreciation - PPE", "Asset", "1600"],
  ["1660", "Accumulated Depreciation - Vehicles", "Asset", "1600"],
  ["1670", "Accumulated Depreciation - Equipment", "Asset", "1600"],
  ["1700", "Intangible Assets", "Asset", "1000"],
  ["1710", "Goodwill", "Asset", "1700"],
  ["1720", "Software Licenses", "Asset", "1700"],
  ["1730", "Trademarks & Patents", "Asset", "1700"],

  ["2000", "Liabilities", "Liability", null],
  ["2100", "Accounts Payable", "Liability", "2000"],
  ["2110", "Trade Payables - Local", "Liability", "2100"],
  ["2120", "Trade Payables - Import", "Liability", "2100"],
  ["2200", "Accrued Expenses", "Liability", "2000"],
  ["2210", "Accrued Salaries & Wages", "Liability", "2200"],
  ["2220", "Accrued Utilities", "Liability", "2200"],
  ["2230", "Accrued Audit Fees", "Liability", "2200"],
  ["2300", "Taxation", "Liability", "2000"],
  ["2310", "VAT Output Control", "Liability", "2300"],
  ["2320", "VAT Input Control", "Liability", "2300"],
  ["2330", "Income Tax Payable", "Liability", "2300"],
  ["2340", "PAYE Payable", "Liability", "2300"],
  ["2400", "Short-Term Loans", "Liability", "2000"],
  ["2410", "Bank Overdraft", "Liability", "2400"],
  ["2420", "Short-Term Loan - Meridian National Bank", "Liability", "2400"],
  ["2500", "Long-Term Liabilities", "Liability", "2000"],
  ["2510", "Long-Term Loan - Property Finance", "Liability", "2500"],
  ["2520", "Long-Term Loan - Equipment Finance", "Liability", "2500"],
  ["2530", "Finance Lease Liability", "Liability", "2500"],
  ["2600", "Other Payables", "Liability", "2000"],
  ["2610", "Dividends Payable", "Liability", "2600"],
  ["2620", "Provision for Bonuses", "Liability", "2600"],
  ["2630", "Deferred Revenue", "Liability", "2600"],

  ["3000", "Equity", "Equity", null],
  ["3100", "Share Capital", "Equity", "3000"],
  ["3200", "Share Premium", "Equity", "3000"],
  ["3300", "Retained Earnings", "Equity", "3000"],
  ["3400", "Current Year Earnings", "Equity", "3000"],
  ["3500", "Reserves", "Equity", "3000"],

  ["4000", "Revenue", "Revenue", null],
  ["4100", "Product Sales - Local", "Revenue", "4000"],
  ["4200", "Product Sales - Export", "Revenue", "4000"],
  ["4300", "Service Revenue", "Revenue", "4000"],
  ["4400", "Rental Income", "Revenue", "4000"],
  ["4500", "Interest Income", "Revenue", "4000"],
  ["4600", "Other Operating Income", "Revenue", "4000"],
  ["4700", "Sales Returns & Allowances", "Revenue", "4000"],
  ["4800", "Sales Discounts", "Revenue", "4000"],

  ["5000", "Cost of Sales", "Cost of Sales", null],
  ["5100", "Cost of Goods Sold", "Cost of Sales", "5000"],
  ["5200", "Direct Labour", "Cost of Sales", "5000"],
  ["5300", "Freight & Delivery Costs", "Cost of Sales", "5000"],
  ["5400", "Manufacturing Overheads", "Cost of Sales", "5000"],
  ["5500", "Inventory Adjustments", "Cost of Sales", "5000"],

  ["6000", "Operating Expenses", "Expense", null],
  ["6100", "Salaries & Wages", "Expense", "6000"],
  ["6110", "Salaries - Operations", "Expense", "6100"],
  ["6120", "Salaries - Sales", "Expense", "6100"],
  ["6130", "Salaries - Marketing", "Expense", "6100"],
  ["6140", "Salaries - Finance", "Expense", "6100"],
  ["6150", "Salaries - Technology", "Expense", "6100"],
  ["6160", "Salaries - Human Resources", "Expense", "6100"],
  ["6200", "Employee Benefits", "Expense", "6000"],
  ["6210", "Medical Aid Contributions", "Expense", "6200"],
  ["6220", "Pension Fund Contributions", "Expense", "6200"],
  ["6230", "Skills Development Levy", "Expense", "6200"],
  ["6300", "Occupancy Costs", "Expense", "6000"],
  ["6310", "Rent Expense", "Expense", "6300"],
  ["6320", "Utilities Expense", "Expense", "6300"],
  ["6330", "Property Maintenance", "Expense", "6300"],
  ["6400", "Office & Administration", "Expense", "6000"],
  ["6410", "Office Supplies", "Expense", "6400"],
  ["6420", "Postage & Courier", "Expense", "6400"],
  ["6430", "Printing & Stationery", "Expense", "6400"],
  ["6440", "Bank Charges", "Expense", "6400"],
  ["6500", "Technology & Software", "Expense", "6000"],
  ["6510", "Software Subscriptions", "Expense", "6500"],
  ["6520", "IT Support Services", "Expense", "6500"],
  ["6530", "Cloud Hosting", "Expense", "6500"],
  ["6600", "Marketing & Advertising", "Expense", "6000"],
  ["6610", "Digital Advertising", "Expense", "6600"],
  ["6620", "Events & Sponsorships", "Expense", "6600"],
  ["6630", "Brand & Design", "Expense", "6600"],
  ["6700", "Travel & Entertainment", "Expense", "6000"],
  ["6710", "Domestic Travel", "Expense", "6700"],
  ["6720", "International Travel", "Expense", "6700"],
  ["6730", "Client Entertainment", "Expense", "6700"],
  ["6800", "Professional Services", "Expense", "6000"],
  ["6810", "Audit & Accounting Fees", "Expense", "6800"],
  ["6820", "Legal Fees", "Expense", "6800"],
  ["6830", "Consulting Fees", "Expense", "6800"],
  ["6900", "Depreciation & Amortization", "Expense", "6000"],
  ["6910", "Depreciation - PPE", "Expense", "6900"],
  ["6920", "Depreciation - Vehicles", "Expense", "6900"],
  ["6930", "Amortization - Intangibles", "Expense", "6900"],
  ["6990", "Other Operating Expenses", "Expense", "6000"],
  ["6991", "Insurance Expense", "Expense", "6990"],
  ["6992", "Subscriptions & Memberships", "Expense", "6990"],
  ["6993", "Sundry Expenses", "Expense", "6990"],
];

function levelOf(code: string, parentCode: string | null): number {
  if (parentCode === null) return 0;
  return code.length === 4 && code.endsWith("00") ? 1 : 2;
}

function isLeaf(code: string, seeds: readonly AccountSeed[]): boolean {
  return !seeds.some(([, , , parent]) => parent === code);
}

const debitNature: AccountType[] = ["Asset", "Cost of Sales", "Expense"];

function generateBalance(type: AccountType, leaf: boolean): { opening: number; debits: number; credits: number } {
  if (!leaf) return { opening: 0, debits: 0, credits: 0 };

  const magnitudeRanges: Record<AccountType, [number, number]> = {
    Asset: [40_000, 2_400_000],
    Liability: [20_000, 1_600_000],
    Equity: [80_000, 3_200_000],
    Revenue: [60_000, 980_000],
    "Cost of Sales": [30_000, 560_000],
    Expense: [30_000, 560_000],
  };
  const [magnitudeMin, magnitudeMax] = magnitudeRanges[type];
  const magnitude = amountBetween(rng, magnitudeMin, magnitudeMax, 100);

  const isDebitNormal = debitNature.includes(type);
  const opening = Math.round(magnitude * 0.85);
  const movement = amountBetween(rng, 5_000, magnitude * 0.6, 100);

  return isDebitNormal
    ? { opening, debits: movement, credits: Math.round(movement * amountBetween(rng, 20, 70, 1) * 0.01) }
    : { opening, debits: Math.round(movement * amountBetween(rng, 20, 70, 1) * 0.01), credits: movement };
}

export const accounts: Account[] = accountSeeds.map(([code, name, type, parentCode]) => {
  const leaf = isLeaf(code, accountSeeds);
  const { opening, debits, credits } = generateBalance(type, leaf);
  const isDebitNormal = debitNature.includes(type);
  const closing = isDebitNormal ? opening + debits - credits : opening + credits - debits;

  return {
    code,
    name,
    type,
    parentCode,
    level: levelOf(code, parentCode),
    balance: leaf ? closing : 0,
    openingBalance: leaf ? opening : 0,
    debits,
    credits,
    status: "Active",
    description: leaf
      ? `${name} — ${type} account tracked within the ${code.slice(0, 2)}00 category.`
      : `${name} category grouping for the ${code} account range.`,
  } satisfies Account;
});

// Roll leaf balances up into their parent/grandparent category headers so
// group totals reconcile with their children.
for (const account of accounts) {
  if (account.parentCode === null) continue;
  let parentCode: string | null = account.parentCode;
  while (parentCode) {
    const parent = accounts.find((candidate) => candidate.code === parentCode);
    if (!parent) break;
    if (isLeaf(account.code, accountSeeds)) {
      parent.balance += account.balance;
      parent.debits += account.debits;
      parent.credits += account.credits;
      parent.openingBalance += account.openingBalance;
    }
    parentCode = parent.parentCode;
  }
}

export function getAccount(code: string): Account | undefined {
  return accounts.find((account) => account.code === code);
}

export function getChildAccounts(code: string): Account[] {
  return accounts.filter((account) => account.parentCode === code);
}

export const leafAccounts = accounts.filter((account) => isLeaf(account.code, accountSeeds));

export const postableExpenseAccounts = leafAccounts.filter(
  (account) => account.type === "Expense" && account.code.startsWith("6"),
);

export const postableRevenueAccounts = leafAccounts.filter((account) => account.type === "Revenue");
