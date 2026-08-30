"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  { href: "/settings", label: "Company" },
  { href: "/settings/fiscal-periods", label: "Fiscal Periods" },
  { href: "/settings/currencies", label: "Currencies" },
  { href: "/settings/tax", label: "Tax Settings" },
  { href: "/settings/accounting", label: "Accounting Settings" },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-1 border-b pb-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted",
            pathname === item.href ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
