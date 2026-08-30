"use client";

import type { ReactTable } from "@tanstack/react-table";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DataTableFeatures } from "@/lib/data-table-features";

interface TableSearchInputProps<TRow extends Record<string, unknown>> {
  table: ReactTable<DataTableFeatures, TRow>;
  columnId?: string;
  placeholder?: string;
  className?: string;
}

export function TableSearchInput<TRow extends Record<string, unknown>>({
  table,
  columnId = "search",
  placeholder = "Search…",
  className,
}: TableSearchInputProps<TRow>) {
  const value = (table.getColumn(columnId)?.getFilterValue() as string | undefined) ?? "";

  return (
    <InputGroup className={className ?? "h-8 w-full sm:w-64"}>
      <InputGroupAddon align="inline-start">
        <Search className="size-3.5" />
      </InputGroupAddon>
      <InputGroupInput
        className="h-8"
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          table.getColumn(columnId)?.setFilterValue(event.target.value || undefined);
          table.setPageIndex(0);
        }}
      />
    </InputGroup>
  );
}

interface TableFilterSelectProps<TRow extends Record<string, unknown>> {
  table: ReactTable<DataTableFeatures, TRow>;
  columnId: string;
  label: string;
  options: readonly string[];
}

export function TableFilterSelect<TRow extends Record<string, unknown>>({
  table,
  columnId,
  label,
  options,
}: TableFilterSelectProps<TRow>) {
  const value = (table.getColumn(columnId)?.getFilterValue() as string | undefined) ?? options[0];

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        table.getColumn(columnId)?.setFilterValue(next === options[0] ? undefined : next);
        table.setPageIndex(0);
      }}
    >
      <SelectTrigger size="sm">
        <span className="text-muted-foreground">{label}:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" align="start">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function ColumnVisibilityMenu<TRow extends Record<string, unknown>>({
  table,
}: {
  table: ReactTable<DataTableFeatures, TRow>;
}) {
  const columns = table.getAllColumns().filter((column) => column.getCanHide());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-muted-foreground text-xs">Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
            onSelect={(event) => event.preventDefault()}
            className="capitalize"
          >
            {String(column.columnDef.header ?? column.id).replace(/_/g, " ")}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
