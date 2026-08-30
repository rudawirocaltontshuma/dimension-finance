import type { Company } from "@/types/finance";

export const companies: Company[] = [
  {
    id: "nexora-holdings",
    name: "Nexora Holdings",
    legalName: "Nexora Holdings (Pty) Ltd",
    registrationNumber: "2014/118203/07",
    industry: "Diversified Holdings",
    baseCurrency: "ZAR",
    fiscalYearStart: "2026-01-01",
    address: "12 Century Drive, Sandton, Johannesburg, 2196",
  },
  {
    id: "nexora-distribution",
    name: "Nexora Distribution",
    legalName: "Nexora Distribution (Pty) Ltd",
    registrationNumber: "2016/244911/07",
    industry: "Wholesale Distribution",
    baseCurrency: "ZAR",
    fiscalYearStart: "2026-01-01",
    address: "44 Harbourview Street, Cape Town, 8001",
  },
  {
    id: "nexora-manufacturing",
    name: "Nexora Manufacturing",
    legalName: "Nexora Manufacturing (Pty) Ltd",
    registrationNumber: "2011/077562/07",
    industry: "Industrial Manufacturing",
    baseCurrency: "ZAR",
    fiscalYearStart: "2026-01-01",
    address: "8 Rivonia Road, Centurion, Pretoria, 0157",
  },
];

/**
 * Deterministic relative scale applied to consolidated (Nexora Holdings) dashboard
 * figures so switching the company selector visibly changes the numbers shown,
 * without maintaining three entirely separate transaction ledgers.
 */
export const companyScale: Record<string, number> = {
  "nexora-holdings": 1,
  "nexora-distribution": 0.58,
  "nexora-manufacturing": 0.41,
};

export const defaultCompanyId = companies[0].id;
