"use client";

import * as React from "react";

import Link from "next/link";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";

import { FinanceDataTable } from "@/components/finance/data-table";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { dataTableFeatures } from "@/lib/data-table-features";
import { formatDateShort } from "@/lib/finance/format";
import type { PayablePayment } from "@/types/finance";

function statusClass(status: PayablePayment["status"]) {
  if (status === "Completed")
    return "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300";
  if (status === "Pending") return "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300";
  return "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300";
}

export function PayablePaymentsTable({ payments }: { payments: PayablePayment[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "date", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const columns = React.useMemo<ColumnDef<DataTableFeatures, PayablePayment>[]>(
    () => [
      {
        id: "search",
        accessorFn: (row) => `${row.id} ${row.supplierName} ${row.billId}`,
        filterFn: "includesString",
        enableHiding: true,
      },
      {
        accessorKey: "id",
        header: "Payment ID",
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
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
        accessorKey: "billId",
        header: "Bill",
        cell: ({ row }) => (
          <Link href={`/bills/${row.original.billId}`} className="font-mono text-xs hover:underline">
            {row.original.billId}
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
          <Badge variant="outline" className={statusClass(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
    ],
    [],
  );

  const table = useTable({
    features: dataTableFeatures,
    data: payments,
    columns,
    state: { sorting, columnFilters, pagination },
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <Card>
      <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <CardTitle className="text-xl leading-none">Payments Made</CardTitle>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <TableSearchInput table={table} placeholder="Search payments…" />
          <ExportPreviewButton />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-wrap items-center gap-3 px-4">
          <TableFilterSelect
            table={table}
            columnId="method"
            label="Method"
            options={["All", "Bank Transfer", "Card", "Cash", "Electronic Transfer"]}
          />
          <TableFilterSelect
            table={table}
            columnId="status"
            label="Status"
            options={["All", "Completed", "Pending", "Failed"]}
          />
        </div>
        <div className="px-4">
          <FinanceDataTable table={table} emptyMessage="No payments match your filters." />
        </div>
      </CardContent>
    </Card>
  );
}
