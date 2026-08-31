import { PageHeader } from "@/components/finance/page-header";
import { expenses } from "@/data/expenses";

import { ApprovalQueue } from "./_components/approval-queue";

export const metadata = { title: "Expense Approvals | Dimension Finance" };

export default function ExpenseApprovalsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Expense Approvals"
        description="Review and approve expense claims submitted by employees."
        breadcrumbs={[{ label: "Expenses", href: "/expenses" }, { label: "Approvals" }]}
      />
      <ApprovalQueue expenses={expenses} />
    </div>
  );
}
