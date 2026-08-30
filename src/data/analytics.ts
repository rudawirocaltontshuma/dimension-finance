import { costCenters } from "@/data/costCenters";
import { customers } from "@/data/customers";
import { revenueVsExpensesSeries } from "@/data/dashboard";
import { expenseCategories } from "@/data/expenseCategories";
import { suppliers } from "@/data/suppliers";

export const revenueTrendSeries = revenueVsExpensesSeries.map((point) => ({
  month: point.month,
  revenue: point.revenue,
}));

export const revenueByProductSeries = [
  { name: "Industrial Components", value: 2_812_400 },
  { name: "Distribution Contracts", value: 2_248_900 },
  { name: "Managed Services", value: 1_614_200 },
  { name: "Retail Supply", value: 1_204_600 },
  { name: "Export Goods", value: 602_400 },
];

export const revenueByCustomerSeries = [...customers]
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 8)
  .map((c) => ({ name: c.name, value: c.revenue }));

export const revenueByRegionSeries = [
  { name: "Gauteng", value: 3_412_600 },
  { name: "Western Cape", value: 2_186_400 },
  { name: "KwaZulu-Natal", value: 1_486_200 },
  { name: "Eastern Cape", value: 812_400 },
  { name: "Export Markets", value: 584_900 },
];

export const revenueByDepartmentSeries = costCenters.map((center) => ({
  name: center.name,
  value: Math.round(center.actual * 1.4),
}));

export const monthlyRevenueGrowthSeries = revenueVsExpensesSeries.map((point, index, arr) => {
  const previous = arr[index - 1];
  const growth = previous ? ((point.revenue - previous.revenue) / previous.revenue) * 100 : 0;
  return { month: point.month, growth: Number(growth.toFixed(1)) };
});

export const expenseTrendSeries = revenueVsExpensesSeries.map((point) => ({
  month: point.month,
  expenses: point.expenses,
}));

export const expenseByCategorySeries = expenseCategories.map((category) => ({
  name: category.name,
  value: category.annualSpend,
}));

export const expenseByDepartmentSeries = costCenters.map((center) => ({
  name: center.name,
  value: center.actual,
}));

export const expenseBySupplierSeries = [...suppliers]
  .sort((a, b) => b.spend - a.spend)
  .slice(0, 8)
  .map((s) => ({ name: s.name, value: s.spend }));

export const monthlyExpenseComparisonSeries = revenueVsExpensesSeries.map((point, index) => ({
  month: point.month,
  thisYear: point.expenses,
  lastYear: Math.round(point.expenses * (0.88 + (index % 3) * 0.01)),
}));

export const profitabilitySeries = revenueVsExpensesSeries.map((point) => ({
  month: point.month,
  grossMargin: Number((((point.revenue - point.expenses * 0.62) / point.revenue) * 100).toFixed(1)),
  operatingMargin: Number((((point.revenue - point.expenses) / point.revenue) * 100).toFixed(1)),
  netMargin: Number((((point.revenue - point.expenses * 1.02) / point.revenue) * 100).toFixed(1)),
}));

export const profitabilityKpis = {
  grossMargin: 49.7,
  grossMarginPrior: 48.1,
  operatingMargin: 15.1,
  operatingMarginPrior: 14.6,
  netMargin: 15.1,
  netMarginPrior: 14.6,
  revenueGrowth: 8.1,
  expenseGrowth: 6.5,
  returnOnRevenue: 15.1,
};

export const financialKpis = [
  {
    id: "revenue-growth",
    label: "Revenue Growth",
    value: "8.1%",
    trend: "up",
    description: "Year-over-year revenue growth rate.",
  },
  {
    id: "gross-margin",
    label: "Gross Margin",
    value: "49.7%",
    trend: "up",
    description: "Gross profit as a percentage of revenue.",
  },
  {
    id: "net-margin",
    label: "Net Margin",
    value: "15.1%",
    trend: "up",
    description: "Net profit as a percentage of revenue.",
  },
  {
    id: "opex-ratio",
    label: "Operating Expense Ratio",
    value: "34.6%",
    trend: "flat",
    description: "Operating expenses as a percentage of revenue.",
  },
  {
    id: "current-ratio",
    label: "Current Ratio",
    value: "1.94",
    trend: "up",
    description: "Current assets divided by current liabilities.",
  },
  {
    id: "quick-ratio",
    label: "Quick Ratio",
    value: "1.52",
    trend: "flat",
    description: "Current assets excluding inventory, divided by current liabilities.",
  },
  {
    id: "dso",
    label: "DSO (Days Sales Outstanding)",
    value: "38 days",
    trend: "down",
    description: "Average number of days to collect receivables.",
  },
  {
    id: "dpo",
    label: "DPO (Days Payable Outstanding)",
    value: "44 days",
    trend: "up",
    description: "Average number of days taken to pay suppliers.",
  },
  {
    id: "cash-conversion",
    label: "Cash Conversion Cycle",
    value: "31 days",
    trend: "down",
    description: "Time to convert investments in inventory into cash flows.",
  },
] as const;
