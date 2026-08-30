import { DemoActionButton, ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { reconciliationSummaries } from "@/data/banking";
import { fiscalPeriods } from "@/data/fiscal-periods";
import { cn } from "@/lib/utils";

import { ClosingChecklist } from "./_components/closing-checklist";

export const metadata = { title: "Period Close | Nexora Finance" };

const statusStyles: Record<string, string> = {
  Open: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300",
  "In Review": "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  "Ready to Close": "border-blue-200 text-blue-700 dark:border-blue-500/30 dark:text-blue-300",
  Closed: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
};

const months = fiscalPeriods.filter((p) => p.kind === "month");
const outstandingItems = reconciliationSummaries.reduce((sum, s) => sum + s.unmatchedCount, 0);

export default function PeriodClosePage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Period Close"
        description="Track the status of each fiscal period close and its reconciliation checklist."
        breadcrumbs={[{ label: "Accounting", href: "/accounting" }, { label: "Period Close" }]}
        actions={
          <>
            <ExportPreviewButton />
            <DemoActionButton
              message="Close period prepared for review (demo only)."
              label="Close Period Demo"
              size="sm"
            />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Current Period</p>
            <p className="font-medium text-sm">August 2026</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Status</p>
            <Badge variant="outline" className={cn("w-fit", statusStyles["Ready to Close"])}>
              Ready to Close
            </Badge>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Outstanding Items</p>
            <p className="font-medium text-sm">{outstandingItems} unmatched transactions</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Adjustments Pending</p>
            <p className="font-medium text-sm">2 draft journal entries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <ClosingChecklist />
        </div>
        <Card className="xl:col-span-2">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Fiscal Period Status</p>
            <div className="divide-y">
              {months.map((period) => (
                <div key={period.id} className="flex items-center justify-between py-2 text-sm">
                  <span>{period.label}</span>
                  <Badge variant="outline" className={cn("text-xs", statusStyles[period.status])}>
                    {period.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
