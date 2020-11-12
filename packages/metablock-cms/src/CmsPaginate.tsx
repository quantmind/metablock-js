import { bundleUrl } from "@metablock/core";
import React from "react";
import { useAsync } from "react-use";
import { CmsListData } from "./interfaces";
import ListLayout from "./ListLayout";
import { render, urlPath } from "./op";
import store from "./store";

interface CmsPaginateProps {
  path: string;
  topic: string;
  slug: string[];
  Component?: any;
}

const CmsPaginate = (props: CmsPaginateProps) => {
  const { path, topic, slug, Component = ListLayout } = props;
  const url = bundleUrl(`${topic}/index.json`);
  const result = useAsync(async () => await store.get(url), [url]);
  const data = result.value || [];
  const entries = data.map((entry: CmsListData) => {
    entry = render(entry) as CmsListData;
    entry.urlPath = `${path}/${urlPath(entry, slug)}`;
    return entry;
  });
  entries.sort((a: CmsListData, b: CmsListData) => (a.date > b.date ? -1 : 1));
  return <Component data={entries} slug={slug} />;
};

export default CmsPaginate;
