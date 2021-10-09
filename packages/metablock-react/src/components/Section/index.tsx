import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import useStyles from "./styles";

interface SectionProps {
  component?: React.ElementType;
  children: any;
}

const Section = (props: SectionProps) => {
  const classes = useStyles();
  const { children, component = "section" } = props;
  return (
    <Typography component={component} className={classes.container}>
      <Container maxWidth="lg">{children}</Container>
    </Typography>
  );
};

export default Section;
