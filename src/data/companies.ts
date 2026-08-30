import type { Company } from "@/types/finance";

export const companies: Company[] = [
  {
    id: "argent-holdings",
    name: "Argent Holdings",
    legalName: "Argent Holdings (Pty) Ltd",
    registrationNumber: "2014/118203/07",
    industry: "Diversified Holdings",
    baseCurrency: "ZAR",
    fiscalYearStart: "2026-01-01",
    address: "12 Century Drive, Sandton, Johannesburg, 2196",
  },
  {
    id: "argent-distribution",
    name: "Argent Distribution",
    legalName: "Argent Distribution (Pty) Ltd",
    registrationNumber: "2016/244911/07",
    industry: "Wholesale Distribution",
    baseCurrency: "ZAR",
    fiscalYearStart: "2026-01-01",
    address: "44 Harbourview Street, Cape Town, 8001",
  },
  {
    id: "argent-manufacturing",
    name: "Argent Manufacturing",
    legalName: "Argent Manufacturing (Pty) Ltd",
    registrationNumber: "2011/077562/07",
    industry: "Industrial Manufacturing",
    baseCurrency: "ZAR",
    fiscalYearStart: "2026-01-01",
    address: "8 Rivonia Road, Centurion, Pretoria, 0157",
  },
];

/**
 * Deterministic relative scale applied to consolidated (Argent Holdings) dashboard
 * figures so switching the company selector visibly changes the numbers shown,
 * without maintaining three entirely separate transaction ledgers.
 */
export const companyScale: Record<string, number> = {
  "argent-holdings": 1,
  "argent-distribution": 0.58,
  "argent-manufacturing": 0.41,
};

export const defaultCompanyId = companies[0].id;
