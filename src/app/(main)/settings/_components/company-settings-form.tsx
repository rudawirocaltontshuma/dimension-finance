"use client";

import { SaveDemoButton } from "@/components/finance/demo-actions";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { companies } from "@/data/companies";

export function CompanySettingsForm() {
  const company = companies[0];

  return (
    <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="company-name">
            Company Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="company-name" defaultValue={company.name} />
        </Field>
        <Field>
          <FieldLabel htmlFor="legal-name">Legal Name</FieldLabel>
          <Input id="legal-name" defaultValue={company.legalName} />
        </Field>
        <Field>
          <FieldLabel htmlFor="reg-number">Registration Number</FieldLabel>
          <Input id="reg-number" defaultValue={company.registrationNumber} />
        </Field>
        <Field>
          <FieldLabel htmlFor="industry">Industry</FieldLabel>
          <Input id="industry" defaultValue={company.industry} />
        </Field>
        <Field>
          <FieldLabel htmlFor="base-currency">Base Currency</FieldLabel>
          <Select defaultValue={company.baseCurrency}>
            <SelectTrigger id="base-currency" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ZAR">ZAR — South African Rand</SelectItem>
                <SelectItem value="USD">USD — US Dollar</SelectItem>
                <SelectItem value="EUR">EUR — Euro</SelectItem>
                <SelectItem value="GBP">GBP — British Pound</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="address">Registered Address</FieldLabel>
          <FieldDescription>Used on invoices, bills and financial statements.</FieldDescription>
          <Textarea id="address" defaultValue={company.address} rows={2} />
        </Field>
      </FieldGroup>
      <div className="flex justify-end gap-2">
        <SaveDemoButton />
      </div>
    </form>
  );
}
