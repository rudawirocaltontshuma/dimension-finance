import { customerCompanyNames, employeeNames, streetAddress } from "@/lib/mock/names";
import {
  addDaysIso,
  amountBetween,
  chance,
  createRng,
  intBetween,
  pick,
  sequence,
  weightedPick,
} from "@/lib/mock/random";
import type {
  CreditNote,
  CreditStatus,
  Customer,
  Invoice,
  InvoiceLineItem,
  InvoiceStatus,
  ReceivablePayment,
} from "@/types/finance";

const rng = createRng(70211);

const TODAY = "2026-08-30";

const industries = [
  "Retail",
  "Logistics",
  "Manufacturing",
  "Agriculture",
  "Hospitality",
  "Energy",
  "Construction",
  "Healthcare",
  "Technology",
  "Financial Services",
  "Real Estate",
  "Mining",
];

const productDescriptions = [
  "Consulting services retainer",
  "Wholesale product supply — Q3 order",
  "Annual service level agreement",
  "Freight and logistics coordination",
  "Software integration services",
  "Bulk inventory replenishment",
  "On-site installation and setup",
  "Maintenance and support contract",
  "Custom fabrication order",
  "Distribution channel fee",
  "Training and onboarding services",
  "Equipment lease — quarterly",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 12);
}

interface CustomerProfile {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  billingAddress: string;
  industry: string;
  creditStatus: CreditStatus;
  creditLimit: number;
  since: string;
}

export const customerProfiles: CustomerProfile[] = customerCompanyNames.map((name, index) => ({
  id: sequence("CUST", index + 1, 4),
  name,
  contactName: pick(
    rng,
    employeeNames.filter((n) => n !== "Morgan Blake"),
  ),
  email: `accounts@${slugify(name)}.co.za`,
  phone: `+27 ${intBetween(rng, 10, 87)} ${intBetween(rng, 100, 999)} ${intBetween(rng, 1000, 9999)}`,
  billingAddress: streetAddress(rng),
  industry: pick(rng, industries),
  creditStatus: weightedPick<CreditStatus>(rng, [
    ["Good Standing", 0.7],
    ["Watch", 0.22],
    ["On Hold", 0.08],
  ]),
  creditLimit: amountBetween(rng, 150_000, 1_200_000, 5000),
  since: `20${intBetween(rng, 17, 25)}-${String(intBetween(rng, 1, 12)).padStart(2, "0")}-${String(intBetween(rng, 1, 28)).padStart(2, "0")}`,
}));

function buildLineItems(rngFn: typeof rng): {
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
} {
  const count = intBetween(rngFn, 1, 4);
  const lineItems: InvoiceLineItem[] = [];
  let subtotal = 0;
  let discountTotal = 0;

  for (let i = 0; i < count; i++) {
    const quantity = intBetween(rngFn, 1, 40);
    const unitPrice = amountBetween(rngFn, 350, 18_000, 10);
    const discountPercent = pick(rngFn, [0, 0, 0, 5, 10]);
    const taxPercent = 15;
    const lineGross = quantity * unitPrice;
    const lineDiscount = Math.round(lineGross * (discountPercent / 100));

    subtotal += lineGross - lineDiscount;
    discountTotal += lineDiscount;

    lineItems.push({
      id: `LI-${i + 1}`,
      description: pick(rngFn, productDescriptions),
      quantity,
      unitPrice,
      discountPercent,
      taxPercent,
    });
  }

  const taxTotal = Math.round(subtotal * 0.15);
  return { lineItems, subtotal, discountTotal, taxTotal };
}

let invoiceCounter = 10041;
let paymentCounter = 5201;
let creditNoteCounter = 901;

const invoices: Invoice[] = [];
const payments: ReceivablePayment[] = [];
const creditNotes: CreditNote[] = [];

