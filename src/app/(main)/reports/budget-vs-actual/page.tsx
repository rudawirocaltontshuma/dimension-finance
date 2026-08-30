import { ChartCard } from "@/components/finance/chart-card";
import { FinanceBarChart } from "@/components/finance/charts/series-charts";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { costCenters } from "@/data/costCenters";
import { formatPercent } from "@/lib/finance/format";

export const metadata = { title: "Budget vs Actual | Financial Management System" };

export default function BudgetVsActualReportPage() {
  const chartData = costCenters.map((center) => ({
    department: center.name,
    budget: center.budget,
    actual: center.actual,
  }));

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Budget vs Actual"
        description="Departmental budget performance and variance across every cost center."
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "Budget vs Actual" }]}
        actions={<ExportPreviewButton />}
      />

      <ChartCard title="Budget vs Actual by Department">
        <FinanceBarChart
          data={chartData}
          xKey="department"
          layout="horizontal"
          height={280}
          series={[
            { key: "budget", label: "Budget", color: "var(--chart-2)" },
            { key: "actual", label: "Actual" },
          ]}
        />
      </ChartCard>

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costCenters.map((center) => (
                <TableRow key={center.id}>
                  <TableCell className="font-medium">{center.name}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={center.budget} noDecimals />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={center.actual} noDecimals />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={center.variance} colorize noDecimals />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPercent(center.budget ? (center.actual / center.budget) * 100 : 0)}
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
