import { notFound } from "next/navigation";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { billStatusMeta, getBill } from "@/data/bills";

import { BillDocument } from "./_components/bill-document";
import { BillPrintButton } from "./_components/bill-print-button";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bill = getBill(id);
  return { title: bill ? `${bill.id} | Financial Management System` : "Bill | Financial Management System" };
}

export default async function BillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bill = getBill(id);
  if (!bill) notFound();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={bill.id}
        description={`Bill from ${bill.supplierName}`}
        breadcrumbs={[{ label: "Payables", href: "/payables" }, { label: "Bills", href: "/bills" }, { label: bill.id }]}
        actions={
          <>
            <StatusBadge status={bill.status} meta={billStatusMeta[bill.status]} />
            <ExportPreviewButton />
            <BillPrintButton bill={bill} />
          </>
        }
      />

      <Card className="mx-auto w-full max-w-4xl">
        <CardContent className="p-6 sm:p-8">
          <BillDocument bill={bill} />
        </CardContent>
      </Card>
    </div>
  );
}
