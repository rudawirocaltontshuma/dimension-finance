import { addDaysIso, amountBetween, createRng, intBetween, pick, sequence, weightedPick } from "@/lib/mock/random";
import type { BankAccount, BankTransaction, BankTransactionStatus } from "@/types/finance";

const rng = createRng(61207);
const TODAY = "2026-08-30";

export const bankAccounts: BankAccount[] = [
  {
    id: "BANK-001",
    name: "Argent Operating Account",
    bankName: "Meridian National Bank",
    accountType: "Operating",
    accountNumberLast4: "4821",
    currency: "ZAR",
    balance: 2_412_600,
    lastReconciled: "2026-08-15",
    status: "Active",
  },
  {
    id: "BANK-002",
    name: "Argent Payroll Account",
    bankName: "Cape Union Bank",
    accountType: "Payroll",
    accountNumberLast4: "7734",
    currency: "ZAR",
    balance: 684_200,
    lastReconciled: "2026-08-22",
    status: "Active",
  },
  {
    id: "BANK-003",
    name: "Argent Reserve Account",
    bankName: "Highveld Commercial Bank",
    accountType: "Reserve",
    accountNumberLast4: "1150",
    currency: "ZAR",
    balance: 846_000,
    lastReconciled: "2026-08-05",
    status: "Active",
  },
];

const depositDescriptions = [
  "Customer payment received",
  "EFT deposit — receivables",
  "Point of sale settlement",
  "Interest earned",
  "Refund received",
];

const withdrawalDescriptions = [
  "Supplier payment — EFT",
  "Payroll disbursement",
  "Bank service fee",
  "Debit order — insurance premium",
  "Utility payment",
  "Tax payment — SARS",
  "Card purchase — office supplies",
  "Loan repayment",
];

function buildTransactions(): BankTransaction[] {
  const transactions: BankTransaction[] = [];
  let counter = 88401;

  for (let i = 0; i < 132; i++) {
    const account = pick(rng, bankAccounts);
    const type: "Deposit" | "Withdrawal" = weightedPick(rng, [
      ["Deposit", 0.42],
      ["Withdrawal", 0.58],
    ]);
    const status: BankTransactionStatus = weightedPick(rng, [
      ["Reconciled", 0.55],
      ["Matched", 0.24],
      ["Unmatched", 0.16],
      ["Excluded", 0.05],
    ]);

    transactions.push({
      id: sequence("BTX", counter, 0),
      date: addDaysIso(TODAY, -intBetween(rng, 0, 200)),
      description: type === "Deposit" ? pick(rng, depositDescriptions) : pick(rng, withdrawalDescriptions),
      reference: `REF-${intBetween(rng, 100000, 999999)}`,
      bankAccountId: account.id,
      bankAccountName: account.name,
      amount: amountBetween(rng, 850, 186_000, 10),
      type,
      status,
      matchedTo:
        status === "Matched" || status === "Reconciled"
          ? `${type === "Deposit" ? "INV" : "BILL"}-${intBetween(rng, 10000, 29999)}`
          : undefined,
    });
    counter += 1;
  }

  return transactions.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const bankTransactions: BankTransaction[] = buildTransactions();

export function getBankAccount(id: string): BankAccount | undefined {
  return bankAccounts.find((account) => account.id === id);
}

export function getTransactionsForAccount(accountId: string): BankTransaction[] {
  return bankTransactions.filter((transaction) => transaction.bankAccountId === accountId);
}

export interface ReconciliationSummary {
  bankAccountId: string;
  bankAccountName: string;
  statementBalance: number;
  bookBalance: number;
  difference: number;
  matchedCount: number;
  unmatchedCount: number;
}

export const reconciliationSummaries: ReconciliationSummary[] = bankAccounts.map((account) => {
  const accountTransactions = getTransactionsForAccount(account.id);
  const unmatched = accountTransactions.filter((t) => t.status === "Unmatched");
  const unmatchedDelta = unmatched.reduce((sum, t) => sum + (t.type === "Deposit" ? t.amount : -t.amount), 0);
  const bookBalance = account.balance - unmatchedDelta;

  return {
    bankAccountId: account.id,
    bankAccountName: account.name,
    statementBalance: account.balance,
    bookBalance,
    difference: account.balance - bookBalance,
    matchedCount: accountTransactions.filter((t) => t.status === "Matched" || t.status === "Reconciled").length,
    unmatchedCount: unmatched.length,
  };
});
