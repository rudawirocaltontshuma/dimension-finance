import {
  CircleDollarSign,
  FileBarChart,
  Landmark,
  LayoutDashboard,
  LineChart,
  type LucideIcon,
  Package,
  Receipt,
  Scale,
  Settings,
  Target,
  Wallet,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Accounting",
    items: [
      {
        id: "accounting",
        title: "Accounting",
        icon: Scale,
        subItems: [
          { id: "accounting-overview", title: "Overview", url: "/accounting" },
          { id: "chart-of-accounts", title: "Chart of Accounts", url: "/accounts" },
          { id: "general-ledger", title: "General Ledger", url: "/general-ledger" },
          { id: "journal-entries", title: "Journal Entries", url: "/journal-entries" },
          { id: "trial-balance", title: "Trial Balance", url: "/trial-balance" },
          { id: "period-close", title: "Period Close", url: "/period-close" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Receivables & Payables",
    items: [
      {
        id: "receivables",
        title: "Receivables",
        icon: CircleDollarSign,
        subItems: [
          { id: "receivables-overview", title: "Overview", url: "/receivables" },
          { id: "customers", title: "Customers", url: "/customers" },
          { id: "invoices", title: "Invoices", url: "/invoices" },
          { id: "ar-payments", title: "Payments", url: "/payments" },
          { id: "credit-notes", title: "Credit Notes", url: "/credit-notes" },
          { id: "ar-aging", title: "AR Aging", url: "/ar-aging" },
        ],
      },
      {
        id: "payables",
        title: "Payables",
        icon: Wallet,
        subItems: [
          { id: "payables-overview", title: "Overview", url: "/payables" },
          { id: "suppliers", title: "Suppliers", url: "/suppliers" },
          { id: "bills", title: "Bills", url: "/bills" },
          { id: "ap-payments", title: "Payments", url: "/payables/payments" },
          { id: "debit-notes", title: "Debit Notes", url: "/debit-notes" },
          { id: "ap-aging", title: "AP Aging", url: "/ap-aging" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Operations",
    items: [
      {
        id: "expenses",
        title: "Expenses",
        icon: Receipt,
        subItems: [
          { id: "expenses-list", title: "Expenses", url: "/expenses" },
          { id: "expense-categories", title: "Categories", url: "/expense-categories" },
          { id: "expense-approvals", title: "Approvals", url: "/expense-approvals" },
          { id: "reimbursements", title: "Reimbursements", url: "/reimbursements" },
        ],
      },
      {
        id: "banking",
        title: "Banking",
        icon: Landmark,
        subItems: [
          { id: "banking-overview", title: "Overview", url: "/banking" },
          { id: "bank-accounts", title: "Bank Accounts", url: "/bank-accounts" },
          { id: "bank-transactions", title: "Transactions", url: "/bank-transactions" },
          { id: "reconciliation", title: "Reconciliation", url: "/reconciliation" },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Planning",
    items: [
      {
        id: "budgeting",
        title: "Budgeting",
        icon: Target,
        subItems: [
          { id: "budgets", title: "Budgets", url: "/budgets" },
          { id: "forecasts", title: "Forecasts", url: "/forecasts" },
          { id: "variance-analysis", title: "Variance Analysis", url: "/variance-analysis" },
          { id: "cost-centers", title: "Cost Centers", url: "/cost-centers" },
        ],
      },
      {
        id: "assets",
        title: "Assets",
        icon: Package,
        subItems: [
          { id: "fixed-assets", title: "Fixed Assets", url: "/assets" },
          { id: "asset-register", title: "Asset Register", url: "/assets/register" },
          { id: "depreciation", title: "Depreciation", url: "/depreciation" },
        ],
      },
    ],
  },
  {
    id: 6,
    label: "Insights",
    items: [
      {
        id: "reports",
        title: "Reports",
        icon: FileBarChart,
        subItems: [
          { id: "report-center", title: "Report Center", url: "/reports" },
          { id: "report-pl", title: "Profit & Loss", url: "/reports/profit-loss" },
          { id: "report-bs", title: "Balance Sheet", url: "/reports/balance-sheet" },
          { id: "report-cf", title: "Cash Flow", url: "/reports/cash-flow" },
          { id: "report-tb", title: "Trial Balance", url: "/reports/trial-balance" },
          { id: "report-gl", title: "General Ledger", url: "/reports/general-ledger" },
          { id: "report-ar", title: "AR Aging", url: "/reports/ar-aging" },
          { id: "report-ap", title: "AP Aging", url: "/reports/ap-aging" },
          { id: "report-tax", title: "Tax Summary", url: "/reports/tax-summary" },
          { id: "report-bva", title: "Budget vs Actual", url: "/reports/budget-vs-actual" },
        ],
      },
      {
        id: "analytics",
        title: "Analytics",
        icon: LineChart,
        subItems: [
          { id: "analytics-revenue", title: "Revenue", url: "/analytics/revenue" },
          { id: "analytics-expenses", title: "Expenses", url: "/analytics/expenses" },
          { id: "analytics-cash-flow", title: "Cash Flow", url: "/analytics/cash-flow" },
          { id: "analytics-profitability", title: "Profitability", url: "/analytics/profitability" },
          { id: "analytics-kpis", title: "Financial KPIs", url: "/analytics/kpis" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Administration",
    items: [
      {
        id: "administration",
        title: "Administration",
        icon: Settings,
        subItems: [
          { id: "settings-company", title: "Company", url: "/settings" },
          { id: "settings-fiscal-periods", title: "Fiscal Periods", url: "/settings/fiscal-periods" },
          { id: "settings-currencies", title: "Currencies", url: "/settings/currencies" },
          { id: "settings-tax", title: "Tax Settings", url: "/settings/tax" },
          { id: "settings-accounting", title: "Accounting Settings", url: "/settings/accounting" },
        ],
      },
    ],
  },
];
