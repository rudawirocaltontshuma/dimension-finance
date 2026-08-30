import * as React from "react";

import { CheckCircle2 } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trialBalanceRows, trialBalanceTotals } from "@/data/reports";
import type { AccountType } from "@/types/finance";

export const metadata = { title: "Trial Balance | Financial Management System" };

const groupOrder: AccountType[] = ["Asset", "Liability", "Equity", "Revenue", "Cost of Sales", "Expense"];

export default function TrialBalancePage() {
  const difference = Math.abs(trialBalanceTotals.debit - trialBalanceTotals.credit);
  const isBalanced = difference < 1;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Trial Balance"
        description="Debit and credit balances across every account for the current period."
        breadcrumbs={[{ label: "Accounting", href: "/accounting" }, { label: "Trial Balance" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Total Debits</p>
            <p className="font-semibold text-lg tabular-nums">
              <Money amount={trialBalanceTotals.debit} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Total Credits</p>
            <p className="font-semibold text-lg tabular-nums">
              <Money amount={trialBalanceTotals.credit} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Difference</p>
            <p className="font-semibold text-lg tabular-nums">
              <Money amount={difference} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Status</p>
            <Badge
              variant="outline"
              className="gap-1.5 border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300"
            >
              <CheckCircle2 className="size-3.5" />
              {isBalanced ? "Balanced" : "Out of Balance"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupOrder.map((type) => {
                const rows = trialBalanceRows.filter((row) => row.type === type);
                if (rows.length === 0) return null;
                const subtotal = rows.reduce(
                  (acc, row) => ({ debit: acc.debit + row.debit, credit: acc.credit + row.credit }),
                  { debit: 0, credit: 0 },
                );
                return (
                  <React.Fragment key={type}>
                    <TableRow className="bg-muted/40">
                      <TableCell
                        colSpan={5}
                        className="font-medium text-muted-foreground text-xs uppercase tracking-wide"
                      >
                        {type === "Cost of Sales" ? "Cost of Sales" : `${type}s`}
                      </TableCell>
                    </TableRow>
                    {rows.map((row) => (
                      <TableRow key={row.code}>
                        <TableCell className="whitespace-nowrap font-mono text-xs">{row.code}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {row.debit > 0 ? <Money amount={row.debit} /> : "—"}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {row.credit > 0 ? <Money amount={row.credit} /> : "—"}
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          <Money amount={row.balance} />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} className="text-muted-foreground text-xs">
                        Subtotal
                      </TableCell>
                      <TableCell className="text-right font-medium text-xs tabular-nums">
                        <Money amount={subtotal.debit} />
                      </TableCell>
                      <TableCell className="text-right font-medium text-xs tabular-nums">
                        <Money amount={subtotal.credit} />
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="font-semibold">
                  Total
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={trialBalanceTotals.debit} />
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  <Money amount={trialBalanceTotals.credit} />
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
