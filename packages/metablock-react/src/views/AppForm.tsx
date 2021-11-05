import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const AppForm = (props: Props) => {
  const { children } = props;

  return (
    <Container maxWidth="xs">
      <Box
        mt={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default AppForm;
