import Link from "next/link";

import { ArrowRight, Inbox } from "lucide-react";

import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart } from "@/components/finance/charts/series-charts";
import { EmptyState } from "@/components/finance/empty-state";
import { KpiCard } from "@/components/finance/kpi-card";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { billStatusMeta, bills } from "@/data/bills";
import { payablePayments } from "@/data/payments";
import { suppliers } from "@/data/suppliers";
import { agingBuckets, buildAgingReport, summarizeAging } from "@/lib/finance/aging";
import { formatDateShort, formatMoney } from "@/lib/finance/format";

export const metadata = { title: "Payables Overview | Dimension Finance" };

const activeBills = bills.filter((b) => b.status !== "Disputed" && b.status !== "Draft");
const TODAY = "2026-08-30";
const oneWeek = "2026-09-06";

export default function PayablesOverviewPage() {
  const outstanding = activeBills.reduce((sum, b) => sum + b.balance, 0);
  const paid = activeBills.reduce((sum, b) => sum + b.paid, 0);
  const overdue = activeBills.filter((b) => b.status === "Overdue").reduce((sum, b) => sum + b.balance, 0);
  const dueThisWeek = activeBills
    .filter((b) => b.balance > 0 && b.dueDate >= TODAY && b.dueDate <= oneWeek)
    .reduce((sum, b) => sum + b.balance, 0);

  const rows = buildAgingReport(activeBills, {
    groupKey: (b) => b.supplierId,
    groupLabel: (b) => b.supplierName,
    dueDate: (b) => b.dueDate,
    balance: (b) => b.balance,
  });
  const summary = summarizeAging(rows);
  const chartData = agingBuckets.map((bucket) => ({ bucket, amount: summary[bucket] }));

  const upcomingBills = activeBills
    .filter((b) => b.balance > 0 && b.dueDate >= TODAY)
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
    .slice(0, 6);
  const topSuppliers = [...suppliers].sort((a, b) => b.spend - a.spend).slice(0, 6);
  const recentPayments = [...payablePayments].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Payables" description="Track supplier bills, upcoming payments and spend." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard label="Outstanding Bills" value={formatMoney(outstanding, "ZAR", { noDecimals: true })} />
        <KpiCard label="Overdue" value={formatMoney(overdue, "ZAR", { noDecimals: true })} />
        <KpiCard label="Due This Week" value={formatMoney(dueThisWeek, "ZAR", { noDecimals: true })} />
        <KpiCard label="Paid (YTD)" value={formatMoney(paid, "ZAR", { noDecimals: true })} />
        <KpiCard label="Avg. Payment Time" value="27 days" />
      </div>

      <ChartCard title="AP Aging" description="Outstanding supplier balances by age bucket.">
        <FinanceBarChart
          data={chartData}
          xKey="bucket"
          series={[{ key: "amount", label: "Outstanding", color: "var(--chart-3)" }]}
        />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-medium text-sm">Upcoming Bills</CardTitle>
            <CardAction>
              <Link
                href="/bills"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="px-4">
            {upcomingBills.length === 0 ? (
              <EmptyState icon={Inbox} title="No bills due soon" />
            ) : (
              <div className="divide-y">
                {upcomingBills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between py-2 text-sm">
                    <div className="min-w-0">
                      <Link href={`/bills/${bill.id}`} className="block truncate hover:underline">
                        {bill.supplierName}
                      </Link>
                      <StatusBadge status={bill.status} meta={billStatusMeta[bill.status]} className="mt-0.5" />
                    </div>
                    <Money amount={bill.balance} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-medium text-sm">Supplier Spend</CardTitle>
            <CardAction>
              <Link
                href="/suppliers"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="px-4">
            <div className="divide-y">
              {topSuppliers.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 text-sm">
                  <Link href={`/suppliers/${s.id}`} className="truncate hover:underline">
                    {s.name}
                  </Link>
                  <Money amount={s.spend} noDecimals />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-medium text-sm">Recent Payments</CardTitle>
            <CardAction>
              <Link
                href="/payables/payments"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="px-4">
            <div className="divide-y">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between py-2 text-sm">
                  <div className="min-w-0">
                    <p className="truncate">{payment.supplierName}</p>
                    <p className="text-muted-foreground text-xs">{formatDateShort(payment.date)}</p>
                  </div>
                  <Money amount={payment.amount} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
