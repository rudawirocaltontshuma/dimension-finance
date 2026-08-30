import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactions } from "@/data/transactions";
import { formatDateShort } from "@/lib/finance/format";

export const metadata = { title: "General Ledger Report | Nexora Finance" };

export default function GeneralLedgerReportPage() {
  const recent = transactions.slice(0, 20);
  const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);
  const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="General Ledger"
        description="Full transaction history across every account, journal, and cost center — year to date."
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "General Ledger" }]}
        actions={<ExportPreviewButton />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Total Transactions</p>
            <p className="font-semibold text-sm">{transactions.length}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Total Debits</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={totalDebit} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Total Credits</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={totalCredit} noDecimals />
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="whitespace-nowrap text-xs">{formatDateShort(transaction.date)}</TableCell>
                  <TableCell className="max-w-56 truncate">{transaction.description}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{transaction.accountName}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {transaction.debit > 0 ? <Money amount={transaction.debit} /> : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {transaction.credit > 0 ? <Money amount={transaction.credit} /> : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link href="/general-ledger" className="mt-4 flex items-center gap-1 text-primary text-sm hover:underline">
            View full general ledger with filters <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
