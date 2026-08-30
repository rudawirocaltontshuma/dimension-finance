import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { reimbursements } from "@/data/reimbursements";
import { formatDateShort } from "@/lib/finance/format";
import type { Reimbursement } from "@/types/finance";

export const metadata = { title: "Reimbursements | Nexora Finance" };

function statusClass(status: Reimbursement["status"]) {
  if (status === "Paid") return "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300";
  if (status === "Approved") return "border-blue-200 text-blue-700 dark:border-blue-500/30 dark:text-blue-300";
  if (status === "Pending") return "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300";
  return "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300";
}

export default function ReimbursementsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Reimbursements"
        description="Track employee reimbursement approvals and payment status."
        breadcrumbs={[{ label: "Expenses", href: "/expenses" }, { label: "Reimbursements" }]}
        actions={<ExportPreviewButton />}
      />

      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reimbursement</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reimbursements.map((reimbursement) => (
                <TableRow key={reimbursement.id}>
                  <TableCell className="font-mono text-xs">{reimbursement.id}</TableCell>
                  <TableCell>{reimbursement.employeeName}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    <Money amount={reimbursement.amount} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">
                    {formatDateShort(reimbursement.submittedDate)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">
                    {reimbursement.approvedDate ? formatDateShort(reimbursement.approvedDate) : "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">
                    {reimbursement.paymentDate ? formatDateShort(reimbursement.paymentDate) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusClass(reimbursement.status)}>
                      {reimbursement.status}
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
