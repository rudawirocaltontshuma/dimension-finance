import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ExportPreviewButton } from "@/components/finance/demo-actions";
import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reportCatalog } from "@/data/reports";
import { formatDateShort } from "@/lib/finance/format";

export const metadata = { title: "Report Center | Financial Management System" };

export default function ReportCenterPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Report Center"
        description="Every financial report, in one place, ready for review or export."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reportCatalog.map((report) => (
          <Card key={report.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-muted-foreground text-xs">
                  {report.category}
                </Badge>
                <span className="text-muted-foreground text-xs">{formatDateShort(report.lastUpdated)}</span>
              </div>
              <CardTitle className="font-medium text-base">{report.name}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex items-center justify-between pt-2">
              <span className="text-muted-foreground text-xs">{report.period}</span>
              <div className="flex items-center gap-2">
                <ExportPreviewButton label="Export" />
                <Link
                  href={report.href}
                  className="flex items-center gap-1 font-medium text-primary text-sm hover:underline"
                >
                  View Report <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
