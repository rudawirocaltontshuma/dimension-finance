"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { StatusBadge } from "@/components/finance/status-badge";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { CreditStatus, Customer } from "@/types/finance";

export const creditStatusMeta: Record<CreditStatus, { dot: string; badge: string }> = {
  "Good Standing": {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  },
  Watch: { dot: "bg-amber-500", badge: "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300" },
  "On Hold": { dot: "bg-rose-500", badge: "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300" },
};

export const customersColumns: ColumnDef<DataTableFeatures, Customer>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.name} ${row.id} ${row.contactName}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <Link href={`/customers/${row.original.id}`} className="font-medium text-sm hover:underline">
          {row.original.name}
        </Link>
        <p className="text-muted-foreground text-xs">{row.original.industry}</p>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Customer ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "invoiceCount",
    header: () => <div className="text-right">Invoices</div>,
    cell: ({ row }) => <div className="text-right tabular-nums">{row.original.invoiceCount}</div>,
  },
  {
    accessorKey: "outstanding",
    header: () => <div className="text-right">Outstanding</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.outstanding} />
      </div>
    ),
  },
  {
    accessorKey: "overdue",
    header: () => <div className="text-right">Overdue</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.overdue > 0 ? (
          <Money amount={row.original.overdue} className="text-rose-600 dark:text-rose-400" />
        ) : (
          "—"
        )}
      </div>
    ),
  },
  {
    accessorKey: "paid",
    header: () => <div className="text-right">Paid</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.paid} />
      </div>
    ),
  },
  {
    accessorKey: "revenue",
    header: () => <div className="text-right">Revenue</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        <Money amount={row.original.revenue} />
      </div>
    ),
  },
  {
    accessorKey: "creditStatus",
    header: "Credit Status",
    filterFn: "equalsString",
    cell: ({ row }) => (
      <StatusBadge status={row.original.creditStatus} meta={creditStatusMeta[row.original.creditStatus]} />
    ),
  },
];
