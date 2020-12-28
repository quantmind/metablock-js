import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Link from "../components/Link";
import { useStores } from "../store";
import { MetaTable } from "../table";
import CrudForm from "./Form";
import { ExtensionData } from "./interfaces";

const Table = (props: ExtensionData<any>) => {
  const { title, items, url, create, Update, options = {}, ...extra } = props;
  const stores = useStores();
  if (!items) throw new Error("items async function must be provided");
  const { columns } = options;
  const tableData = async (metaQuery: any) => {
    return await items(stores, metaQuery);
  };
  return (
    <Switch>
      {create ? (
        <Route path={`${url}/new`} exact>
          <CrudForm {...create} />
        </Route>
      ) : null}
      {Update ? (
        <Route path={`${url}/:key`} exact>
          <Update {...extra} />
        </Route>
      ) : null}
      <Route path={url} exact>
        {create ? (
          <Box pb={2}>
            <Link to={`${url}/new`}>
              <Button color="primary" variant="contained">
                {create.label}
              </Button>
            </Link>
          </Box>
        ) : null}
        <MetaTable title={title} columns={columns} data={tableData} />
      </Route>
    </Switch>
  );
};

export default Table;
