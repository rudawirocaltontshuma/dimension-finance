import { PageHeader } from "@/components/finance/page-header";
import { creditNotes } from "@/data/creditNotes";

import { CreditNotesTable } from "./_components/credit-notes-table";

export const metadata = { title: "Credit Notes | Nexora Finance" };

export default function CreditNotesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Credit Notes"
        description="Credit notes issued against customer invoices."
        breadcrumbs={[{ label: "Receivables", href: "/receivables" }, { label: "Credit Notes" }]}
      />
      <CreditNotesTable creditNotes={creditNotes} />
    </div>
  );
}
