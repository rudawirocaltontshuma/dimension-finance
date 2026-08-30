"use client";

import * as React from "react";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";

import { FinanceDataTable } from "@/components/finance/data-table";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { DetailDrawer } from "@/components/finance/detail-drawer";
import { Money } from "@/components/finance/money";
import { TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { dataTableFeatures } from "@/lib/data-table-features";
import { formatDate, formatDateShort } from "@/lib/finance/format";
import type { DebitNote } from "@/types/finance";

function statusBadgeClass(status: DebitNote["status"]) {
  if (status === "Applied")
    return "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300";
  if (status === "Issued") return "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300";
  return "border-border text-muted-foreground";
}

export function DebitNotesTable({ debitNotes }: { debitNotes: DebitNote[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "date", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });
  const [selected, setSelected] = React.useState<DebitNote | null>(null);

  const columns = React.useMemo<ColumnDef<DataTableFeatures, DebitNote>[]>(
    () => [
      {
        id: "search",
        accessorFn: (row) => `${row.id} ${row.supplierName}`,
        filterFn: "includesString",
        enableHiding: true,
      },
      {
        accessorKey: "id",
        header: "Debit Note",
        cell: ({ row }) => (
          <button type="button" onClick={() => setSelected(row.original)} className="font-mono text-xs hover:underline">
            {row.original.id}
          </button>
        ),
      },
      { accessorKey: "supplierName", header: "Supplier" },
      {
        accessorKey: "billId",
        header: "Bill",
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.billId}</span>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span className="whitespace-nowrap text-xs">{formatDateShort(row.original.date)}</span>,
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
      { accessorKey: "reason", header: "Reason" },
      {
        accessorKey: "status",
        header: "Status",
        filterFn: "equalsString",
        cell: ({ row }) => (
          <Badge variant="outline" className={statusBadgeClass(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
    ],
    [],
  );

  const table = useTable({
    features: dataTableFeatures,
    data: debitNotes,
    columns,
    state: { sorting, columnFilters, columnVisibility, pagination },
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  return (
    <>
      <Card>
        <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
          <CardTitle className="text-xl leading-none">Debit Notes</CardTitle>
          <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
            <TableSearchInput table={table} placeholder="Search debit notes…" />
            <ExportPreviewButton />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="flex flex-wrap items-center gap-3 px-4">
            <TableFilterSelect
              table={table}
              columnId="status"
              label="Status"
              options={["All", "Draft", "Issued", "Applied"]}
            />
          </div>
          <div className="px-4">
            <FinanceDataTable table={table} emptyMessage="No debit notes match your filters." />
          </div>
        </CardContent>
      </Card>

      <DetailDrawer
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        title={selected?.id ?? ""}
        description={selected ? `Issued by ${selected.supplierName}` : undefined}
      >
        {selected && (
          <div className="space-y-4 py-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground text-xs">Bill</p>
                <p className="font-medium">{selected.billId}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Date</p>
                <p className="font-medium">{formatDate(selected.date)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Amount</p>
                <p className="font-medium">
                  <Money amount={selected.amount} />
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Status</p>
                <Badge variant="outline" className={statusBadgeClass(selected.status)}>
                  {selected.status}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Reason</p>
              <p className="font-medium">{selected.reason}</p>
            </div>
          </div>
        )}
      </DetailDrawer>
    </>
  );
}
