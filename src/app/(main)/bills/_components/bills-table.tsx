"use client";

import * as React from "react";

import { type ColumnFiltersState, type PaginationState, type SortingState, useTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { FinanceDataTable } from "@/components/finance/data-table";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { billFormFields } from "@/components/finance/entity-form/entity-configs";
import { NewRecordDialog } from "@/components/finance/entity-form/new-record-dialog";
import { TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { billStatusOptions } from "@/data/bills";
import { dataTableFeatures } from "@/lib/data-table-features";
import type { Bill } from "@/types/finance";

import { billsColumns } from "./bills-columns";

export function BillsTable({ bills }: { bills: Bill[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "issueDate", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const table = useTable({
    features: dataTableFeatures,
    data: bills,
    columns: billsColumns,
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
        <CardTitle className="text-xl leading-none">Bills</CardTitle>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <TableSearchInput table={table} placeholder="Search bills…" />
          <ExportPreviewButton />
          <NewRecordDialog
            title="New Bill"
            description="Capture a demo supplier bill. Nothing is saved to a real database."
            fields={billFormFields}
            trigger={
              <Button size="sm">
                <Plus /> New Bill
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-wrap items-center gap-3 px-4">
          <TableFilterSelect table={table} columnId="status" label="Status" options={["All", ...billStatusOptions]} />
        </div>
        <div className="px-4">
          <FinanceDataTable table={table} emptyMessage="No bills match your filters." />
        </div>
      </CardContent>
    </Card>
  );
}
