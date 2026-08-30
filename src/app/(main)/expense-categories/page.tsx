import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { expenseCategories } from "@/data/expenseCategories";
import { formatPercent } from "@/lib/finance/format";

export const metadata = { title: "Expense Categories | Financial Management System" };

export default function ExpenseCategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Expense Categories"
        description="Spend and budget performance across every expense category."
        breadcrumbs={[{ label: "Expenses", href: "/expenses" }, { label: "Categories" }]}
        actions={<ExportPreviewButton />}
      />

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Monthly Spend</TableHead>
                <TableHead className="text-right">Annual Spend</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseCategories.map((category) => {
                const variancePercent = category.budget !== 0 ? (category.variance / category.budget) * 100 : 0;
                return (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      <Money amount={category.monthlySpend} noDecimals />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <Money amount={category.annualSpend} noDecimals />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <Money amount={category.budget} noDecimals />
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          category.variance >= 0
                            ? "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300"
                            : "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300"
                        }
                      >
                        {formatPercent(variancePercent, { signed: true })}
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
