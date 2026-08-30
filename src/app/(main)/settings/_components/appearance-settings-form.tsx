"use client";

import { useShallow } from "zustand/react/shallow";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { THEME_PRESET_OPTIONS } from "@/lib/preferences/theme";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

export function AppearanceSettingsForm() {
  const { values, setPreference } = usePreferencesStore(
    useShallow((state) => ({ values: state.values, setPreference: state.setPreference })),
  );

  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <Field orientation="responsive">
          <div className="flex-1">
            <FieldLabel>Theme Mode</FieldLabel>
            <FieldDescription>Choose light, dark, or match your system setting.</FieldDescription>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            value={values.theme_mode}
            onValueChange={(value) => value && setPreference("theme_mode", value as typeof values.theme_mode)}
          >
            <ToggleGroupItem value="light">Light</ToggleGroupItem>
            <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
            <ToggleGroupItem value="system">System</ToggleGroupItem>
          </ToggleGroup>
        </Field>

        <Field orientation="responsive">
          <div className="flex-1">
            <FieldLabel htmlFor="theme-preset">Color Preset</FieldLabel>
            <FieldDescription>Applies across tables, charts and status indicators.</FieldDescription>
          </div>
          <Select
            value={values.theme_preset}
            onValueChange={(value) => setPreference("theme_preset", value as typeof values.theme_preset)}
          >
            <SelectTrigger id="theme-preset" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {THEME_PRESET_OPTIONS.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field orientation="responsive">
          <div className="flex-1">
            <FieldLabel>Content Layout</FieldLabel>
            <FieldDescription>Centered content or full-width layout.</FieldDescription>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            value={values.content_layout}
            onValueChange={(value) => value && setPreference("content_layout", value as typeof values.content_layout)}
          >
            <ToggleGroupItem value="centered">Centered</ToggleGroupItem>
            <ToggleGroupItem value="full-width">Full Width</ToggleGroupItem>
          </ToggleGroup>
        </Field>

        <Field orientation="responsive">
          <div className="flex-1">
            <FieldLabel>Sidebar Style</FieldLabel>
            <FieldDescription>Visual style of the navigation sidebar.</FieldDescription>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            value={values.sidebar_variant}
            onValueChange={(value) => value && setPreference("sidebar_variant", value as typeof values.sidebar_variant)}
          >
            <ToggleGroupItem value="inset">Inset</ToggleGroupItem>
            <ToggleGroupItem value="sidebar">Sidebar</ToggleGroupItem>
            <ToggleGroupItem value="floating">Floating</ToggleGroupItem>
          </ToggleGroup>
        </Field>
      </FieldGroup>
    </div>
  );
}
