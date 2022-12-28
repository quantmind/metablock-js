import FormControl from "../ControlField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { SchemaEntryProps, SelectOption } from "./interfaces";

const SelectSchema: React.FC<SchemaEntryProps> = (prop: SchemaEntryProps) => {
  const { name, schema, form, options = [], ...extra } = prop;
  const [ignored, render] = React.useState<any>();
  const { description } = schema;
  const current = form.data[name] || schema.default || "";

  const handleChange = (event: SelectChangeEvent) => {
    form.setValue(name, event.target.value as string);
    render({});
  };

  return (
    <FormControl name={name} form={form} fullWidth>
      <InputLabel>{description || name}</InputLabel>
      <Select
        fullWidth
        name={name}
        variant="outlined"
        value={current}
        label={description || name}
        onChange={handleChange}
        {...extra}
      >
        {options.map((option: SelectOption) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSchema;
