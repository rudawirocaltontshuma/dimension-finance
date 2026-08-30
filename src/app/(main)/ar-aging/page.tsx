import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { invoices } from "@/data/invoices";
import { agingBuckets, buildAgingReport, summarizeAging } from "@/lib/finance/aging";

export const metadata = { title: "AR Aging | Nexora Finance" };

export default function ArAgingPage() {
  const rows = buildAgingReport(
    invoices.filter((i) => i.status !== "Paid" && i.status !== "Cancelled" && i.status !== "Draft"),
    {
      groupKey: (i) => i.customerId,
      groupLabel: (i) => i.customerName,
      dueDate: (i) => i.dueDate,
      balance: (i) => i.balance,
    },
  );
  const summary = summarizeAging(rows);
  const chartData = agingBuckets.map((bucket) => ({ bucket, amount: summary[bucket] }));
  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Accounts Receivable Aging"
        description="Outstanding customer balances grouped by current, 30, 60, and 90+ day buckets."
        breadcrumbs={[{ label: "Receivables", href: "/receivables" }, { label: "AR Aging" }]}
        actions={<ExportPreviewButton />}
      />

      <ChartCard title="Aging Distribution" description="Total outstanding balance by age bucket.">
        <FinanceBarChart data={chartData} xKey="bucket" series={[{ key: "amount", label: "Outstanding" }]} />
      </ChartCard>

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                {agingBuckets.map((bucket) => (
                  <TableHead key={bucket} className="text-right">
                    {bucket}
                  </TableHead>
                ))}
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  {agingBuckets.map((bucket) => (
                    <TableCell key={bucket} className="text-right tabular-nums">
                      {row[bucket] > 0 ? <Money amount={row[bucket]} /> : "—"}
                    </TableCell>
                  ))}
                  <TableCell className="text-right font-medium tabular-nums">
                    <Money amount={row.total} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-semibold">Total</TableCell>
                {agingBuckets.map((bucket) => (
                  <TableCell key={bucket} className="text-right font-semibold tabular-nums">
                    <Money amount={summary[bucket]} />
                  </TableCell>
                ))}
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={grandTotal} />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
