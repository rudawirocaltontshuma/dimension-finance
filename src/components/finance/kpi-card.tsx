import type { ReactNode } from "react";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPercent } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

export type KpiTrend = "up" | "down" | "flat";

interface KpiCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  trend?: KpiTrend;
  deltaPercent?: number;
  deltaLabel?: string;
  /** When true, an "up" trend is rendered as unfavorable (e.g. rising expenses). */
  invertTrendColor?: boolean;
  footnote?: string;
}

export function KpiCard({
  label,
  value,
  icon,
  trend,
  deltaPercent,
  deltaLabel,
  invertTrendColor,
  footnote,
}: KpiCardProps) {
  let isGood: boolean | null = null;
  if (trend && trend !== "flat") {
    isGood = invertTrendColor ? trend === "down" : trend === "up";
  }

  return (
    <Card className="gap-3 py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4 pb-0">
        <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 px-4">
        <span className="font-semibold text-2xl tabular-nums tracking-tight">{value}</span>
        {(deltaPercent !== undefined || footnote) && (
          <div className="flex items-center gap-1.5 text-xs">
            {deltaPercent !== undefined && trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium",
                  isGood === true && "text-emerald-600 dark:text-emerald-400",
                  isGood === false && "text-rose-600 dark:text-rose-400",
                  isGood === null && "text-muted-foreground",
                )}
              >
                {trend === "up" && <TrendingUp className="size-3.5" />}
                {trend === "down" && <TrendingDown className="size-3.5" />}
                {trend === "flat" && <Minus className="size-3.5" />}
                {formatPercent(Math.abs(deltaPercent))}
              </span>
            )}
            <span className="text-muted-foreground">{deltaLabel ?? footnote}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
