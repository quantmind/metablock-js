import { FormData } from "../useForm";

export interface SchemaEntry {
  type: string;
  format?: string;
  description?: string;
  required?: string[];
  default?: any;
  properties?: Record<string, any>;
  items?: SchemaEntry;
  minimum?: number;
  maximum?: number;
  enum?: string[];
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SchemaEntryProps {
  form: FormData;
  schema: SchemaEntry;
  name: string;
  required?: boolean;
  options?: SelectOption[];
  [key: string]: any;
}

export interface SchemaFormProps {
  form: FormData;
  schema: SchemaEntry;
  name?: string;
  [key: string]: any;
}
