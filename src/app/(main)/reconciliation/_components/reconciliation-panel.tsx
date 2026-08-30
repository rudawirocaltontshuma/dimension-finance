"use client";

import * as React from "react";

import { CheckCircle2, Link2 } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/finance/empty-state";
import { Money } from "@/components/finance/money";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateShort, formatMoney } from "@/lib/finance/format";
import type { BankAccount, BankTransaction } from "@/types/finance";

function AccountReconciliation({ account, transactions }: { account: BankAccount; transactions: BankTransaction[] }) {
  const [items, setItems] = React.useState(transactions);

  const unmatched = items.filter((t) => t.status === "Unmatched");
  const matched = items.filter((t) => t.status === "Matched" || t.status === "Reconciled");

  const unmatchedDelta = unmatched.reduce((sum, t) => sum + (t.type === "Deposit" ? t.amount : -t.amount), 0);
  const bookBalance = account.balance - unmatchedDelta;
  const difference = account.balance - bookBalance;

  const matchTransaction = (id: string) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Matched" } : t)));
    toast("Transaction matched (demo only — nothing was persisted).");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Statement Balance</p>
            <p className="font-semibold text-sm tabular-nums">
              {formatMoney(account.balance, "ZAR", { noDecimals: true })}
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Book Balance</p>
            <p className="font-semibold text-sm tabular-nums">
              {formatMoney(bookBalance, "ZAR", { noDecimals: true })}
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Difference</p>
            <p className="font-semibold text-sm tabular-nums">{formatMoney(difference, "ZAR", { noDecimals: true })}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-sm">Unmatched Transactions ({unmatched.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {unmatched.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title="No unmatched transactions"
                description="Everything is reconciled."
              />
            ) : (
              <div className="divide-y">
                {unmatched.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                    <div className="min-w-0">
                      <p className="truncate">{transaction.description}</p>
                      <p className="text-muted-foreground text-xs">
                        {formatDateShort(transaction.date)} · {transaction.reference}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Money
                        amount={transaction.type === "Withdrawal" ? -transaction.amount : transaction.amount}
                        colorize
                      />
                      <Button size="sm" variant="outline" onClick={() => matchTransaction(transaction.id)}>
                        <Link2 /> Match
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-sm">Matched Transactions ({matched.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {matched.slice(0, 12).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <div className="min-w-0">
                    <p className="truncate">{transaction.description}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatDateShort(transaction.date)} · matched to {transaction.matchedTo ?? "ledger entry"}
                    </p>
                  </div>
                  <Money
                    amount={transaction.type === "Withdrawal" ? -transaction.amount : transaction.amount}
                    colorize
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ReconciliationPanel({
  accounts,
  transactionsByAccount,
}: {
  accounts: BankAccount[];
  transactionsByAccount: Record<string, BankTransaction[]>;
}) {
  return (
    <Tabs defaultValue={accounts[0]?.id}>
      <TabsList variant="line">
        {accounts.map((account) => (
          <TabsTrigger key={account.id} value={account.id}>
            {account.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {accounts.map((account) => (
        <TabsContent key={account.id} value={account.id} className="pt-4">
          <AccountReconciliation account={account} transactions={transactionsByAccount[account.id] ?? []} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
