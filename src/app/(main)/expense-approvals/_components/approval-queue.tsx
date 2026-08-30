"use client";

import * as React from "react";

import Link from "next/link";

import { CheckCircle2, MessageCircleQuestion, XCircle } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/finance/empty-state";
import { Money } from "@/components/finance/money";
import { StatusBadge } from "@/components/finance/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { expenseStatusMeta } from "@/data/expenses";
import { formatDateShort } from "@/lib/finance/format";
import type { Expense } from "@/types/finance";

export function ApprovalQueue({ expenses }: { expenses: Expense[] }) {
  const [items, setItems] = React.useState(() =>
    expenses.filter((expense) => expense.status === "Submitted").map((expense) => ({ ...expense })),
  );

  const resolveExpense = (id: string, message: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast(message);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium text-base">Approval Queue ({items.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <EmptyState icon={CheckCircle2} title="No expenses awaiting approval" description="You're all caught up." />
        ) : (
          <div className="divide-y">
            {items.map((expense) => (
              <div key={expense.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/expenses/${expense.id}`} className="font-medium text-sm hover:underline">
                      {expense.employeeName}
                    </Link>
                    <StatusBadge status={expense.status} meta={expenseStatusMeta[expense.status]} />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {expense.category} · Submitted {formatDateShort(expense.submittedDate)} · Approver{" "}
                    {expense.approver}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm tabular-nums">
                    <Money amount={expense.amount} />
                  </span>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resolveExpense(expense.id, `${expense.id} approved (demo only).`)}
                    >
                      <CheckCircle2 className="text-emerald-600" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resolveExpense(expense.id, `${expense.id} rejected (demo only).`)}
                    >
                      <XCircle className="text-rose-600" /> Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast(`Requested review for ${expense.id} (demo only).`)}
                    >
                      <MessageCircleQuestion /> Review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
