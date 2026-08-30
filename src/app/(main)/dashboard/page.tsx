import { RotateCw } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";

import { DashboardCharts } from "./_components/dashboard-charts";
import { DashboardWidgets } from "./_components/dashboard-widgets";
import { KpiRow } from "./_components/kpi-row";

export const metadata = {
  title: "Financial Overview | Nexora Finance",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Financial Overview"
        description="Monitor revenue, profitability, cash flow and outstanding balances."
        actions={
          <>
            <span className="hidden items-center gap-1.5 text-muted-foreground text-xs sm:flex">
              <RotateCw className="size-3.5" />
              Updated moments ago
            </span>
            <ExportPreviewButton />
          </>
        }
      />
      <KpiRow />
      <DashboardCharts />
      <DashboardWidgets />
    </div>
  );
}
