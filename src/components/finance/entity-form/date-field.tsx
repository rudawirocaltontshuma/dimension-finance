"use client";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDateShort } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

interface DateFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
}

export function DateField({ id, value, onChange, placeholder = "Pick a date", invalid }: DateFieldProps) {
  const selected = value ? new Date(`${value}T00:00:00.000Z`) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          aria-invalid={invalid}
          className="w-full justify-start font-normal"
        >
          <CalendarIcon className="size-3.5 text-muted-foreground" />
          <span className={cn(!selected && "text-muted-foreground")}>
            {selected ? formatDateShort(value) : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => date && onChange(date.toISOString().slice(0, 10))}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
