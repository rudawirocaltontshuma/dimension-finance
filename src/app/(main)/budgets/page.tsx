import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart, FinanceLineChart } from "@/components/finance/charts/series-charts";
import { KpiCard } from "@/components/finance/kpi-card";
import { PageHeader } from "@/components/finance/page-header";
import { budgets, budgetTotals } from "@/data/budgets";
import { costCenters } from "@/data/costCenters";
import { formatMoney, formatPercent } from "@/lib/finance/format";

import { BudgetsTable } from "./_components/budgets-table";

export const metadata = { title: "Budgets | Dimension Finance" };

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export default function BudgetsPage() {
  const remaining = budgetTotals.budget - budgetTotals.actual;
  const utilization = budgetTotals.budget ? (budgetTotals.actual / budgetTotals.budget) * 100 : 0;
  const variance = budgetTotals.budget - budgetTotals.actual;

  const monthlyTrend = months.map((month, index) => ({
    month,
    budget: budgets.reduce((sum, b) => sum + (b.monthlyTrend[index]?.budget ?? 0), 0),
    actual: budgets.reduce((sum, b) => sum + (b.monthlyTrend[index]?.actual ?? 0), 0),
  }));

  const departmentSpend = costCenters.map((center) => ({
    department: center.name,
    budget: center.budget,
    actual: center.actual,
  }));

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Budgeting" description="Monitor budget performance across every department and category." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard label="Total Budget" value={formatMoney(budgetTotals.budget, "ZAR", { noDecimals: true })} />
        <KpiCard label="Actual Spend" value={formatMoney(budgetTotals.actual, "ZAR", { noDecimals: true })} />
        <KpiCard label="Remaining" value={formatMoney(remaining, "ZAR", { noDecimals: true })} />
        <KpiCard label="Variance" value={formatMoney(variance, "ZAR", { noDecimals: true })} />
        <KpiCard label="Utilization" value={formatPercent(utilization)} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Monthly Budget Trend" description="Budget vs actual spend by month.">
          <FinanceLineChart
            data={monthlyTrend}
            xKey="month"
            series={[
              { key: "budget", label: "Budget", color: "var(--chart-2)" },
              { key: "actual", label: "Actual" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Department Spend" description="Budget vs actual by department.">
          <FinanceBarChart
            data={departmentSpend}
            xKey="department"
            layout="horizontal"
            series={[
              { key: "budget", label: "Budget", color: "var(--chart-2)" },
              { key: "actual", label: "Actual" },
            ]}
            height={280}
          />
        </ChartCard>
      </div>

      <BudgetsTable budgets={budgets} />
    </div>
  );
}
