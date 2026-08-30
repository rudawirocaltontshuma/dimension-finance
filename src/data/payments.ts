import { generatedPayables } from "@/data/_gen/payables";
import { generatedPayments } from "@/data/_gen/receivables";
import type { PayablePayment, ReceivablePayment } from "@/types/finance";

/** Receivables payments — money collected from customers against invoices. */
export const payments: ReceivablePayment[] = generatedPayments;

/** Payables payments — money paid out to suppliers against bills. */
export const payablePayments: PayablePayment[] = generatedPayables;

export function getPaymentsForCustomer(customerId: string): ReceivablePayment[] {
  return payments.filter((payment) => payment.customerId === customerId);
}

export function getPaymentsForSupplier(supplierId: string): PayablePayment[] {
  return payablePayments.filter((payment) => payment.supplierId === supplierId);
}
