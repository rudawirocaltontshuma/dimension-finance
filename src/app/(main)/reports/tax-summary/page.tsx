import { AlertCircle } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { KpiCard } from "@/components/finance/kpi-card";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { taxSummary } from "@/data/reports";
import { formatMoney } from "@/lib/finance/format";

export const metadata = { title: "Tax Summary | Nexora Finance" };

export default function TaxSummaryReportPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Tax Summary"
        description={`Output tax, input tax and net tax position for ${taxSummary.period}.`}
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "Tax Summary" }]}
        actions={<ExportPreviewButton />}
      />

      <Alert>
        <AlertCircle />
        <AlertTitle>Display only</AlertTitle>
        <AlertDescription>
          This report is a frontend demonstration. Nothing here is submitted to a tax authority.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Taxable Revenue" value={formatMoney(taxSummary.taxableRevenue, "ZAR", { noDecimals: true })} />
        <KpiCard label="Output Tax" value={formatMoney(taxSummary.outputTax, "ZAR", { noDecimals: true })} />
        <KpiCard
          label="Taxable Expenses"
          value={formatMoney(taxSummary.taxableExpenses, "ZAR", { noDecimals: true })}
        />
        <KpiCard label="Input Tax" value={formatMoney(taxSummary.inputTax, "ZAR", { noDecimals: true })} />
      </div>

      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Net Tax Position</span>
            <span className="font-semibold text-lg tabular-nums">
              <Money amount={taxSummary.netTax} noDecimals />
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Category</TableHead>
                <TableHead className="text-right">Base Amount</TableHead>
                <TableHead className="text-right">Tax</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxSummary.categories.map((category) => (
                <TableRow key={category.name}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={category.base} noDecimals />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={category.tax} noDecimals />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
