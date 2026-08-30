import type { CostCenter } from "@/types/finance";

export const costCenters: CostCenter[] = [
  {
    id: "cc-operations",
    name: "Operations",
    manager: "Sipho Ndlovu",
    employees: 48,
    budget: 3_420_000,
    actual: 3_218_400,
    variance: 201_600,
  },
  {
    id: "cc-sales",
    name: "Sales",
    manager: "Aisha Patel",
    employees: 26,
    budget: 1_860_000,
    actual: 1_942_500,
    variance: -82_500,
  },
  {
    id: "cc-marketing",
    name: "Marketing",
    manager: "Naledi Khumalo",
    employees: 14,
    budget: 980_000,
    actual: 1_104_200,
    variance: -124_200,
  },
  {
    id: "cc-finance",
    name: "Finance",
    manager: "Morgan Blake",
    employees: 11,
    budget: 1_120_000,
    actual: 1_038_600,
    variance: 81_400,
  },
  {
    id: "cc-technology",
    name: "Technology",
    manager: "Daniel Reyes",
    employees: 22,
    budget: 1_640_000,
    actual: 1_589_300,
    variance: 50_700,
  },
  {
    id: "cc-hr",
    name: "Human Resources",
    manager: "Priya Govender",
    employees: 9,
    budget: 640_000,
    actual: 598_200,
    variance: 41_800,
  },
];

export const departments = costCenters.map((center) => center.name);
