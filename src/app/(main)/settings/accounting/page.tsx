import { SaveDemoButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { SettingsNav } from "../_components/settings-nav";

export const metadata = { title: "Accounting Settings | Dimension Finance" };

export default function AccountingSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Accounting Settings"
        description="Configure how transactions are recorded and periods are closed."
      />
      <SettingsNav />

      <Card>
        <CardContent className="pt-2">
          <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel>Accounting Method</FieldLabel>
                <FieldDescription>How revenue and expenses are recognized.</FieldDescription>
                <RadioGroup defaultValue="accrual" className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="accrual" id="accrual" />
                    <label htmlFor="accrual" className="text-sm">
                      Accrual basis
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <label htmlFor="cash" className="text-sm">
                      Cash basis
                    </label>
                  </div>
                </RadioGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="fiscal-year-start">Fiscal Year Start</FieldLabel>
                <Select defaultValue="january">
                  <SelectTrigger id="fiscal-year-start" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="march">March</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field orientation="horizontal">
                <div className="flex-1">
                  <FieldLabel htmlFor="require-approval">Require Approval for Journal Entries</FieldLabel>
                  <FieldDescription>Draft entries must be approved before posting.</FieldDescription>
                </div>
                <Switch id="require-approval" defaultChecked />
              </Field>
              <Field orientation="horizontal">
                <div className="flex-1">
                  <FieldLabel htmlFor="lock-closed">Lock Closed Periods</FieldLabel>
                  <FieldDescription>Prevent new transactions from posting into a closed period.</FieldDescription>
                </div>
                <Switch id="lock-closed" defaultChecked />
              </Field>
            </FieldGroup>
            <div className="flex justify-end">
              <SaveDemoButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
