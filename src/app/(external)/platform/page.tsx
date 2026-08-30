import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  Building2,
  Code2,
  Component,
  Landmark,
  LayoutGrid,
  LineChart,
  Palette,
  Receipt,
  Rows3,
  Settings,
  Sparkles,
  Table2,
  Target,
  Wallet,
} from "lucide-react";

import { DemoModeBadge } from "@/components/demo-mode-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_CONFIG } from "@/config/app-config";

export const metadata = {
  title: "Financial Management System — Platform Overview",
  description:
    "A frontend-only financial management and accounting platform built with Next.js, TypeScript, Tailwind CSS and shadcn/ui — ready to explore, extend, or use as a starting point.",
};

const modules = [
  {
    title: "Accounting",
    description: "Chart of accounts, general ledger, journal entries, trial balance, period close.",
    icon: BookOpen,
    href: "/accounting",
  },
  {
    title: "Receivables",
    description: "Customers, invoices, payments, credit notes, AR aging.",
    icon: Receipt,
    href: "/receivables",
  },
  {
    title: "Payables",
    description: "Suppliers, bills, payments, debit notes, AP aging.",
    icon: Wallet,
    href: "/payables",
  },
  {
    title: "Expenses",
    description: "Expense claims, categories, approvals, reimbursements.",
    icon: Rows3,
    href: "/expenses",
  },
  {
    title: "Banking",
    description: "Bank accounts, transactions and reconciliation — visual only.",
    icon: Landmark,
    href: "/banking",
  },
  {
    title: "Budgeting",
    description: "Budgets, forecasts, variance analysis, cost centers.",
    icon: Target,
    href: "/budgets",
  },
  { title: "Assets", description: "Fixed assets, asset register, depreciation.", icon: Boxes, href: "/assets" },
  {
    title: "Reports",
    description: "P&L, balance sheet, cash flow, tax summary and more.",
    icon: Table2,
    href: "/reports",
  },
  {
    title: "Analytics",
    description: "Revenue, expense, cash flow and profitability analytics.",
    icon: LineChart,
    href: "/analytics/revenue",
  },
  {
    title: "Administration",
    description: "Company, fiscal periods, currencies, tax and accounting settings.",
    icon: Settings,
    href: "/settings",
  },
];

const techStack = [
  { label: "Next.js", icon: Code2 },
  { label: "TypeScript", icon: Code2 },
  { label: "React", icon: Component },
  { label: "Tailwind CSS", icon: Palette },
  { label: "shadcn/ui", icon: LayoutGrid },
  { label: "Recharts", icon: BarChart3 },
  { label: "Responsive Design", icon: Sparkles },
  { label: "Enterprise UX", icon: Building2 },
  { label: "Data Visualization", icon: LineChart },
  { label: "Advanced Tables", icon: Table2 },
  { label: "Component Architecture", icon: Component },
];

export default function PlatformShowcasePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Landmark className="size-4" />
            </span>
            <span className="font-semibold">{APP_CONFIG.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <DemoModeBadge className="hidden sm:inline-flex" />
            <Button asChild size="sm">
              <Link href="/dashboard">
                Open Dashboard <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="mx-auto max-w-3xl text-center">
          <DemoModeBadge className="mx-auto mb-4 w-fit" />
          <h1 className="font-semibold text-4xl tracking-tight sm:text-5xl">{APP_CONFIG.name}</h1>
          <p className="mt-2 text-muted-foreground text-xl">{APP_CONFIG.tagline}</p>
          <p className="mt-6 text-balance text-muted-foreground leading-relaxed">
            A frontend-only financial management and accounting platform with modern enterprise UX, financial
            information architecture, data visualization, reporting interfaces and responsive application design — built
            with Next.js, TypeScript, Tailwind CSS and shadcn/ui, and structured so other developers can read, extend,
            or build on it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Explore the Platform <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://github.com/rudawirocaltontshuma/financial_management_system"
                target="_blank"
                rel="noreferrer"
              >
                View Source
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-semibold text-2xl tracking-tight">Modules</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
            Ten fully-built modules covering the breadth of a modern accounting and finance platform.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {modules.map((module) => (
              <Link key={module.href} href={module.href}>
                <Card className="h-full py-4 transition-colors hover:bg-muted/40">
                  <CardContent className="flex flex-col gap-2 px-4">
                    <module.icon className="size-5 text-muted-foreground" />
                    <p className="font-medium text-sm">{module.title}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-semibold text-2xl tracking-tight">Built With</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
            A modern, production-grade frontend stack — no backend, no database, no real financial connections.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {techStack.map((tech) => (
              <Badge key={tech.label} variant="outline" className="gap-1.5 px-3 py-1.5 text-sm">
                <tech.icon className="size-3.5" />
                {tech.label}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-xl border border-dashed p-8 text-center">
          <h2 className="font-semibold text-xl">About This Build</h2>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-muted-foreground text-sm leading-relaxed">
            This is a frontend-only Financial Management and Accounting platform. It uses fictional mock data and does
            not connect to a production database, authentication provider, bank, payment provider, tax authority,
            accounting platform or external business API — clone it, read the source, and use it as a foundation for
            your own project.
          </p>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-muted-foreground text-xs">{APP_CONFIG.copyright}</footer>
    </div>
  );
}
