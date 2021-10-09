import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import Home from "@mui/icons-material/Home";
import React from "react";
import Page from "./Page";

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
}));

const PageNotFound = () => {
  const classes = useStyles();
  return (
    <Page title="Page not found" statusCode={404}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Typography variant="h4">404</Typography>
          <Typography variant="subtitle1">Page Not Fund</Typography>
          <Button
            color="secondary"
            aria-label="home"
            href="/"
            className={classes.button}
          >
            <Home />
          </Button>
        </div>
      </Paper>
    </Page>
  );
};

export default PageNotFound;
