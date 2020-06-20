import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect } from "react";
import MetaTableBody from "./TableBody";
import TableHead, { Column } from "./TableHead";
import TablePagination from "./TablePagination";

type Order = "asc" | "desc";

interface MetaTableProps {
  rowsPerPage?: number;
  pagination?: boolean;
  serverSide?: boolean;
  columns: Column[];
  records?: any[];
  count?: number;
  useState?: (initial: any) => any;
  onTableChange: (action: any, state: any) => void;
}

const MetaTable = (props: MetaTableProps) => {
  const {
    serverSide,
    pagination,
    columns,
    records = [],
    onTableChange,
    useState = React.useState,
    count,
    ...extra
  } = props;
  const initialState = {
    order: "asc",
    orderBy: "",
    page: 0,
    rawsPerPage: 25,
    dense: false,
  };
  const [state, setState] = useState(initialState);
  const numRecords = count === undefined ? records.length : count;

  const tableAction = async (action: string, stateChange: any) => {
    const newState = { ...state, ...stateChange };
    setState(newState);
    if (onTableChange) {
      await onTableChange(action, newState);
    }
  };

  useEffect(() => {
    if (serverSide) tableAction("init", state);
  });

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead columns={columns} />
          <MetaTableBody columns={columns} records={records} />
        </Table>
      </TableContainer>
      {pagination ? (
        <TablePagination
          onTableChange={tableAction}
          count={numRecords}
          {...extra}
        />
      ) : null}
    </Paper>
  );
};

export default MetaTable;
