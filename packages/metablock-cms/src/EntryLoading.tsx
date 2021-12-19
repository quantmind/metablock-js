import { getWindowSize } from "@metablock/react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

const EntryLoading = () => {
  const height = getWindowSize().height || 200;
  const sx = {
    width: "100%",
    height: `${height}px`,
    "& > * + *": {
      marginTop: 2,
    },
  };
  return (
    <Box sx={sx}>
      <LinearProgress />
    </Box>
  );
};

export default EntryLoading;
