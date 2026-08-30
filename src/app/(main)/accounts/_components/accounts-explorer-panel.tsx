"use client";

import * as React from "react";

import { Search } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { Account } from "@/types/finance";

import { ChartOfAccountsExplorer } from "./chart-of-accounts-tree";

export function AccountsExplorerPanel({ accounts }: { accounts: Account[] }) {
  const [query, setQuery] = React.useState("");

  return (
    <div className="flex flex-col gap-3">
      <InputGroup className="h-8 w-full sm:w-72">
        <InputGroupAddon align="inline-start">
          <Search className="size-3.5" />
        </InputGroupAddon>
        <InputGroupInput
          className="h-8"
          placeholder="Search accounts by code or name…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </InputGroup>
      <ChartOfAccountsExplorer accounts={accounts} query={query} />
    </div>
  );
}
