import React from "react";
import CheckBoxField from "../CheckBoxField";
import { SchemaEntryProps } from "./interfaces";

const BooleanSchema: React.FC<SchemaEntryProps> = (prop: SchemaEntryProps) => {
  const { name, schema, ...extra } = prop;
  return (
    <CheckBoxField
      fullWidth
      margin="normal"
      name={name}
      color="primary"
      checked={schema.default}
      label={schema.description || name}
      {...extra}
    />
  );
};

export default BooleanSchema;
