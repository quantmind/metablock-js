import React from "react";
import FieldFromSchema from "./FieldFromSchema";
import { SchemaFormProps } from "./interfaces";

const FormFromSchema = (props: SchemaFormProps) => {
  return <FieldFromSchema name="" {...props} />;
};

export default FormFromSchema;
