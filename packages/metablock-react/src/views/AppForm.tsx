import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";

const AppForm = (props: any) => {
  const { children, sx, maxWidth = "xs", mt = 8, ...extra } = props;
  const sxx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...sx,
  };
  return (
    <Container maxWidth={maxWidth} disableGutters>
      <Box mt={mt} sx={sxx} {...extra}>
        {children}
      </Box>
    </Container>
  );
};

export default AppForm;
