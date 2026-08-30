import { notFound } from "next/navigation";

import { Receipt } from "lucide-react";

import { ActivityTimeline } from "@/components/finance/activity-timeline";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { expenseStatusMeta, getExpense } from "@/data/expenses";
import { formatDate } from "@/lib/finance/format";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expense = getExpense(id);
  return { title: expense ? `${expense.id} | Financial Management System` : "Expense | Financial Management System" };
}

export default async function ExpenseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expense = getExpense(id);
  if (!expense) notFound();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={expense.id}
        description={expense.description}
        breadcrumbs={[{ label: "Expenses", href: "/expenses" }, { label: expense.id }]}
        actions={
          <>
            <StatusBadge status={expense.status} meta={expenseStatusMeta[expense.status]} />
            <ExportPreviewButton />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Employee</p>
            <p className="font-medium text-sm">{expense.employeeName}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Category</p>
            <p className="font-medium text-sm">{expense.category}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Department</p>
            <p className="font-medium text-sm">{expense.department}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Amount</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={expense.amount} />
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Receipt</p>
            <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-muted/30 text-muted-foreground">
              <Receipt className="size-8" />
              <p className="text-xs">Receipt preview (demo placeholder)</p>
              <p className="px-6 text-center text-xs">{expense.description}</p>
              <p className="font-medium text-sm">
                <Money amount={expense.amount} />
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Approval Timeline</p>
            <ActivityTimeline
              items={expense.timeline.map((t) => ({
                id: t.id,
                label: t.label,
                actor: t.actor,
                date: t.date,
                note: t.note,
              }))}
            />
            <div className="mt-4 border-t pt-4 text-muted-foreground text-xs">
              <p>
                Submitted {formatDate(expense.submittedDate)} · Approver {expense.approver}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
