import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { bills } from "@/data/bills";
import { agingBuckets, buildAgingReport, summarizeAging } from "@/lib/finance/aging";

export const metadata = { title: "AP Aging Report | Nexora Finance" };

export default function ApAgingReportPage() {
  const rows = buildAgingReport(
    bills.filter((b) => b.status !== "Paid" && b.status !== "Draft" && b.status !== "Disputed"),
    {
      groupKey: (b) => b.supplierId,
      groupLabel: (b) => b.supplierName,
      dueDate: (b) => b.dueDate,
      balance: (b) => b.balance,
    },
  );
  const summary = summarizeAging(rows);
  const chartData = agingBuckets.map((bucket) => ({ bucket, amount: summary[bucket] }));
  const total = rows.reduce((sum, row) => sum + row.total, 0);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="AP Aging"
        description="Outstanding supplier balances grouped by current, 30, 60, and 90+ day buckets."
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "AP Aging" }]}
        actions={<ExportPreviewButton />}
      />

      <ChartCard title="Aging Distribution">
        <FinanceBarChart
          data={chartData}
          xKey="bucket"
          series={[{ key: "amount", label: "Outstanding", color: "var(--chart-3)" }]}
        />
      </ChartCard>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Outstanding</span>
            <span className="font-semibold tabular-nums">
              <Money amount={total} noDecimals />
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Suppliers with Balances</span>
            <span className="font-medium">{rows.length}</span>
          </div>
          <Link href="/ap-aging" className="flex items-center gap-1 text-primary text-sm hover:underline">
            View full aging by supplier <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
