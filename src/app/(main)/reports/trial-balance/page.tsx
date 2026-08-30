import Link from "next/link";

import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trialBalanceRows, trialBalanceTotals } from "@/data/reports";
import type { AccountType } from "@/types/finance";

export const metadata = { title: "Trial Balance Report | Nexora Finance" };

const groupOrder: AccountType[] = ["Asset", "Liability", "Equity", "Revenue", "Cost of Sales", "Expense"];

export default function TrialBalanceReportPage() {
  const summary = groupOrder.map((type) => {
    const rows = trialBalanceRows.filter((r) => r.type === type);
    return {
      type,
      debit: rows.reduce((s, r) => s + r.debit, 0),
      credit: rows.reduce((s, r) => s + r.credit, 0),
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Trial Balance"
        description="Summary of debit and credit balances across every account category for the current period."
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "Trial Balance" }]}
        actions={<ExportPreviewButton />}
      />

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">Category Summary</p>
            <Badge
              variant="outline"
              className="gap-1.5 border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300"
            >
              <CheckCircle2 className="size-3.5" />
              Balanced
            </Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.map((row) => (
                <TableRow key={row.type}>
                  <TableCell className="font-medium">
                    {row.type === "Cost of Sales" ? row.type : `${row.type}s`}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.debit > 0 ? <Money amount={row.debit} noDecimals /> : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.credit > 0 ? <Money amount={row.credit} noDecimals /> : "—"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2">
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={trialBalanceTotals.debit} noDecimals />
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={trialBalanceTotals.credit} noDecimals />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Link href="/trial-balance" className="flex items-center gap-1 text-primary text-sm hover:underline">
            View full account-level trial balance <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
