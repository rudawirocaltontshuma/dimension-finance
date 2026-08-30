import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fiscalPeriods } from "@/data/fiscal-periods";
import { formatDate } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

import { SettingsNav } from "../_components/settings-nav";

export const metadata = { title: "Fiscal Periods | Financial Management System" };

const statusStyles: Record<string, string> = {
  Open: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300",
  "In Review": "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  "Ready to Close": "border-blue-200 text-blue-700 dark:border-blue-500/30 dark:text-blue-300",
  Closed: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
};

export default function FiscalPeriodsSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Fiscal Periods"
        description="Manage the fiscal year, quarters and monthly accounting periods."
      />
      <SettingsNav />
      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fiscalPeriods.map((period) => (
                <TableRow key={period.id}>
                  <TableCell className="font-medium">{period.label}</TableCell>
                  <TableCell className="capitalize">{period.kind}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{formatDate(period.startDate)}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{formatDate(period.endDate)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(statusStyles[period.status])}>
                      {period.status}
                    </Badge>
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
