import { notFound } from "next/navigation";

import { ActivityTimeline, type TimelineItem } from "@/components/finance/activity-timeline";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getJournalEntry, journalEntryStatusMeta } from "@/data/journalEntries";
import { formatDate } from "@/lib/finance/format";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getJournalEntry(id);
  return { title: entry ? `${entry.id} | Nexora Finance` : "Journal Entry | Nexora Finance" };
}

function buildTimeline(date: string, createdBy: string, status: string): TimelineItem[] {
  const items: TimelineItem[] = [{ id: "t1", label: "Journal entry created", actor: createdBy, date }];
  if (status === "Draft") return items;
  items.push({ id: "t2", label: "Submitted for review", actor: createdBy, date });
  if (status === "Reversed") {
    items.push({ id: "t3", label: "Posted", actor: "Finance", date });
    items.push({
      id: "t4",
      label: "Reversed",
      actor: "Morgan Blake",
      date,
      note: "Entry reversed following a period adjustment.",
    });
    return items;
  }
  items.push({ id: "t3", label: "Posted to general ledger", actor: "Finance", date });
  if (status === "Approved") {
    items.push({ id: "t4", label: "Approved", actor: "Morgan Blake", date });
  }
  return items;
}

export default async function JournalEntryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getJournalEntry(id);
  if (!entry) notFound();

  const timeline = buildTimeline(entry.date, entry.createdBy, entry.status);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={entry.id}
        description={entry.description}
        breadcrumbs={[
          { label: "Accounting", href: "/accounting" },
          { label: "Journal Entries", href: "/journal-entries" },
          { label: entry.id },
        ]}
        actions={
          <>
            <StatusBadge status={entry.status} meta={journalEntryStatusMeta[entry.status]} />
            <ExportPreviewButton />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Date</p>
            <p className="font-medium text-sm">{formatDate(entry.date)}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Reference</p>
            <p className="font-medium text-sm">{entry.reference}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Created By</p>
            <p className="font-medium text-sm">{entry.createdBy}</p>
          </CardContent>
        </Card>
        <Card className="gap-1 py-3">
          <CardContent className="space-y-1 px-4">
            <p className="text-muted-foreground text-xs">Line Items</p>
            <p className="font-medium text-sm">{entry.lines.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Journal Lines</p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Department / Cost Center</TableHead>
                    <TableHead>Memo</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entry.lines.map((line) => (
                    <TableRow key={line.id}>
                      <TableCell className="whitespace-nowrap text-xs">
                        {line.accountCode} · {line.accountName}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {line.department} / {line.costCenter}
                      </TableCell>
                      <TableCell className="max-w-48 truncate text-xs">{line.memo}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {line.debit > 0 ? <Money amount={line.debit} /> : "—"}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {line.credit > 0 ? <Money amount={line.credit} /> : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-medium">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      <Money amount={entry.totalDebit} />
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      <Money amount={entry.totalCredit} />
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardContent>
            <p className="mb-3 font-medium text-sm">Timeline</p>
            <ActivityTimeline items={timeline} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
