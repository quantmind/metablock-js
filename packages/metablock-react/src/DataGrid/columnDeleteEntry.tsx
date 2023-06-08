import { Button, Tooltip } from "@mui/material";
import React from "react";

const columnDeleteEntry = (action: any, tooltip?: any) => {
  return {
    name: "",
    key: "",
    renderCell: ({ row }: any) => {
      const title = tooltip ? tooltip(row) : `Delete ${row.id}`;
      return (
        <Tooltip title={title}>
          <Button size="small" color="error" onClick={() => action(row)}>
            delete
          </Button>
        </Tooltip>
      );
    },
  };
};

export default columnDeleteEntry;
