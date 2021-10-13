import { DataApi } from "@metablock/core";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { HeaderRendererProps } from "react-data-grid";
import { ApiDataGridActionsRef } from "./types";

interface HeaderFilterProps<DataType, SR>
  extends HeaderRendererProps<DataType, SR> {
  api: DataApi<DataType>;
  actions: ApiDataGridActionsRef;
  sx?: Record<string, any>;
}

interface HeaderProps<DataType, SR> extends HeaderRendererProps<DataType, SR> {
  children: React.ReactElement;
  sx?: Record<string, any>;
}

export const DataGridHeaderFilter = <DataType, SR>(
  props: HeaderProps<DataType, SR>
) => {
  const { column, children, sx } = props;
  const sxx = { padding: 0, lineHeight: "35px", ...sx };
  return (
    <>
      <Box sx={sxx}>{column.name}</Box>
      <Box sx={sxx}>{children}</Box>
    </>
  );
};

export const DataGridBoolFilter = <DataType, SR>(
  props: HeaderFilterProps<DataType, SR>
) => {
  const { api, actions, column, ...extra } = props;
  const [value, setValue] = React.useState(api.query[column.key] || "");
  const handleChange = async (event: any) => {
    if (actions.current) {
      await actions.current.filter(column.key, event.target.value);
      setValue(api.query[column.key] || "");
    }
  };
  return (
    <DataGridHeaderFilter column={column} {...extra}>
      <TextField select value={value} size="small" onChange={handleChange}>
        <MenuItem value="">all</MenuItem>
        <MenuItem value="false">no</MenuItem>
        <MenuItem value="true">yes</MenuItem>
      </TextField>
    </DataGridHeaderFilter>
  );
};
