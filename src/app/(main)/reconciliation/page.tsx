import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { bankAccounts, bankTransactions } from "@/data/banking";

import { ReconciliationPanel } from "./_components/reconciliation-panel";

export const metadata = { title: "Bank Reconciliation | Financial Management System" };

export default function ReconciliationPage() {
  const transactionsByAccount = Object.fromEntries(
    bankAccounts.map((account) => [account.id, bankTransactions.filter((t) => t.bankAccountId === account.id)]),
  );

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Bank Reconciliation"
        description="Match bank transactions against the general ledger. Visual representation only — no real bank connectivity."
        breadcrumbs={[{ label: "Banking", href: "/banking" }, { label: "Reconciliation" }]}
        actions={<ExportPreviewButton />}
      />
      <ReconciliationPanel accounts={bankAccounts} transactionsByAccount={transactionsByAccount} />
    </div>
  );
}
