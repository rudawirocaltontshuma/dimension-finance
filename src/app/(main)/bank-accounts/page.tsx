import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bankAccounts } from "@/data/banking";
import { formatDateShort } from "@/lib/finance/format";

export const metadata = { title: "Bank Accounts | Dimension Finance" };

export default function BankAccountsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Bank Accounts"
        description="Visual representation only — Dimension Finance is not connected to any real bank."
        breadcrumbs={[{ label: "Banking", href: "/banking" }, { label: "Bank Accounts" }]}
        actions={<ExportPreviewButton />}
      />

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Last Reconciled</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">
                    {account.name}
                    <p className="font-normal text-muted-foreground text-xs">•••• {account.accountNumberLast4}</p>
                  </TableCell>
                  <TableCell>{account.bankName}</TableCell>
                  <TableCell>{account.accountType}</TableCell>
                  <TableCell>{account.currency}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    <Money amount={account.balance} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{formatDateShort(account.lastReconciled)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300"
                    >
                      {account.status}
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
