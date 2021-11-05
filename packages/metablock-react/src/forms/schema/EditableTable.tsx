import { StaticData } from "@metablock/core";
import React from "react";
import { ApiDataGrid } from "../../table";
import { SchemaEntryProps } from "./interfaces";

const copyData = (data: any[]) => {
  return data.map((d: any) => ({ ...d }));
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

  return (
    <ApiDataGrid
      columns={columnFromProps(properties)}
      api={new StaticData(copyData(form.data[name]))}
      {...config}
    />
  );
};

export const columnFromProps = (props: Record<string, any>) => {
  return Object.keys(props).map((name: string) => {
    return {
      key: name,
      name: name.split("_").join(" "),
    };
  });
};

export default EditableTable;
