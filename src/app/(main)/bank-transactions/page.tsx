import { PageHeader } from "@/components/finance/page-header";
import { bankTransactions } from "@/data/banking";

import { BankTransactionsTable } from "./_components/bank-transactions-table";

export const metadata = { title: "Bank Transactions | Financial Management System" };

export default function BankTransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Bank Transactions"
        description="Visual representation only — no live bank feed is connected."
        breadcrumbs={[{ label: "Banking", href: "/banking" }, { label: "Transactions" }]}
      />
      <BankTransactionsTable transactions={bankTransactions} />
    </div>
  );
}
