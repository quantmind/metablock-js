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

export type FieldCallbackType = (name: string, props: any) => any;

export interface SchemaEntryProps {
  form: any;
  schema: SchemaEntry;
  name: string;
  required?: boolean;
  callback?: FieldCallbackType;
  [key: string]: any;
}

export interface SchemaFormProps {
  form: any;
  schema: SchemaEntry;
  callback?: FieldCallbackType;
}
