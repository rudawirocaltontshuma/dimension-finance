"use client";

import * as React from "react";

import { defaultCompanyId } from "@/data/companies";
import { defaultFiscalPeriodId } from "@/data/fiscal-periods";
import type { CompanyId } from "@/types/finance";

interface WorkspaceContextValue {
  companyId: CompanyId;
  setCompanyId: (id: CompanyId) => void;
  fiscalPeriodId: string;
  setFiscalPeriodId: (id: string) => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [companyId, setCompanyId] = React.useState<CompanyId>(defaultCompanyId as CompanyId);
  const [fiscalPeriodId, setFiscalPeriodId] = React.useState(defaultFiscalPeriodId);

  const value = React.useMemo(
    () => ({ companyId, setCompanyId, fiscalPeriodId, setFiscalPeriodId }),
    [companyId, fiscalPeriodId],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
