import { costCenters } from "@/data/costCenters";
import { amountBetween, createRng, weightedPick } from "@/lib/mock/random";
import type { Budget, BudgetStatus } from "@/types/finance";

const rng = createRng(90341);

const budgetCategories = [
  "Salaries & Benefits",
  "Marketing & Advertising",
  "Technology & Software",
  "Travel & Entertainment",
  "Professional Services",
  "Operations & Supplies",
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

function statusFor(utilization: number): BudgetStatus {
  if (utilization > 1.08) return "Over Budget";
  if (utilization > 0.98) return "At Risk";
  if (utilization < 0.55) return "Under Review";
  return "On Track";
}

export const budgets: Budget[] = costCenters.flatMap((center) =>
  budgetCategories.map((category, index) => {
    const budgetAmount = amountBetween(rng, 120_000, 980_000, 500);
    const utilizationSeed = weightedPick(rng, [
      [amountBetween(rng, 55, 92, 1) / 100, 0.55],
      [amountBetween(rng, 93, 108, 1) / 100, 0.3],
      [amountBetween(rng, 109, 135, 1) / 100, 0.15],
    ]);
    const actualAmount = Math.round(budgetAmount * utilizationSeed);
    const variance = budgetAmount - actualAmount;
    const utilization = Math.round(utilizationSeed * 100);

    const monthlyTrend = months.map((month, monthIndex) => {
      const monthlyBudget = Math.round(budgetAmount / 12);
      const progress = (monthIndex + 1) / months.length;
      const monthlyActual =
        Math.round(actualAmount * progress * amountBetween(rng, 90, 110, 1) * 0.01) -
        Math.round(actualAmount * (progress - 1 / months.length) * amountBetween(rng, 90, 110, 1) * 0.01);
      return { month, budget: monthlyBudget, actual: Math.max(0, monthlyActual) };
    });

    return {
      id: `BUD-${center.id.replace("cc-", "")}-${index + 1}`,
      name: `${category} — ${center.name}`,
      period: "FY2026",
      department: center.name,
      category,
      budgetAmount,
      actualAmount,
      variance,
      utilization,
      status: statusFor(utilizationSeed),
      monthlyTrend,
    } satisfies Budget;
  }),
);

export function getBudget(id: string): Budget | undefined {
  return budgets.find((budget) => budget.id === id);
}

export const budgetTotals = budgets.reduce(
  (totals, budget) => {
    totals.budget += budget.budgetAmount;
    totals.actual += budget.actualAmount;
    return totals;
  },
  { budget: 0, actual: 0 },
);
