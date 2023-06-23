import { Button, IconButton, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Crumb } from "../utils/breadcrumbs";

const Buttons = ({
  tabs,
  path,
  size,
  color,
}: {
  tabs: Crumb[];
  path?: string;
  size?: any;
  color?: any;
}) => {
  const defaultColor = color ? color : "inherit";
  return (
    <Stack direction="row" spacing={1}>
      {tabs.map((item: Crumb, index: number) => {
        const props: any = {
          variant: "outlined",
          color: item.color || defaultColor,
        };
        if (item.onClick) {
          props.onClick = item.onClick;
        } else if (item.to) {
          props.component = RouterLink;
          props.to = item.to;
          props.variant = item.to === path ? "contained" : "outlined";
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
