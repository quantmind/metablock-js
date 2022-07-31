import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";

interface SectionProps {
  component?: React.ElementType;
  children: any;
  maxWidth?: any;
  sx?: any;
  [x: string]: any;
}

const Section = (props: SectionProps) => {
  const {
    children,
    component = "section",
    maxWidth = "lg",
    sx,
    ...extra
  } = props;
  const sxt = {
    display: "flex",
    position: "relative",
    backgroundColor: "background.default",
    ...sx,
  };
  return (
    <Box component={component} sx={sxt} {...extra}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};

export default Section;
