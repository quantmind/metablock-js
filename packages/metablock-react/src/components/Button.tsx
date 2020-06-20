import MuiButton from "@material-ui/core/Button";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Button = (props: any) => {
  const { children, ...extra } = props;
  return (
    <MuiButton component={RouterLink} {...extra}>
      {children}
    </MuiButton>
  );
};

export default Button;
