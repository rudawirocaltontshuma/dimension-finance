"use client";

import type { ReactNode } from "react";

import { createPortal } from "react-dom";

/**
 * Renders `children` into a `[data-print-root]` node placed as a direct
 * child of <body>. `globals.css` hides every other element on `@media
 * print`, so this becomes the entire printed page — used for print-friendly
 * invoices, bills, and financial reports. Invisible on screen.
 */
export function PrintPortal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div data-print-root>
      <div data-print-paper className="mx-auto max-w-full bg-white p-10 text-neutral-900">
        {children}
      </div>
    </div>,
    document.body,
  );
}
