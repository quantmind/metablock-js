import Typography from "@mui/material/Typography";
import React from "react";

const FormErrorMessage = (props: any) => {
  const { children, color = "error", ...extra } = props;
  return (
    <Typography color={color} {...extra}>
      {children}
    </Typography>
  );
};

export default FormErrorMessage;
