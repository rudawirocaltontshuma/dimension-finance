import { Plus } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { costCenterFormFields } from "@/components/finance/entity-form/entity-configs";
import { NewRecordDialog } from "@/components/finance/entity-form/new-record-dialog";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { costCenters } from "@/data/costCenters";

export const metadata = { title: "Cost Centers | Dimension Finance" };

export default function CostCentersPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Cost Centers"
        description="Budget performance and headcount for every operational cost center."
        breadcrumbs={[{ label: "Budgeting", href: "/budgets" }, { label: "Cost Centers" }]}
        actions={
          <>
            <ExportPreviewButton />
            <NewRecordDialog
              title="New Cost Center"
              description="Create a demo cost center. Nothing is saved to a real database."
              fields={costCenterFormFields}
              trigger={
                <Button size="sm">
                  <Plus /> New Cost Center
                </Button>
              }
            />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {costCenters.map((center) => {
          const utilization = center.budget ? Math.round((center.actual / center.budget) * 100) : 0;
          return (
            <Card key={center.id}>
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{center.name}</p>
                    <p className="text-muted-foreground text-xs">Manager: {center.manager}</p>
                  </div>
                  <span className="text-muted-foreground text-xs">{center.employees} employees</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium tabular-nums">
                      <Money amount={center.budget} noDecimals />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Actual</span>
                    <span className="font-medium tabular-nums">
                      <Money amount={center.actual} noDecimals />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Variance</span>
                    <span className="font-medium tabular-nums">
                      <Money amount={center.variance} colorize noDecimals />
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={Math.min(100, utilization)} className="h-1.5" />
                  <span className="text-muted-foreground text-xs tabular-nums">{utilization}%</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
