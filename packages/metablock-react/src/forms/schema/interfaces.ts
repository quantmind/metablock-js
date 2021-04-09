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
}

export interface SchemaEntryProps {
  form: FormData;
  schema: SchemaEntry;
  name: string;
  required?: boolean;
  [key: string]: any;
}

export interface SchemaFormProps {
  form: FormData;
  schema: SchemaEntry;
  [key: string]: any;
}
