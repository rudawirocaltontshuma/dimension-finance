import Link from "next/link";
import { notFound } from "next/navigation";

import { Inbox, Mail, Phone } from "lucide-react";

import { creditStatusMeta } from "@/app/(main)/customers/_components/customers-columns";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { EmptyState } from "@/components/finance/empty-state";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCustomer } from "@/data/customers";
import { getInvoicesForCustomer, invoiceStatusMeta } from "@/data/invoices";
import { getPaymentsForCustomer } from "@/data/payments";
import { formatDate, formatDateShort } from "@/lib/finance/format";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = getCustomer(id);
  return {
    title: customer ? `${customer.name} | Financial Management System` : "Customer | Financial Management System",
  };
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = getCustomer(id);
  if (!customer) notFound();

  const invoices = getInvoicesForCustomer(id).sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1));
  const payments = getPaymentsForCustomer(id).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={customer.name}
        description={customer.industry}
        breadcrumbs={[
          { label: "Receivables", href: "/receivables" },
          { label: "Customers", href: "/customers" },
          { label: customer.name },
        ]}
        actions={
          <>
            <StatusBadge status={customer.creditStatus} meta={creditStatusMeta[customer.creditStatus]} />
            <ExportPreviewButton />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Revenue</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={customer.revenue} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Outstanding</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={customer.outstanding} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Overdue</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={customer.overdue} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Credit Limit</p>
            <p className="font-semibold text-sm tabular-nums">
              <Money amount={customer.creditLimit} noDecimals />
            </p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Customer Since</p>
            <p className="font-medium text-sm">{formatDate(customer.since)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-2 px-4 text-sm sm:flex-row sm:items-center sm:gap-6">
          <span className="text-muted-foreground">{customer.contactName}</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Mail className="size-3.5" /> {customer.email}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Phone className="size-3.5" /> {customer.phone}
          </span>
          <span className="text-muted-foreground">{customer.billingAddress}</span>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Invoices ({invoices.length})</p>
            {invoices.length === 0 ? (
              <EmptyState icon={Inbox} title="No invoices for this customer" />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <Link href={`/invoices/${invoice.id}`} className="font-mono text-xs hover:underline">
                            {invoice.id}
                          </Link>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs">{formatDateShort(invoice.dueDate)}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          <Money amount={invoice.balance} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={invoice.status} meta={invoiceStatusMeta[invoice.status]} />
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
                    <Money amount={payment.amount} colorize />
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
