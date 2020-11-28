import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ExtensionData, Paginated } from "@metablock/core";
import React from "react";
import { useAsync } from "react-use";
import Link from "../components/Link";
import ListEntry from "./ListEntry";

interface ListItem {
  title: string;
  description: any;
  url?: string;
}
type ListResult = Paginated<ListItem>;

const List = (props: ExtensionData) => {
  const { url, items, create } = props;
  if (!items) throw new Error("items async function must be provided");
  const result = useAsync(items as any);
  if (result.loading) return null;
  const p: ListResult = result.value as ListResult;

  return (
    <Grid container spacing={4}>
      {create ? (
        <Grid item lg={12}>
          <Link to={`${url}/new`}>
            <Button color="primary" variant="contained">
              {create}
            </Button>
          </Link>
        </Grid>
      ) : null}
      <Grid item lg={12}>
        {p.data.map((ext: ListItem, index: number) => {
          const { description, ...extra } = ext;
          return (
            <ListEntry {...extra} key={index}>
              {description}
            </ListEntry>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default List;
