import Home from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import Page from "./Page";

const styling: Record<string, any> = {
  icon: {
    width: 192,
    height: 192,
    color: "secondary.main",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
  paper: {
    backgroundColor: "background.default",
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
};

const PageNotFound = () => {
  return (
    <Page title="Page not found" statusCode={404}>
      <Paper sx={styling.paper}>
        <Box sx={styling.container}>
          <Typography variant="h4">404</Typography>
          <Typography variant="subtitle1">Page Not Fund</Typography>
          <Button
            color="secondary"
            aria-label="home"
            href="/"
            sx={styling.button}
          >
            <Home />
          </Button>
        </Box>
      </Paper>
    </Page>
  );
};

export default PageNotFound;
