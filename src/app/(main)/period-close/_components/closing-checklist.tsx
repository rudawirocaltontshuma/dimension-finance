"use client";

import * as React from "react";

import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const initialItems = [
  { id: "1", label: "Bank reconciliations complete for all accounts", done: true },
  { id: "2", label: "Accounts receivable subledger reconciled to GL", done: true },
  { id: "3", label: "Accounts payable subledger reconciled to GL", done: true },
  { id: "4", label: "Fixed asset register and depreciation reviewed", done: true },
  { id: "5", label: "Payroll journal posted and reviewed", done: true },
  { id: "6", label: "Prepayments and accruals reviewed", done: false },
  { id: "7", label: "Intercompany balances eliminated", done: false },
  { id: "8", label: "Trial balance reviewed and confirmed balanced", done: true },
  { id: "9", label: "Financial statements drafted for review", done: false },
  { id: "10", label: "Period locked and reports distributed", done: false },
];

export function ClosingChecklist() {
  const [items, setItems] = React.useState(initialItems);
  const completed = items.filter((item) => item.done).length;
  const progress = Math.round((completed / items.length) * 100);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
    toast("Checklist item updated (demo only — nothing was persisted).");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium text-base">August 2026 Closing Checklist</CardTitle>
        <div className="flex items-center gap-3 pt-1">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-muted-foreground text-xs tabular-nums">{progress}% complete</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item) => (
          <label
            key={item.id}
            htmlFor={`close-item-${item.id}`}
            className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-muted/50"
          >
            <Checkbox id={`close-item-${item.id}`} checked={item.done} onCheckedChange={() => toggle(item.id)} />
            <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
