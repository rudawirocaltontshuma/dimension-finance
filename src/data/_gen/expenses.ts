import { costCenters } from "@/data/costCenters";
import { employees } from "@/data/employees";
import { addDaysIso, amountBetween, createRng, intBetween, pick, sequence, weightedPick } from "@/lib/mock/random";
import type { Expense, ExpenseCategory, ExpenseStatus, ExpenseTimelineEvent, Reimbursement } from "@/types/finance";

const rng = createRng(48123);
const TODAY = "2026-08-30";

export const expenseCategoryNames = [
  "Travel",
  "Office",
  "Software",
  "Marketing",
  "Utilities",
  "Professional Services",
  "Equipment",
  "Operations",
];

const categoryBudgets: Record<string, number> = {
  Travel: 480_000,
  Office: 210_000,
  Software: 360_000,
  Marketing: 620_000,
  Utilities: 190_000,
  "Professional Services": 340_000,
  Equipment: 280_000,
  Operations: 410_000,
};

const descriptionsByCategory: Record<string, string[]> = {
  Travel: [
    "Client site visit — flights and accommodation",
    "Regional sales trip",
    "Conference travel",
    "Airport transfer and parking",
  ],
  Office: ["Office supplies restock", "Printer consumables", "Kitchen and pantry supplies", "Desk equipment purchase"],
  Software: [
    "SaaS subscription renewal",
    "Design software license",
    "Analytics tool subscription",
    "Developer tooling license",
  ],
  Marketing: ["Trade show booth costs", "Sponsored social campaign", "Promotional materials", "Client gifting"],
  Utilities: ["Mobile data and airtime", "Branch electricity top-up", "Internet connectivity", "Courier and postage"],
  "Professional Services": [
    "Legal consultation fee",
    "External audit support",
    "Recruitment agency fee",
    "Contractor invoice",
  ],
  Equipment: ["Laptop replacement", "Office furniture", "Warehouse equipment", "Safety equipment purchase"],
  Operations: ["Fleet fuel costs", "Warehouse consumables", "Equipment maintenance", "Site consumables"],
};

function buildTimeline(status: ExpenseStatus, submittedDate: string, approver: string): ExpenseTimelineEvent[] {
  const timeline: ExpenseTimelineEvent[] = [
    { id: "t1", label: "Expense created", actor: "Employee", date: submittedDate },
    { id: "t2", label: "Submitted for approval", actor: "Employee", date: submittedDate },
  ];

  if (status === "Draft") return [timeline[0]];
  if (status === "Submitted") return timeline;

  if (status === "Rejected") {
    timeline.push({
      id: "t3",
      label: "Rejected",
      actor: approver,
      date: addDaysIso(submittedDate, intBetween(rng, 1, 4)),
      note: "Missing supporting receipt — please resubmit with documentation.",
    });
    return timeline;
  }

  timeline.push({
    id: "t3",
    label: "Approved",
    actor: approver,
    date: addDaysIso(submittedDate, intBetween(rng, 1, 4)),
  });

  if (status === "Reimbursed") {
    timeline.push({
      id: "t4",
      label: "Reimbursement paid",
      actor: "Finance",
      date: addDaysIso(submittedDate, intBetween(rng, 5, 12)),
    });
  }

  return timeline;
}

const approvers = ["Morgan Blake", "Priya Govender", "Daniel Reyes"];

const expenses: Expense[] = [];
let expenseCounter = 3401;

const nonMorganEmployees = employees.filter((employee) => employee.name !== "Morgan Blake");

for (let i = 0; i < 118; i++) {
  const employee = pick(rng, nonMorganEmployees);
  const category = pick(rng, expenseCategoryNames);
  const costCenter = costCenters.find((center) => center.name === employee.department) ?? costCenters[0];
  const submittedDate = addDaysIso(TODAY, -intBetween(rng, 1, 230));
  const status: ExpenseStatus = weightedPick(rng, [
    ["Reimbursed", 0.42],
    ["Approved", 0.16],
    ["Submitted", 0.22],
    ["Rejected", 0.08],
    ["Draft", 0.12],
  ]);
  const approver = pick(rng, approvers);

  expenses.push({
    id: sequence("EXP", expenseCounter, 0),
    employeeName: employee.name,
    employeeId: employee.id,
    category,
    department: employee.department,
    costCenter: costCenter.name,
    date: submittedDate,
    amount: amountBetween(rng, 350, 28_000, 10),
    currency: "ZAR",
    description: pick(rng, descriptionsByCategory[category] ?? ["General business expense"]),
    status,
    approver,
    submittedDate,
    timeline: buildTimeline(status, submittedDate, approver),
  });
  expenseCounter += 1;
}

export const generatedExpenses = expenses;

function computeCategoryAggregates(): ExpenseCategory[] {
  return expenseCategoryNames.map((name, index) => {
    const relevant = expenses.filter(
      (expense) => expense.category === name && expense.status !== "Rejected" && expense.status !== "Draft",
    );
    const annualSpend = relevant.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlySpend = Math.round(annualSpend / 8);
    const budget = categoryBudgets[name] ?? 300_000;
    return {
      id: `CAT-${index + 1}`,
      name,
      monthlySpend,
      annualSpend,
      budget,
      variance: budget - annualSpend,
    };
  });
}

export const generatedExpenseCategories = computeCategoryAggregates();

function computeReimbursements(): Reimbursement[] {
  return expenses
    .filter((expense) => expense.status === "Approved" || expense.status === "Reimbursed")
    .map((expense, index) => {
      const approvedEvent = expense.timeline.find((event) => event.label === "Approved");
      const paidEvent = expense.timeline.find((event) => event.label === "Reimbursement paid");
      return {
        id: sequence("RB", 8100 + index, 0),
        employeeName: expense.employeeName,
        amount: expense.amount,
        submittedDate: expense.submittedDate,
        approvedDate: approvedEvent?.date ?? null,
        paymentDate: paidEvent?.date ?? null,
        status: expense.status === "Reimbursed" ? "Paid" : "Approved",
      } satisfies Reimbursement;
    });
}

export const generatedReimbursements = computeReimbursements();
