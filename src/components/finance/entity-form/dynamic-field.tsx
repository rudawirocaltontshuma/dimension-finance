"use client";

import { type Control, Controller, type FieldErrors } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { ComboboxField } from "./combobox-field";
import { DateField } from "./date-field";
import type { FieldConfig } from "./field-types";

export function DynamicField({
  control,
  errors,
  config,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: form values shape is dynamic per entity
  control: Control<any>;
  errors: FieldErrors;
  config: FieldConfig;
}) {
  const error = errors[config.name] as { message?: string } | undefined;

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={config.name}>
        {config.label}
        {config.required && <span className="text-destructive"> *</span>}
      </FieldLabel>
      {config.description && <FieldDescription>{config.description}</FieldDescription>}
      <Controller
        control={control}
        name={config.name}
        render={({ field }) => {
          switch (config.type) {
            case "textarea":
              return (
                <Textarea
                  id={config.name}
                  placeholder={config.placeholder}
                  aria-invalid={!!error}
                  value={field.value as string}
                  onChange={field.onChange}
                />
              );
            case "select":
              return (
                <Select value={field.value as string} onValueChange={field.onChange}>
                  <SelectTrigger id={config.name} aria-invalid={!!error} className="w-full">
                    <SelectValue placeholder={config.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {config.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            case "combobox":
              return (
                <ComboboxField
                  id={config.name}
                  value={field.value as string}
                  onChange={field.onChange}
                  options={config.options ?? []}
                  placeholder={config.placeholder}
                  invalid={!!error}
                />
              );
            case "date":
              return (
                <DateField
                  id={config.name}
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder={config.placeholder}
                  invalid={!!error}
                />
              );
            case "checkbox":
              return (
                <div className="flex items-center gap-2 pt-1">
                  <Checkbox id={config.name} checked={!!field.value} onCheckedChange={field.onChange} />
                  <label htmlFor={config.name} className="text-muted-foreground text-sm">
                    {config.placeholder ?? config.label}
                  </label>
                </div>
              );
            case "switch":
              return (
                <div className="flex items-center gap-2 pt-1">
                  <Switch id={config.name} checked={!!field.value} onCheckedChange={field.onChange} />
                  <label htmlFor={config.name} className="text-muted-foreground text-sm">
                    {config.placeholder ?? config.label}
                  </label>
                </div>
              );
            case "radio":
              return (
                <RadioGroup
                  value={field.value as string}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-4 pt-1"
                >
                  {config.options?.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <RadioGroupItem value={option.value} id={`${config.name}-${option.value}`} />
                      <label htmlFor={`${config.name}-${option.value}`} className="text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              );
            case "number":
              return (
                <Input
                  id={config.name}
                  type="number"
                  placeholder={config.placeholder}
                  aria-invalid={!!error}
                  value={field.value as string}
                  onChange={field.onChange}
                />
              );
            default:
              return (
                <Input
                  id={config.name}
                  type={config.type === "email" ? "email" : "text"}
                  placeholder={config.placeholder}
                  aria-invalid={!!error}
                  value={field.value as string}
                  onChange={field.onChange}
                />
              );
          }
        }}
      />
      <FieldError errors={error ? [error] : []} />
    </Field>
  );
}
