"use client";

import { Printer } from "lucide-react";

import { PrintPortal } from "@/components/finance/print-portal";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/types/finance";

import { InvoiceDocument } from "./invoice-document";

export function InvoicePrintButton({ invoice }: { invoice: Invoice }) {
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => window.print()}>
        <Printer data-icon="inline-start" />
        Print
      </Button>
      <PrintPortal>
        <InvoiceDocument invoice={invoice} />
      </PrintPortal>
    </>
  );
}
