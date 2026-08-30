"use client";

import type * as React from "react";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface DemoActionButtonProps extends React.ComponentProps<typeof Button> {
  message: string;
  label: string;
  icon?: React.ReactNode;
}

/**
 * A button that performs no real action beyond showing a toast — used for
 * every "demo only" affordance across Nexora Finance (exports, approvals,
 * reconciliation, saves) so interactions feel real without any backend.
 */
export function DemoActionButton({ message, label, icon, onClick, ...props }: DemoActionButtonProps) {
  return (
    <Button
      {...props}
      onClick={(event) => {
        toast(message);
        onClick?.(event);
      }}
    >
      {icon}
      {label}
    </Button>
  );
}

export function ExportPreviewButton({ label = "Export Preview", ...props }: Partial<DemoActionButtonProps>) {
  return (
    <DemoActionButton
      variant="outline"
      size="sm"
      message="Export preview prepared."
      label={label}
      icon={<Download data-icon="inline-start" />}
      {...props}
    />
  );
}

export function SaveDemoButton({ label = "Save Demo", ...props }: Partial<DemoActionButtonProps>) {
  return (
    <DemoActionButton size="sm" message="Demo changes saved locally. Nothing was persisted." label={label} {...props} />
  );
}
