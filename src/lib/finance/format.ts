import { currencySymbols } from "@/data/currencies";
import type { CurrencyCode } from "@/types/finance";

/**
 * Formats an amount as a currency string in the "R 1,284,500.00" style used
 * throughout Dimension Finance. Uses a fixed en-US grouping so output is stable
 * regardless of server/client ICU locale data, then swaps in the currency
 * symbol — no live conversion, no locale-driven symbol placement quirks.
 */
export function formatMoney(amount: number, currency: CurrencyCode = "ZAR", opts?: { noDecimals?: boolean }): string {
  const symbol = currencySymbols[currency] ?? currency;
  const sign = amount < 0 ? "-" : "";
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: opts?.noDecimals ? 0 : 2,
    maximumFractionDigits: opts?.noDecimals ? 0 : 2,
  }).format(Math.abs(amount));

  return `${sign}${symbol} ${formatted}`;
}

export function formatCompactMoney(amount: number, currency: CurrencyCode = "ZAR"): string {
  const symbol = currencySymbols[currency] ?? currency;
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (abs >= 1_000_000) return `${sign}${symbol} ${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${symbol} ${(abs / 1_000).toFixed(1)}K`;
  return formatMoney(amount, currency);
}

export function formatPercent(value: number, opts?: { signed?: boolean; digits?: number }): string {
  const digits = opts?.digits ?? 1;
  const sign = opts?.signed && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(iso: string): string {
  return new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
