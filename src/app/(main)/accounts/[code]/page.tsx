import type { ReactNode } from "react";

import { notFound } from "next/navigation";

import { Inbox } from "lucide-react";

import { ActivityTimeline, type TimelineItem } from "@/components/finance/activity-timeline";
import { ChartCard } from "@/components/finance/chart-card";
import { FinanceLineChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { EmptyState } from "@/components/finance/empty-state";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAccount } from "@/data/accounts";
import { getTransactionsForAccount } from "@/data/transactions";
import { formatDateShort } from "@/lib/finance/format";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const account = getAccount(code);
  return {
    title: account ? `${account.code} · ${account.name} | Dimension Finance` : "Account | Dimension Finance",
  };
}

function StatTile({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}

export default async function AccountDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const account = getAccount(code);
  if (!account) notFound();

  const transactions = getTransactionsForAccount(code).slice(0, 40);
  const chartData = [...transactions].reverse().map((t) => ({ date: formatDateShort(t.date), balance: t.balance }));

  const timeline: TimelineItem[] = transactions.slice(0, 10).map((t) => ({
    id: t.id,
    label: t.description,
    actor: t.department,
    date: t.date,
    note: t.debit > 0 ? `Debit of R ${t.debit.toLocaleString()}` : `Credit of R ${t.credit.toLocaleString()}`,
  }));

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={`${account.code} · ${account.name}`}
        description={account.description}
        breadcrumbs={[
          { label: "Accounting", href: "/accounting" },
          { label: "Chart of Accounts", href: "/accounts" },
          { label: account.code },
        ]}
        actions={
          <>
            <Badge variant="outline">{account.type}</Badge>
            <ExportPreviewButton />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Opening Balance" value={<Money amount={account.openingBalance} />} />
        <StatTile label="Debits (Period)" value={<Money amount={account.debits} />} />
        <StatTile label="Credits (Period)" value={<Money amount={account.credits} />} />
        <StatTile label="Closing Balance" value={<Money amount={account.balance} className="font-semibold" />} />
      </div>

      <ChartCard title="Balance Trend" description="Running balance across recent posted transactions.">
        {chartData.length > 0 ? (
          <FinanceLineChart data={chartData} xKey="date" series={[{ key: "balance", label: "Balance" }]} />
        ) : (
          <EmptyState
            icon={Inbox}
            title="No transaction history"
            description="This account has no posted activity yet."
          />
        )}
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Period Transactions</p>
            {transactions.length === 0 ? (
              <EmptyState icon={Inbox} title="No transactions found" />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Debit</TableHead>
                      <TableHead className="text-right">Credit</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="whitespace-nowrap text-xs">{formatDateShort(t.date)}</TableCell>
                        <TableCell className="max-w-56 truncate text-sm">{t.description}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {t.debit > 0 ? <Money amount={t.debit} /> : "—"}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {t.credit > 0 ? <Money amount={t.credit} /> : "—"}
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          <Money amount={t.balance} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Activity Timeline</p>
            {timeline.length === 0 ? (
              <EmptyState icon={Inbox} title="No recent activity" />
            ) : (
              <ActivityTimeline items={timeline} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
