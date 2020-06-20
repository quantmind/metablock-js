import Link from "@material-ui/core/Link";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import React from "react";
import useStyles from "./styles";

type Align = "center" | "right" | "left";
type Order = "asc" | "desc";
type Padding = "none" | "default" | "checkbox";

const defaultToHtml = new Map();
const defaultAlign = new Map();

defaultAlign.set("boolean", "center");
defaultAlign.set("number", "right");
defaultToHtml.set("boolean", (value: boolean) =>
  value ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankIcon />
);
defaultToHtml.set("url", (value: string) => (
  <Link href={value} target="_blank" rel="noreferrer">
    {value}
  </Link>
));

export class Column {
  key: string;
  label: string;
  padding?: Padding;
  type?: string;
  align: Align;
  order?: Order;
  render?: (value: any) => string | React.ReactNode;

  constructor(key: string, options: Record<string, any> = {}) {
    this.key = key;
    this.label = options.label || key;
    this.padding = options.padding || "default";
    this.type = options.type || "string";
    this.align = options.align
      ? options.align
      : defaultAlign.get(this.type) || "left";
    this.render = options.render || defaultToHtml.get(this.type);
    this.order = undefined;
  }

  get active(): boolean {
    return this.order ? true : false;
  }

  toHtml(record: Record<string, any>): string | React.ReactNode {
    const value = record[this.key];
    const toHtml = this.render || defaultToHtml.get(typeof value);
    return toHtml ? toHtml(value, record) : "" + value;
  }

  onHeaderClick() {
    this.order = this.order === "asc" ? "desc" : "asc";
  }
}

export interface MetaTableHeadProps {
  columns: Column[];
}

const MetaTableHead = (props: MetaTableHeadProps) => {
  const { columns } = props;
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            align={column.align}
            padding={column.padding}
            sortDirection={column.order}
          >
            <TableSortLabel
              active={column.active}
              direction={column.order}
              onClick={column.onHeaderClick}
            >
              {column.label}
              {column.order ? (
                <span className={classes.visuallyHidden}>
                  {column.order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default MetaTableHead;
