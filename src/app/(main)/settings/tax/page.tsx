import { AlertCircle } from "lucide-react";

import { SaveDemoButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { SettingsNav } from "../_components/settings-nav";

export const metadata = { title: "Tax Settings | Dimension Finance" };

export default function TaxSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Tax Settings"
        description="Configure VAT registration and tax rates used across the platform."
      />
      <SettingsNav />

      <Alert>
        <AlertCircle />
        <AlertTitle>Display only</AlertTitle>
        <AlertDescription>
          These settings are for demonstration only and are never submitted to a tax authority.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-2">
          <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="vat-number">VAT Registration Number</FieldLabel>
                <Input id="vat-number" defaultValue="4480184620" />
              </Field>
              <Field>
                <FieldLabel htmlFor="standard-rate">Standard VAT Rate (%)</FieldLabel>
                <Input id="standard-rate" defaultValue="15" type="number" />
              </Field>
              <Field>
                <FieldLabel htmlFor="filing-period">Filing Period</FieldLabel>
                <FieldDescription>How often VAT returns are prepared.</FieldDescription>
                <Input id="filing-period" defaultValue="Bi-monthly" />
              </Field>
              <Field orientation="horizontal">
                <div className="flex-1">
                  <FieldLabel htmlFor="auto-calc">Automatic Tax Calculation</FieldLabel>
                  <FieldDescription>Apply standard VAT automatically to new invoices and bills.</FieldDescription>
                </div>
                <Switch id="auto-calc" defaultChecked />
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
