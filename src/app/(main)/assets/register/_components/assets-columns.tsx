"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { StatusBadge } from "@/components/finance/status-badge";
import { assetStatusMeta } from "@/data/assets";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { FixedAsset } from "@/types/finance";

export const assetsColumns: ColumnDef<DataTableFeatures, FixedAsset>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.name} ${row.category}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: "Asset ID",
    cell: ({ row }) => (
      <Link href={`/assets/${row.original.id}`} className="whitespace-nowrap font-mono text-xs hover:underline">
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: "Asset",
    cell: ({ row }) => (
      <Link href={`/assets/${row.original.id}`} className="text-sm hover:underline">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "category", header: "Category", filterFn: "equalsString" },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
    cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.purchaseDate)}</span>,
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.cost} noDecimals />
      </div>
    ),
  },
  {
    accessorKey: "accumulatedDepreciation",
    header: () => <div className="text-right">Depreciation</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.accumulatedDepreciation} noDecimals />
      </div>
    ),
  },
  {
    accessorKey: "netBookValue",
    header: () => <div className="text-right">Net Book Value</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        <Money amount={row.original.netBookValue} noDecimals />
      </div>
    ),
  },
  { accessorKey: "location", header: "Location" },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equalsString",
    cell: ({ row }) => <StatusBadge status={row.original.status} meta={assetStatusMeta[row.original.status]} />,
  },
];
