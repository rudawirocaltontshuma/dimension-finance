"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { StatusBadge } from "@/components/finance/status-badge";
import { journalEntryStatusMeta } from "@/data/journalEntries";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { JournalEntry } from "@/types/finance";

export const journalEntriesColumns: ColumnDef<DataTableFeatures, JournalEntry>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.description} ${row.reference} ${row.createdBy}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: "Journal ID",
    cell: ({ row }) => (
      <Link
        href={`/journal-entries/${row.original.id}`}
        className="whitespace-nowrap font-mono text-xs hover:underline"
      >
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.date)}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span className="block max-w-64 truncate">{row.original.description}</span>,
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => <span className="whitespace-nowrap font-mono text-xs">{row.original.reference}</span>,
  },
  {
    accessorKey: "totalDebit",
    header: () => <div className="text-right">Debit</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.totalDebit} />
      </div>
    ),
  },
  {
    accessorKey: "totalCredit",
    header: () => <div className="text-right">Credit</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.totalCredit} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equalsString",
    cell: ({ row }) => <StatusBadge status={row.original.status} meta={journalEntryStatusMeta[row.original.status]} />,
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{row.original.createdBy}</span>,
  },
];
