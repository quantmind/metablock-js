import React from "react";
import TextField from "../TextField";
import { SchemaEntryProps } from "./interfaces";

const StringSchema: React.FC<SchemaEntryProps> = (prop: SchemaEntryProps) => {
  const { name, schema, ...extra } = prop;
  const { description } = schema;
  return (
    <TextField
      fullWidth
      name={name}
      variant="outlined"
      margin="normal"
      label={description || name}
      placeholder={description || name}
      {...extra}
    />
  );
};

export default StringSchema;
