import { StaticData } from "@metablock/core";
import React from "react";
import { textEditor } from "react-data-grid";
import { ApiDataGrid, columnDeleteEntry } from "../../DataGrid";
import { SchemaEntryProps } from "./interfaces";

const copyData = (data?: any[]) => {
  return data ? data.map((d: any) => ({ ...d })) : [];
};

const EditableTable = (props: SchemaEntryProps) => {
  const { name, form, schema, ...config } = props;
  const properties = schema?.items?.properties as Record<string, any>;
  const [ignored, render] = React.useState<any>();

  config.editable = {
    async onRowAdd(newData: Record<string, any>) {
      form.data[name] = [...form.data[name], newData];
      render({});
    },
    async onRowUpdate(
      newData: Record<string, any>,
      oldData: Record<string, any>
    ) {
      const index = oldData.tableData.id;
      form.data[name][index] = newData;
      render({});
    },
    async onRowDelete(oldData: Record<string, any>) {
      const index = oldData.tableData.id;
      form.data[name].splice(index, 1);
      render({});
    },
  };

  const deleteAction = (row: any) => {};

  return (
    <ApiDataGrid
      columns={columnFromProps(properties, deleteAction)}
      api={new StaticData(copyData(form.data[name]))}
      {...config}
    />
  );
};

export const columnFromProps = (
  props: Record<string, any>,
  deleteAction: any
) => {
  const columns: any[] = Object.keys(props).map((name: string) => {
    return {
      key: name,
      name: name.split("_").join(" "),
      renderEditCell: textEditor,
    };
  });
  columns.push(columnDeleteEntry(deleteAction, (row: any) => "Delete"));
  return columns;
};

export default EditableTable;
