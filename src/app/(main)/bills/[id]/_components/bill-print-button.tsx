"use client";

import { Printer } from "lucide-react";

import { PrintPortal } from "@/components/finance/print-portal";
import { Button } from "@/components/ui/button";
import type { Bill } from "@/types/finance";

import { BillDocument } from "./bill-document";

export function BillPrintButton({ bill }: { bill: Bill }) {
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => window.print()}>
        <Printer data-icon="inline-start" />
        Print
      </Button>
      <PrintPortal>
        <BillDocument bill={bill} />
      </PrintPortal>
    </>
  );
}
