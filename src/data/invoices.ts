import { generatedInvoices } from "@/data/_gen/receivables";
import type { Invoice, InvoiceStatus } from "@/types/finance";

export const invoices: Invoice[] = generatedInvoices;

export function getInvoice(id: string): Invoice | undefined {
  return invoices.find((invoice) => invoice.id === id);
}

export function getInvoicesForCustomer(customerId: string): Invoice[] {
  return invoices.filter((invoice) => invoice.customerId === customerId);
}

export const invoiceStatusOptions: InvoiceStatus[] = [
  "Draft",
  "Sent",
  "Partially Paid",
  "Paid",
  "Overdue",
  "Cancelled",
];

export const invoiceStatusMeta: Record<InvoiceStatus, { dot: string; badge: string }> = {
  Draft: { dot: "bg-muted-foreground", badge: "border-border text-muted-foreground" },
  Sent: { dot: "bg-sky-500", badge: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300" },
  "Partially Paid": {
    dot: "bg-amber-500",
    badge: "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  },
  Paid: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  },
  Overdue: { dot: "bg-rose-500", badge: "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300" },
  Cancelled: { dot: "bg-muted-foreground", badge: "border-border text-muted-foreground line-through" },
};
