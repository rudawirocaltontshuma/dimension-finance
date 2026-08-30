/**
 * Core TypeScript types for the Financial Management System demonstration.
 *
 * Everything in this file backs entirely local, fictional mock data
 * (see `src/data/`). Nothing here represents real accounting, banking,
 * tax, or payroll behaviour.
 */

export type CurrencyCode = "ZAR" | "USD" | "EUR" | "GBP";

export type CompanyId = "argent-holdings" | "argent-distribution" | "argent-manufacturing";

export interface Company {
  id: CompanyId;
  name: string;
  legalName: string;
  registrationNumber: string;
  industry: string;
  baseCurrency: CurrencyCode;
  fiscalYearStart: string;
  address: string;
}

export type FiscalPeriodKind = "year" | "quarter" | "month";

export interface FiscalPeriod {
  id: string;
  label: string;
  kind: FiscalPeriodKind;
  startDate: string;
  endDate: string;
  status: "Open" | "In Review" | "Ready to Close" | "Closed";
}

export type AccountType = "Asset" | "Liability" | "Equity" | "Revenue" | "Cost of Sales" | "Expense";

export interface Account {
  code: string;
  name: string;
  type: AccountType;
  parentCode: string | null;
  level: number;
  balance: number;
  openingBalance: number;
  debits: number;
  credits: number;
  status: "Active" | "Inactive";
  description: string;
}

export type TransactionType = "Debit" | "Credit";

export interface Transaction {
  id: string;
  date: string;
  reference: string;
  description: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  balance: number;
  department: string;
  costCenter: string;
  type: TransactionType;
  journalId: string;
}

export type JournalEntryStatus = "Draft" | "Posted" | "Approved" | "Reversed";

export interface JournalEntryLine {
  id: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  department: string;
  costCenter: string;
  memo: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  reference: string;
  status: JournalEntryStatus;
  createdBy: string;
  lines: JournalEntryLine[];
  totalDebit: number;
  totalCredit: number;
}

export type CreditStatus = "Good Standing" | "Watch" | "On Hold";

export interface Customer {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  billingAddress: string;
  industry: string;
  invoiceCount: number;
  outstanding: number;
  overdue: number;
  paid: number;
  revenue: number;
  creditStatus: CreditStatus;
  creditLimit: number;
  currency: CurrencyCode;
  since: string;
}

export type InvoiceStatus = "Draft" | "Sent" | "Partially Paid" | "Paid" | "Overdue" | "Cancelled";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  paid: number;
  balance: number;
  status: InvoiceStatus;
  currency: CurrencyCode;
  accountCode: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  notes: string;
}

export type PaymentMethod = "Bank Transfer" | "Card" | "Cash" | "Electronic Transfer";

export interface ReceivablePayment {
  id: string;
  customerId: string;
  customerName: string;
  invoiceId: string;
  date: string;
  method: PaymentMethod;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

export interface CreditNote {
  id: string;
  customerId: string;
  customerName: string;
  invoiceId: string;
  date: string;
  amount: number;
  reason: string;
  status: "Draft" | "Issued" | "Applied";
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  billCount: number;
  outstanding: number;
  overdue: number;
  paid: number;
  spend: number;
  paymentStatus: "Good Standing" | "Watch" | "On Hold";
  currency: CurrencyCode;
  since: string;
  bankAccountLast4: string;
}

export type BillStatus = "Draft" | "Approved" | "Partially Paid" | "Paid" | "Overdue" | "Disputed";

export interface BillLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
}

export interface Bill {
  id: string;
  supplierId: string;
  supplierName: string;
  purchaseReference: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  paid: number;
  balance: number;
  status: BillStatus;
  currency: CurrencyCode;
  accountCode: string;
  lineItems: BillLineItem[];
  subtotal: number;
  taxTotal: number;
}

export interface PayablePayment {
  id: string;
  supplierId: string;
  supplierName: string;
  billId: string;
  date: string;
  method: PaymentMethod;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

export interface DebitNote {
  id: string;
  supplierId: string;
  supplierName: string;
  billId: string;
  date: string;
  amount: number;
  reason: string;
  status: "Draft" | "Issued" | "Applied";
}

export type ExpenseStatus = "Draft" | "Submitted" | "Approved" | "Rejected" | "Reimbursed";

export interface ExpenseTimelineEvent {
  id: string;
  label: string;
  actor: string;
  date: string;
  note?: string;
}

export interface Expense {
  id: string;
  employeeName: string;
  employeeId: string;
  category: string;
  department: string;
  costCenter: string;
  date: string;
  amount: number;
  currency: CurrencyCode;
  description: string;
  status: ExpenseStatus;
  approver: string;
  submittedDate: string;
  timeline: ExpenseTimelineEvent[];
}

export interface ExpenseCategory {
  id: string;
  name: string;
  monthlySpend: number;
  annualSpend: number;
  budget: number;
  variance: number;
}

export interface Reimbursement {
  id: string;
  employeeName: string;
  amount: number;
  submittedDate: string;
  approvedDate: string | null;
  paymentDate: string | null;
  status: "Pending" | "Approved" | "Paid" | "Rejected";
}

export type BankTransactionStatus = "Unmatched" | "Matched" | "Reconciled" | "Excluded";

export interface BankAccount {
  id: string;
  name: string;
  bankName: string;
  accountType: "Operating" | "Payroll" | "Reserve";
  accountNumberLast4: string;
  currency: CurrencyCode;
  balance: number;
  lastReconciled: string;
  status: "Active" | "Inactive";
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  bankAccountId: string;
  bankAccountName: string;
  amount: number;
  type: "Deposit" | "Withdrawal";
  status: BankTransactionStatus;
  matchedTo?: string;
}

export type BudgetStatus = "On Track" | "At Risk" | "Over Budget" | "Under Review";

export interface Budget {
  id: string;
  name: string;
  period: string;
  department: string;
  category: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  utilization: number;
  status: BudgetStatus;
  monthlyTrend: { month: string; budget: number; actual: number }[];
}

export interface ForecastPoint {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  cash: number;
}

export interface CostCenter {
  id: string;
  name: string;
  manager: string;
  employees: number;
  budget: number;
  actual: number;
  variance: number;
}

export type AssetStatus = "Active" | "Fully Depreciated" | "Disposed" | "Under Maintenance";

export interface FixedAsset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  cost: number;
  usefulLifeYears: number;
  accumulatedDepreciation: number;
  netBookValue: number;
  location: string;
  department: string;
  status: AssetStatus;
}

export interface DepreciationRecord {
  assetId: string;
  assetName: string;
  period: string;
  openingValue: number;
  depreciation: number;
  accumulatedDepreciation: number;
  closingValue: number;
}

export type NotificationCategory =
  | "receivables"
  | "payables"
  | "banking"
  | "budgeting"
  | "close"
  | "expenses"
  | "system";

export interface AppNotification {
  id: string;
  title: string;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  href?: string;
}

export interface ReportMeta {
  id: string;
  name: string;
  description: string;
  category: string;
  period: string;
  lastUpdated: string;
  href: string;
}

export interface TimelineEvent {
  id: string;
  label: string;
  actor: string;
  date: string;
  note?: string;
}
