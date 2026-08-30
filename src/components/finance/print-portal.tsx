"use client";

import * as React from "react";

import { createPortal } from "react-dom";

/**
 * Renders `children` into a `[data-print-root]` node placed as a direct
 * child of <body>. `globals.css` hides every other element on `@media
 * print`, so this becomes the entire printed page — used for print-friendly
 * invoices, bills, and financial reports. Invisible on screen.
 *
 * The portal only mounts after the component has mounted on the client, so
 * the first client render matches the server-rendered (empty) output —
 * mounting it during the initial render would render different content on
 * the client than the server sent, which triggers a hydration mismatch.
 */
export function PrintPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div data-print-root>
      <div data-print-paper className="mx-auto max-w-full bg-white p-10 text-neutral-900">
        {children}
      </div>
    </div>,
    document.body,
  );
}
