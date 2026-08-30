"use client";

import { Printer } from "lucide-react";

import { PrintPortal } from "@/components/finance/print-portal";
import { Button } from "@/components/ui/button";

import { CashFlowDocument } from "./cash-flow-document";

export function CashFlowPrintButton() {
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => window.print()}>
        <Printer data-icon="inline-start" />
        Print
      </Button>
      <PrintPortal>
        <CashFlowDocument />
      </PrintPortal>
    </>
  );
}
