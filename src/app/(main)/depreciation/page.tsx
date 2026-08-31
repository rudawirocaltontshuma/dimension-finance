import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { depreciationRecords, depreciationTotals } from "@/data/depreciation";

export const metadata = { title: "Depreciation | Dimension Finance" };

export default function DepreciationPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Depreciation"
        description="Monthly depreciation movement across every active fixed asset. Figures are illustrative mock values."
        breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Depreciation" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Opening Value</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={depreciationTotals.opening} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Depreciation (August)</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={depreciationTotals.depreciation} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Accumulated Depreciation</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={depreciationTotals.accumulated} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Closing Value</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={depreciationTotals.closing} noDecimals />
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Opening Value</TableHead>
                <TableHead className="text-right">Depreciation</TableHead>
                <TableHead className="text-right">Accumulated</TableHead>
                <TableHead className="text-right">Closing Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depreciationRecords.map((record) => (
                <TableRow key={record.assetId}>
                  <TableCell className="font-medium">{record.assetName}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{record.period}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={record.openingValue} noDecimals />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={record.depreciation} noDecimals />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={record.accumulatedDepreciation} noDecimals />
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    <Money amount={record.closingValue} noDecimals />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="font-semibold">
                  Total
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={depreciationTotals.opening} noDecimals />
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={depreciationTotals.depreciation} noDecimals />
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={depreciationTotals.accumulated} noDecimals />
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={depreciationTotals.closing} noDecimals />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
