import { notFound } from "next/navigation";

import { budgetStatusClass } from "@/app/(main)/budgets/_components/budgets-columns";
import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getBudget } from "@/data/budgets";
import { formatPercent } from "@/lib/finance/format";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const budget = getBudget(id);
  return { title: budget ? `${budget.name} | Financial Management System` : "Budget | Financial Management System" };
}

export default async function BudgetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const budget = getBudget(id);
  if (!budget) notFound();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={budget.name}
        description={`${budget.department} · ${budget.period}`}
        breadcrumbs={[
          { label: "Budgeting", href: "/budgets" },
          { label: "Budgets", href: "/budgets" },
          { label: budget.name },
        ]}
        actions={
          <>
            <Badge variant="outline" className={budgetStatusClass[budget.status]}>
              {budget.status}
            </Badge>
            <ExportPreviewButton />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Budget</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={budget.budgetAmount} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Actual</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={budget.actualAmount} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Variance</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={budget.variance} colorize noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Utilization</p>
            <p className="font-semibold text-sm tabular-nums">{formatPercent(budget.utilization)}</p>
          </CardContent>
        </Card>
      </div>

      <ChartCard title="Monthly Trend" description="Budget vs actual spend by month.">
        <FinanceBarChart
          data={budget.monthlyTrend}
          xKey="month"
          series={[
            { key: "budget", label: "Budget", color: "var(--chart-2)" },
            { key: "actual", label: "Actual" },
          ]}
        />
      </ChartCard>
    </div>
  );
}
