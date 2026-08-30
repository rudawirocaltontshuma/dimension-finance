import { generatedJournalEntries } from "@/data/_gen/ledger";
import type { JournalEntry, JournalEntryStatus } from "@/types/finance";

export const journalEntries: JournalEntry[] = generatedJournalEntries;

export function getJournalEntry(id: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.id === id);
}

export const journalEntryStatusOptions: JournalEntryStatus[] = ["Draft", "Posted", "Approved", "Reversed"];

export const journalEntryStatusMeta: Record<JournalEntryStatus, { dot: string; badge: string }> = {
  Draft: { dot: "bg-muted-foreground", badge: "border-border text-muted-foreground" },
  Posted: { dot: "bg-sky-500", badge: "border-sky-200 text-sky-700 dark:border-sky-500/30 dark:text-sky-300" },
  Approved: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  },
  Reversed: { dot: "bg-rose-500", badge: "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300" },
};
