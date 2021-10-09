import makeStyles from '@mui/styles/makeStyles';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  legend: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "var(--space-s)",
    width: "100%",
  },
}));

const Fieldset = (props: any) => {
  const { legend, children } = props;
  const classes = useStyles();

  return (
    <fieldset className={classes.root}>
      <legend className={classes.legend}>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
