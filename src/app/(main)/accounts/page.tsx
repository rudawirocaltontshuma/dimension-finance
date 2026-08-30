import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { accounts } from "@/data/accounts";

import { AccountsExplorerPanel } from "./_components/accounts-explorer-panel";

export const metadata = { title: "Chart of Accounts | Financial Management System" };

export default function ChartOfAccountsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Chart of Accounts"
        description="Browse the full account hierarchy across assets, liabilities, equity, revenue and expenses."
        breadcrumbs={[{ label: "Accounting", href: "/accounting" }, { label: "Chart of Accounts" }]}
        actions={<ExportPreviewButton />}
      />
      <AccountsExplorerPanel accounts={accounts} />
    </div>
  );
}