for (const profile of customerProfiles) {
  const invoiceCount = intBetween(rng, 3, 10);

  for (let i = 0; i < invoiceCount; i++) {
    const { lineItems, subtotal, discountTotal, taxTotal } = buildLineItems(rng);
    const amount = subtotal + taxTotal;
    const issueDate = addDaysIso(TODAY, -intBetween(rng, 5, 260));
    const termDays = pick(rng, [15, 30, 30, 30, 45, 60]);
    const dueDate = addDaysIso(issueDate, termDays);
    const isOverdue = dueDate < TODAY;

    let status: InvoiceStatus;
    let paid: number;

    if (chance(rng, 0.03)) {
      status = "Cancelled";
      paid = 0;
    } else if (chance(rng, 0.04)) {
      status = "Draft";
      paid = 0;
    } else if (isOverdue) {
      if (chance(rng, 0.35)) {
        status = "Partially Paid";
        paid = Math.round(amount * (0.2 + rng() * 0.5));
      } else {
        status = "Overdue";
        paid = 0;
      }
    } else if (chance(rng, 0.6)) {
      status = "Paid";
      paid = amount;
    } else if (chance(rng, 0.5)) {
      status = "Partially Paid";
      paid = Math.round(amount * (0.2 + rng() * 0.5));
    } else {
      status = "Sent";
      paid = 0;
    }

    const invoiceId = sequence("INV", invoiceCounter, 0);
    invoiceCounter += intBetween(rng, 1, 3);

    invoices.push({
      id: invoiceId,
      customerId: profile.id,
      customerName: profile.name,
      issueDate,
      dueDate,
      amount,
      paid,
      balance: Math.max(0, amount - paid),
      status,
      currency: "ZAR",
      accountCode: chance(rng, 0.85) ? "1210" : "1220",
      lineItems,
      subtotal,
      discountTotal,
      taxTotal,
      notes: "Payment due within terms. Bank details are listed at the foot of this invoice.",
    });

    if (paid > 0) {
      const paymentDate = addDaysIso(dueDate, -intBetween(rng, 0, termDays));
      payments.push({
        id: sequence("PMT", paymentCounter, 0),
        customerId: profile.id,
        customerName: profile.name,
        invoiceId,
        date: paymentDate < issueDate ? issueDate : paymentDate,
        method: weightedPick(rng, [
          ["Bank Transfer", 0.5],
          ["Electronic Transfer", 0.3],
          ["Card", 0.15],
          ["Cash", 0.05],
        ]),
        amount: paid,
        status: chance(rng, 0.05) ? "Pending" : "Completed",
      });
      paymentCounter += 1;
    }

    if (status === "Paid" && chance(rng, 0.08)) {
      const creditAmount = Math.round(amount * (0.05 + rng() * 0.15));
      creditNotes.push({
        id: sequence("CN", creditNoteCounter, 0),
        customerId: profile.id,
        customerName: profile.name,
        invoiceId,
        date: addDaysIso(dueDate, intBetween(rng, 1, 20)),
        amount: creditAmount,
        reason: pick(rng, [
          "Pricing adjustment",
          "Returned goods",
          "Service credit",
          "Volume rebate",
          "Billing correction",
        ]),
        status: weightedPick(rng, [
          ["Applied", 0.6],
          ["Issued", 0.3],
          ["Draft", 0.1],
        ]),
      });
      creditNoteCounter += 1;
    }
  }
}

function computeAggregates() {
  const map = new Map<
    string,
    { invoiceCount: number; revenue: number; paid: number; outstanding: number; overdue: number }
  >();
  for (const profile of customerProfiles) {
    map.set(profile.id, { invoiceCount: 0, revenue: 0, paid: 0, outstanding: 0, overdue: 0 });
  }
  for (const invoice of invoices) {
    if (invoice.status === "Cancelled" || invoice.status === "Draft") continue;
    const entry = map.get(invoice.customerId);
    if (!entry) continue;
    entry.invoiceCount += 1;
    entry.revenue += invoice.amount;
    entry.paid += invoice.paid;
    entry.outstanding += invoice.balance;
    if (invoice.status === "Overdue" || (invoice.status === "Partially Paid" && invoice.dueDate < TODAY)) {
      entry.overdue += invoice.balance;
    }
  }
  return map;
}

const aggregates = computeAggregates();

export const customers: Customer[] = customerProfiles.map((profile) => {
  const aggregate = aggregates.get(profile.id) ?? { invoiceCount: 0, revenue: 0, paid: 0, outstanding: 0, overdue: 0 };
  return {
    id: profile.id,
    name: profile.name,
    contactName: profile.contactName,
    email: profile.email,
    phone: profile.phone,
    billingAddress: profile.billingAddress,
    industry: profile.industry,
    invoiceCount: aggregate.invoiceCount,
    outstanding: aggregate.outstanding,
    overdue: aggregate.overdue,
    paid: aggregate.paid,
    revenue: aggregate.revenue,
    creditStatus: profile.creditStatus,
    creditLimit: profile.creditLimit,
    currency: "ZAR",
    since: profile.since,
  } satisfies Customer;
});

export const generatedInvoices = invoices;
export const generatedPayments = payments;
export const generatedCreditNotes = creditNotes;
