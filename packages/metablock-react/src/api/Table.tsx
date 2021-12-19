import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Link from "../components/Link";
import { ApiDataGrid } from "../table";
import CrudForm from "./Form";
import { ExtensionData } from "./interfaces";

const Table = (props: ExtensionData<any>) => {
  const { title, items, url, create, Update, options = {}, ...extra } = props;
  if (!items) throw new Error("items async function must be provided");
  const { columns } = options;
  return (
    <Routes>
      {create ? (
        <Route path={`${url}/new`}>
          <CrudForm {...create} />
        </Route>
      ) : null}
      {Update ? (
        <Route path={`${url}/:key`}>
          <Update {...extra} />
        </Route>
      ) : null}
      <Route path={url}>
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
    </Routes>
  );
};

export default Table;
