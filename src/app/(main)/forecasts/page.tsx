import { ChartCard } from "@/components/finance/chart-card";
import { FinanceAreaChart, FinanceLineChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forecastScenarios, forecastSeries } from "@/data/forecasts";
import { formatMoney, formatPercent } from "@/lib/finance/format";

export const metadata = { title: "Forecasts | Nexora Finance" };

export default function ForecastsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Forecasts"
        description="Projected revenue, expenses, profit and cash position through year end. All forecast data is fictional."
        breadcrumbs={[{ label: "Budgeting", href: "/budgets" }, { label: "Forecasts" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Revenue Forecast" description="Actuals through August, projected thereafter.">
          <FinanceLineChart data={forecastSeries} xKey="period" series={[{ key: "revenue", label: "Revenue" }]} />
        </ChartCard>
        <ChartCard title="Expense Forecast" description="Actuals through August, projected thereafter.">
          <FinanceLineChart
            data={forecastSeries}
            xKey="period"
            series={[{ key: "expenses", label: "Expenses", color: "var(--chart-3)" }]}
          />
        </ChartCard>
        <ChartCard title="Profit Forecast" description="Net profit trajectory through year end.">
          <FinanceAreaChart data={forecastSeries} xKey="period" series={[{ key: "profit", label: "Profit" }]} />
        </ChartCard>
        <ChartCard title="Cash Forecast" description="Projected cash position through year end.">
          <FinanceAreaChart
            data={forecastSeries}
            xKey="period"
            series={[{ key: "cash", label: "Cash", color: "var(--chart-4)" }]}
          />
        </ChartCard>
      </div>

      <div>
        <h2 className="mb-3 font-medium text-sm">Scenarios</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {forecastScenarios.map((scenario) => (
            <Card key={scenario.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-medium text-sm">
                  {scenario.name}
                  {scenario.id === "base" && <Badge variant="outline">Current</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">{scenario.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Revenue Growth</span>
                  <span className="font-medium tabular-nums">
                    {formatPercent(scenario.revenueGrowth, { signed: true })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expense Growth</span>
                  <span className="font-medium tabular-nums">
                    {formatPercent(scenario.expenseGrowth, { signed: true })}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-3 text-sm">
                  <span className="text-muted-foreground">Projected Profit</span>
                  <span className="font-semibold tabular-nums">
                    {formatMoney(scenario.projectedProfit, "ZAR", { noDecimals: true })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
