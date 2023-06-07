import React from "react";
import { propName } from "./data";
import FieldFromSchema from "./FieldFromSchema";
import Fieldset from "./Fieldset";
import { SchemaEntryProps } from "./interfaces";

const ObjectSchema: React.FC<SchemaEntryProps> = (props: SchemaEntryProps) => {
  const { name, schema, ...extra } = props;
  if (name)
    return (
      <Fieldset legend={schema.description}>
        <ObjectProperties name={name} schema={schema} {...extra} />
      </Fieldset>
    );
  else return <ObjectProperties name={name} schema={schema} {...extra} />;
};

const ObjectProperties: React.FC<SchemaEntryProps> = (
  props: SchemaEntryProps
) => {
  const { schema, name, ...extra } = props;
  const { properties = {} } = schema;
  const required = new Set(schema.required);
  return (
    <>
      {Object.keys(properties).map((key: string) => (
        <FieldFromSchema
          key={key}
          name={propName(key, name)}
          schema={properties[key]}
          required={required.has(key)}
          {...extra}
        />
      ))}
    </>
  );
};

export default ObjectSchema;
