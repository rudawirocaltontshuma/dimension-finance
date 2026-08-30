import { generatedBills } from "@/data/_gen/payables";
import type { Bill, BillStatus } from "@/types/finance";

export const bills: Bill[] = generatedBills;

export function getBill(id: string): Bill | undefined {
  return bills.find((bill) => bill.id === id);
}

export function getBillsForSupplier(supplierId: string): Bill[] {
  return bills.filter((bill) => bill.supplierId === supplierId);
}

export const billStatusOptions: BillStatus[] = ["Draft", "Approved", "Partially Paid", "Paid", "Overdue", "Disputed"];

export const billStatusMeta: Record<BillStatus, { dot: string; badge: string }> = {
  Draft: { dot: "bg-muted-foreground", badge: "border-border text-muted-foreground" },
  Approved: { dot: "bg-sky-500", badge: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300" },
  "Partially Paid": {
    dot: "bg-amber-500",
    badge: "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  },
  Paid: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  },
  Overdue: { dot: "bg-rose-500", badge: "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300" },
  Disputed: {
    dot: "bg-orange-500",
    badge: "border-orange-200 text-orange-700 dark:border-orange-500/30 dark:text-orange-300",
  },
};
