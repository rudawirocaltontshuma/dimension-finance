import { companies } from "@/data/companies";
import { getCustomer } from "@/data/customers";
import { formatDate } from "@/lib/finance/format";
import type { Invoice } from "@/types/finance";

const company = companies[0];

function lineTotal(item: Invoice["lineItems"][number]) {
  const gross = item.quantity * item.unitPrice;
  const discount = gross * (item.discountPercent / 100);
  return gross - discount;
}

export function InvoiceDocument({ invoice }: { invoice: Invoice }) {
  const customer = getCustomer(invoice.customerId);

  return (
    <div className="text-sm">
      <div className="flex flex-col justify-between gap-6 border-b pb-6 sm:flex-row">
        <div>
          <p className="font-semibold text-lg">{company.name}</p>
          <p className="text-muted-foreground text-xs">{company.legalName}</p>
          <p className="text-muted-foreground text-xs">{company.address}</p>
          <p className="text-muted-foreground text-xs">Reg. {company.registrationNumber}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-semibold text-xl tracking-tight">INVOICE</p>
          <p className="text-muted-foreground text-xs">{invoice.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 border-b py-6 sm:grid-cols-3">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Billed To</p>
          <p className="mt-1 font-medium">{invoice.customerName}</p>
          <p className="text-muted-foreground text-xs">{customer?.contactName}</p>
          <p className="text-muted-foreground text-xs">{customer?.billingAddress}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Issue Date</p>
          <p className="mt-1 font-medium">{formatDate(invoice.issueDate)}</p>
          <p className="mt-3 text-muted-foreground text-xs uppercase tracking-wide">Due Date</p>
          <p className="mt-1 font-medium">{formatDate(invoice.dueDate)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Account</p>
          <p className="mt-1 font-medium">{invoice.accountCode} · Accounts Receivable</p>
          <p className="mt-3 text-muted-foreground text-xs uppercase tracking-wide">Currency</p>
          <p className="mt-1 font-medium">{invoice.currency}</p>
        </div>
      </div>

      <table className="w-full border-collapse py-2 text-left text-xs">
        <thead>
          <tr className="border-b text-muted-foreground uppercase tracking-wide">
            <th className="py-2 font-medium">Description</th>
            <th className="py-2 text-right font-medium">Qty</th>
            <th className="py-2 text-right font-medium">Unit Price</th>
            <th className="py-2 text-right font-medium">Discount</th>
            <th className="py-2 text-right font-medium">Tax</th>
            <th className="py-2 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.description}</td>
              <td className="py-2 text-right tabular-nums">{item.quantity}</td>
              <td className="py-2 text-right tabular-nums">R {item.unitPrice.toLocaleString()}</td>
              <td className="py-2 text-right tabular-nums">{item.discountPercent}%</td>
              <td className="py-2 text-right tabular-nums">{item.taxPercent}%</td>
              <td className="py-2 text-right tabular-nums">R {lineTotal(item).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-end gap-1 py-4 text-sm">
        <div className="flex w-56 justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="tabular-nums">R {invoice.subtotal.toLocaleString()}</span>
        </div>
        {invoice.discountTotal > 0 && (
          <div className="flex w-56 justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="tabular-nums">-R {invoice.discountTotal.toLocaleString()}</span>
          </div>
        )}
        <div className="flex w-56 justify-between">
          <span className="text-muted-foreground">Tax (15%)</span>
          <span className="tabular-nums">R {invoice.taxTotal.toLocaleString()}</span>
        </div>
        <div className="flex w-56 justify-between border-t pt-1 font-semibold">
          <span>Total</span>
          <span className="tabular-nums">R {invoice.amount.toLocaleString()}</span>
        </div>
        <div className="flex w-56 justify-between text-muted-foreground">
          <span>Paid</span>
          <span className="tabular-nums">R {invoice.paid.toLocaleString()}</span>
        </div>
        <div className="flex w-56 justify-between font-semibold">
          <span>Balance Due</span>
          <span className="tabular-nums">R {invoice.balance.toLocaleString()}</span>
        </div>
      </div>

      {invoice.notes && (
        <div className="border-t pt-4 text-muted-foreground text-xs">
          <p className="font-medium text-foreground">Notes</p>
          <p className="mt-1">{invoice.notes}</p>
        </div>
      )}

      <div className="mt-6 border-t pt-4 text-[11px] text-muted-foreground">
        This is a fictional demonstration document generated for this application. It does not represent a real
        financial transaction.
      </div>
    </div>
  );
}
