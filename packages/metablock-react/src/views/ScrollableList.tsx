import { DataLoader } from "@metablock/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import { useAsync } from "react-use";
import Link from "../components/Link";

interface ListEntryProps {
  title: any;
  url?: string;
  children: any;
}

interface ScrollableListProps<DataType> {
  api: DataLoader<DataType>;
  listEntry: (entry: DataType) => ListEntryProps;
}

const ListEntry = ({ title, url, children }: ListEntryProps) => {
  const header = url ? <Link to={url}>{title}</Link> : title;
  return (
    <Box pb={4}>
      <Card>
        <CardHeader title={header} />
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

export const ScrollableList = <DataType = any,>({
  api,
  listEntry,
}: ScrollableListProps<DataType>) => {
  useAsync(async () => {
    await api.loadData();
  });

  return (
    <>
      {api.data.map((entry: DataType, index: number) => {
        return <ListEntry {...listEntry(entry)} key={index} />;
      })}
    </>
  );
};

export default ScrollableList;
