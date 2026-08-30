"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { Transaction } from "@/types/finance";

export const generalLedgerColumns: ColumnDef<DataTableFeatures, Transaction>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.description} ${row.reference} ${row.accountName} ${row.accountCode}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "date",
    header: "Date",
    filterFn: "equalsString",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.date)}</span>,
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <Link
        href={`/journal-entries/${row.original.journalId}`}
        className="whitespace-nowrap font-mono text-xs hover:underline"
      >
        {row.original.reference}
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span className="block max-w-64 truncate">{row.original.description}</span>,
  },
  {
    accessorKey: "accountName",
    header: "Account",
    filterFn: "equalsString",
    cell: ({ row }) => (
      <Link href={`/accounts/${row.original.accountCode}`} className="whitespace-nowrap text-xs hover:underline">
        {row.original.accountCode} · {row.original.accountName}
      </Link>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: "equalsString",
    enableHiding: true,
  },
  {
    accessorKey: "debit",
    header: () => <div className="text-right">Debit</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.debit > 0 ? <Money amount={row.original.debit} /> : "—"}
      </div>
    ),
  },
  {
    accessorKey: "credit",
    header: () => <div className="text-right">Credit</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.credit > 0 ? <Money amount={row.original.credit} /> : "—"}
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
    accessorKey: "department",
    header: "Department",
    filterFn: "equalsString",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{row.original.department}</span>,
  },
  {
    accessorKey: "costCenter",
    header: "Cost Center",
    enableHiding: true,
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{row.original.costCenter}</span>,
  },
];
