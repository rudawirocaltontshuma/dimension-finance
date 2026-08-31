import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { cashFlowSeries } from "@/data/dashboard";

import { CashFlowDocument } from "./_components/cash-flow-document";
import { CashFlowPrintButton } from "./_components/cash-flow-print-button";

export const metadata = { title: "Cash Flow | Dimension Finance" };

export default function CashFlowReportPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Cash Flow"
        description="Operating, investing and financing cash movements for the current period."
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "Cash Flow" }]}
        actions={
          <>
            <ExportPreviewButton />
            <CashFlowPrintButton />
          </>
        }
      />

      <ChartCard title="Cash Flow by Month" description="Operating, investing and financing activity, year to date.">
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

      <Card className="mx-auto w-full max-w-4xl">
        <CardContent className="p-6 sm:p-8">
          <CashFlowDocument />
        </CardContent>
      </Card>
    </div>
  );
}
