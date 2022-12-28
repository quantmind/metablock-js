import MuiPaper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface Props {
  background?: string;
  className?: string;
  padding?: any;
}

const Paper = (props: Props) => {
  const theme = useTheme();
  const {
    background = "light",
    className,
    padding = 1,
    ...other
  } = props;
  // @ts-ignore
  const sx: any = {backgroundColor: theme.palette.secondary[background], padding};
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
