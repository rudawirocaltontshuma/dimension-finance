"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { Badge } from "@/components/ui/badge";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { ReceivablePayment } from "@/types/finance";

const paymentStatusBadgeClass: Record<ReceivablePayment["status"], string> = {
  Completed: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  Pending: "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  Failed: "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300",
};

export const paymentsColumns: ColumnDef<DataTableFeatures, ReceivablePayment>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.customerName} ${row.invoiceId}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: "Payment ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <Link href={`/customers/${row.original.customerId}`} className="text-sm hover:underline">
        {row.original.customerName}
      </Link>
    ),
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice",
    cell: ({ row }) => (
      <Link href={`/invoices/${row.original.invoiceId}`} className="font-mono text-xs hover:underline">
        {row.original.invoiceId}
      </Link>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.date)}</span>,
  },
  { accessorKey: "method", header: "Method", filterFn: "equalsString" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        <Money amount={row.original.amount} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equalsString",
    cell: ({ row }) => (
      <Badge variant="outline" className={paymentStatusBadgeClass[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
];
