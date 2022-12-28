import MuiPaper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface Props {
  background?: string;
  classes: Record<string, string>;
  className?: string;
  padding?: boolean;
}

const Paper = (props: Props) => {
  const theme = useTheme();
  const {
    background = "light",
    classes,
    className,
    padding = false,
    ...other
  } = props;
  // @ts-ignore
  const sx: any = {backgroundColor: theme.palette.secondary[background], padding: 1};
  return (
    <MuiPaper
      sx={sx}
      elevation={0}
      square
      className={className}
      {...other}
    />
  );
};

export default Paper;
