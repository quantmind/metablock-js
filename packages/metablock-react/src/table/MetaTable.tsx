import MaterialTable, { Query, QueryResult } from "material-table";
import React from "react";
import tableIcons from "./icons";

const fetchTableRecords = (fetchMetaRecords: any) => {
  return async (query: Query<any>): Promise<QueryResult<any>> => {
    const paginatedData = await fetchMetaRecords(query);
    return {
      data: paginatedData.data,
      totalCount: paginatedData.count,
      page: paginatedData.page,
    };
  };
};

const MetaTable = (props: any) => {
  const { data, ...extra } = props;
  return (
    <MaterialTable
      icons={tableIcons}
      data={fetchTableRecords(data)}
      {...extra}
    />
  );
};

export default MetaTable;
