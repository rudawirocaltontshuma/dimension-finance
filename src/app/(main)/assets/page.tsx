import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ChartCard } from "@/components/finance/chart-card";
import { FinanceDonutChart } from "@/components/finance/charts/series-charts";
import { KpiCard } from "@/components/finance/kpi-card";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assetStatusMeta, assets } from "@/data/assets";
import { formatDateShort, formatMoney } from "@/lib/finance/format";

export const metadata = { title: "Fixed Assets | Dimension Finance" };

export default function FixedAssetsPage() {
  const totalCost = assets.reduce((sum, a) => sum + a.cost, 0);
  const accumulatedDepreciation = assets.reduce((sum, a) => sum + a.accumulatedDepreciation, 0);
  const netBookValue = assets.reduce((sum, a) => sum + a.netBookValue, 0);
  const assetsAdded = assets.filter((a) => a.purchaseDate >= "2026-01-01").length;
  const assetsRetired = assets.filter((a) => a.status === "Disposed").length;

  const byCategory = Array.from(new Set(assets.map((a) => a.category))).map((category) => ({
    name: category,
    value: assets.filter((a) => a.category === category).reduce((sum, a) => sum + a.netBookValue, 0),
  }));

  const recentAssets = [...assets].sort((a, b) => (a.purchaseDate < b.purchaseDate ? 1 : -1)).slice(0, 8);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Fixed Assets"
        description="Overview of asset value, depreciation and additions across the business."
        actions={
          <Link href="/assets/register" className="text-primary text-sm hover:underline">
            View full register
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Total Assets" value={String(assets.length)} />
        <KpiCard label="Asset Value" value={formatMoney(totalCost, "ZAR", { noDecimals: true })} />
        <KpiCard
          label="Accumulated Depreciation"
          value={formatMoney(accumulatedDepreciation, "ZAR", { noDecimals: true })}
        />
        <KpiCard label="Net Book Value" value={formatMoney(netBookValue, "ZAR", { noDecimals: true })} />
        <KpiCard label="Assets Added (FY26)" value={String(assetsAdded)} />
        <KpiCard label="Assets Retired" value={String(assetsRetired)} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <ChartCard title="Net Book Value by Category" className="xl:col-span-2">
          <FinanceDonutChart data={byCategory} />
        </ChartCard>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="font-medium text-sm">Recently Acquired Assets</CardTitle>
            <CardAction>
              <Link
                href="/assets/register"
                className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="divide-y">
            {recentAssets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <div className="min-w-0">
                  <Link href={`/assets/${asset.id}`} className="block truncate hover:underline">
                    {asset.name}
                  </Link>
                  <p className="text-muted-foreground text-xs">
                    {asset.category} · {formatDateShort(asset.purchaseDate)}
                  </p>
                </div>
                <StatusBadge status={asset.status} meta={assetStatusMeta[asset.status]} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
