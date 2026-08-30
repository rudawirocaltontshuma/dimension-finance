"use client";

import * as React from "react";

import { SaveDemoButton } from "@/components/finance/demo-actions";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

const preferences = [
  {
    id: "overdue-invoices",
    label: "Overdue invoices",
    description: "Notify when a customer invoice becomes overdue.",
    defaultChecked: true,
  },
  {
    id: "bill-due",
    label: "Bills due soon",
    description: "Notify when a supplier bill is due within 3 days.",
    defaultChecked: true,
  },
  {
    id: "budget-variance",
    label: "Budget variance",
    description: "Notify when a department exceeds its budget threshold.",
    defaultChecked: true,
  },
  {
    id: "reconciliation",
    label: "Unmatched bank transactions",
    description: "Notify when new unmatched transactions appear.",
    defaultChecked: true,
  },
  {
    id: "period-close",
    label: "Period close progress",
    description: "Notify on monthly closing checklist updates.",
    defaultChecked: false,
  },
  {
    id: "expense-approvals",
    label: "Expense approvals",
    description: "Notify when expenses are awaiting your approval.",
    defaultChecked: true,
  },
];

export function NotificationSettingsForm() {
  const [values, setValues] = React.useState(() =>
    Object.fromEntries(preferences.map((p) => [p.id, p.defaultChecked])),
  );

  return (
    <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
      <FieldGroup>
        {preferences.map((pref) => (
          <Field key={pref.id} orientation="horizontal">
            <div className="flex-1">
              <FieldLabel htmlFor={pref.id}>{pref.label}</FieldLabel>
              <FieldDescription>{pref.description}</FieldDescription>
            </div>
            <Switch
              id={pref.id}
              checked={values[pref.id]}
              onCheckedChange={(checked) => setValues((prev) => ({ ...prev, [pref.id]: checked }))}
            />
          </Field>
        ))}
      </FieldGroup>
      <div className="flex justify-end gap-2">
        <SaveDemoButton />
      </div>
    </form>
  );
}
