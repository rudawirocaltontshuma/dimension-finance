export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "number"
  | "select"
  | "combobox"
  | "date"
  | "checkbox"
  | "radio"
  | "switch";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  description?: string;
  placeholder?: string;
  options?: FieldOption[];
  defaultValue?: string | boolean;
}
