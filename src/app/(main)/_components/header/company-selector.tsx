"use client";

import { Building2, Check, ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { companies } from "@/data/companies";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/stores/workspace/workspace-context";

export function CompanySelector() {
  const { companyId, setCompanyId } = useWorkspace();
  const activeCompany = companies.find((c) => c.id === companyId) ?? companies[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex max-w-44 items-center gap-1.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent sm:max-w-56"
        >
          <Building2 className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate font-medium">{activeCompany.name}</span>
          <ChevronsUpDown className="size-3 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel className="text-muted-foreground text-xs">Switch company</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {companies.map((company) => (
          <DropdownMenuItem
            key={company.id}
            className="flex items-center gap-2"
            onSelect={() => setCompanyId(company.id)}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
              <Building2 className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">{company.name}</div>
              <div className="truncate text-muted-foreground text-xs">{company.industry}</div>
            </div>
            <Check className={cn("size-4 shrink-0", company.id === companyId ? "opacity-100" : "opacity-0")} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
