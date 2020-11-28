import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { ExtensionData } from "@metablock/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Link from "../components/Link";
import MetaTable from "../components/MetaTable";
import CrudForm from "./Form";

const Table = (props: ExtensionData) => {
  const { title, items, url, create, update, options = {} } = props;
  const { columns } = options;
  return (
    <Switch>
      {create ? (
        <Route path={`${url}/new`} exact>
          <CrudForm {...create} />
        </Route>
      ) : null}
      {update ? (
        <Route path={`${url}/:key`} exact>
          <CrudForm {...update} />
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
        <MetaTable title={title} columns={columns} data={items} />
      </Route>
    </Switch>
  );
};

export default Table;
