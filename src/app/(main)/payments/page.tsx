import { PageHeader } from "@/components/finance/page-header";
import { payments } from "@/data/payments";

import { PaymentsTable } from "./_components/payments-table";

export const metadata = { title: "Payments | Nexora Finance" };

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Payments"
        description="Customer payments received against outstanding invoices."
        breadcrumbs={[{ label: "Receivables", href: "/receivables" }, { label: "Payments" }]}
      />
      <PaymentsTable payments={payments} />
    </div>
  );
}
