"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Moon, Search, Sun } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { accounts } from "@/data/accounts";
import { assets } from "@/data/assets";
import { bills } from "@/data/bills";
import { customers } from "@/data/customers";
import { expenses } from "@/data/expenses";
import { invoices } from "@/data/invoices";
import { payments } from "@/data/payments";
import { reportCatalog } from "@/data/reports";
import { suppliers } from "@/data/suppliers";
import { transactions } from "@/data/transactions";
import { formatMoney } from "@/lib/finance/format";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

interface SearchItem {
  id: string;
  group: string;
  label: string;
  sublabel?: string;
  url: string;
}

const navigationItems: SearchItem[] = sidebarItems.flatMap((group) =>
  group.items.flatMap((item) => {
    if (item.subItems) {
      return item.subItems.map((sub) => ({
        id: sub.id,
        group: "Navigation",
        label: `${item.title} — ${sub.title}`,
        url: sub.url,
      }));
    }
    return [{ id: item.id, group: "Navigation", label: item.title, url: item.url }];
  }),
);

const entityGroups: SearchItem[] = [
  ...accounts
    .filter((a) => a.level === 2)
    .slice(0, 60)
    .map((a) => ({
      id: a.code,
      group: "Accounts",
      label: `${a.code} · ${a.name}`,
      sublabel: formatMoney(a.balance),
      url: `/accounts/${a.code}`,
    })),
  ...customers.map((c) => ({ id: c.id, group: "Customers", label: c.name, sublabel: c.id, url: `/customers/${c.id}` })),
  ...suppliers.map((s) => ({ id: s.id, group: "Suppliers", label: s.name, sublabel: s.id, url: `/suppliers/${s.id}` })),
  ...invoices.slice(0, 80).map((i) => ({
    id: i.id,
    group: "Invoices",
    label: `${i.id} — ${i.customerName}`,
    sublabel: formatMoney(i.amount),
    url: `/invoices/${i.id}`,
  })),
  ...bills.slice(0, 60).map((b) => ({
    id: b.id,
    group: "Bills",
    label: `${b.id} — ${b.supplierName}`,
    sublabel: formatMoney(b.amount),
    url: `/bills/${b.id}`,
  })),
  ...transactions.slice(0, 40).map((t) => ({
    id: t.id,
    group: "Transactions",
    label: `${t.id} — ${t.description}`,
    sublabel: t.accountName,
    url: `/general-ledger`,
  })),
  ...payments.slice(0, 30).map((p) => ({
    id: p.id,
    group: "Payments",
    label: `${p.id} — ${p.customerName}`,
    sublabel: formatMoney(p.amount),
    url: `/payments`,
  })),
  ...expenses.slice(0, 40).map((e) => ({
    id: e.id,
    group: "Expenses",
    label: `${e.id} — ${e.employeeName}`,
    sublabel: formatMoney(e.amount),
    url: `/expenses/${e.id}`,
  })),
  ...assets.slice(0, 40).map((a) => ({
    id: a.id,
    group: "Assets",
    label: `${a.id} — ${a.name}`,
    sublabel: a.category,
    url: `/assets/${a.id}`,
  })),
  ...reportCatalog.map((r) => ({ id: r.id, group: "Reports", label: r.name, sublabel: r.category, url: r.href })),
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { themeMode, setPreference } = usePreferencesStore(
    useShallow((state) => ({ themeMode: state.values.theme_mode, setPreference: state.setPreference })),
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOpenChange = (value: boolean) => setOpen(value);

  const runNavigate = (url: string) => {
    handleOpenChange(false);
    router.push(url);
  };

  const toggleTheme = () => {
    handleOpenChange(false);
    setPreference("theme_mode", themeMode === "dark" ? "light" : "dark");
  };

  const renderGroup = (label: string, items: SearchItem[]) =>
    items.length > 0 && (
      <CommandGroup heading={label} key={label}>
        {items.map((item) => (
          <CommandItem
            key={`${label}-${item.id}`}
            value={`${label} ${item.label} ${item.sublabel ?? ""}`}
            onSelect={() => runNavigate(item.url)}
          >
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.sublabel && <span className="ml-2 shrink-0 text-muted-foreground text-xs">{item.sublabel}</span>}
          </CommandItem>
        ))}
      </CommandGroup>
    );

  const groupedEntities = Array.from(new Set(entityGroups.map((i) => i.group))).map((group) => ({
    group,
    items: entityGroups.filter((i) => i.group === group),
  }));

  return (
    <>
      <Button
        onClick={() => handleOpenChange(true)}
        variant="outline"
        className="h-8 w-full max-w-64 justify-start gap-2 px-2.5 font-normal text-muted-foreground text-sm shadow-none sm:w-64"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium text-[10px] sm:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command>
          <CommandInput placeholder="Search accounts, customers, invoices, bills, reports…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {renderGroup("Navigation", navigationItems)}
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem value="toggle theme dark light" onSelect={toggleTheme}>
                {themeMode === "dark" ? <Sun /> : <Moon />}
                Toggle theme
              </CommandItem>
            </CommandGroup>
            {groupedEntities.map(({ group, items }) => (
              <React.Fragment key={group}>
                <CommandSeparator />
                {renderGroup(group, items)}
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
