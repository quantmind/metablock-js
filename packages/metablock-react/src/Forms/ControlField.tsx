import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import React from "react";
import { FormData } from "./useForm";

export interface FormControlProps {
  name: string;
  form: FormData;
  label?: string;
  helpText?: string;
  Component?: React.FC;
  [x: string]: any;
}

const Control = (props: FormControlProps) => {
  const { name, form, helperText = "", children, ...extra } = props;
  const text = form.helperText(name, helperText);
  extra.error = form.errors.has(name);

  return (
    <FormControl {...extra}>
      {children}
      {text ? <FormHelperText>{text}</FormHelperText> : null}
    </FormControl>
  );
};

export default Control;
