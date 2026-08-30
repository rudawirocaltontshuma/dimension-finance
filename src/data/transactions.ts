import { generatedTransactions } from "@/data/_gen/ledger";
import type { Transaction } from "@/types/finance";

export const transactions: Transaction[] = generatedTransactions;

export function getTransactionsForAccount(accountCode: string): Transaction[] {
  return transactions.filter((transaction) => transaction.accountCode === accountCode);
}

export function getTransactionsForJournal(journalId: string): Transaction[] {
  return transactions.filter((transaction) => transaction.journalId === journalId);
}
