import { companies } from "@/data/companies";
import { profitAndLoss } from "@/data/reports";
import { formatMoney, formatPercent } from "@/lib/finance/format";

const company = companies[0];

interface LineWithVariance {
  label: string;
  current: number;
  previous: number;
  variance: number;
  variancePercent: number;
  emphasis?: boolean;
}

function LineRow({ line, bold }: { line: LineWithVariance; bold?: boolean }) {
  return (
    <tr className="border-b last:border-b-0">
      <td className={`py-2 ${bold ? "font-semibold" : ""}`}>{line.label}</td>
      <td className={`py-2 text-right tabular-nums ${bold ? "font-semibold" : ""}`}>
        {formatMoney(line.current, "ZAR", { noDecimals: true })}
      </td>
      <td className="py-2 text-right text-muted-foreground tabular-nums">
        {formatMoney(line.previous, "ZAR", { noDecimals: true })}
      </td>
      <td className="py-2 text-right tabular-nums">{formatMoney(line.variance, "ZAR", { noDecimals: true })}</td>
      <td className="py-2 text-right tabular-nums">{formatPercent(line.variancePercent, { signed: true })}</td>
    </tr>
  );
}

function SectionTotal({ label, current, previous }: { label: string; current: number; previous: number }) {
  const variance = current - previous;
  const variancePercent = previous !== 0 ? (variance / Math.abs(previous)) * 100 : 0;
  return <LineRow line={{ label, current, previous, variance, variancePercent }} bold />;
}

export function ProfitLossDocument() {
  const p = profitAndLoss;

  return (
    <div className="text-sm">
      <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold text-lg">{company.name}</p>
          <p className="text-muted-foreground text-xs">{company.legalName}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-semibold text-xl tracking-tight">PROFIT &amp; LOSS</p>
          <p className="text-muted-foreground text-xs">
            {p.period} vs {p.previousPeriod}
          </p>
        </div>
      </div>

      <table className="w-full border-collapse py-2 text-left text-xs">
        <thead>
          <tr className="border-b text-muted-foreground uppercase tracking-wide">
            <th className="py-2 font-medium">Line Item</th>
            <th className="py-2 text-right font-medium">Current Period</th>
            <th className="py-2 text-right font-medium">Previous Period</th>
            <th className="py-2 text-right font-medium">Variance</th>
            <th className="py-2 text-right font-medium">Variance %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} className="pt-4 pb-1 font-semibold text-sm">
              Revenue
            </td>
          </tr>
          {p.revenueLines.map((line) => (
            <LineRow key={line.label} line={line} />
          ))}
          <SectionTotal
            label="Total Revenue"
            current={p.totalRevenue}
            previous={p.revenueLines.reduce((s, l) => s + l.previous, 0)}
          />

          <tr>
            <td colSpan={5} className="pt-4 pb-1 font-semibold text-sm">
              Cost of Sales
            </td>
          </tr>
          {p.costOfSalesLines.map((line) => (
            <LineRow key={line.label} line={line} />
          ))}
          <SectionTotal
            label="Total Cost of Sales"
            current={p.totalCostOfSales}
            previous={p.costOfSalesLines.reduce((s, l) => s + l.previous, 0)}
          />

          <tr>
            <td colSpan={5} className="pt-3 pb-1 font-semibold text-sm">
              <span className="block border-t pt-2">Gross Profit ({formatPercent(p.grossMargin)} margin)</span>
            </td>
            <td colSpan={4} />
          </tr>

          <tr>
            <td colSpan={5} className="pt-4 pb-1 font-semibold text-sm">
              Operating Expenses
            </td>
          </tr>
          {p.operatingExpenseLines.map((line) => (
            <LineRow key={line.label} line={line} />
          ))}
          <SectionTotal
            label="Total Operating Expenses"
            current={p.totalOperatingExpenses}
            previous={p.operatingExpenseLines.reduce((s, l) => s + l.previous, 0)}
          />
        </tbody>
      </table>

      <div className="flex flex-col gap-1 border-t py-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gross Profit</span>
          <span className="font-medium tabular-nums">{formatMoney(p.grossProfit, "ZAR", { noDecimals: true })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Operating Profit</span>
          <span className="font-medium tabular-nums">
            {formatMoney(p.operatingProfit, "ZAR", { noDecimals: true })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Other Income</span>
          <span className="tabular-nums">{formatMoney(p.otherIncome, "ZAR", { noDecimals: true })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Other Expenses</span>
          <span className="tabular-nums">-{formatMoney(p.otherExpenses, "ZAR", { noDecimals: true })}</span>
        </div>
        <div className="flex justify-between border-t pt-2 font-semibold text-base">
          <span>Net Profit ({formatPercent(p.netMargin)} margin)</span>
          <span className="tabular-nums">{formatMoney(p.netProfit, "ZAR", { noDecimals: true })}</span>
        </div>
      </div>

      <div className="mt-2 border-t pt-4 text-[11px] text-muted-foreground">
        This is a fictional demonstration report generated for this application.
      </div>
    </div>
  );
}
