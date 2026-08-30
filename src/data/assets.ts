import { generatedAssets } from "@/data/_gen/assets";
import type { AssetStatus, FixedAsset } from "@/types/finance";

export const assets: FixedAsset[] = generatedAssets;

export function getAsset(id: string): FixedAsset | undefined {
  return assets.find((asset) => asset.id === id);
}

export const assetStatusOptions: AssetStatus[] = ["Active", "Fully Depreciated", "Disposed", "Under Maintenance"];

export const assetStatusMeta: Record<AssetStatus, { dot: string; badge: string }> = {
  Active: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  },
  "Fully Depreciated": { dot: "bg-muted-foreground", badge: "border-border text-muted-foreground" },
  Disposed: { dot: "bg-rose-500", badge: "border-rose-200 text-rose-700 dark:border-rose-500/30 dark:text-rose-300" },
  "Under Maintenance": {
    dot: "bg-amber-500",
    badge: "border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-300",
  },
};

export const assetCategories = Array.from(new Set(assets.map((asset) => asset.category)));
