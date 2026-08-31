import Link from "next/link";

import { ArrowRight, BookOpen, CalendarCheck2, ListChecks, Scale, ScrollText } from "lucide-react";

import { KpiCard } from "@/components/finance/kpi-card";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAccount } from "@/data/accounts";
import { journalEntries, journalEntryStatusMeta } from "@/data/journalEntries";
import { trialBalanceTotals } from "@/data/reports";
import { formatDateShort, formatMoney } from "@/lib/finance/format";

export const metadata = { title: "Accounting Overview | Dimension Finance" };

const shortcuts = [
  { title: "Chart of Accounts", description: "Browse the full account hierarchy.", href: "/accounts", icon: BookOpen },
  {
    title: "General Ledger",
    description: "Search every posted transaction.",
    href: "/general-ledger",
    icon: ScrollText,
  },
  {
    title: "Journal Entries",
    description: "Review draft and posted entries.",
    href: "/journal-entries",
    icon: ListChecks,
  },
  { title: "Trial Balance", description: "Confirm debits equal credits.", href: "/trial-balance", icon: Scale },
  {
    title: "Period Close",
    description: "Track the monthly close checklist.",
    href: "/period-close",
    icon: CalendarCheck2,
  },
];

export default function AccountingOverviewPage() {
  const totalAssets = getAccount("1000")?.balance ?? 0;
  const totalLiabilities = getAccount("2000")?.balance ?? 0;
  const totalEquity = getAccount("3000")?.balance ?? 0;
  const totalRevenue = getAccount("4000")?.balance ?? 0;
  const recentEntries = [...journalEntries].slice(0, 6);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Accounting"
        description="General ledger, chart of accounts, journal entries and period close, all in one place."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Total Assets" value={formatMoney(totalAssets, "ZAR", { noDecimals: true })} />
        <KpiCard label="Total Liabilities" value={formatMoney(totalLiabilities, "ZAR", { noDecimals: true })} />
        <KpiCard label="Total Equity" value={formatMoney(totalEquity, "ZAR", { noDecimals: true })} />
        <KpiCard label="Total Revenue (YTD)" value={formatMoney(totalRevenue, "ZAR", { noDecimals: true })} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {shortcuts.map((shortcut) => (
          <Link key={shortcut.href} href={shortcut.href}>
            <Card className="h-full py-4 transition-colors hover:bg-muted/40">
              <CardContent className="flex flex-col gap-2 px-4">
                <shortcut.icon className="size-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{shortcut.title}</p>
                  <p className="text-muted-foreground text-xs">{shortcut.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardContent>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-medium text-sm">Recent Journal Entries</p>
              <Link
                href="/journal-entries"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="divide-y">
              {recentEntries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/journal-entries/${entry.id}`}
                  className="flex items-center justify-between gap-3 py-2 text-sm hover:bg-muted/30"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{entry.description}</p>
                    <p className="text-muted-foreground text-xs">
                      {entry.id} · {formatDateShort(entry.date)}
                    </p>
                  </div>
                  <StatusBadge status={entry.status} meta={journalEntryStatusMeta[entry.status]} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardContent className="flex flex-col gap-3">
            <p className="font-medium text-sm">Trial Balance Snapshot</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Debits</span>
              <span className="font-medium tabular-nums">
                {formatMoney(trialBalanceTotals.debit, "ZAR", { noDecimals: true })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Credits</span>
              <span className="font-medium tabular-nums">
                {formatMoney(trialBalanceTotals.credit, "ZAR", { noDecimals: true })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Difference</span>
              <span className="font-medium tabular-nums">
                {formatMoney(Math.abs(trialBalanceTotals.debit - trialBalanceTotals.credit), "ZAR", {
                  noDecimals: true,
                })}
              </span>
            </div>
            <Link href="/trial-balance" className="flex items-center gap-1 text-primary text-xs hover:underline">
              View full trial balance <ArrowRight className="size-3" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
