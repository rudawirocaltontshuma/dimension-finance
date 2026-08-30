"use client";

import * as React from "react";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";

import { FinanceDataTable } from "@/components/finance/data-table";
import { ColumnVisibilityMenu, TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dataTableFeatures } from "@/lib/data-table-features";
import type { Transaction } from "@/types/finance";

import { generalLedgerColumns } from "./general-ledger-columns";

export function GeneralLedgerTable({ transactions }: { transactions: Transaction[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "date", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    search: false,
    type: false,
    costCenter: false,
  });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const accountOptions = React.useMemo(
    () => ["All Accounts", ...Array.from(new Set(transactions.map((t) => t.accountName))).sort()],
    [transactions],
  );
  const departmentOptions = React.useMemo(
    () => ["All Departments", ...Array.from(new Set(transactions.map((t) => t.department))).sort()],
    [transactions],
  );

  const table = useTable({
    features: dataTableFeatures,
    data: transactions,
    columns: generalLedgerColumns,
    state: { sorting, columnFilters, columnVisibility, pagination },
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  return (
    <Card>
      <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <CardTitle className="text-xl leading-none">General Ledger</CardTitle>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <TableSearchInput table={table} placeholder="Search description, reference…" />
          <ColumnVisibilityMenu table={table} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-wrap items-center gap-3 px-4">
          <TableFilterSelect table={table} columnId="accountName" label="Account" options={accountOptions} />
          <TableFilterSelect table={table} columnId="department" label="Department" options={departmentOptions} />
          <TableFilterSelect table={table} columnId="type" label="Type" options={["All", "Debit", "Credit"]} />
        </div>
        <div className="px-4">
          <FinanceDataTable table={table} emptyMessage="No ledger transactions match your filters." />
        </div>
      </CardContent>
    </Card>
  );
}
