import TablePagination from "@material-ui/core/TablePagination";
import React from "react";

const extractPagination = (options: any) => {
  return {
    // serverSide: options.serverSide,
    onTableChange: options.onTableChange,
    page: options.page || 0,
    count: options.count || -1,
    component: options.paginationComponent || "div",
    rowsPerPage: options.rowsPerPage || 25,
    rowsPerPageOptions: options.rowsPerPageOptions || [5, 10, 25, 50],
  };
};

const MetaTablePagination = (props: any) => {
  const { onTableChange, ...options } = extractPagination(props);

  const handleChangePage = async (_: any, newPage: number) => {
    await onTableChange("page", { page: newPage });
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rpp = parseInt(event.target.value, 10);
    await onTableChange("rawsPerPage", { rawsPerPage: rpp });
  };

  return (
    <TablePagination
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      {...options}
    />
  );
};

export default MetaTablePagination;
