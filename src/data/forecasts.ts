import { amountBetween, createRng } from "@/lib/mock/random";

const rng = createRng(77120);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export interface ForecastRow {
  period: string;
  isForecast: boolean;
  revenue: number;
  expenses: number;
  profit: number;
  cash: number;
}

let cash = 2_180_000;
let revenueBase = 610_000;

export const forecastSeries: ForecastRow[] = months.map((month, index) => {
  const isForecast = index >= 8; // Sep 2026 onward is projected
  revenueBase += amountBetween(rng, -18_000, 42_000, 500);
  const revenue = Math.round(revenueBase * (isForecast ? 1.03 : 1));
  const expenses = Math.round(revenue * (0.62 + rng() * 0.08));
  const profit = revenue - expenses;
  cash += profit - amountBetween(rng, 20_000, 90_000, 500);

  return {
    period: `${month} 2026`,
    isForecast,
    revenue,
    expenses,
    profit,
    cash: Math.round(cash),
  };
});

export interface ForecastScenario {
  id: string;
  name: string;
  description: string;
  revenueGrowth: number;
  expenseGrowth: number;
  projectedProfit: number;
}

export const forecastScenarios: ForecastScenario[] = [
  {
    id: "base",
    name: "Base Case",
    description: "Current trajectory continued through year end with no major changes.",
    revenueGrowth: 4.2,
    expenseGrowth: 3.1,
    projectedProfit: 1_612_000,
  },
  {
    id: "growth",
    name: "Growth Case",
    description: "New distribution contracts land in Q4, lifting revenue faster than costs.",
    revenueGrowth: 9.8,
    expenseGrowth: 4.6,
    projectedProfit: 1_948_000,
  },
  {
    id: "conservative",
    name: "Conservative Case",
    description: "Softer demand and continued cost inflation across operating categories.",
    revenueGrowth: 1.1,
    expenseGrowth: 5.4,
    projectedProfit: 1_204_000,
  },
];
