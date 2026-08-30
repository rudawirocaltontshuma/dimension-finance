import { PageHeader } from "@/components/finance/page-header";
import { customers } from "@/data/customers";

import { CustomersTable } from "./_components/customers-table";

export const metadata = { title: "Customers | Financial Management System" };

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Customers"
        description="Finance-focused view of every customer's invoicing and payment activity."
        breadcrumbs={[{ label: "Receivables", href: "/receivables" }, { label: "Customers" }]}
      />
      <CustomersTable customers={customers} />
    </div>
  );
}
