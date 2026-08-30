"use client";

import { AlertTriangle, ArrowLeft, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

interface ErrorStateProps {
  onRetry?: () => void;
  onBack?: () => void;
}

export function ErrorState({ onRetry, onBack }: ErrorStateProps) {
  return (
    <Empty className="border border-dashed py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertTriangle />
        </EmptyMedia>
        <EmptyTitle>Unable to load this demonstration view.</EmptyTitle>
        <EmptyDescription>This is a frontend-only preview — try reloading the view or go back.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={onBack ?? (() => window.history.back())}>
            <ArrowLeft />
            Back
          </Button>
          <Button size="sm" onClick={onRetry ?? (() => window.location.reload())}>
            <RotateCw />
            Try Again
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
