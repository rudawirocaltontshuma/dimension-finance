"use client";

import { SaveDemoButton } from "@/components/finance/demo-actions";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const sequences = [
  { id: "invoice", label: "Invoices", prefix: "INV-", next: "10160" },
  { id: "bill", label: "Bills", prefix: "BILL-", next: "20260" },
  { id: "journal", label: "Journal Entries", prefix: "JE-", next: "4097" },
  { id: "credit-note", label: "Credit Notes", prefix: "CN-", next: "0928" },
  { id: "debit-note", label: "Debit Notes", prefix: "DN-", next: "0421" },
  { id: "payment", label: "Payments", prefix: "PMT-", next: "5280" },
];

export function NumberingSettingsForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
      <FieldGroup>
        {sequences.map((sequence) => (
          <Field key={sequence.id} orientation="responsive">
            <div className="min-w-40">
              <FieldLabel htmlFor={`${sequence.id}-prefix`}>{sequence.label}</FieldLabel>
              <FieldDescription>Prefix and next sequence number.</FieldDescription>
            </div>
            <div className="flex flex-1 gap-2">
              <Input id={`${sequence.id}-prefix`} defaultValue={sequence.prefix} className="w-24" />
              <Input defaultValue={sequence.next} className="flex-1" />
            </div>
          </Field>
        ))}
      </FieldGroup>
      <div className="flex justify-end gap-2">
        <SaveDemoButton />
      </div>
    </form>
  );
}
