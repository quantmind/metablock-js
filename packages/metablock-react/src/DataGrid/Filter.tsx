import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React from "react";
import { RenderHeaderCellProps } from "react-data-grid";

interface Option {
  value: string;
  label: string;
}

interface HeaderFilter<R> extends RenderHeaderCellProps<R> {
  sx?: Record<string, any>;
  dataGridFilters: any;
}

interface HeaderChildrenFilter<R> extends RenderHeaderCellProps<R> {
  sx?: Record<string, any>;
  children: (args: { tabIndex: number }) => React.ReactElement | null;
}

export const useFocusRef = <T extends HTMLOrSVGElement>(
  isSelected: boolean
) => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (!isSelected) return;
    ref.current?.focus({ preventScroll: true });
  }, [isSelected]);

  return {
    ref,
    tabIndex: isSelected ? 0 : -1,
  };
};

export const DataGridHeaderFilter = <R,>({
  tabIndex,
  column,
  children,
  sx,
}: HeaderChildrenFilter<R>) => {
  const sxx = { padding: 0, lineHeight: "35px", ...sx };

  return (
    <Box>
      <Box sx={sxx}>{column.name}</Box>
      <Box sx={sxx}>{children({ tabIndex })}</Box>
    </Box>
  );
};

export const DataGridNoFilter = <R,>(props: HeaderChildrenFilter<R>) => {
  return <DataGridHeaderFilter {...props}>{() => null}</DataGridHeaderFilter>;
};

export const DataGridTextFilter = <R,>({
  dataGridFilters,
  column,
  ...props
}: HeaderFilter<R>) => {
  const value = dataGridFilters.filters[column.key] || "";
  const handleChange = (event: any) => {
    dataGridFilters.set(column.key, event.target.value);
  };
  return (
    <DataGridHeaderFilter column={column} {...props}>
      {() => (
        <TextField
          hiddenLabel
          value={value}
          size="small"
          fullWidth
          onChange={handleChange}
        />
      )}
    </DataGridHeaderFilter>
  );
};

export const DataGridSelectFilter = <R,>({
  dataGridFilters,
  column,
  options,
  emptyOption,
  ...props
}: HeaderFilter<R> & {
  options: string[] | Option[];
  emptyOption?: string;
}) => {
  const value = dataGridFilters.filters[column.key] || "";
  const empty = emptyOption || "all";
  const handleChange = (event: any) => {
    dataGridFilters.set(column.key, event.target.value);
  };
  return (
    <DataGridHeaderFilter column={column} {...props}>
      {() => (
        <TextField
          select
          fullWidth
          value={value}
          size="small"
          onChange={handleChange}
        >
          {options.map((option: string | Option, index: number) => {
            if (typeof option === "string")
              option = { value: option, label: option };
            return (
              <MenuItem value={option.value} key={index}>
                {option.label || empty}
              </MenuItem>
            );
          })}
        </TextField>
      )}
    </DataGridHeaderFilter>
  );
};

export const DataGridBoolFilter = <R,>(props: HeaderFilter<R>) => (
  <DataGridSelectFilter options={["", "yes", "no"]} {...props} />
);
