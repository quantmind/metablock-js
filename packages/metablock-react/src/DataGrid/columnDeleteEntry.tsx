import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { DeleteIcon } from "../Icons";

const columnDeleteEntry = (action: any, tooltip?: any) => {
  return {
    name: "",
    key: "",
    renderCell: ({ row }: any) => {
      const title = tooltip ? tooltip(row) : `Delete ${row.id}`;
      return (
        <Tooltip title={title}>
          <IconButton size="small" color="error" onClick={() => action(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
    },
  };
};

export default columnDeleteEntry;
