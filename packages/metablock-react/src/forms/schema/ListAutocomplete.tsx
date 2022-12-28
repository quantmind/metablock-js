import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import React from "react";
import { SchemaEntryProps } from "./interfaces";

const ListAutocompleteSchema: React.FC<SchemaEntryProps> = (
  { name, schema, form, ...extra }: SchemaEntryProps
) => {
  const { description } = schema;
  const { chipVariant = "outlined", ...moreExtra } = extra;
  const defaultValue = form.defaults[name] || schema.default || [];
  const [ignored, refresh] = React.useState({});
  const inputProps = { fullWidth: true, ...moreExtra };

  const onChange = (event: any, newValue: string[]) => {
    form.setValue(name, newValue);
    refresh({});
  };

  return (
    <Autocomplete
      multiple
      defaultValue={defaultValue}
      options={[]}
      freeSolo
      onChange={onChange}
      renderTags={(value, getTagProps) =>
        value.map((option: any, index: number) => {
          const { key, ...extra } = getTagProps({ index });
          return (
            <Chip variant={chipVariant} label={option} key={key} {...extra} />
          );
        })
      }
      renderInput={(params: any) => (
        <TextField
          {...params}
          placeholder={description || name}
          {...inputProps}
          name={name}
        />
      )}
    />
  );
};

export default ListAutocompleteSchema;
