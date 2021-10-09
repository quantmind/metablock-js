import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAsync } from "react-use";
import Link from "../components/Link";
import CrudForm from "./Form";
import { ExtensionData } from "./interfaces";
import ListEntry from "./ListEntry";

interface ListItem {
  title: string;
  description: any;
  url?: string;
}

const List = (props: ExtensionData<ListItem>) => {
  const { url, items, create } = props;
  if (!items) throw new Error("items async function must be provided");
  useAsync(async () => {
    await items.loadData();
  });

  return (
    <Switch>
      {create ? (
        <Route path={`${url}/new`} exact>
          <CrudForm {...create} />
        </Route>
      ) : null}
      <Route path={url} exact>
        {create ? (
          <Box pb={2}>
            <Link to={`${url}/new`}>
              <Button variant="contained" color="primary">
                {create.label}
              </Button>
            </Link>
          </Box>
        ) : null}
        {items.data.map((ext: ListItem, index: number) => {
          const { description, ...extra } = ext;
          return (
            <ListEntry {...extra} key={index}>
              {description}
            </ListEntry>
          );
        })}
      </Route>
    </Switch>
  );
};

export default List;
