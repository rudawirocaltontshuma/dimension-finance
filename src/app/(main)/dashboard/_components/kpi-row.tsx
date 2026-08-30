import type { ReactNode } from "react";

import {
  Banknote,
  CircleDollarSign,
  Landmark,
  PiggyBank,
  ReceiptText,
  TrendingUp,
  Wallet,
  Wallet2,
} from "lucide-react";

import { KpiCard, type KpiTrend } from "@/components/finance/kpi-card";
import { dashboardKpis } from "@/data/dashboard";
import { formatMoney, formatPercent } from "@/lib/finance/format";

function trendFor(current: number, previous: number): { trend: KpiTrend; deltaPercent: number } {
  if (previous === 0) return { trend: "flat", deltaPercent: 0 };
  const delta = ((current - previous) / previous) * 100;
  let trend: KpiTrend = "flat";
  if (delta > 0.4) trend = "up";
  else if (delta < -0.4) trend = "down";
  return { trend, deltaPercent: delta };
}

export function KpiRow() {
  const k = dashboardKpis;

  const cards: {
    label: string;
    value: string;
    icon: ReactNode;
    trend: KpiTrend;
    deltaPercent: number;
    invertTrendColor?: boolean;
  }[] = [
    {
      label: "Revenue",
      value: formatMoney(k.revenue, "ZAR", { noDecimals: true }),
      icon: <TrendingUp className="size-4" />,
      ...trendFor(k.revenue, k.revenuePreviousPeriod),
    },
    {
      label: "Gross Profit",
      value: formatMoney(k.grossProfit, "ZAR", { noDecimals: true }),
      icon: <Banknote className="size-4" />,
      ...trendFor(k.grossProfit, k.grossProfitPreviousPeriod),
    },
    {
      label: "Net Profit",
      value: formatMoney(k.netProfit, "ZAR", { noDecimals: true }),
      icon: <PiggyBank className="size-4" />,
      ...trendFor(k.netProfit, k.netProfitPreviousPeriod),
    },
    {
      label: "Cash Position",
      value: formatMoney(k.cashPosition, "ZAR", { noDecimals: true }),
      icon: <Landmark className="size-4" />,
      ...trendFor(k.cashPosition, k.cashPositionPreviousPeriod),
    },
    {
      label: "Accounts Receivable",
      value: formatMoney(k.accountsReceivable, "ZAR", { noDecimals: true }),
      icon: <ReceiptText className="size-4" />,
      invertTrendColor: true,
      ...trendFor(k.accountsReceivable, k.accountsReceivablePreviousPeriod),
    },
    {
      label: "Accounts Payable",
      value: formatMoney(k.accountsPayable, "ZAR", { noDecimals: true }),
      icon: <Wallet className="size-4" />,
      invertTrendColor: true,
      ...trendFor(k.accountsPayable, k.accountsPayablePreviousPeriod),
    },
    {
      label: "Operating Expenses",
      value: formatMoney(k.operatingExpenses, "ZAR", { noDecimals: true }),
      icon: <Wallet2 className="size-4" />,
      invertTrendColor: true,
      ...trendFor(k.operatingExpenses, k.operatingExpensesPreviousPeriod),
    },
    {
      label: "Profit Margin",
      value: formatPercent(k.profitMargin),
      icon: <CircleDollarSign className="size-4" />,
      ...trendFor(k.profitMargin, k.profitMarginPreviousPeriod),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <KpiCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          deltaPercent={card.deltaPercent}
          deltaLabel="vs prior period"
          invertTrendColor={card.invertTrendColor}
        />
      ))}
    </div>
  );
}
