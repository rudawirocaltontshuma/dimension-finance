import { companies } from "@/data/companies";
import { balanceSheet } from "@/data/reports";
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

function SubtotalRow({ label, amount }: { label: string; amount: number }) {
  return (
    <tr className="border-b">
      <td className="py-1.5 font-medium">{label}</td>
      <td className="py-1.5 text-right font-medium tabular-nums">{formatMoney(amount, "ZAR", { noDecimals: true })}</td>
    </tr>
  );
}

export function BalanceSheetDocument() {
  const b = balanceSheet;

  return (
    <div className="text-sm">
      <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold text-lg">{company.name}</p>
          <p className="text-muted-foreground text-xs">{company.legalName}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-semibold text-xl tracking-tight">BALANCE SHEET</p>
          <p className="text-muted-foreground text-xs">As at {b.asOf}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2">
        <div>
          <p className="mb-2 font-semibold text-sm">Assets</p>
          <p className="mb-1 text-muted-foreground text-xs uppercase tracking-wide">Current Assets</p>
          <table className="w-full text-xs">
            <tbody>
              {b.currentAssets.map((line) => (
                <LineRow key={line.label} {...line} />
              ))}
              <SubtotalRow label="Total Current Assets" amount={b.totalCurrentAssets} />
            </tbody>
          </table>

          <p className="mt-4 mb-1 text-muted-foreground text-xs uppercase tracking-wide">Non-Current Assets</p>
          <table className="w-full text-xs">
            <tbody>
              {b.nonCurrentAssets.map((line) => (
                <LineRow key={line.label} {...line} />
              ))}
              <SubtotalRow label="Total Non-Current Assets" amount={b.totalNonCurrentAssets} />
            </tbody>
          </table>

          <div className="mt-3 flex justify-between border-t pt-2 font-semibold text-sm">
            <span>Total Assets</span>
            <span className="tabular-nums">{formatMoney(b.totalAssets, "ZAR", { noDecimals: true })}</span>
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold text-sm">Liabilities &amp; Equity</p>
          <p className="mb-1 text-muted-foreground text-xs uppercase tracking-wide">Current Liabilities</p>
          <table className="w-full text-xs">
            <tbody>
              {b.currentLiabilities.map((line) => (
                <LineRow key={line.label} {...line} />
              ))}
              <SubtotalRow label="Total Current Liabilities" amount={b.totalCurrentLiabilities} />
            </tbody>
          </table>

          <p className="mt-4 mb-1 text-muted-foreground text-xs uppercase tracking-wide">Long-Term Liabilities</p>
          <table className="w-full text-xs">
            <tbody>
              {b.longTermLiabilities.map((line) => (
                <LineRow key={line.label} {...line} />
              ))}
              <SubtotalRow label="Total Long-Term Liabilities" amount={b.totalLongTermLiabilities} />
            </tbody>
          </table>

          <div className="mt-2 flex justify-between border-t pt-1 font-medium text-sm">
            <span>Total Liabilities</span>
            <span className="tabular-nums">{formatMoney(b.totalLiabilities, "ZAR", { noDecimals: true })}</span>
          </div>

          <p className="mt-4 mb-1 text-muted-foreground text-xs uppercase tracking-wide">Equity</p>
          <table className="w-full text-xs">
            <tbody>
              {b.equity.map((line) => (
                <LineRow key={line.label} {...line} />
              ))}
              <SubtotalRow label="Total Equity" amount={b.totalEquity} />
            </tbody>
          </table>

          <div className="mt-3 flex justify-between border-t pt-2 font-semibold text-sm">
            <span>Total Liabilities &amp; Equity</span>
            <span className="tabular-nums">
              {formatMoney(b.totalLiabilitiesAndEquity, "ZAR", { noDecimals: true })}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 border-t pt-4 text-[11px] text-muted-foreground">
        This is a fictional demonstration report generated for this application.
      </div>
    </div>
  );
}
