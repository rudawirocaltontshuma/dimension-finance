import { leafAccounts } from "@/data/accounts";
import { costCenters } from "@/data/costCenters";
import { employees } from "@/data/employees";
import { addDaysIso, amountBetween, createRng, intBetween, pick, sequence, weightedPick } from "@/lib/mock/random";
import type { JournalEntry, JournalEntryLine, JournalEntryStatus, Transaction } from "@/types/finance";

const rng = createRng(83217);
const TODAY = "2026-08-30";

const financeEmployees = employees.filter((employee) => employee.department === "Finance").map((e) => e.name);

const narrations = [
  "Customer invoice posting",
  "Supplier bill accrual",
  "Monthly payroll journal",
  "Depreciation journal entry",
  "Bank charges and fees",
  "VAT adjustment entry",
  "Inventory valuation adjustment",
  "Revenue recognition — service contract",
  "Foreign exchange revaluation",
  "Prepaid expense amortization",
  "Rent and occupancy journal",
  "Interest income accrual",
  "Provision for bad debts",
  "Intercompany recharge",
  "Fixed asset acquisition",
  "Loan repayment journal",
  "Sundry expense reclassification",
  "Year-to-date reserve transfer",
  "Bonus provision adjustment",
  "Software subscription accrual",
];

const debitLeaf = leafAccounts.filter((a) => a.type === "Expense" || a.type === "Cost of Sales" || a.type === "Asset");
const creditLeaf = leafAccounts.filter(
  (a) => a.type === "Liability" || a.type === "Revenue" || a.type === "Equity" || a.type === "Asset",
);

function pickDistinct<T>(arr: readonly T[], n: number) {
  const pool = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && pool.length; i++) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool.splice(idx, 1)[0] as T);
  }
  return out;
}

function statusFor(): JournalEntryStatus {
  return weightedPick(rng, [
    ["Posted", 0.48],
    ["Approved", 0.34],
    ["Draft", 0.1],
    ["Reversed", 0.08],
  ]);
}

const journalEntries: JournalEntry[] = [];
let jeCounter = 4001;

for (let i = 0; i < 96; i++) {
  const date = addDaysIso(TODAY, -intBetween(rng, 0, 240));
  const lineCount = intBetween(rng, 2, 4);
  const total = amountBetween(rng, 4_000, 320_000, 100);

  const debitAccounts = pickDistinct(debitLeaf, Math.max(1, lineCount - 1));
  const creditAccount = pick(rng, creditLeaf);
  const costCenter = pick(rng, costCenters);

  const lines: JournalEntryLine[] = [];
  let remaining = total;

  debitAccounts.forEach((account, index) => {
    const isLast = index === debitAccounts.length - 1;
    const amount = isLast ? remaining : Math.round(remaining * amountBetween(rng, 30, 70, 1) * 0.01);
    remaining -= amount;
    lines.push({
      id: `L${index + 1}`,
      accountCode: account.code,
      accountName: account.name,
      debit: amount,
      credit: 0,
      department: costCenter.name,
      costCenter: costCenter.name,
      memo: pick(rng, narrations),
    });
  });

  lines.push({
    id: `L${lines.length + 1}`,
    accountCode: creditAccount.code,
    accountName: creditAccount.name,
    debit: 0,
    credit: total,
    department: costCenter.name,
    costCenter: costCenter.name,
    memo: pick(rng, narrations),
  });

  const id = sequence("JE", jeCounter, 0);
  jeCounter += 1;

  journalEntries.push({
    id,
    date,
    description: pick(rng, narrations),
    reference: `REF-${intBetween(rng, 500000, 999999)}`,
    status: statusFor(),
    createdBy: pick(rng, financeEmployees.length ? financeEmployees : ["Morgan Blake"]),
    lines,
    totalDebit: total,
    totalCredit: total,
  });
}

// Sort newest first for display convenience.
journalEntries.sort((a, b) => (a.date < b.date ? 1 : -1));

export const generatedJournalEntries = journalEntries;

// Flatten journal entry lines into General Ledger transaction rows, tracking a
// running balance per account in chronological order.
const chronological = [...journalEntries].sort((a, b) => (a.date > b.date ? 1 : -1));
const runningBalances = new Map<string, number>();
const transactions: Transaction[] = [];
let txCounter = 1;

for (const entry of chronological) {
  for (const line of entry.lines) {
    const previous = runningBalances.get(line.accountCode) ?? 0;
    const isDebitNormal =
      leafAccounts.find((a) => a.code === line.accountCode)?.type !== "Liability" &&
      leafAccounts.find((a) => a.code === line.accountCode)?.type !== "Revenue" &&
      leafAccounts.find((a) => a.code === line.accountCode)?.type !== "Equity";
    const delta = isDebitNormal ? line.debit - line.credit : line.credit - line.debit;
    const balance = previous + delta;
    runningBalances.set(line.accountCode, balance);

    transactions.push({
      id: sequence("TXN", 700000 + txCounter, 0),
      date: entry.date,
      reference: entry.reference,
      description: line.memo || entry.description,
      accountCode: line.accountCode,
      accountName: line.accountName,
      debit: line.debit,
      credit: line.credit,
      balance,
      department: line.department,
      costCenter: line.costCenter,
      type: line.debit > 0 ? "Debit" : "Credit",
      journalId: entry.id,
    });
    txCounter += 1;
  }
}

// Present newest first, matching typical ledger review order.
transactions.sort((a, b) => b.date.localeCompare(a.date));

export const generatedTransactions = transactions;
