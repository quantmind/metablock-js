import React from "react";
import TextField from "../TextField";
import SelectSchema from "./Select";
import { SchemaEntryProps } from "./interfaces";

const StringSchema: React.FC<SchemaEntryProps> = ({options, name, schema, ...extra}: SchemaEntryProps) => {
  if (schema.enum) {
    options = schema.enum.map((value: string) => ({ value, label: value }));
  }
  if (options) return <SelectSchema name={name} schema={schema} options={options} {...extra} />;
  const { description, title } = schema;
  const label = title || description || name;
  const helpText = description || title || name;
  return (
    <TextField
      fullWidth
      name={name}
      schema={schema}
      variant="outlined"
      label={label}
      placeholder={helpText}
      {...extra}
    />
  );
};


export default StringSchema;
