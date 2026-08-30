"use client";

import * as React from "react";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { FinanceDataTable } from "@/components/finance/data-table";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { expenseFormFields } from "@/components/finance/entity-form/entity-configs";
import { NewRecordDialog } from "@/components/finance/entity-form/new-record-dialog";
import { ColumnVisibilityMenu, TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { expenseCategoryNames } from "@/data/_gen/expenses";
import { departments } from "@/data/costCenters";
import { expenseStatusOptions } from "@/data/expenses";
import { dataTableFeatures } from "@/lib/data-table-features";
import type { Expense } from "@/types/finance";

import { expensesColumns } from "./expenses-columns";

export function ExpensesTable({ expenses }: { expenses: Expense[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "date", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const table = useTable({
    features: dataTableFeatures,
    data: expenses,
    columns: expensesColumns,
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
        <CardTitle className="text-xl leading-none">Expenses</CardTitle>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <TableSearchInput table={table} placeholder="Search expenses…" />
          <ColumnVisibilityMenu table={table} />
          <ExportPreviewButton />
          <NewRecordDialog
            title="New Expense"
            description="Log a demo expense claim. Nothing is saved to a real database."
            fields={expenseFormFields}
            trigger={
              <Button size="sm">
                <Plus /> New Expense
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-wrap items-center gap-3 px-4">
          <TableFilterSelect
            table={table}
            columnId="status"
            label="Status"
            options={["All", ...expenseStatusOptions]}
          />
          <TableFilterSelect
            table={table}
            columnId="category"
            label="Category"
            options={["All", ...expenseCategoryNames]}
          />
          <TableFilterSelect table={table} columnId="department" label="Department" options={["All", ...departments]} />
        </div>
        <div className="px-4">
          <FinanceDataTable table={table} emptyMessage="No expenses match your filters." />
        </div>
      </CardContent>
    </Card>
  );
}
