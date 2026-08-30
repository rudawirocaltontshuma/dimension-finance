import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";

import { BalanceSheetDocument } from "./_components/balance-sheet-document";
import { BalanceSheetPrintButton } from "./_components/balance-sheet-print-button";

export const metadata = { title: "Balance Sheet | Financial Management System" };

export default function BalanceSheetReportPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Balance Sheet"
        description="Assets, liabilities, and equity position as at the end of the current period."
        breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: "Balance Sheet" }]}
        actions={
          <>
            <ExportPreviewButton />
            <BalanceSheetPrintButton />
          </>
        }
      />

      <Card className="mx-auto w-full max-w-5xl">
        <CardContent className="p-6 sm:p-8">
          <BalanceSheetDocument />
        </CardContent>
      </Card>
    </div>
  );
}
