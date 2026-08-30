import { ChartCard } from "@/components/finance/chart-card";
import { FinanceAreaChart, FinanceBarChart, FinanceDonutChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import {
  expenseByCategorySeries,
  expenseByDepartmentSeries,
  expenseBySupplierSeries,
  expenseTrendSeries,
  monthlyExpenseComparisonSeries,
} from "@/data/analytics";

export const metadata = { title: "Expense Analytics | Financial Management System" };

export default function ExpenseAnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Expense Analytics"
        description="Expense performance by category, department and supplier."
        breadcrumbs={[{ label: "Analytics" }, { label: "Expenses" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Expense Trend" description="Monthly expenses, year to date.">
          <FinanceAreaChart
            data={expenseTrendSeries}
            xKey="month"
            series={[{ key: "expenses", label: "Expenses", color: "var(--chart-3)" }]}
          />
        </ChartCard>
        <ChartCard title="Monthly Comparison" description="This year vs last year.">
          <FinanceBarChart
            data={monthlyExpenseComparisonSeries}
            xKey="month"
            series={[
              { key: "thisYear", label: "This Year" },
              { key: "lastYear", label: "Last Year", color: "var(--chart-2)" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Expense by Category">
          <FinanceDonutChart data={expenseByCategorySeries} />
        </ChartCard>
        <ChartCard title="Expense by Department">
          <FinanceBarChart
            data={expenseByDepartmentSeries}
            xKey="name"
            layout="horizontal"
            height={280}
            series={[{ key: "value", label: "Expenses", color: "var(--chart-3)" }]}
          />
        </ChartCard>
        <ChartCard title="Expense by Supplier" className="xl:col-span-2">
          <FinanceBarChart
            data={expenseBySupplierSeries}
            xKey="name"
            layout="horizontal"
            height={300}
            series={[{ key: "value", label: "Spend", color: "var(--chart-4)" }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
