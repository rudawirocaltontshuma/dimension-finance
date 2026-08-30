"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { StatusBadge } from "@/components/finance/status-badge";
import { expenseStatusMeta } from "@/data/expenses";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { Expense } from "@/types/finance";

export const expensesColumns: ColumnDef<DataTableFeatures, Expense>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.employeeName} ${row.category}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: "Expense",
    cell: ({ row }) => (
      <Link href={`/expenses/${row.original.id}`} className="whitespace-nowrap font-mono text-xs hover:underline">
        {row.original.id}
      </Link>
    ),
  },
  { accessorKey: "employeeName", header: "Employee" },
  { accessorKey: "category", header: "Category", filterFn: "equalsString" },
  { accessorKey: "department", header: "Department", filterFn: "equalsString" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.date)}</span>,
  },
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
    cell: ({ row }) => <StatusBadge status={row.original.status} meta={expenseStatusMeta[row.original.status]} />,
  },
];
