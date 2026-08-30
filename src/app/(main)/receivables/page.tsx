import Link from "next/link";

import { ArrowRight, CheckCircle2, Inbox } from "lucide-react";

import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart, FinanceLineChart } from "@/components/finance/charts/series-charts";
import { EmptyState } from "@/components/finance/empty-state";
import { KpiCard } from "@/components/finance/kpi-card";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customers } from "@/data/customers";
import { revenueVsExpensesSeries } from "@/data/dashboard";
import { invoiceStatusMeta, invoices } from "@/data/invoices";
import { payments } from "@/data/payments";
import { agingBuckets, buildAgingReport, summarizeAging } from "@/lib/finance/aging";
import { formatDateShort, formatMoney } from "@/lib/finance/format";

export const metadata = { title: "Receivables Overview | Financial Management System" };

const activeInvoices = invoices.filter((i) => i.status !== "Cancelled" && i.status !== "Draft");

export default function ReceivablesOverviewPage() {
  const outstanding = activeInvoices.reduce((sum, i) => sum + i.balance, 0);
  const collected = activeInvoices.reduce((sum, i) => sum + i.paid, 0);
  const current = activeInvoices.filter((i) => i.dueDate >= "2026-08-30").reduce((sum, i) => sum + i.balance, 0);
  const overdue = outstanding - current;

  const rows = buildAgingReport(activeInvoices, {
    groupKey: (i) => i.customerId,
    groupLabel: (i) => i.customerName,
    dueDate: (i) => i.dueDate,
    balance: (i) => i.balance,
  });
  const summary = summarizeAging(rows);
  const chartData = agingBuckets.map((bucket) => ({ bucket, amount: summary[bucket] }));

  const topCustomers = [...customers].sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  const overdueInvoices = activeInvoices
    .filter((i) => i.status === "Overdue")
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 6);
  const upcomingDue = activeInvoices
    .filter((i) => i.dueDate >= "2026-08-30" && i.balance > 0)
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
    .slice(0, 6);
  const recentPayments = [...payments].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Receivables"
        description="Track outstanding balances, overdue invoices and collection performance."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard label="Outstanding" value={formatMoney(outstanding, "ZAR", { noDecimals: true })} />
        <KpiCard label="Overdue" value={formatMoney(overdue, "ZAR", { noDecimals: true })} />
        <KpiCard label="Current" value={formatMoney(current, "ZAR", { noDecimals: true })} />
        <KpiCard label="Collected (YTD)" value={formatMoney(collected, "ZAR", { noDecimals: true })} />
        <KpiCard label="DSO" value="38 days" footnote="Days Sales Outstanding" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Revenue Trend" description="Monthly revenue, year to date.">
          <FinanceLineChart
            data={revenueVsExpensesSeries}
            xKey="month"
            series={[{ key: "revenue", label: "Revenue" }]}
          />
        </ChartCard>
        <ChartCard title="AR Aging" description="Outstanding balances by age bucket.">
          <FinanceBarChart data={chartData} xKey="bucket" series={[{ key: "amount", label: "Outstanding" }]} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-medium text-sm">Top Customers</CardTitle>
            <CardAction>
              <Link
                href="/customers"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="px-4">
            <div className="divide-y">
              {topCustomers.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 text-sm">
                  <Link href={`/customers/${c.id}`} className="truncate hover:underline">
                    {c.name}
                  </Link>
                  <Money amount={c.revenue} noDecimals />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-medium text-sm">Overdue Invoices</CardTitle>
            <CardAction>
              <Link
                href="/invoices"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="px-4">
            {overdueInvoices.length === 0 ? (
              <EmptyState icon={CheckCircle2} title="No overdue invoices" />
            ) : (
              <div className="divide-y">
                {overdueInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between py-2 text-sm">
                    <div className="min-w-0">
                      <Link href={`/invoices/${invoice.id}`} className="block truncate hover:underline">
                        {invoice.customerName}
                      </Link>
                      <StatusBadge
                        status={invoice.status}
                        meta={invoiceStatusMeta[invoice.status]}
                        className="mt-0.5"
                      />
                    </div>
                    <Money amount={invoice.balance} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-medium text-sm">Upcoming Due Dates</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            {upcomingDue.length === 0 ? (
              <EmptyState icon={Inbox} title="Nothing due soon" />
            ) : (
              <div className="divide-y">
                {upcomingDue.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between py-2 text-sm">
                    <div className="min-w-0">
                      <p className="truncate">{invoice.customerName}</p>
                      <p className="text-muted-foreground text-xs">Due {formatDateShort(invoice.dueDate)}</p>
                    </div>
                    <Money amount={invoice.balance} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-medium text-sm">Recent Payments</CardTitle>
            <CardAction>
              <Link
                href="/payments"
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
                    <p className="truncate">{payment.customerName}</p>
                    <p className="text-muted-foreground text-xs">{formatDateShort(payment.date)}</p>
                  </div>
                  <Money amount={payment.amount} colorize />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
