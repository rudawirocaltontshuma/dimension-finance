import Link from "next/link";
import { notFound } from "next/navigation";

import { Inbox, Mail, Phone } from "lucide-react";

import { supplierStatusMeta } from "@/app/(main)/suppliers/_components/suppliers-columns";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { EmptyState } from "@/components/finance/empty-state";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { billStatusMeta, getBillsForSupplier } from "@/data/bills";
import { getPaymentsForSupplier } from "@/data/payments";
import { getSupplier } from "@/data/suppliers";
import { formatDate, formatDateShort } from "@/lib/finance/format";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supplier = getSupplier(id);
  return {
    title: supplier ? `${supplier.name} | Dimension Finance` : "Supplier | Dimension Finance",
  };
}

export default async function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supplier = getSupplier(id);
  if (!supplier) notFound();

  const bills = getBillsForSupplier(id).sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1));
  const payments = getPaymentsForSupplier(id).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={supplier.name}
        description={supplier.category}
        breadcrumbs={[
          { label: "Payables", href: "/payables" },
          { label: "Suppliers", href: "/suppliers" },
          { label: supplier.name },
        ]}
        actions={
          <>
            <StatusBadge status={supplier.paymentStatus} meta={supplierStatusMeta[supplier.paymentStatus]} />
            <ExportPreviewButton />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Spend</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={supplier.spend} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Outstanding</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={supplier.outstanding} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Overdue</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={supplier.overdue} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Bank Account</p>
            <p className="font-medium text-sm">•••• {supplier.bankAccountLast4}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Supplier Since</p>
            <p className="font-medium text-sm">{formatDate(supplier.since)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-2 px-4 text-sm sm:flex-row sm:items-center sm:gap-6">
          <span className="text-muted-foreground">{supplier.contactName}</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Mail className="size-3.5" /> {supplier.email}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Phone className="size-3.5" /> {supplier.phone}
          </span>
          <span className="text-muted-foreground">{supplier.address}</span>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Bills ({bills.length})</p>
            {bills.length === 0 ? (
              <EmptyState icon={Inbox} title="No bills for this supplier" />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>
                          <Link href={`/bills/${bill.id}`} className="font-mono text-xs hover:underline">
                            {bill.id}
                          </Link>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs">{formatDateShort(bill.dueDate)}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          <Money amount={bill.balance} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={bill.status} meta={billStatusMeta[bill.status]} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Recent Payments</p>
            {payments.length === 0 ? (
              <EmptyState icon={Inbox} title="No payments recorded" />
            ) : (
              <div className="divide-y">
                {payments.slice(0, 8).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between py-2 text-sm">
                    <div>
                      <p>{payment.method}</p>
                      <p className="text-muted-foreground text-xs">{formatDateShort(payment.date)}</p>
                    </div>
                    <Money amount={payment.amount} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
