import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import React from "react";
import TextField from "../TextField";
import { SchemaEntryProps } from "./interfaces";

const isNumber = (value: any): boolean => {
  try {
    return value.constructor === Number;
  } catch (e) {
    return false;
  }
};

let id_ = 0;
const makeId = () => {
  id_ += 1;
  return id_;
};

const IntegerSchema: React.FC<SchemaEntryProps> = (prop: SchemaEntryProps) => {
  const { name, schema, form, ...extra } = prop;
  const { description } = schema;
  if (isNumber(schema.minimum) && isNumber(schema.maximum)) {
    const id = `${name}${makeId()}`;
    return (
      <div>
        <Slider
          defaultValue={schema.default || schema.minimum}
          aria-labelledby={id}
          valueLabelDisplay="on"
          onChange={form.onChange() as any}
          name={name}
          min={schema.minimum}
          max={schema.maximum}
          {...extra}
        />
        <Typography id={id}>{description || name}</Typography>
      </div>
    );
  } else
    return (
      <TextField
        fullWidth
        name={name}
        variant="outlined"
        margin="normal"
        label={description || name}
        placeholder={description || name}
        type="number"
        form={form}
        min={schema.minimum}
        max={schema.maximum}
        {...extra}
      />
    );
};

export default IntegerSchema;
