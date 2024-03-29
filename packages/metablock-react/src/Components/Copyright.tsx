import Typography from "@mui/material/Typography";
import React from "react";
import Link from "./Link";

interface CopyProps {
  title: string;
  rights?: React.ReactNode;
  linkColor?: string;
}

const Copyright = (props: CopyProps) => {
  const {
    linkColor = "inherit",
    rights = "All rights reserved.",
    title,
  } = props;
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color={linkColor} to="/">
        {title}
      </Link>{" "}
      {rights}
    </Typography>
  );
};

export default Copyright;
