import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { Column } from "./TableHead";

interface MetaTableBodyProps {
  records: any[];
  columns: Column[];
}

const MetaTableBody = (props: MetaTableBodyProps) => {
  const { columns, records } = props;
  return (
    <TableBody>
      {records.map((record, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.key} component="th">
              {column.toHtml(record)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default MetaTableBody;
