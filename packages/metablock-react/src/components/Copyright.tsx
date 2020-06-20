import Typography from "@material-ui/core/Typography";
import React from "react";
import { useBlock } from "../dom";
import Link from "./Link";

const Copyright = () => {
  const block = useBlock();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        {block.title}
      </Link>{" "}
      {new Date().getFullYear()}. All rights reserved.
    </Typography>
  );
};

export default Copyright;
