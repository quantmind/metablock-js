import { Button, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Crumb } from "../utils/breadcrumbs";

const Buttons = ({
  tabs,
  path,
  size,
}: {
  tabs: Crumb[];
  path?: string;
  size?: any;
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {tabs.map((item: Crumb, index: number) =>
        item.onClick ? (
          <Button
            key={index}
            // @ts-ignore
            onClick={item.onClick}
            size={size}
            variant="outlined"
          >
            {item.text}
          </Button>
        ) : item.to ? (
          <Button
            key={index}
            to={item.to}
            component={RouterLink}
            size={size}
            variant={item.to === path ? "contained" : "outlined"}
          >
            {item.text}
          </Button>
        ) : null
      )}
    </Stack>
  );
};

export default Buttons;
