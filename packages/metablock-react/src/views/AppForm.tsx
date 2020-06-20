import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

interface Props {
  children: React.ReactNode;
}

const AppForm = (props: Props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>{children}</div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AppForm;
