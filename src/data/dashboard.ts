import { bankAccounts } from "@/data/banking";
import { bills } from "@/data/bills";
import { budgets } from "@/data/budgets";
import { costCenters } from "@/data/costCenters";
import { customers } from "@/data/customers";
import { expenseCategories } from "@/data/expenseCategories";
import { fiscalPeriods } from "@/data/fiscal-periods";
import { invoices } from "@/data/invoices";
import { payments } from "@/data/payments";
import { suppliers } from "@/data/suppliers";
import { transactions } from "@/data/transactions";
import { buildAgingReport, summarizeAging } from "@/lib/finance/aging";

export const dashboardKpis = {
  revenue: 8_482_500,
  revenuePreviousPeriod: 7_850_300,
  grossProfit: 4_216_800,
  grossProfitPreviousPeriod: 3_912_100,
  netProfit: 1_284_500,
  netProfitPreviousPeriod: 1_142_800,
  cashPosition: bankAccounts.reduce((sum, account) => sum + account.balance, 0),
  cashPositionPreviousPeriod: 3_614_200,
  accountsReceivable: 2_184_300,
  accountsReceivablePreviousPeriod: 2_046_700,
  accountsPayable: 1_842_600,
  accountsPayablePreviousPeriod: 1_918_400,
  operatingExpenses: 2_932_400,
  operatingExpensesPreviousPeriod: 2_798_100,
  profitMargin: 15.1,
  profitMarginPreviousPeriod: 14.6,
};

export const revenueVsExpensesSeries = [
  { month: "Jan", revenue: 6_412_800, expenses: 5_218_600 },
  { month: "Feb", revenue: 6_684_200, expenses: 5_386_900 },
  { month: "Mar", revenue: 7_012_500, expenses: 5_524_100 },
  { month: "Apr", revenue: 6_890_400, expenses: 5_612_300 },
  { month: "May", revenue: 7_248_900, expenses: 5_780_200 },
  { month: "Jun", revenue: 7_540_600, expenses: 5_942_800 },
  { month: "Jul", revenue: 7_850_300, expenses: 6_098_400 },
  { month: "Aug", revenue: 8_482_500, expenses: 6_198_000 },
];

export const netProfitTrendSeries = revenueVsExpensesSeries.map((point) => ({
  month: point.month,
  netProfit: point.revenue - point.expenses,
}));

export const cashFlowSeries = [
  { month: "Jan", operating: 612_000, investing: -84_000, financing: -52_000 },
  { month: "Feb", operating: 584_000, investing: -46_000, financing: -52_000 },
  { month: "Mar", operating: 698_000, investing: -112_000, financing: -48_000 },
  { month: "Apr", operating: 641_000, investing: -38_000, financing: -55_000 },
  { month: "May", operating: 722_000, investing: -67_000, financing: -51_000 },
  { month: "Jun", operating: 758_000, investing: -94_000, financing: -49_000 },
  { month: "Jul", operating: 786_000, investing: -58_000, financing: -53_000 },
  { month: "Aug", operating: 840_000, investing: -104_000, financing: -56_000 },
];

export const revenueByCategorySeries = [
  { name: "Product Sales - Local", value: 5_412_000 },
  { name: "Product Sales - Export", value: 1_648_300 },
  { name: "Service Revenue", value: 1_214_600 },
  { name: "Rental & Other Income", value: 207_600 },
];

export const expenseBreakdownSeries = expenseCategories.map((category) => ({
  name: category.name,
  value: category.annualSpend,
}));

export const budgetVsActualSeries = costCenters.map((center) => ({
  department: center.name,
  budget: center.budget,
  actual: center.actual,
}));

const arAgingRows = buildAgingReport(
  invoices.filter((i) => i.status !== "Paid" && i.status !== "Cancelled" && i.status !== "Draft"),
  {
    groupKey: (i) => i.customerId,
    groupLabel: (i) => i.customerName,
    dueDate: (i) => i.dueDate,
    balance: (i) => i.balance,
  },
);
export const arAgingSummary = summarizeAging(arAgingRows);

const apAgingRows = buildAgingReport(
  bills.filter((b) => b.status !== "Paid" && b.status !== "Draft" && b.status !== "Disputed"),
  {
    groupKey: (b) => b.supplierId,
    groupLabel: (b) => b.supplierName,
    dueDate: (b) => b.dueDate,
    balance: (b) => b.balance,
  },
);
export const apAgingSummary = summarizeAging(apAgingRows);

export const recentTransactions = transactions.slice(0, 8);

export const outstandingInvoices = invoices
  .filter((i) => i.status === "Overdue" || i.status === "Partially Paid" || i.status === "Sent")
  .sort((a, b) => b.balance - a.balance)
  .slice(0, 6);

export const upcomingBills = bills
  .filter((b) => b.status === "Approved" || b.status === "Partially Paid")
  .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
  .slice(0, 6);

export const topCustomers = [...customers].sort((a, b) => b.revenue - a.revenue).slice(0, 6);

export const topExpenseCategories = [...expenseCategories].sort((a, b) => b.annualSpend - a.annualSpend).slice(0, 6);

export const recentPayments = [...payments].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);

export const budgetAlerts = budgets.filter((b) => b.status === "Over Budget" || b.status === "At Risk").slice(0, 6);

export const monthlyClosingStatus = fiscalPeriods.filter((p) => p.kind === "month").slice(6, 10);

export const topSuppliersByOutstanding = [...suppliers].sort((a, b) => b.outstanding - a.outstanding).slice(0, 6);
