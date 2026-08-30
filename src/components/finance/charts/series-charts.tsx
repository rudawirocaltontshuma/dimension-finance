"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCompactMoney } from "@/lib/finance/format";

export interface SeriesDef {
  key: string;
  label: string;
  color?: string;
}

const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function buildConfig(series: SeriesDef[]): ChartConfig {
  const config: ChartConfig = {};
  series.forEach((s, index) => {
    config[s.key] = { label: s.label, color: s.color ?? palette[index % palette.length] };
  });
  return config;
}

interface BaseChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: SeriesDef[];
  height?: number;
  valueFormatter?: (value: number) => string;
}

export function FinanceLineChart({
  data,
  xKey,
  series,
  height = 260,
  valueFormatter = formatCompactMoney,
}: BaseChartProps) {
  const config = buildConfig(series);
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <LineChart accessibilityLayer data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => valueFormatter(Number(v))}
          width={56}
        />
        <ChartTooltip
          cursor={false}
          content={({ active, payload, label }) => (
            <ChartTooltipContent
              active={active}
              label={label}
              payload={payload?.map((item) => ({
                ...item,
                value: typeof item.value === "number" ? valueFormatter(item.value) : item.value,
              }))}
            />
          )}
        />
        {series.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

export function FinanceAreaChart({
  data,
  xKey,
  series,
  height = 260,
  valueFormatter = formatCompactMoney,
}: BaseChartProps) {
  const config = buildConfig(series);
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <AreaChart accessibilityLayer data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${s.key})`} stopOpacity={0.35} />
              <stop offset="95%" stopColor={`var(--color-${s.key})`} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => valueFormatter(Number(v))}
          width={56}
        />
        <ChartTooltip
          cursor={false}
          content={({ active, payload, label }) => (
            <ChartTooltipContent
              active={active}
              label={label}
              payload={payload?.map((item) => ({
                ...item,
                value: typeof item.value === "number" ? valueFormatter(item.value) : item.value,
              }))}
            />
          )}
        />
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={`var(--color-${s.key})`}
            fill={`url(#fill-${s.key})`}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

export function FinanceBarChart({
  data,
  xKey,
  series,
  height = 260,
  valueFormatter = formatCompactMoney,
  stacked = false,
  layout = "vertical",
}: BaseChartProps & { stacked?: boolean; layout?: "vertical" | "horizontal" }) {
  const config = buildConfig(series);
  const isHorizontalBars = layout === "horizontal";

  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <BarChart
        accessibilityLayer
        data={data}
        layout={isHorizontalBars ? "vertical" : "horizontal"}
        margin={{ top: 4, right: 8, left: isHorizontalBars ? 8 : 0, bottom: 0 }}
      >
        <CartesianGrid horizontal={!isHorizontalBars} vertical={isHorizontalBars} />
        {isHorizontalBars ? (
          <>
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => valueFormatter(Number(v))}
            />
            <YAxis
              type="category"
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={110}
            />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => valueFormatter(Number(v))}
              width={56}
            />
          </>
        )}
        <ChartTooltip
          cursor={{ fill: "var(--muted)", opacity: 0.4 }}
          content={({ active, payload, label }) => (
            <ChartTooltipContent
              active={active}
              label={label}
              payload={payload?.map((item) => ({
                ...item,
                value: typeof item.value === "number" ? valueFormatter(item.value) : item.value,
              }))}
            />
          )}
        />
        {series.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            fill={`var(--color-${s.key})`}
            radius={[3, 3, 3, 3]}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

interface DonutChartProps {
  data: { name: string; value: number }[];
  height?: number;
  valueFormatter?: (value: number) => string;
}

export function FinanceDonutChart({ data, height = 260, valueFormatter = formatCompactMoney }: DonutChartProps) {
  const config: ChartConfig = {};
  data.forEach((d, index) => {
    config[d.name] = { label: d.name, color: palette[index % palette.length] };
  });

  return (
    <ChartContainer config={config} style={{ height }} className="mx-auto aspect-square w-full max-w-64">
      <PieChart>
        <ChartTooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              hideLabel
              payload={payload?.map((item) => ({
                ...item,
                value: typeof item.value === "number" ? valueFormatter(item.value) : item.value,
              }))}
            />
          )}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={56}
          outerRadius={88}
          strokeWidth={2}
          paddingAngle={1}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={palette[index % palette.length]} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="name" />} className="flex-wrap gap-x-3 gap-y-1 text-xs" />
      </PieChart>
    </ChartContainer>
  );
}
