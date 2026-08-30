import { departments } from "@/data/costCenters";
import { southAfricanCities } from "@/lib/mock/names";
import { addDaysIso, amountBetween, chance, createRng, intBetween, pick, sequence } from "@/lib/mock/random";
import type { AssetStatus, DepreciationRecord, FixedAsset } from "@/types/finance";

const rng = createRng(64420);
const TODAY = "2026-08-30";

interface AssetCategoryDef {
  name: string;
  usefulLife: number;
  costRange: [number, number];
}

const categoryDefs: AssetCategoryDef[] = [
  { name: "Computer Equipment", usefulLife: 3, costRange: [12_000, 65_000] },
  { name: "Motor Vehicles", usefulLife: 5, costRange: [220_000, 780_000] },
  { name: "Furniture & Fittings", usefulLife: 6, costRange: [8_000, 90_000] },
  { name: "Machinery & Plant", usefulLife: 8, costRange: [180_000, 1_450_000] },
  { name: "Office Equipment", usefulLife: 4, costRange: [6_000, 48_000] },
  { name: "Buildings & Leasehold Improvements", usefulLife: 20, costRange: [850_000, 4_200_000] },
];

const assetNamesByCategory: Record<string, string[]> = {
  "Computer Equipment": [
    "Workstation cluster",
    "Laptop fleet",
    "Server rack unit",
    "Network infrastructure",
    "Point-of-sale terminals",
  ],
  "Motor Vehicles": [
    "Delivery truck",
    "Sales fleet sedan",
    "Forklift transport vehicle",
    "Executive vehicle",
    "Logistics van",
  ],
  "Furniture & Fittings": [
    "Office desk suite",
    "Boardroom furniture set",
    "Reception furnishings",
    "Ergonomic seating batch",
    "Storage cabinetry",
  ],
  "Machinery & Plant": [
    "Production line unit",
    "Packaging machine",
    "Industrial press",
    "Conveyor system",
    "Assembly robot arm",
  ],
  "Office Equipment": [
    "Multifunction printer",
    "Conference AV system",
    "Security camera system",
    "Access control system",
  ],
  "Buildings & Leasehold Improvements": [
    "Warehouse extension",
    "Branch office fit-out",
    "Distribution centre upgrade",
    "Retail showroom renovation",
  ],
};

function statusFor(netBookValue: number, cost: number): AssetStatus {
  if (chance(rng, 0.04)) return "Disposed";
  if (chance(rng, 0.05)) return "Under Maintenance";
  if (netBookValue <= cost * 0.02) return "Fully Depreciated";
  return "Active";
}

const assets: FixedAsset[] = [];
let counter = 5001;

for (const def of categoryDefs) {
  const countForCategory = def.name === "Buildings & Leasehold Improvements" ? 6 : 11;

  for (let i = 0; i < countForCategory; i++) {
    const cost = amountBetween(rng, def.costRange[0], def.costRange[1], 100);
    const monthsOwned = intBetween(rng, 2, def.usefulLife * 12 + 6);
    const purchaseDate = addDaysIso(TODAY, -monthsOwned * 30);
    const monthlyDepreciation = cost / (def.usefulLife * 12);
    const accumulatedDepreciation = Math.min(cost, Math.round(monthlyDepreciation * monthsOwned));
    const netBookValue = Math.max(0, cost - accumulatedDepreciation);

    assets.push({
      id: sequence("AST", counter, 0),
      name: `${pick(rng, assetNamesByCategory[def.name])} ${counter - 5000}`,
      category: def.name,
      purchaseDate,
      cost,
      usefulLifeYears: def.usefulLife,
      accumulatedDepreciation,
      netBookValue,
      location: `${pick(rng, southAfricanCities)} Facility`,
      department: pick(rng, departments),
      status: statusFor(netBookValue, cost),
    });
    counter += 1;
  }
}

export const generatedAssets = assets;

export const generatedDepreciationRecords: DepreciationRecord[] = assets
  .filter((asset) => asset.status !== "Disposed")
  .map((asset) => {
    const monthlyDepreciation = Math.round(asset.cost / (asset.usefulLifeYears * 12));
    const openingValue = Math.min(asset.cost, asset.netBookValue + monthlyDepreciation);
    return {
      assetId: asset.id,
      assetName: asset.name,
      period: "August 2026",
      openingValue,
      depreciation: Math.min(monthlyDepreciation, openingValue),
      accumulatedDepreciation: asset.accumulatedDepreciation,
      closingValue: asset.netBookValue,
    };
  });
