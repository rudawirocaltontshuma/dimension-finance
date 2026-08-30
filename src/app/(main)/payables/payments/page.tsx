import { PageHeader } from "@/components/finance/page-header";
import { payablePayments } from "@/data/payments";

import { PayablePaymentsTable } from "./_components/payable-payments-table";

export const metadata = { title: "Payables Payments | Nexora Finance" };

export default function PayablePaymentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Payments"
        description="Payments made to suppliers against outstanding bills."
        breadcrumbs={[{ label: "Payables", href: "/payables" }, { label: "Payments" }]}
      />
      <PayablePaymentsTable payments={payablePayments} />
    </div>
  );
}
