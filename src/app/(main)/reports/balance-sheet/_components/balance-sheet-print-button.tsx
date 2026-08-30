"use client";

import { Printer } from "lucide-react";

import { PrintPortal } from "@/components/finance/print-portal";
import { Button } from "@/components/ui/button";

import { BalanceSheetDocument } from "./balance-sheet-document";

export function BalanceSheetPrintButton() {
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => window.print()}>
        <Printer data-icon="inline-start" />
        Print
      </Button>
      <PrintPortal>
        <BalanceSheetDocument />
      </PrintPortal>
    </>
  );
}
