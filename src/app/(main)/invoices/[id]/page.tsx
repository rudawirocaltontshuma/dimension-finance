import { notFound } from "next/navigation";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { getInvoice, invoiceStatusMeta } from "@/data/invoices";

import { InvoiceDocument } from "./_components/invoice-document";
import { InvoicePrintButton } from "./_components/invoice-print-button";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = getInvoice(id);
  return { title: invoice ? `${invoice.id} | Dimension Finance` : "Invoice | Dimension Finance" };
}

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = getInvoice(id);
  if (!invoice) notFound();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={invoice.id}
        description={`Invoice for ${invoice.customerName}`}
        breadcrumbs={[
          { label: "Receivables", href: "/receivables" },
          { label: "Invoices", href: "/invoices" },
          { label: invoice.id },
        ]}
        actions={
          <>
            <StatusBadge status={invoice.status} meta={invoiceStatusMeta[invoice.status]} />
            <ExportPreviewButton />
            <InvoicePrintButton invoice={invoice} />
          </>
        }
      />

      <Card className="mx-auto w-full max-w-4xl">
        <CardContent className="p-6 sm:p-8">
          <InvoiceDocument invoice={invoice} />
        </CardContent>
      </Card>
    </div>
  );
}
