import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React from "react";
import { FormControlProps } from "./ControlField";

const CheckBoxField = (props: FormControlProps) => {
  const {
    name,
    label = "",
    Component = Checkbox,
    color,
    form,
    helperText = "",
    ...extra
  } = props;
  const cprops: any = {};
  if (form.defaults[name]) cprops.defaultChecked = true;
  extra.error = form.errors.has(name);
  const help = form.helperText(name, helperText);
  return (
    <FormControl {...extra}>
      <FormControlLabel
        control={
          <Component
            color={color}
            onChange={form.onChange()}
            name={name}
            {...cprops}
          />
        }
        label={label}
      />
      {help ? <FormHelperText>{help}</FormHelperText> : null}
    </FormControl>
  );
};

export default CheckBoxField;
