import { notFound } from "next/navigation";

import { ActivityTimeline, type TimelineItem } from "@/components/finance/activity-timeline";
import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { Money } from "@/components/finance/money";
import { PageHeader } from "@/components/finance/page-header";
import { StatusBadge } from "@/components/finance/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { assetStatusMeta, getAsset } from "@/data/assets";
import { formatDate } from "@/lib/finance/format";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = getAsset(id);
  return { title: asset ? `${asset.name} | Dimension Finance` : "Asset | Dimension Finance" };
}

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = getAsset(id);
  if (!asset) notFound();

  const timeline: TimelineItem[] = [
    { id: "t1", label: "Asset acquired", actor: asset.department, date: asset.purchaseDate },
    { id: "t2", label: "Added to asset register", actor: "Finance", date: asset.purchaseDate },
    { id: "t3", label: "Depreciation schedule started", actor: "Finance", date: asset.purchaseDate },
  ];
  if (asset.status === "Under Maintenance") {
    timeline.push({ id: "t4", label: "Sent for maintenance", actor: asset.department, date: "2026-08-12" });
  }
  if (asset.status === "Disposed") {
    timeline.push({ id: "t4", label: "Asset disposed", actor: "Finance", date: "2026-07-20" });
  }
  if (asset.status === "Fully Depreciated") {
    timeline.push({ id: "t4", label: "Fully depreciated", actor: "Finance", date: "2026-06-30" });
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={asset.name}
        description={`${asset.id} · ${asset.category}`}
        breadcrumbs={[
          { label: "Assets", href: "/assets" },
          { label: "Asset Register", href: "/assets/register" },
          { label: asset.name },
        ]}
        actions={
          <>
            <StatusBadge status={asset.status} meta={assetStatusMeta[asset.status]} />
            <ExportPreviewButton />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="grid grid-cols-2 gap-3 xl:col-span-3 xl:grid-cols-3">
          <Card className="gap-1 py-3">
            <CardContent className="space-y-1 px-4">
              <p className="text-muted-foreground text-xs">Purchase Cost</p>
              <p className="font-semibold text-sm tabular-nums">
                <Money amount={asset.cost} noDecimals />
              </p>
            </CardContent>
          </Card>
          <Card className="gap-1 py-3">
            <CardContent className="space-y-1 px-4">
              <p className="text-muted-foreground text-xs">Accumulated Depreciation</p>
              <p className="font-semibold text-sm tabular-nums">
                <Money amount={asset.accumulatedDepreciation} noDecimals />
              </p>
            </CardContent>
          </Card>
          <Card className="gap-1 py-3">
            <CardContent className="space-y-1 px-4">
              <p className="text-muted-foreground text-xs">Net Book Value</p>
              <p className="font-semibold text-sm tabular-nums">
                <Money amount={asset.netBookValue} noDecimals />
              </p>
            </CardContent>
          </Card>
          <Card className="gap-1 py-3">
            <CardContent className="space-y-1 px-4">
              <p className="text-muted-foreground text-xs">Purchase Date</p>
              <p className="font-medium text-sm">{formatDate(asset.purchaseDate)}</p>
            </CardContent>
          </Card>
          <Card className="gap-1 py-3">
            <CardContent className="space-y-1 px-4">
              <p className="text-muted-foreground text-xs">Useful Life</p>
              <p className="font-medium text-sm">{asset.usefulLifeYears} years</p>
            </CardContent>
          </Card>
          <Card className="gap-1 py-3">
            <CardContent className="space-y-1 px-4">
              <p className="text-muted-foreground text-xs">Location</p>
              <p className="font-medium text-sm">{asset.location}</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 gap-1 py-3 sm:col-span-3">
            <CardContent className="space-y-1 px-4">
              <p className="text-muted-foreground text-xs">Responsible Department</p>
              <p className="font-medium text-sm">{asset.department}</p>
            </CardContent>
          </Card>
        </div>

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
