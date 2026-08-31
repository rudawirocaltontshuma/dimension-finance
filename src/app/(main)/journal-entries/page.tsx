import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { journalEntries } from "@/data/journalEntries";

import { JournalEntriesTable } from "./_components/journal-entries-table";

export const metadata = { title: "Journal Entries | Dimension Finance" };

export default function JournalEntriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Journal Entries"
        description="Review manual and system-generated journal entries prepared for posting."
        breadcrumbs={[{ label: "Accounting", href: "/accounting" }, { label: "Journal Entries" }]}
        actions={<ExportPreviewButton />}
      />
      <JournalEntriesTable entries={journalEntries} />
    </div>
  );
}
