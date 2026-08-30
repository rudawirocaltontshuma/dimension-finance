import { ChartCard } from "@/components/finance/chart-card";
import { FinanceAreaChart, FinanceBarChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { KpiCard } from "@/components/finance/kpi-card";
import { PageHeader } from "@/components/finance/page-header";
import { cashFlowSeries } from "@/data/dashboard";
import { forecastSeries } from "@/data/forecasts";
import { formatMoney } from "@/lib/finance/format";

export const metadata = { title: "Cash Flow Analytics | Financial Management System" };

export default function CashFlowAnalyticsPage() {
  const latest = forecastSeries[7];
  const netOperating = cashFlowSeries.reduce((sum, m) => sum + m.operating, 0);
  const netInvesting = cashFlowSeries.reduce((sum, m) => sum + m.investing, 0);
  const netFinancing = cashFlowSeries.reduce((sum, m) => sum + m.financing, 0);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Cash Flow Analytics"
        description="Operating, investing and financing cash trends, plus a forward-looking cash projection."
        breadcrumbs={[{ label: "Analytics" }, { label: "Cash Flow" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Net Operating Cash (YTD)" value={formatMoney(netOperating, "ZAR", { noDecimals: true })} />
        <KpiCard label="Net Investing Cash (YTD)" value={formatMoney(netInvesting, "ZAR", { noDecimals: true })} />
        <KpiCard label="Net Financing Cash (YTD)" value={formatMoney(netFinancing, "ZAR", { noDecimals: true })} />
        <KpiCard label="Cash Position" value={formatMoney(latest?.cash ?? 0, "ZAR", { noDecimals: true })} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Cash Flow by Activity" description="Operating, investing and financing cash movement.">
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
        <ChartCard title="Cash Position Projection" description="Actual through August, projected through year end.">
          <FinanceAreaChart
            data={forecastSeries}
            xKey="period"
            series={[{ key: "cash", label: "Cash", color: "var(--chart-4)" }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
