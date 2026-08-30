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
import { budgetFormFields } from "@/components/finance/entity-form/entity-configs";
import { NewRecordDialog } from "@/components/finance/entity-form/new-record-dialog";
import { TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { departments } from "@/data/costCenters";
import { dataTableFeatures } from "@/lib/data-table-features";
import type { Budget } from "@/types/finance";

import { budgetsColumns } from "./budgets-columns";

export function BudgetsTable({ budgets }: { budgets: Budget[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "budgetAmount", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const table = useTable({
    features: dataTableFeatures,
    data: budgets,
    columns: budgetsColumns,
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
        <CardTitle className="text-xl leading-none">Budgets</CardTitle>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <TableSearchInput table={table} placeholder="Search budgets…" />
          <ExportPreviewButton />
          <NewRecordDialog
            title="New Budget"
            description="Create a demo budget line. Nothing is saved to a real database."
            fields={budgetFormFields}
            trigger={
              <Button size="sm">
                <Plus /> New Budget
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-wrap items-center gap-3 px-4">
          <TableFilterSelect
            table={table}
            columnId="department"
            label="Department"
            options={["All Departments", ...departments]}
          />
          <TableFilterSelect
            table={table}
            columnId="status"
            label="Status"
            options={["All", "On Track", "At Risk", "Over Budget", "Under Review"]}
          />
        </div>
        <div className="px-4">
          <FinanceDataTable table={table} emptyMessage="No budgets match your filters." />
        </div>
      </CardContent>
    </Card>
  );
}
