import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import FormControl from "../ControlField";
import { SchemaEntryProps, SelectOption } from "./interfaces";

const SelectSchema: React.FC<SchemaEntryProps> = (prop: SchemaEntryProps) => {
  const { name, schema, form, options = [], ...extra } = prop;
  const [ignored, render] = React.useState<any>();
  const { description, title } = schema;
  const current = form.data[name] || schema.default || "";
  const label = title || description || name;
  const helpText = description || name;
  const labelId = `${name}-label-id`;

  const handleChange = (event: SelectChangeEvent) => {
    form.setValue(name, event.target.value as string);
    render({});
  };

  return (
    <FormControl name={name} form={form} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        fullWidth
        name={name}
        variant="outlined"
        value={current}
        labelId={labelId}
        label={label}
        onChange={handleChange}
        {...extra}
      >
        {options.map((option: SelectOption) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helpText && helpText !== label && (
        <FormHelperText>{helpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectSchema;
