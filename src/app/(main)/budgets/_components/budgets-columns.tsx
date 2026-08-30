"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Money } from "@/components/finance/money";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { Budget, BudgetStatus } from "@/types/finance";

export const budgetStatusClass: Record<BudgetStatus, string> = {
  "On Track": "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  "At Risk": "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  "Over Budget": "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300",
  "Under Review": "border-border text-muted-foreground",
};

export const budgetsColumns: ColumnDef<DataTableFeatures, Budget>[] = [
  {
    id: "search",
    accessorFn: (row) => `${row.name} ${row.department} ${row.category}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Budget",
    cell: ({ row }) => (
      <Link href={`/budgets/${row.original.id}`} className="text-sm hover:underline">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "period", header: "Period" },
  { accessorKey: "department", header: "Department", filterFn: "equalsString" },
  {
    accessorKey: "budgetAmount",
    header: () => <div className="text-right">Budget</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.budgetAmount} noDecimals />
      </div>
    ),
  },
  {
    accessorKey: "actualAmount",
    header: () => <div className="text-right">Actual</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.actualAmount} noDecimals />
      </div>
    ),
  },
  {
    accessorKey: "variance",
    header: () => <div className="text-right">Variance</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        <Money amount={row.original.variance} colorize noDecimals />
      </div>
    ),
  },
  {
    accessorKey: "utilization",
    header: "Utilization",
    cell: ({ row }) => (
      <div className="flex w-28 items-center gap-2">
        <Progress value={Math.min(100, row.original.utilization)} className="h-1.5" />
        <span className="text-muted-foreground text-xs tabular-nums">{row.original.utilization}%</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equalsString",
    cell: ({ row }) => (
      <Badge variant="outline" className={budgetStatusClass[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
];
