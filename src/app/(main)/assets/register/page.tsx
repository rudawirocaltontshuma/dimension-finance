import { PageHeader } from "@/components/finance/page-header";
import { assets } from "@/data/assets";

import { AssetsTable } from "./_components/assets-table";

export const metadata = { title: "Asset Register | Financial Management System" };

export default function AssetRegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Asset Register"
        description="Full listing of every fixed asset, its cost, depreciation and net book value."
        breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Asset Register" }]}
      />
      <AssetsTable assets={assets} />
    </div>
  );
}
