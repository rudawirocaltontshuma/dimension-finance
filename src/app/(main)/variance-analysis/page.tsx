import { TrendingDown, TrendingUp } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { budgets } from "@/data/budgets";
import { formatPercent } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "Variance Analysis | Dimension Finance" };

export default function VarianceAnalysisPage() {
  const rows = [...budgets].sort((a, b) => a.variance - b.variance);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Variance Analysis"
        description="Budget performance across every department, highlighting favorable and unfavorable variances."
        breadcrumbs={[{ label: "Budgeting", href: "/budgets" }, { label: "Variance Analysis" }]}
        actions={<ExportPreviewButton />}
      />

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="text-right">Variance %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((budget) => {
                const variancePercent = budget.budgetAmount !== 0 ? (budget.variance / budget.budgetAmount) * 100 : 0;
                const favorable = budget.variance >= 0;
                return (
                  <TableRow key={budget.id}>
                    <TableCell className="font-medium">{budget.category}</TableCell>
                    <TableCell>{budget.department}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      <Money amount={budget.budgetAmount} noDecimals />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <Money amount={budget.actualAmount} noDecimals />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <Money amount={budget.variance} colorize noDecimals />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPercent(variancePercent, { signed: true })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "gap-1",
                          favorable
                            ? "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300"
                            : "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300",
                        )}
                      >
                        {favorable ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        {favorable ? "Favorable" : "Unfavorable"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
