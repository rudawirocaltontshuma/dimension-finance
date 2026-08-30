const REFERENCE_DATE = "2026-08-30";

export const agingBuckets = ["Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days"] as const;
export type AgingBucket = (typeof agingBuckets)[number];

export function daysPastDue(dueDate: string, referenceDate: string = REFERENCE_DATE): number {
  const due = new Date(`${dueDate}T00:00:00.000Z`).getTime();
  const ref = new Date(`${referenceDate}T00:00:00.000Z`).getTime();
  return Math.round((ref - due) / (1000 * 60 * 60 * 24));
}

export function bucketFor(dueDate: string, referenceDate: string = REFERENCE_DATE): AgingBucket {
  const days = daysPastDue(dueDate, referenceDate);
  if (days <= 0) return "Current";
  if (days <= 30) return "1-30 Days";
  if (days <= 60) return "31-60 Days";
  if (days <= 90) return "61-90 Days";
  return "90+ Days";
}

export interface AgingRow {
  key: string;
  label: string;
  Current: number;
  "1-30 Days": number;
  "31-60 Days": number;
  "61-90 Days": number;
  "90+ Days": number;
  total: number;
}

export function buildAgingReport<T>(
  items: T[],
  opts: {
    groupKey: (item: T) => string;
    groupLabel: (item: T) => string;
    dueDate: (item: T) => string;
    balance: (item: T) => number;
  },
): AgingRow[] {
  const rows = new Map<string, AgingRow>();

  for (const item of items) {
    const balance = opts.balance(item);
    if (balance <= 0) continue;
    const key = opts.groupKey(item);
    const bucket = bucketFor(opts.dueDate(item));
    const row =
      rows.get(key) ??
      ({
        key,
        label: opts.groupLabel(item),
        Current: 0,
        "1-30 Days": 0,
        "31-60 Days": 0,
        "61-90 Days": 0,
        "90+ Days": 0,
        total: 0,
      } satisfies AgingRow);
    row[bucket] += balance;
    row.total += balance;
    rows.set(key, row);
  }

  return Array.from(rows.values()).sort((a, b) => b.total - a.total);
}

export function summarizeAging(rows: AgingRow[]) {
  return agingBuckets.reduce(
    (totals, bucket) => {
      totals[bucket] = rows.reduce((sum, row) => sum + row[bucket], 0);
      return totals;
    },
    {} as Record<AgingBucket, number>,
  );
}
