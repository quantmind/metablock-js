import MuiTextField from "@mui/material/TextField";
import React from "react";
import { FormControlProps } from "./ControlField";

const TextField = (props: FormControlProps) => {
  const { name, form, helperText = "", ...extra } = props;
  extra.error = form.errors.has(name);

  return (
    <MuiTextField
      name={name}
      onChange={form.onChange()}
      helperText={form.helperText(name, helperText)}
      defaultValue={form.defaults[name]}
      {...extra}
    />
  );
};

export default TextField;
