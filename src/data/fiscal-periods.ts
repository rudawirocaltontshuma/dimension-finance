import type { FiscalPeriod } from "@/types/finance";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function monthRange(monthIndex: number): [string, string] {
  const start = new Date(Date.UTC(2026, monthIndex, 1));
  const end = new Date(Date.UTC(2026, monthIndex + 1, 0));
  return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)];
}

// Today in this workspace is 2026-08-30, so periods through August are Closed,
// September is In Review, and the remainder of the year is Open.
function statusForMonth(monthIndex: number): FiscalPeriod["status"] {
  if (monthIndex < 7) return "Closed";
  if (monthIndex === 7) return "Ready to Close";
  if (monthIndex === 8) return "In Review";
  return "Open";
}

export const fiscalPeriods: FiscalPeriod[] = [
  {
    id: "fy2026",
    label: "2026",
    kind: "year",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "Open",
  },
  {
    id: "fy2026-q1",
    label: "Q1 2026",
    kind: "quarter",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    status: "Closed",
  },
  {
    id: "fy2026-q2",
    label: "Q2 2026",
    kind: "quarter",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    status: "Closed",
  },
  {
    id: "fy2026-q3",
    label: "Q3 2026",
    kind: "quarter",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    status: "In Review",
  },
  {
    id: "fy2026-q4",
    label: "Q4 2026",
    kind: "quarter",
    startDate: "2026-10-01",
    endDate: "2026-12-31",
    status: "Open",
  },
  ...months.map((label, index) => {
    const [startDate, endDate] = monthRange(index);
    return {
      id: `fy2026-m${index + 1}`,
      label: `${label} 2026`,
      kind: "month" as const,
      startDate,
      endDate,
      status: statusForMonth(index),
    };
  }),
];

export const defaultFiscalPeriodId = "fy2026";
