import { PageHeader } from "@/components/finance/page-header";
import { bills } from "@/data/bills";

import { BillsTable } from "./_components/bills-table";

export const metadata = { title: "Bills | Nexora Finance" };

export default function BillsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Bills"
        description="Every supplier bill, its payment status and outstanding balance."
        breadcrumbs={[{ label: "Payables", href: "/payables" }, { label: "Bills" }]}
      />
      <BillsTable bills={bills} />
    </div>
  );
}
