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
import { invoiceFormFields } from "@/components/finance/entity-form/entity-configs";
import { NewRecordDialog } from "@/components/finance/entity-form/new-record-dialog";
import { TableFilterSelect, TableSearchInput } from "@/components/finance/table-controls";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { invoiceStatusOptions } from "@/data/invoices";
import { dataTableFeatures } from "@/lib/data-table-features";
import type { Invoice } from "@/types/finance";

import { invoicesColumns } from "./invoices-columns";

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "issueDate", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 20 });

  const table = useTable({
    features: dataTableFeatures,
    data: invoices,
    columns: invoicesColumns,
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
        <CardTitle className="text-xl leading-none">Invoices</CardTitle>
        <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
          <TableSearchInput table={table} placeholder="Search invoices…" />
          <ExportPreviewButton />
          <NewRecordDialog
            title="New Invoice"
            description="Draft a demo invoice. Nothing is sent or saved to a real database."
            fields={invoiceFormFields}
            trigger={
              <Button size="sm">
                <Plus /> New Invoice
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
            options={["All", ...invoiceStatusOptions]}
          />
        </div>
        <div className="px-4">
          <FinanceDataTable table={table} emptyMessage="No invoices match your filters." />
        </div>
      </CardContent>
    </Card>
  );
}
