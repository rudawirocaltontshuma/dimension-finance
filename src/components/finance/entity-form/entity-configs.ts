import { expenseCategoryNames } from "@/data/_gen/expenses";
import { leafAccounts } from "@/data/accounts";
import { costCenters } from "@/data/costCenters";
import { customers } from "@/data/customers";
import { suppliers } from "@/data/suppliers";

import type { FieldConfig } from "./field-types";

const accountOptions = leafAccounts.map((a) => ({ label: `${a.code} · ${a.name}`, value: a.code }));
const customerOptions = customers.map((c) => ({ label: c.name, value: c.id }));
const supplierOptions = suppliers.map((s) => ({ label: s.name, value: s.id }));
const costCenterOptions = costCenters.map((c) => ({ label: c.name, value: c.name }));

export const customerFormFields: FieldConfig[] = [
  { name: "name", label: "Customer Name", type: "text", required: true, placeholder: "e.g. Nexora Retail Group" },
  { name: "industry", label: "Industry", type: "text", required: true, placeholder: "e.g. Retail" },
  { name: "contactName", label: "Primary Contact", type: "text", required: true, placeholder: "Contact person" },
  { name: "email", label: "Billing Email", type: "email", required: true, placeholder: "accounts@company.co.za" },
  {
    name: "billingAddress",
    label: "Billing Address",
    type: "textarea",
    description: "Used on invoices and statements.",
  },
  {
    name: "creditStatus",
    label: "Credit Status",
    type: "select",
    required: true,
    options: [
      { label: "Good Standing", value: "Good Standing" },
      { label: "Watch", value: "Watch" },
      { label: "On Hold", value: "On Hold" },
    ],
  },
  { name: "sendStatements", label: "", type: "switch", placeholder: "Send monthly statements automatically" },
];

export const supplierFormFields: FieldConfig[] = [
  { name: "name", label: "Supplier Name", type: "text", required: true, placeholder: "e.g. Kingsley Paper & Print" },
  { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Office & Administration" },
  { name: "contactName", label: "Primary Contact", type: "text", required: true },
  { name: "email", label: "Contact Email", type: "email", required: true },
  { name: "address", label: "Address", type: "textarea" },
  {
    name: "paymentStatus",
    label: "Payment Status",
    type: "select",
    required: true,
    options: [
      { label: "Good Standing", value: "Good Standing" },
      { label: "Watch", value: "Watch" },
      { label: "On Hold", value: "On Hold" },
    ],
  },
];

export const invoiceFormFields: FieldConfig[] = [
  {
    name: "customerId",
    label: "Customer",
    type: "combobox",
    required: true,
    options: customerOptions,
    placeholder: "Select a customer",
  },
  { name: "issueDate", label: "Issue Date", type: "date", required: true },
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  {
    name: "accountCode",
    label: "Revenue Account",
    type: "select",
    required: true,
    options: accountOptions.filter((o) => o.value.startsWith("12")),
  },
  { name: "amount", label: "Amount (ZAR)", type: "number", required: true, placeholder: "0.00" },
  { name: "notes", label: "Notes", type: "textarea", description: "Shown on the invoice footer." },
  { name: "sendImmediately", label: "", type: "checkbox", placeholder: "Send to customer immediately" },
];

export const billFormFields: FieldConfig[] = [
  {
    name: "supplierId",
    label: "Supplier",
    type: "combobox",
    required: true,
    options: supplierOptions,
    placeholder: "Select a supplier",
  },
  { name: "purchaseReference", label: "Purchase Reference", type: "text", placeholder: "PO-40182" },
  { name: "issueDate", label: "Issue Date", type: "date", required: true },
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  { name: "amount", label: "Amount (ZAR)", type: "number", required: true },
];

export const expenseFormFields: FieldConfig[] = [
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: expenseCategoryNames.map((name) => ({ label: name, value: name })),
  },
  { name: "costCenter", label: "Cost Center", type: "select", required: true, options: costCenterOptions },
  { name: "date", label: "Expense Date", type: "date", required: true },
  { name: "amount", label: "Amount (ZAR)", type: "number", required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "What was this expense for?",
  },
  {
    name: "hasReceipt",
    label: "",
    type: "checkbox",
    placeholder: "Receipt attached",
    defaultValue: true,
  },
];

