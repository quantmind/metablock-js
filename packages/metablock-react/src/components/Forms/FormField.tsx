import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React from "react";

interface FieldProps {
  name: string;
  label: string;
  help?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: any;
  [x: string]: any;
}

const FormField = (props: FieldProps) => {
  const { label, name, help, ref, onChange, ...extra } = props;
  const id = `field-${name}`;
  const helpId = `field-help-${name}`;
  const inputProps: Record<string, any> = { name };
  if (onChange) inputProps.onChange = onChange;
  else if (ref) inputProps.ref = ref;
  return (
    <FormControl {...extra}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input id={id} aria-describedby={help ? helpId : ""} {...inputProps} />
      {help ? <FormHelperText id={helpId}>{help}</FormHelperText> : null}
    </FormControl>
  );
};

export default FormField;
