import React from "react";
import { SchemaEntryProps } from "./interfaces";
import SchemaRegistry from "./registry";
import StringSchema from "./String";

const MissingSchema = (props: SchemaEntryProps) => {
  return <StringSchema disabled {...props} />;
};

const FieldFromSchema = (props: SchemaEntryProps) => {
  const { schema, name, form, ...extra } = props;
  let type = schema.format ? `${schema.type}:${schema.format}` : schema.type;
  let SchemaComponent;
  while (type && !SchemaComponent) {
    SchemaComponent = SchemaRegistry.get(type);
    if (!SchemaComponent) {
      const bits = type.split(":");
      type = bits.splice(0, bits.length - 1).join(":");
    }
  }
  if (!SchemaComponent) SchemaComponent = MissingSchema;
  const extraProps = form.fieldCallback(name, extra);
  if (!extraProps) return null;
  return (
    <SchemaComponent name={name} form={form} schema={schema} {...extraProps} />
  );
};

export default FieldFromSchema;
