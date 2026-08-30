import { PageHeader } from "@/components/finance/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currencies } from "@/data/currencies";

import { SettingsNav } from "../_components/settings-nav";

export const metadata = { title: "Currencies | Nexora Finance" };

export default function CurrenciesSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Currencies"
        description="Currencies available across companies. No live exchange rates are used."
      />
      <SettingsNav />
      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Used In</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencies.map((currency) => (
                <TableRow key={currency.code}>
                  <TableCell className="font-medium">{currency.name}</TableCell>
                  <TableCell className="font-mono text-xs">{currency.code}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{currency.usedIn}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        currency.status === "Base Currency"
                          ? "border-blue-200 text-blue-700 dark:border-blue-500/30 dark:text-blue-300"
                          : "border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300"
                      }
                    >
                      {currency.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
