"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { StatusBadge } from "@/components/finance/status-badge";
import { billStatusMeta } from "@/data/bills";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { Bill } from "@/types/finance";

export const billsColumns: ColumnDef<DataTableFeatures, Bill>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.supplierName}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: "Bill",
    cell: ({ row }) => (
      <Link href={`/bills/${row.original.id}`} className="whitespace-nowrap font-mono text-xs hover:underline">
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "supplierName",
    header: "Supplier",
    cell: ({ row }) => (
      <Link href={`/suppliers/${row.original.supplierId}`} className="text-sm hover:underline">
        {row.original.supplierName}
      </Link>
    ),
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.issueDate)}</span>,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.dueDate)}</span>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.amount} />
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
    accessorKey: "balance",
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        <Money amount={row.original.balance} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equalsString",
    cell: ({ row }) => <StatusBadge status={row.original.status} meta={billStatusMeta[row.original.status]} />,
  },
];
