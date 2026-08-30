"use client";

import * as React from "react";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Money } from "@/components/finance/money";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Account } from "@/types/finance";

interface TreeNode extends Account {
  children: TreeNode[];
}

function buildTree(accounts: Account[]): TreeNode[] {
  const nodes = new Map<string, TreeNode>();
  for (const account of accounts) nodes.set(account.code, { ...account, children: [] });

  const roots: TreeNode[] = [];
  nodes.forEach((node) => {
    if (node.parentCode && nodes.has(node.parentCode)) {
      nodes.get(node.parentCode)?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

function AccountRow({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = React.useState(depth < 1);
  const hasChildren = node.children.length > 0;

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b py-2.5 pr-3 text-sm last:border-b-0 hover:bg-muted/40",
          depth === 0 && "bg-muted/30 font-medium",
        )}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex size-5 shrink-0 items-center justify-center rounded hover:bg-muted"
              aria-label={open ? "Collapse" : "Expand"}
            >
              <ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} />
            </button>
          ) : (
            <span className="size-5 shrink-0" />
          )}
          <span className="shrink-0 font-mono text-muted-foreground text-xs">{node.code}</span>
          {node.level === 2 ? (
            <Link href={`/accounts/${node.code}`} className="truncate hover:underline">
              {node.name}
            </Link>
          ) : (
            <span className="truncate">{node.name}</span>
          )}
        </div>
        <span className="hidden w-28 shrink-0 text-muted-foreground text-xs sm:block">{node.type}</span>
        <span className="w-28 shrink-0 text-right tabular-nums">
          <Money amount={node.balance} noDecimals />
        </span>
        <Badge variant="outline" className="hidden w-20 shrink-0 justify-center text-xs md:flex">
          {node.status}
        </Badge>
      </div>
      {open &&
        hasChildren &&
        node.children.map((child) => <AccountRow key={child.code} node={child} depth={depth + 1} />)}
    </>
  );
}

function TreeTable({ accounts }: { accounts: Account[] }) {
  const tree = React.useMemo(() => buildTree(accounts), [accounts]);

  return (
    <div className="min-w-[640px]">
      {tree.map((node) => (
        <AccountRow key={node.code} node={node} depth={0} />
      ))}
    </div>
  );
}

function FlatMatches({ accounts }: { accounts: Account[] }) {
  return (
    <div className="min-w-[640px]">
      {accounts.map((account) => (
        <div
          key={account.code}
          className="flex items-center justify-between gap-3 border-b py-2.5 pr-3 pl-3 text-sm last:border-b-0 hover:bg-muted/40"
        >
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span className="shrink-0 font-mono text-muted-foreground text-xs">{account.code}</span>
            <Link href={`/accounts/${account.code}`} className="truncate hover:underline">
              {account.name}
            </Link>
          </div>
          <span className="hidden w-28 shrink-0 text-muted-foreground text-xs sm:block">{account.type}</span>
          <span className="w-28 shrink-0 text-right tabular-nums">
            <Money amount={account.balance} noDecimals />
          </span>
          <Badge variant="outline" className="hidden w-20 shrink-0 justify-center text-xs md:flex">
            {account.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}

export function ChartOfAccountsExplorer({ accounts, query }: { accounts: Account[]; query: string }) {
  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? accounts.filter(
        (a) => a.level === 2 && (a.code.includes(normalized) || a.name.toLowerCase().includes(normalized)),
      )
    : [];

  return (
    <div className="overflow-x-auto rounded-md border">
      <div className="flex min-w-[640px] items-center justify-between gap-3 border-b bg-muted/50 px-3 py-2 font-medium text-muted-foreground text-xs">
        <span className="flex-1">Account</span>
        <span className="hidden w-28 sm:block">Type</span>
        <span className="w-28 text-right">Balance</span>
        <span className="hidden w-20 justify-center md:flex">Status</span>
      </div>
      {normalized ? <FlatMatches accounts={matches} /> : <TreeTable accounts={accounts} />}
    </div>
  );
}
