import { ChartCard } from "@/components/finance/chart-card";
import { FinanceAreaChart } from "@/components/finance/charts/series-charts";
import { KpiCard } from "@/components/finance/kpi-card";
import { PageHeader } from "@/components/finance/page-header";
import { expenses } from "@/data/expenses";
import { formatMoney } from "@/lib/finance/format";

import { ExpensesTable } from "./_components/expenses-table";

export const metadata = { title: "Expenses | Financial Management System" };

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

function monthKey(date: string) {
  return Number(date.slice(5, 7)) - 1;
}

export default function ExpensesPage() {
  const activeExpenses = expenses.filter((e) => e.status !== "Rejected" && e.status !== "Draft");
  const totalExpenses = activeExpenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingApproval = expenses.filter((e) => e.status === "Submitted").reduce((sum, e) => sum + e.amount, 0);
  const approved = expenses.filter((e) => e.status === "Approved").reduce((sum, e) => sum + e.amount, 0);
  const reimbursed = expenses.filter((e) => e.status === "Reimbursed").reduce((sum, e) => sum + e.amount, 0);
  const averageExpense = activeExpenses.length ? Math.round(totalExpenses / activeExpenses.length) : 0;

  const trend = months.map((month, index) => ({
    month,
    amount: activeExpenses.filter((e) => monthKey(e.date) === index).reduce((sum, e) => sum + e.amount, 0),
  }));

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Expenses"
        description="Employee expense claims across every category, department and approval stage."
        breadcrumbs={[{ label: "Expenses" }]}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard label="Total Expenses" value={formatMoney(totalExpenses, "ZAR", { noDecimals: true })} />
        <KpiCard label="Pending Approval" value={formatMoney(pendingApproval, "ZAR", { noDecimals: true })} />
        <KpiCard label="Approved" value={formatMoney(approved, "ZAR", { noDecimals: true })} />
        <KpiCard label="Reimbursed" value={formatMoney(reimbursed, "ZAR", { noDecimals: true })} />
        <KpiCard label="Average Expense" value={formatMoney(averageExpense, "ZAR", { noDecimals: true })} />
      </div>

      <ChartCard title="Expense Trend" description="Monthly expense claims, year to date.">
        <FinanceAreaChart data={trend} xKey="month" series={[{ key: "amount", label: "Expenses" }]} />
      </ChartCard>

      <ExpensesTable expenses={expenses} />
    </div>
  );
}
