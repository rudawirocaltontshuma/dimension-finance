import { generatedExpenses } from "@/data/_gen/expenses";
import type { Expense, ExpenseStatus } from "@/types/finance";

export const expenses: Expense[] = generatedExpenses;

export function getExpense(id: string): Expense | undefined {
  return expenses.find((expense) => expense.id === id);
}

export const expenseStatusOptions: ExpenseStatus[] = ["Draft", "Submitted", "Approved", "Rejected", "Reimbursed"];

export const expenseStatusMeta: Record<ExpenseStatus, { dot: string; badge: string }> = {
  Draft: { dot: "bg-muted-foreground", badge: "border-border text-muted-foreground" },
  Submitted: { dot: "bg-sky-500", badge: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300" },
  Approved: {
    dot: "bg-blue-500",
    badge: "border-blue-200 text-blue-700 dark:border-blue-500/30 dark:text-blue-300",
  },
  Rejected: { dot: "bg-rose-500", badge: "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300" },
  Reimbursed: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  },
};
