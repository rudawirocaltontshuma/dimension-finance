import { PageHeader } from "@/components/finance/page-header";
import { invoices } from "@/data/invoices";

import { InvoicesTable } from "./_components/invoices-table";

export const metadata = { title: "Invoices | Financial Management System" };

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Invoices"
        description="Every customer invoice, its payment status and outstanding balance."
        breadcrumbs={[{ label: "Receivables", href: "/receivables" }, { label: "Invoices" }]}
      />
      <InvoicesTable invoices={invoices} />
    </div>
  );
}
