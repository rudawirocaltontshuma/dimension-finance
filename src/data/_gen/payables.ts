import { employeeNames, streetAddress, supplierCompanyNames } from "@/lib/mock/names";
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
import type { Bill, BillLineItem, BillStatus, DebitNote, PayablePayment, Supplier } from "@/types/finance";

const rng = createRng(30871);

const TODAY = "2026-08-30";

const categories = [
  "Office & Administration",
  "Technology & Software",
  "Logistics & Freight",
  "Facilities & Maintenance",
  "Professional Services",
  "Marketing & Print",
  "Utilities & Telecoms",
  "Equipment & Fleet",
];

const purchaseDescriptions = [
  "Monthly service subscription",
  "Bulk stationery and office supplies",
  "Fleet maintenance and servicing",
  "IT infrastructure support contract",
  "Freight and courier services",
  "Facilities cleaning contract",
  "Consulting and advisory services",
  "Utilities — electricity and water",
  "Printing and signage order",
  "Equipment rental — quarterly",
  "Software license renewal",
  "Security services contract",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 12);
}

interface SupplierProfile {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  paymentStatus: Supplier["paymentStatus"];
  since: string;
  bankAccountLast4: string;
}

const supplierProfiles: SupplierProfile[] = supplierCompanyNames.map((name, index) => ({
  id: sequence("SUP", index + 1, 4),
  name,
  contactName: pick(
    rng,
    employeeNames.filter((n) => n !== "Morgan Blake"),
  ),
  email: `payables@${slugify(name)}.co.za`,
  phone: `+27 ${intBetween(rng, 10, 87)} ${intBetween(rng, 100, 999)} ${intBetween(rng, 1000, 9999)}`,
  address: streetAddress(rng),
  category: pick(rng, categories),
  paymentStatus: weightedPick(rng, [
    ["Good Standing", 0.75],
    ["Watch", 0.18],
    ["On Hold", 0.07],
  ]),
  since: `20${intBetween(rng, 17, 25)}-${String(intBetween(rng, 1, 12)).padStart(2, "0")}-${String(intBetween(rng, 1, 28)).padStart(2, "0")}`,
  bankAccountLast4: String(intBetween(rng, 1000, 9999)),
}));

function buildLineItems(): { lineItems: BillLineItem[]; subtotal: number; taxTotal: number } {
  const count = intBetween(rng, 1, 3);
  const lineItems: BillLineItem[] = [];
  let subtotal = 0;

  for (let i = 0; i < count; i++) {
    const quantity = intBetween(rng, 1, 25);
    const unitPrice = amountBetween(rng, 300, 22_000, 10);
    subtotal += quantity * unitPrice;
    lineItems.push({
      id: `LI-${i + 1}`,
      description: pick(rng, purchaseDescriptions),
      quantity,
      unitPrice,
      taxPercent: 15,
    });
  }

  const taxTotal = Math.round(subtotal * 0.15);
  return { lineItems, subtotal, taxTotal };
}

let billCounter = 20182;
let paymentCounter = 6301;
let debitNoteCounter = 401;

const bills: Bill[] = [];
const payments: PayablePayment[] = [];
const debitNotes: DebitNote[] = [];

