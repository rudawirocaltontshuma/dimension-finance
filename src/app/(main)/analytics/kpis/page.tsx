import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { financialKpis } from "@/data/analytics";
import { cn } from "@/lib/utils";

export const metadata = { title: "Financial KPIs | Nexora Finance" };

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;
const trendColor = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-rose-600 dark:text-rose-400",
  flat: "text-muted-foreground",
} as const;

export default function FinancialKpisPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Financial KPI Center"
        description="Key performance indicators used to assess the financial health of the business."
        breadcrumbs={[{ label: "Analytics" }, { label: "Financial KPIs" }]}
        actions={<ExportPreviewButton />}
      />

      <Alert>
        <AlertTitle>Mock presentation values</AlertTitle>
        <AlertDescription>
          All KPI values shown here are fictional and intended for demonstration only.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {financialKpis.map((kpi) => {
          const Icon = trendIcon[kpi.trend];
          return (
            <Card key={kpi.id} className="gap-2 py-4">
              <CardContent className="space-y-2 px-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">{kpi.label}</span>
                  <Icon className={cn("size-4", trendColor[kpi.trend])} />
                </div>
                <p className="font-semibold text-2xl tracking-tight tabular-nums">{kpi.value}</p>
                <p className="text-muted-foreground text-xs">{kpi.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
