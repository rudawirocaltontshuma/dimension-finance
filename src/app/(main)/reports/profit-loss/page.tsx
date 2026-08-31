import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { revenueVsExpensesSeries } from "@/data/dashboard";

import { ProfitLossDocument } from "./_components/profit-loss-document";
import { ProfitLossPrintButton } from "./_components/profit-loss-print-button";

export const metadata = { title: "Profit & Loss | Dimension Finance" };

export default function ProfitLossReportPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Profit & Loss"
        description="Revenue, cost of sales, operating expenses and net profit for the current period."
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "Profit & Loss" }]}
        actions={
          <>
            <ExportPreviewButton />
            <ProfitLossPrintButton />
          </>
        }
      />

      <ChartCard title="Revenue vs Expenses" description="Monthly trend, year to date.">
        <FinanceBarChart
          data={revenueVsExpensesSeries}
          xKey="month"
          series={[
            { key: "revenue", label: "Revenue" },
            { key: "expenses", label: "Expenses", color: "var(--chart-3)" },
          ]}
        />
      </ChartCard>

      <Card className="mx-auto w-full max-w-4xl">
        <CardContent className="p-6 sm:p-8">
          <ProfitLossDocument />
        </CardContent>
      </Card>
    </div>
  );
}
