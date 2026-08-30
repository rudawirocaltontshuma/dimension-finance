"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";

import { DynamicField } from "./dynamic-field";
import type { FieldConfig } from "./field-types";

function buildSchema(fields: FieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (field.type === "checkbox" || field.type === "switch") {
      shape[field.name] = z.boolean().optional();
      continue;
    }
    if (field.type === "number") {
      shape[field.name] = field.required ? z.string().min(1, `${field.label} is required`) : z.string().optional();
      continue;
    }
    shape[field.name] = field.required ? z.string().min(1, `${field.label} is required`) : z.string().optional();
  }
  return z.object(shape);
}

function buildDefaultValues(fields: FieldConfig[]) {
  const values: Record<string, string | boolean> = {};
  for (const field of fields) {
    values[field.name] = field.defaultValue ?? (field.type === "checkbox" || field.type === "switch" ? false : "");
  }
  return values;
}

interface NewRecordDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  fields: FieldConfig[];
  submitLabel?: string;
}

export function NewRecordDialog({
  trigger,
  title,
  description,
  fields,
  submitLabel = "Save Demo",
}: NewRecordDialogProps) {
  const [open, setOpen] = React.useState(false);
  const schema = React.useMemo(() => buildSchema(fields), [fields]);
  const defaultValues = React.useMemo(() => buildDefaultValues(fields), [fields]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = handleSubmit(() => {
    toast(`${title} prepared as a demo record. Nothing was saved to a real database.`);
    setOpen(false);
    reset(defaultValues);
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset(defaultValues);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            {fields.map((field) => (
              <DynamicField key={field.name} control={control} errors={errors} config={field} />
            ))}
          </FieldGroup>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
