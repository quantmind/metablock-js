import MuiPaper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import { capitalize } from "@mui/material/utils";
import withStyles from "@mui/styles/withStyles";
import clsx from "clsx";
import React from "react";

const styles = (theme: Theme) => ({
  backgroundLight: {
    backgroundColor: theme.palette.secondary.light,
  },
  backgroundMain: {
    backgroundColor: theme.palette.secondary.main,
  },
  backgroundDark: {
    backgroundColor: theme.palette.secondary.dark,
  },
  padding: {
    padding: theme.spacing(1),
  },
});

interface Props {
  background?: string;
  classes: Record<string, string>;
  className?: string;
  padding?: boolean;
}

const Paper = (props: Props) => {
  const {
    background = "light",
    classes,
    className,
    padding = false,
    ...other
  } = props;
  return (
    <MuiPaper
      elevation={0}
      square
      className={clsx(
        classes[`background${capitalize(background)}`],
        {
          [classes.padding]: padding,
        },
        className
      )}
      {...other}
    />
  );
};

export default withStyles(styles)(Paper);
