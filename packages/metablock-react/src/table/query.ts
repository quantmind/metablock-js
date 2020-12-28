import { Paginated } from "@metablock/core";

export const metaTableQuery = (query: any): any => {
  const metaQuery: any = {
    offset: query.page * query.pageSize,
    limit: query.pageSize,
    search: query.search,
  };
  if (query.orderBy) metaQuery.order_by = query.orderBy.field;
  if (query.orderDirection === "desc") metaQuery.order_desc = "yes";
  return metaQuery;
};

export const metaTablePage = (query: any, pagination?: Paginated<any>): any => {
  return {
    data: pagination?.data,
    page: query.page,
    count: pagination?.count,
  };
};
