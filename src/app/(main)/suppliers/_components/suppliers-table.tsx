"use client";

import * as React from "react";

import { type ColumnFiltersState, type PaginationState, type SortingState, useTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { FinanceDataTable } from "@/components/finance/data-table";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { supplierFormFields } from "@/components/finance/entity-form/entity-configs";
import { NewRecordDialog } from "@/components/finance/entity-form/new-record-dialog";
import { TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supplierFilterOptions } from "@/data/suppliers";
import { dataTableFeatures } from "@/lib/data-table-features";
import type { Supplier } from "@/types/finance";

import { suppliersColumns } from "./suppliers-columns";

export function SuppliersTable({ suppliers }: { suppliers: Supplier[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "spend", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const table = useTable({
    features: dataTableFeatures,
    data: suppliers,
    columns: suppliersColumns,
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
        <CardTitle className="text-xl leading-none">Suppliers</CardTitle>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <TableSearchInput table={table} placeholder="Search suppliers…" />
          <ExportPreviewButton />
          <NewRecordDialog
            title="New Supplier"
            description="Create a demo supplier record. Nothing is saved to a real database."
            fields={supplierFormFields}
            trigger={
              <Button size="sm">
                <Plus /> New Supplier
              </Button>
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-wrap items-center gap-3 px-4">
          <TableFilterSelect
            table={table}
            columnId="paymentStatus"
            label="Status"
            options={supplierFilterOptions.paymentStatus}
          />
        </div>
        <div className="px-4">
          <FinanceDataTable table={table} emptyMessage="No suppliers match your filters." />
        </div>
      </CardContent>
    </Card>
  );
}
