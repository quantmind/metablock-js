import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
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
