import { bundleUrl } from "@metablock/core";
import React from "react";
import { useAsync } from "react-use";
import EntryLayout from "./EntryLayout";
import EntryLoading from "./EntryLoading";
import { CmsData } from "./interfaces";
import { matchSlug, render } from "./op";
import store from "./store";

interface CmsProps {
  topic: string;
  slug: string[];
  NotFoundComponent: any;
  Loading?: any;
  params: Record<string, any>;
  sanitize?: Record<string, any> | boolean;
  Component?: any;
}

const CmsEntry = (props: CmsProps) => {
  const {
    topic,
    params,
    slug,
    NotFoundComponent,
    Loading = EntryLoading,
    Component = EntryLayout,
    ...extra
  } = props;
  const url = bundleUrl(`${topic}/${params.slug}.json`);
  const result = useAsync(async () => await store.get(url), [url]);
  if (result.loading) return <Loading />;
  if (!result.value) return <NotFoundComponent/>;
  const data = result.value as any;
  const entry = render(data) as CmsData;
  const baseUrl = entry.index
    ? bundleUrl(`${topic}/${params.slug}`)
    : bundleUrl(topic);
  if (!matchSlug(entry, slug, params)) return <NotFoundComponent />;
  return <Component {...extra} {...entry} url={url} baseUrl={baseUrl} />;
};

export default CmsEntry;