for (const profile of supplierProfiles) {
  const billCount = intBetween(rng, 1, 4);

  for (let i = 0; i < billCount; i++) {
    const { lineItems, subtotal, taxTotal } = buildLineItems();
    const amount = subtotal + taxTotal;
    const issueDate = addDaysIso(TODAY, -intBetween(rng, 3, 220));
    const termDays = pick(rng, [15, 30, 30, 45, 60]);
    const dueDate = addDaysIso(issueDate, termDays);
    const isOverdue = dueDate < TODAY;

    let status: BillStatus;
    let paid: number;

    if (chance(rng, 0.03)) {
      status = "Disputed";
      paid = 0;
    } else if (chance(rng, 0.05)) {
      status = "Draft";
      paid = 0;
    } else if (isOverdue) {
      if (chance(rng, 0.4)) {
        status = "Partially Paid";
        paid = Math.round(amount * (0.25 + rng() * 0.45));
      } else {
        status = "Overdue";
        paid = 0;
      }
    } else if (chance(rng, 0.55)) {
      status = "Paid";
      paid = amount;
    } else if (chance(rng, 0.4)) {
      status = "Partially Paid";
      paid = Math.round(amount * (0.25 + rng() * 0.45));
    } else {
      status = "Approved";
      paid = 0;
    }

    const billId = sequence("BILL", billCounter, 0);
    billCounter += intBetween(rng, 1, 3);

    bills.push({
      id: billId,
      supplierId: profile.id,
      supplierName: profile.name,
      purchaseReference: `PO-${intBetween(rng, 40000, 49999)}`,
      issueDate,
      dueDate,
      amount,
      paid,
      balance: Math.max(0, amount - paid),
      status,
      currency: "ZAR",
      accountCode: "2110",
      lineItems,
      subtotal,
      taxTotal,
    });

    if (paid > 0) {
      const paymentDate = addDaysIso(dueDate, -intBetween(rng, 0, termDays));
      payments.push({
        id: sequence("SPMT", paymentCounter, 0),
        supplierId: profile.id,
        supplierName: profile.name,
        billId,
        date: paymentDate < issueDate ? issueDate : paymentDate,
        method: weightedPick(rng, [
          ["Bank Transfer", 0.6],
          ["Electronic Transfer", 0.3],
          ["Card", 0.07],
          ["Cash", 0.03],
        ]),
        amount: paid,
        status: chance(rng, 0.05) ? "Pending" : "Completed",
      });
      paymentCounter += 1;
    }

    if (status === "Paid" && chance(rng, 0.1)) {
      const debitAmount = Math.round(amount * (0.05 + rng() * 0.12));
      debitNotes.push({
        id: sequence("DN", debitNoteCounter, 0),
        supplierId: profile.id,
        supplierName: profile.name,
        billId,
        date: addDaysIso(dueDate, intBetween(rng, 1, 20)),
        amount: debitAmount,
        reason: pick(rng, [
          "Damaged goods return",
          "Overbilling correction",
          "Pricing dispute",
          "Short delivery",
          "Quality rebate",
        ]),
        status: weightedPick(rng, [
          ["Applied", 0.55],
          ["Issued", 0.35],
          ["Draft", 0.1],
        ]),
      });
      debitNoteCounter += 1;
    }
  }
}

function computeAggregates() {
  const map = new Map<
    string,
    { billCount: number; spend: number; paid: number; outstanding: number; overdue: number }
  >();
  for (const profile of supplierProfiles) {
    map.set(profile.id, { billCount: 0, spend: 0, paid: 0, outstanding: 0, overdue: 0 });
  }
  for (const bill of bills) {
    if (bill.status === "Disputed" || bill.status === "Draft") continue;
    const entry = map.get(bill.supplierId);
    if (!entry) continue;
    entry.billCount += 1;
    entry.spend += bill.amount;
    entry.paid += bill.paid;
    entry.outstanding += bill.balance;
    if (bill.status === "Overdue" || (bill.status === "Partially Paid" && bill.dueDate < TODAY)) {
      entry.overdue += bill.balance;
    }
  }
  return map;
}

const aggregates = computeAggregates();

export const suppliers: Supplier[] = supplierProfiles.map((profile) => {
  const aggregate = aggregates.get(profile.id) ?? { billCount: 0, spend: 0, paid: 0, outstanding: 0, overdue: 0 };
  return {
    id: profile.id,
    name: profile.name,
    contactName: profile.contactName,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    category: profile.category,
    billCount: aggregate.billCount,
    outstanding: aggregate.outstanding,
    overdue: aggregate.overdue,
    paid: aggregate.paid,
    spend: aggregate.spend,
    paymentStatus: profile.paymentStatus,
    currency: "ZAR",
    since: profile.since,
    bankAccountLast4: profile.bankAccountLast4,
  } satisfies Supplier;
});

export const generatedBills = bills;
export const generatedPayables = payments;
export const generatedDebitNotes = debitNotes;
