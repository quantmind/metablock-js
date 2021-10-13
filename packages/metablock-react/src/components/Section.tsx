import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";

interface SectionProps {
  component?: React.ElementType;
  children: any;
}

const Section = (props: SectionProps) => {
  const { children, component = "section" } = props;
  return (
    <Typography
      component={component}
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Typography>
  );
};

export default Section;
