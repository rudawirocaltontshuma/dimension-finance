import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { KpiCard } from "@/components/finance/kpi-card";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bankAccounts, bankTransactions, reconciliationSummaries } from "@/data/banking";
import { formatDateShort, formatMoney } from "@/lib/finance/format";

import { bankTransactionStatusMeta } from "../bank-transactions/_components/bank-transactions-columns";

export const metadata = { title: "Banking | Financial Management System" };

export default function BankingOverviewPage() {
  const cashPosition = bankAccounts.reduce((sum, account) => sum + account.balance, 0);
  const pendingReconciliation = reconciliationSummaries.reduce((sum, s) => sum + s.unmatchedCount, 0);
  const recentTransactions = [...bankTransactions].slice(0, 8);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Banking"
        description="Visual representation only — Financial Management System is not connected to any real bank or payment provider."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Cash Position" value={formatMoney(cashPosition, "ZAR", { noDecimals: true })} />
        <KpiCard label="Bank Accounts" value={String(bankAccounts.length)} />
        <KpiCard label="Pending Reconciliation" value={`${pendingReconciliation} transactions`} />
        <KpiCard label="Last Reconciled" value={formatDateShort(bankAccounts[0]?.lastReconciled ?? "2026-08-01")} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="font-medium text-sm">Bank Accounts</CardTitle>
            <CardAction>
              <Link
                href="/bank-accounts"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="divide-y">
            {bankAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between py-2 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{account.name}</p>
                  <p className="text-muted-foreground text-xs">{account.bankName}</p>
                </div>
                <Money amount={account.balance} noDecimals />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="font-medium text-sm">Recent Transactions</CardTitle>
            <CardAction>
              <Link
                href="/bank-transactions"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="divide-y">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <div className="min-w-0">
                  <p className="truncate">{transaction.description}</p>
                  <p className="text-muted-foreground text-xs">
                    {transaction.bankAccountName} · {formatDateShort(transaction.date)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Money
                    amount={transaction.type === "Withdrawal" ? -transaction.amount : transaction.amount}
                    colorize
                  />
                  <StatusBadge status={transaction.status} meta={bankTransactionStatusMeta[transaction.status]} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
