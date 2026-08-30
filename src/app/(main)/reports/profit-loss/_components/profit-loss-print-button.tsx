"use client";

import { Printer } from "lucide-react";

import { PrintPortal } from "@/components/finance/print-portal";
import { Button } from "@/components/ui/button";

import { ProfitLossDocument } from "./profit-loss-document";

export function ProfitLossPrintButton() {
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => window.print()}>
        <Printer data-icon="inline-start" />
        Print
      </Button>
      <PrintPortal>
        <ProfitLossDocument />
      </PrintPortal>
    </>
  );
}
