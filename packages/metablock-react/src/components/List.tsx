import MuiLink from "@mui/material/Link";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import Link from "./Link";

type Direction = "vertical" | "horizontal";
type Align = "left" | "right";

interface ListItem {
  text?: any;
  href?: string;
  to?: string;
  icon?: React.ReactNode;
}

interface ListProps {
  items: ListItem[];
  color?: any;
  underline?: any;
  direction?: Direction;
  align?: Align;
}

const styling: Record<string, any> = {
  horizontalLeft: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  horizontalRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 0,
  },
  horizontalLeftItem: {
    width: "auto",
    padding: 0,
    pr: 2,
  },
  horizontalRightItem: {
    width: "auto",
    padding: 0,
    pl: 2,
  },
  vertical: {},
  verticalItem: {},
  icon: {
    minWidth: "auto",
    //paddingRight: theme.spacing(0.5),
  },
};

const List = (props: ListProps) => {
  const {
    items,
    direction = "vertical",
    align = "left",
    color = "inherit",
    underline = "always",
  } = props;
  const name = `${direction}${align
    .substring(0, 1)
    .toUpperCase()}${align.substring(1)}`;
  const sxList = styling[name];
  const sxItem = styling[`${name}Item`];
  return (
    <MuiList sx={sxList}>
      {items
        .filter((item) => item.text || item.href || item.to)
        .map((item, index) => (
          <MuiListItem key={index} sx={sxItem}>
            {item.icon ? (
              <ListItemIcon sx={styling.icon}>{item.icon}</ListItemIcon>
            ) : null}
            <ListItemText
              primary={
                item.href ? (
                  <MuiLink href={item.href} color={color} underline={underline}>
                    {item.text || item.href}
                  </MuiLink>
                ) : item.to ? (
                  <Link to={item.to} color={color} underline={underline}>
                    {item.text || item.to}
                  </Link>
                ) : (
                  item.text
                )
              }
            />
          </MuiListItem>
        ))}
    </MuiList>
  );
};

export default List;
