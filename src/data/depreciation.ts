import { generatedDepreciationRecords } from "@/data/_gen/assets";
import type { DepreciationRecord } from "@/types/finance";

export const depreciationRecords: DepreciationRecord[] = generatedDepreciationRecords;

export const depreciationTotals = depreciationRecords.reduce(
  (totals, record) => {
    totals.opening += record.openingValue;
    totals.depreciation += record.depreciation;
    totals.accumulated += record.accumulatedDepreciation;
    totals.closing += record.closingValue;
    return totals;
  },
  { opening: 0, depreciation: 0, accumulated: 0, closing: 0 },
);
