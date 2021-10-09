import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Link from "../components/Link";
import { ApiDataGrid } from "../table";
import CrudForm from "./Form";
import { ExtensionData } from "./interfaces";

const Table = (props: ExtensionData<any>) => {
  const { title, items, url, create, Update, options = {}, ...extra } = props;
  if (!items) throw new Error("items async function must be provided");
  const { columns } = options;
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
        <ApiDataGrid title={title} columns={columns} api={items} />
      </Route>
    </Switch>
  );
};

export default Table;
