import React from "react";
import { SchemaEntryProps } from "./interfaces";
import SchemaRegistry from "./registry";
import StringSchema from "./String";

const MissingSchema = (props: SchemaEntryProps) => {
  return <StringSchema disabled {...props} />;
};

const passthrough = (name: string, props: Record<string, any>) => props;

const FieldFromSchema = (props: SchemaEntryProps) => {
  const { schema, name, form, callback = passthrough, ...extra } = props;
  let SchemaComponent = SchemaRegistry.get(`${schema.type}:${schema.format}`);
  if (!SchemaComponent) SchemaComponent = SchemaRegistry.get(schema.type);
  if (!SchemaComponent) SchemaComponent = MissingSchema;
  return (
    <SchemaComponent
      name={name}
      form={form}
      schema={schema}
      callback={callback}
      {...callback(name, extra)}
    />
  );
};

export default FieldFromSchema;
