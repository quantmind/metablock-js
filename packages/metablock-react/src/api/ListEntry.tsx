import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import Link from "../components/Link";

interface ListEntryProps {
  title: string;
  url?: string;
  children: any;
}

const ListEntry = (props: ListEntryProps) => {
  const { title, url, children } = props;
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

export { ListEntryProps };
export default ListEntry;
