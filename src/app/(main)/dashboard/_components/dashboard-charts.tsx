import { ChartCard } from "@/components/finance/chart-card";
import {
  FinanceAreaChart,
  FinanceBarChart,
  FinanceDonutChart,
  FinanceLineChart,
} from "@/components/finance/charts/series-charts";
import {
  apAgingSummary,
  arAgingSummary,
  budgetVsActualSeries,
  cashFlowSeries,
  expenseBreakdownSeries,
  netProfitTrendSeries,
  revenueByCategorySeries,
  revenueVsExpensesSeries,
} from "@/data/dashboard";

const arAgingData = Object.entries(arAgingSummary).map(([bucket, value]) => ({ bucket, amount: value }));
const apAgingData = Object.entries(apAgingSummary).map(([bucket, value]) => ({ bucket, amount: value }));

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <ChartCard title="Revenue vs Expenses" description="Monthly revenue and operating expenses, year to date.">
        <FinanceLineChart
          data={revenueVsExpensesSeries}
          xKey="month"
          series={[
            { key: "revenue", label: "Revenue" },
            { key: "expenses", label: "Expenses", color: "var(--chart-3)" },
          ]}
        />
      </ChartCard>

      <ChartCard title="Net Profit Trend" description="Net profit generated each month, year to date.">
        <FinanceAreaChart
          data={netProfitTrendSeries}
          xKey="month"
          series={[{ key: "netProfit", label: "Net Profit" }]}
        />
      </ChartCard>

      <ChartCard title="Cash Flow" description="Operating, investing, and financing cash movements by month.">
        <FinanceBarChart
          data={cashFlowSeries}
          xKey="month"
          stacked
          series={[
            { key: "operating", label: "Operating" },
            { key: "investing", label: "Investing", color: "var(--chart-3)" },
            { key: "financing", label: "Financing", color: "var(--chart-5)" },
          ]}
        />
      </ChartCard>

      <ChartCard title="Budget vs Actual" description="Departmental budget performance for the current fiscal year.">
        <FinanceBarChart
          data={budgetVsActualSeries}
          xKey="department"
          layout="horizontal"
          series={[
            { key: "budget", label: "Budget", color: "var(--chart-2)" },
            { key: "actual", label: "Actual" },
          ]}
          height={280}
        />
      </ChartCard>

      <ChartCard title="Revenue by Category" description="Share of revenue across product and service lines.">
        <FinanceDonutChart data={revenueByCategorySeries} />
      </ChartCard>

      <ChartCard title="Expense Breakdown" description="Annual spend across expense categories.">
        <FinanceDonutChart data={expenseBreakdownSeries} />
      </ChartCard>

      <ChartCard title="Accounts Receivable Aging" description="Outstanding customer balances by age bucket.">
        <FinanceBarChart data={arAgingData} xKey="bucket" series={[{ key: "amount", label: "Outstanding" }]} />
      </ChartCard>

      <ChartCard title="Accounts Payable Aging" description="Outstanding supplier balances by age bucket.">
        <FinanceBarChart
          data={apAgingData}
          xKey="bucket"
          series={[{ key: "amount", label: "Outstanding", color: "var(--chart-3)" }]}
        />
      </ChartCard>
    </div>
  );
}