export const paymentFormFields: FieldConfig[] = [
  { name: "customerId", label: "Customer", type: "combobox", required: true, options: customerOptions },
  { name: "date", label: "Payment Date", type: "date", required: true },
  { name: "amount", label: "Amount (ZAR)", type: "number", required: true },
  {
    name: "method",
    label: "Method",
    type: "radio",
    required: true,
    options: [
      { label: "Bank Transfer", value: "Bank Transfer" },
      { label: "Card", value: "Card" },
      { label: "Cash", value: "Cash" },
      { label: "Electronic Transfer", value: "Electronic Transfer" },
    ],
  },
];

export const journalEntryFormFields: FieldConfig[] = [
  { name: "date", label: "Date", type: "date", required: true },
  { name: "description", label: "Description", type: "text", required: true, placeholder: "e.g. Monthly rent journal" },
  { name: "reference", label: "Reference", type: "text", placeholder: "REF-000000" },
  { name: "debitAccount", label: "Debit Account", type: "combobox", required: true, options: accountOptions },
  { name: "creditAccount", label: "Credit Account", type: "combobox", required: true, options: accountOptions },
  { name: "amount", label: "Amount (ZAR)", type: "number", required: true },
];

export const accountFormFields: FieldConfig[] = [
  { name: "code", label: "Account Code", type: "text", required: true, placeholder: "e.g. 6994" },
  { name: "name", label: "Account Name", type: "text", required: true },
  {
    name: "type",
    label: "Account Type",
    type: "select",
    required: true,
    options: [
      { label: "Asset", value: "Asset" },
      { label: "Liability", value: "Liability" },
      { label: "Equity", value: "Equity" },
      { label: "Revenue", value: "Revenue" },
      { label: "Cost of Sales", value: "Cost of Sales" },
      { label: "Expense", value: "Expense" },
    ],
  },
  { name: "description", label: "Description", type: "textarea" },
];

export const budgetFormFields: FieldConfig[] = [
  { name: "name", label: "Budget Name", type: "text", required: true },
  { name: "department", label: "Department", type: "select", required: true, options: costCenterOptions },
  { name: "period", label: "Period", type: "text", required: true, placeholder: "e.g. FY2026" },
  { name: "budgetAmount", label: "Budget Amount (ZAR)", type: "number", required: true },
];

export const costCenterFormFields: FieldConfig[] = [
  { name: "name", label: "Cost Center Name", type: "text", required: true },
  { name: "manager", label: "Manager", type: "text", required: true },
  { name: "budget", label: "Annual Budget (ZAR)", type: "number", required: true },
  { name: "employees", label: "Employees", type: "number" },
];

export const fixedAssetFormFields: FieldConfig[] = [
  { name: "name", label: "Asset Name", type: "text", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      "Computer Equipment",
      "Motor Vehicles",
      "Furniture & Fittings",
      "Machinery & Plant",
      "Office Equipment",
      "Buildings & Leasehold Improvements",
    ].map((name) => ({ label: name, value: name })),
  },
  { name: "purchaseDate", label: "Purchase Date", type: "date", required: true },
  { name: "cost", label: "Purchase Cost (ZAR)", type: "number", required: true },
  { name: "usefulLifeYears", label: "Useful Life (years)", type: "number", required: true },
];

export const bankTransactionFormFields: FieldConfig[] = [
  { name: "date", label: "Date", type: "date", required: true },
  { name: "description", label: "Description", type: "text", required: true },
  { name: "amount", label: "Amount (ZAR)", type: "number", required: true },
  {
    name: "type",
    label: "Type",
    type: "radio",
    required: true,
    options: [
      { label: "Deposit", value: "Deposit" },
      { label: "Withdrawal", value: "Withdrawal" },
    ],
  },
];
