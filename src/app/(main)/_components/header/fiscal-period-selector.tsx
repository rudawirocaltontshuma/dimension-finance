"use client";

import { CalendarRange } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fiscalPeriods } from "@/data/fiscal-periods";
import { useWorkspace } from "@/stores/workspace/workspace-context";

const years = fiscalPeriods.filter((p) => p.kind === "year");
const quarters = fiscalPeriods.filter((p) => p.kind === "quarter");
const months = fiscalPeriods.filter((p) => p.kind === "month");

export function FiscalPeriodSelector() {
  const { fiscalPeriodId, setFiscalPeriodId } = useWorkspace();

  return (
    <Select value={fiscalPeriodId} onValueChange={setFiscalPeriodId}>
      <SelectTrigger size="sm" className="w-auto gap-1.5 border-none shadow-none hover:bg-accent">
        <CalendarRange className="size-3.5 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel>Fiscal Year</SelectLabel>
          {years.map((period) => (
            <SelectItem key={period.id} value={period.id}>
              {period.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Quarters</SelectLabel>
          {quarters.map((period) => (
            <SelectItem key={period.id} value={period.id}>
              {period.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          {months.map((period) => (
            <SelectItem key={period.id} value={period.id}>
              {period.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
