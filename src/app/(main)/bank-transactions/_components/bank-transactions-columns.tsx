"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { StatusBadge } from "@/components/finance/status-badge";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { BankTransaction, BankTransactionStatus } from "@/types/finance";

export const bankTransactionStatusMeta: Record<BankTransactionStatus, { dot: string; badge: string }> = {
  Unmatched: {
    dot: "bg-amber-500",
    badge: "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  },
  Matched: { dot: "bg-sky-500", badge: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300" },
  Reconciled: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  },
  Excluded: { dot: "bg-muted-foreground", badge: "border-border text-muted-foreground" },
};

export const bankTransactionsColumns: ColumnDef<DataTableFeatures, BankTransaction>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.description} ${row.reference}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.date)}</span>,
  },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.reference}</span>,
  },
  { accessorKey: "bankAccountName", header: "Account", filterFn: "equalsString" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        <Money amount={row.original.type === "Withdrawal" ? -row.original.amount : row.original.amount} colorize />
      </div>
    ),
  },
  { accessorKey: "type", header: "Type", filterFn: "equalsString" },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equalsString",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} meta={bankTransactionStatusMeta[row.original.status]} />
    ),
  },
];
