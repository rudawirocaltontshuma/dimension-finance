import { ChartCard } from "@/components/finance/chart-card";
import { FinanceLineChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { KpiCard } from "@/components/finance/kpi-card";
import { PageHeader } from "@/components/finance/page-header";
import { profitabilityKpis, profitabilitySeries } from "@/data/analytics";
import { formatPercent } from "@/lib/finance/format";

export const metadata = { title: "Profitability | Dimension Finance" };

export default function ProfitabilityPage() {
  const k = profitabilityKpis;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Profitability"
        description="Margin performance and growth trends across the business."
        breadcrumbs={[{ label: "Analytics" }, { label: "Profitability" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="Gross Margin"
          value={formatPercent(k.grossMargin)}
          trend="up"
          deltaPercent={k.grossMargin - k.grossMarginPrior}
          deltaLabel="vs prior"
        />
        <KpiCard
          label="Operating Margin"
          value={formatPercent(k.operatingMargin)}
          trend="up"
          deltaPercent={k.operatingMargin - k.operatingMarginPrior}
          deltaLabel="vs prior"
        />
        <KpiCard
          label="Net Margin"
          value={formatPercent(k.netMargin)}
          trend="up"
          deltaPercent={k.netMargin - k.netMarginPrior}
          deltaLabel="vs prior"
        />
        <KpiCard label="Revenue Growth" value={formatPercent(k.revenueGrowth)} />
        <KpiCard label="Expense Growth" value={formatPercent(k.expenseGrowth)} invertTrendColor trend="flat" />
        <KpiCard label="Return on Revenue" value={formatPercent(k.returnOnRevenue)} />
      </div>

      <ChartCard title="Margin Trend" description="Gross, operating and net margin by month.">
        <FinanceLineChart
          data={profitabilitySeries}
          xKey="month"
          series={[
            { key: "grossMargin", label: "Gross Margin" },
            { key: "operatingMargin", label: "Operating Margin", color: "var(--chart-3)" },
            { key: "netMargin", label: "Net Margin", color: "var(--chart-5)" },
          ]}
          valueFormatter={(v) => `${v.toFixed(0)}%`}
        />
      </ChartCard>
    </div>
  );
}
