import MuiListItem from "@material-ui/core/ListItem";
import React from "react";
import { Link } from "react-router-dom";

const ListItemLink = (props: any) => {
  const { children, ...extra } = props;
  return (
    <MuiListItem component={Link} {...extra}>
      {children}
    </MuiListItem>
  );
};

export default ListItemLink;
