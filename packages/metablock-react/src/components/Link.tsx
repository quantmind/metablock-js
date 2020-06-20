import MuiLink from "@material-ui/core/Link";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Link = (props: any) => {
  const { children, ...extra } = props;
  return (
    <MuiLink component={RouterLink} {...extra}>
      {children}
    </MuiLink>
  );
};

export default Link;
