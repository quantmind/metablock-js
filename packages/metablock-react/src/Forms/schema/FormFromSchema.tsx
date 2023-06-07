import React from "react";
import FieldFromSchema from "./FieldFromSchema";
import { SchemaFormProps } from "./interfaces";

const FormFromSchema = (props: SchemaFormProps) => {
  const { name = "", ...extra } = props;
  return <FieldFromSchema name={name} {...extra} />;
};

export default FormFromSchema;
