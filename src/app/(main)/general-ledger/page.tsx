import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { transactions } from "@/data/transactions";

import { GeneralLedgerTable } from "./_components/general-ledger-table";

export const metadata = { title: "General Ledger | Financial Management System" };

export default function GeneralLedgerPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="General Ledger"
        description="Full transaction history across every account, journal, and cost center."
        breadcrumbs={[{ label: "Accounting", href: "/accounting" }, { label: "General Ledger" }]}
        actions={<ExportPreviewButton />}
      />
      <GeneralLedgerTable transactions={transactions} />
    </div>
  );
}
