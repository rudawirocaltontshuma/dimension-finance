import { companyScale } from "@/data/companies";
import { fiscalPeriods } from "@/data/fiscal-periods";
import type { CompanyId } from "@/types/finance";

/**
 * Returns a multiplier applied to full-year consolidated figures so switching
 * the company selector or fiscal period selector visibly changes the numbers
 * shown on the dashboard, without maintaining fully separate ledgers per
 * company/period combination.
 */
export function getWorkspaceScale(companyId: CompanyId, fiscalPeriodId: string): number {
  const company = companyScale[companyId] ?? 1;
  const period = fiscalPeriods.find((p) => p.id === fiscalPeriodId);

  if (!period) return company;

  if (period.kind === "year") return company;
  if (period.kind === "quarter") return company * 0.25;
  return company * 0.083;
}

export function scaleValue(value: number, scale: number): number {
  return Math.round(value * scale);
}
