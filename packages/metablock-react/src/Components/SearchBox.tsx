import TextField from "@mui/material/TextField";
import React from "react";

const SearchBox = (props: any) => {
  const extra = {
    variant: "outlined",
    size: "small",
    color: "primary",
    placeholder: "Search",
    ...props,
  };
  return <TextField {...extra} />;
};

export default SearchBox;
