import { PageHeader } from "@/components/finance/page-header";
import { debitNotes } from "@/data/debitNotes";

import { DebitNotesTable } from "./_components/debit-notes-table";

export const metadata = { title: "Debit Notes | Nexora Finance" };

export default function DebitNotesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Debit Notes"
        description="Debit notes issued against supplier bills."
        breadcrumbs={[{ label: "Payables", href: "/payables" }, { label: "Debit Notes" }]}
      />
      <DebitNotesTable debitNotes={debitNotes} />
    </div>
  );
}
