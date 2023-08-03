import { Button, IconButton, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Crumb } from "../utils/breadcrumbs";

const Buttons = ({
  tabs,
  path,
  size,
  color,
  spacing,
  variant,
}: {
  tabs: Crumb[];
  path?: string;
  size?: any;
  color?: any;
  spacing?: number;
  variant?: any;
}) => {
  const defaultColor = color ? color : "inherit";
  const defaultvariant = variant ? variant : "outlined";
  spacing = spacing === undefined ? 1 : spacing;
  return (
    <Stack direction="row" spacing={spacing}>
      {tabs.map((item: Crumb, index: number) => {
        const props: any = {
          variant: defaultvariant,
          color: item.color || defaultColor,
        };
        if (item.onClick) {
          props.onClick = item.onClick;
        } else if (item.to) {
          props.component = RouterLink;
          props.to = item.to;
          props.variant = item.to === path ? "contained" : defaultvariant;
        } else {
          return null;
        }
        if (item.text) {
          return (
            <Button key={index} size={size} startIcon={item.icon} {...props}>
              {item.text}
            </Button>
          );
        } else if (item.icon) {
          return (
            <IconButton
              key={index}
              component={RouterLink}
              size={size}
              {...props}
            >
              {item.icon}
            </IconButton>
          );
        } else {
          return null;
        }
      })}
    </Stack>
  );
};

export default Buttons;
