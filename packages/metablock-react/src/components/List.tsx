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
  [x: string]: any;
}

interface ListProps {
  items: ListItem[];
  color?: any;
  underline?: any;
  direction?: Direction;
  align?: Align;
  primaryTypographyProps?: Record<string, any>;
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
    primaryTypographyProps = { variant: "body1" },
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
        .map(({ icon, href, to, text, ...extra }: ListItem, index: number) => {
          return (
            <MuiListItem key={index} sx={sxItem}>
              {icon ? (
                <ListItemIcon sx={styling.icon}>{icon}</ListItemIcon>
              ) : null}
              <ListItemText
                primaryTypographyProps={primaryTypographyProps}
                primary={
                  href ? (
                    <MuiLink
                      href={href}
                      color={color}
                      underline={underline}
                      {...extra}
                    >
                      {text || href}
                    </MuiLink>
                  ) : to ? (
                    <Link
                      to={to}
                      color={color}
                      underline={underline}
                      {...extra}
                    >
                      {text || to}
                    </Link>
                  ) : (
                    text
                  )
                }
              />
            </MuiListItem>
          );
        })}
    </MuiList>
  );
};

export default List;
