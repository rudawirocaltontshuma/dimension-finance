import { PageHeader } from "@/components/finance/page-header";
import { suppliers } from "@/data/suppliers";

import { SuppliersTable } from "./_components/suppliers-table";

export const metadata = { title: "Suppliers | Nexora Finance" };

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Suppliers"
        description="Finance-focused view of every supplier's billing and payment activity."
        breadcrumbs={[{ label: "Payables", href: "/payables" }, { label: "Suppliers" }]}
      />
      <SuppliersTable suppliers={suppliers} />
    </div>
  );
}
