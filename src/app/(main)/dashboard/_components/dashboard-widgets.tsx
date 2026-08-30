import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight, CheckCircle2, Inbox } from "lucide-react";

import { EmptyState } from "@/components/finance/empty-state";
import { Money } from "@/components/finance/money";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bankAccounts } from "@/data/banking";
import {
  budgetAlerts,
  monthlyClosingStatus,
  outstandingInvoices,
  recentPayments,
  recentTransactions,
  topCustomers,
  topExpenseCategories,
  upcomingBills,
} from "@/data/dashboard";
import { notifications } from "@/data/notifications";
import { formatDateShort } from "@/lib/finance/format";

function WidgetCard({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <Card className="gap-3 py-4">
      <CardHeader className="px-4">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <CardAction>
          <Link href={href} className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground">
            View all
            <ArrowRight className="size-3" />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="px-4">{children}</CardContent>
    </Card>
  );
}

function Row({
  primary,
  secondary,
  value,
  valueSub,
}: {
  primary: string;
  secondary: string;
  value: ReactNode;
  valueSub?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="truncate font-medium text-sm">{primary}</p>
        <p className="truncate text-muted-foreground text-xs">{secondary}</p>
      </div>
      <div className="shrink-0 text-right">
        <div className="font-medium text-sm">{value}</div>
        {valueSub && <div className="text-muted-foreground text-xs">{valueSub}</div>}
      </div>
    </div>
  );
}

export function DashboardWidgets() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <WidgetCard title="Recent Transactions" href="/general-ledger">
        <div className="divide-y">
          {recentTransactions.map((t) => (
            <Row
              key={t.id}
              primary={t.description}
              secondary={`${t.accountName} · ${formatDateShort(t.date)}`}
              value={<Money amount={t.debit > 0 ? t.debit : -t.credit} colorize />}
            />
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Outstanding Invoices" href="/invoices">
        {outstandingInvoices.length === 0 ? (
          <EmptyState icon={Inbox} title="No overdue invoices" />
        ) : (
          <div className="divide-y">
            {outstandingInvoices.map((invoice) => (
              <Row
                key={invoice.id}
                primary={invoice.customerName}
                secondary={invoice.id}
                value={<Money amount={invoice.balance} />}
                valueSub={invoice.status}
              />
            ))}
          </div>
        )}
      </WidgetCard>

      <WidgetCard title="Upcoming Bills" href="/bills">
        <div className="divide-y">
          {upcomingBills.map((bill) => (
            <Row
              key={bill.id}
              primary={bill.supplierName}
              secondary={`Due ${formatDateShort(bill.dueDate)}`}
              value={<Money amount={bill.balance} />}
              valueSub={bill.status}
            />
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Cash Position" href="/bank-accounts">
        <div className="divide-y">
          {bankAccounts.map((account) => (
            <Row
              key={account.id}
              primary={account.name}
              secondary={account.bankName}
              value={<Money amount={account.balance} noDecimals />}
            />
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Top Customers" href="/customers">
        <div className="divide-y">
          {topCustomers.map((customer) => (
            <Row
              key={customer.id}
              primary={customer.name}
              secondary={customer.industry}
              value={<Money amount={customer.revenue} noDecimals />}
              valueSub="revenue"
            />
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Top Expense Categories" href="/expense-categories">
        <div className="divide-y">
          {topExpenseCategories.map((category) => (
            <Row
              key={category.id}
              primary={category.name}
              secondary={`Budget ${category.budget.toLocaleString()}`}
              value={<Money amount={category.annualSpend} noDecimals />}
            />
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Recent Payments" href="/payments">
        <div className="divide-y">
          {recentPayments.map((payment) => (
            <Row
              key={payment.id}
              primary={payment.customerName}
              secondary={`${payment.method} · ${formatDateShort(payment.date)}`}
              value={<Money amount={payment.amount} colorize />}
            />
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Budget Alerts" href="/variance-analysis">
        {budgetAlerts.length === 0 ? (
          <EmptyState icon={CheckCircle2} title="All budgets on track" />
        ) : (
          <div className="divide-y">
            {budgetAlerts.map((budget) => (
              <Row
                key={budget.id}
                primary={budget.name}
                secondary={budget.department}
                value={`${budget.utilization}%`}
                valueSub={budget.status}
              />
            ))}
          </div>
        )}
      </WidgetCard>

      <WidgetCard title="Financial Activity" href="/dashboard">
        <div className="divide-y">
          {notifications.slice(0, 5).map((notification) => (
            <div key={notification.id} className="py-2 first:pt-0 last:pb-0">
              <p className="text-sm leading-snug">{notification.title}</p>
              <p className="text-muted-foreground text-xs">
                {new Date(notification.timestamp).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Monthly Closing Status" href="/period-close">
        <div className="divide-y">
          {monthlyClosingStatus.map((period) => (
            <div key={period.id} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
              <span className="text-sm">{period.label}</span>
              <span className="text-xs">{period.status}</span>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}
