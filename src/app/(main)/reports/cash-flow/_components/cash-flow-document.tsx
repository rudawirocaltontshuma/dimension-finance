import { companies } from "@/data/companies";
import { cashFlowStatement } from "@/data/reports";
import { formatMoney } from "@/lib/finance/format";

const company = companies[0];

function LineRow({ label, amount }: { label: string; amount: number }) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-1.5">{label}</td>
      <td className="py-1.5 text-right tabular-nums">{formatMoney(amount, "ZAR", { noDecimals: true })}</td>
    </tr>
  );
}

export function CashFlowDocument() {
  const c = cashFlowStatement;

  return (
    <div className="text-sm">
      <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold text-lg">{company.name}</p>
          <p className="text-muted-foreground text-xs">{company.legalName}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-semibold text-xl tracking-tight">CASH FLOW STATEMENT</p>
          <p className="text-muted-foreground text-xs">{c.period}</p>
        </div>
      </div>

      <div className="py-4">
        <p className="mb-1 font-semibold text-sm">Operating Activities</p>
        <table className="w-full text-xs">
          <tbody>
            {c.operatingActivities.map((line) => (
              <LineRow key={line.label} {...line} />
            ))}
          </tbody>
        </table>
        <div className="flex justify-between border-t py-1.5 font-medium text-sm">
          <span>Net Cash from Operating Activities</span>
          <span className="tabular-nums">{formatMoney(c.netCashFromOperating, "ZAR", { noDecimals: true })}</span>
        </div>
      </div>

      <div className="py-4">
        <p className="mb-1 font-semibold text-sm">Investing Activities</p>
        <table className="w-full text-xs">
          <tbody>
            {c.investingActivities.map((line) => (
              <LineRow key={line.label} {...line} />
            ))}
          </tbody>
        </table>
        <div className="flex justify-between border-t py-1.5 font-medium text-sm">
          <span>Net Cash from Investing Activities</span>
          <span className="tabular-nums">{formatMoney(c.netCashFromInvesting, "ZAR", { noDecimals: true })}</span>
        </div>
      </div>

      <div className="py-4">
        <p className="mb-1 font-semibold text-sm">Financing Activities</p>
        <table className="w-full text-xs">
          <tbody>
            {c.financingActivities.map((line) => (
              <LineRow key={line.label} {...line} />
            ))}
          </tbody>
        </table>
        <div className="flex justify-between border-t py-1.5 font-medium text-sm">
          <span>Net Cash from Financing Activities</span>
          <span className="tabular-nums">{formatMoney(c.netCashFromFinancing, "ZAR", { noDecimals: true })}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t py-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Opening Cash Balance</span>
          <span className="tabular-nums">{formatMoney(c.openingCash, "ZAR", { noDecimals: true })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Net Change in Cash</span>
          <span className="tabular-nums">{formatMoney(c.netChangeInCash, "ZAR", { noDecimals: true })}</span>
        </div>
        <div className="flex justify-between border-t pt-2 font-semibold text-base">
          <span>Closing Cash Balance</span>
          <span className="tabular-nums">{formatMoney(c.closingCash, "ZAR", { noDecimals: true })}</span>
        </div>
      </div>

      <div className="mt-2 border-t pt-4 text-[11px] text-muted-foreground">
        This is a fictional demonstration report generated for this application.
      </div>
    </div>
  );
}
