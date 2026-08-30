import { formatMoney } from "@/lib/finance/format";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/finance";

interface MoneyProps {
  amount: number;
  currency?: CurrencyCode;
  className?: string;
  colorize?: boolean;
  noDecimals?: boolean;
}

export function Money({ amount, currency = "ZAR", className, colorize, noDecimals }: MoneyProps) {
  return (
    <span
      className={cn(
        "tabular-nums",
        colorize && amount > 0 && "text-emerald-600 dark:text-emerald-400",
        colorize && amount < 0 && "text-rose-600 dark:text-rose-400",
        className,
      )}
    >
      {formatMoney(amount, currency, { noDecimals })}
    </span>
  );
}
