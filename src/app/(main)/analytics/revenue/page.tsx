import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart, FinanceDonutChart, FinanceLineChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import {
  monthlyRevenueGrowthSeries,
  revenueByCustomerSeries,
  revenueByDepartmentSeries,
  revenueByProductSeries,
  revenueByRegionSeries,
  revenueTrendSeries,
} from "@/data/analytics";

export const metadata = { title: "Revenue Analytics | Dimension Finance" };

export default function RevenueAnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Revenue Analytics"
        description="Revenue performance by product, customer, region and department."
        breadcrumbs={[{ label: "Analytics" }, { label: "Revenue" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Revenue Trend" description="Monthly revenue, year to date.">
          <FinanceLineChart data={revenueTrendSeries} xKey="month" series={[{ key: "revenue", label: "Revenue" }]} />
        </ChartCard>
        <ChartCard title="Monthly Growth" description="Month-over-month revenue growth rate.">
          <FinanceBarChart
            data={monthlyRevenueGrowthSeries}
            xKey="month"
            series={[{ key: "growth", label: "Growth %", color: "var(--chart-2)" }]}
          />
        </ChartCard>
        <ChartCard title="Revenue by Product">
          <FinanceDonutChart data={revenueByProductSeries} />
        </ChartCard>
        <ChartCard title="Revenue by Region">
          <FinanceDonutChart data={revenueByRegionSeries} />
        </ChartCard>
        <ChartCard title="Revenue by Customer" description="Top customers by revenue.">
          <FinanceBarChart
            data={revenueByCustomerSeries}
            xKey="name"
            layout="horizontal"
            height={280}
            series={[{ key: "value", label: "Revenue" }]}
          />
        </ChartCard>
        <ChartCard title="Revenue by Department">
          <FinanceBarChart
            data={revenueByDepartmentSeries}
            xKey="name"
            layout="horizontal"
            height={280}
            series={[{ key: "value", label: "Revenue", color: "var(--chart-3)" }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
