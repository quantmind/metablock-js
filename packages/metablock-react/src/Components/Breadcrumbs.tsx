import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import React from "react";
import { Crumb } from "../utils";
import Link from "./Link";

interface CumbsProps {
  crumbs?: Crumb[];
}

const Breadcrumbs = (props: CumbsProps) => {
  const { crumbs } = props;
  if (!crumbs) return null;
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {crumbs.map((crumb: Crumb, index) =>
        crumb.to ? (
          <Link color="inherit" to={crumb.to} key={index}>
            {crumb.text}
          </Link>
        ) : (
          <Typography color="textPrimary" key={index}>
            {crumb.text}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
