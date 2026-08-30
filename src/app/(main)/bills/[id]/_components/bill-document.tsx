import { companies } from "@/data/companies";
import { getSupplier } from "@/data/suppliers";
import { formatDate } from "@/lib/finance/format";
import type { Bill } from "@/types/finance";

const company = companies[0];

export function BillDocument({ bill }: { bill: Bill }) {
  const supplier = getSupplier(bill.supplierId);

  return (
    <div className="text-sm">
      <div className="flex flex-col justify-between gap-6 border-b pb-6 sm:flex-row">
        <div>
          <p className="font-semibold text-lg">{company.name}</p>
          <p className="text-muted-foreground text-xs">{company.legalName}</p>
          <p className="text-muted-foreground text-xs">{company.address}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-semibold text-xl tracking-tight">SUPPLIER BILL</p>
          <p className="text-muted-foreground text-xs">{bill.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 border-b py-6 sm:grid-cols-3">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Supplier</p>
          <p className="mt-1 font-medium">{bill.supplierName}</p>
          <p className="text-muted-foreground text-xs">{supplier?.contactName}</p>
          <p className="text-muted-foreground text-xs">{supplier?.address}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Issue Date</p>
          <p className="mt-1 font-medium">{formatDate(bill.issueDate)}</p>
          <p className="mt-3 text-muted-foreground text-xs uppercase tracking-wide">Due Date</p>
          <p className="mt-1 font-medium">{formatDate(bill.dueDate)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Purchase Reference</p>
          <p className="mt-1 font-medium">{bill.purchaseReference}</p>
          <p className="mt-3 text-muted-foreground text-xs uppercase tracking-wide">Account</p>
          <p className="mt-1 font-medium">{bill.accountCode} · Accounts Payable</p>
        </div>
      </div>

      <table className="w-full border-collapse py-2 text-left text-xs">
        <thead>
          <tr className="border-b text-muted-foreground uppercase tracking-wide">
            <th className="py-2 font-medium">Description</th>
            <th className="py-2 text-right font-medium">Qty</th>
            <th className="py-2 text-right font-medium">Unit Price</th>
            <th className="py-2 text-right font-medium">Tax</th>
            <th className="py-2 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.lineItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.description}</td>
              <td className="py-2 text-right tabular-nums">{item.quantity}</td>
              <td className="py-2 text-right tabular-nums">R {item.unitPrice.toLocaleString()}</td>
              <td className="py-2 text-right tabular-nums">{item.taxPercent}%</td>
              <td className="py-2 text-right tabular-nums">R {(item.quantity * item.unitPrice).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-end gap-1 py-4 text-sm">
        <div className="flex w-56 justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="tabular-nums">R {bill.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex w-56 justify-between">
          <span className="text-muted-foreground">Tax (15%)</span>
          <span className="tabular-nums">R {bill.taxTotal.toLocaleString()}</span>
        </div>
        <div className="flex w-56 justify-between border-t pt-1 font-semibold">
          <span>Total</span>
          <span className="tabular-nums">R {bill.amount.toLocaleString()}</span>
        </div>
        <div className="flex w-56 justify-between text-muted-foreground">
          <span>Paid</span>
          <span className="tabular-nums">R {bill.paid.toLocaleString()}</span>
        </div>
        <div className="flex w-56 justify-between font-semibold">
          <span>Balance Due</span>
          <span className="tabular-nums">R {bill.balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 text-[11px] text-muted-foreground">
        This is a fictional demonstration document generated for portfolio purposes. It does not represent a real
        financial transaction.
      </div>
    </div>
  );
}
