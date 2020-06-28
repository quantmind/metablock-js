import { bundleUrl } from "@metablock/core";
import React from "react";
import { useFetch } from "@metablock/react";
import EntryLayout from "./EntryLayout";
import { CmsData } from "./interfaces";
import { matchSlug, render } from "./op";
import store from "./store";

interface CmsProps {
  topic: string;
  slug: string[];
  NotFoundComponent: any;
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
    Component = EntryLayout,
    ...extra
  } = props;
  const url = bundleUrl(`${topic}/${params.slug}.json`);
  const data = useFetch(() => store.get(url), url);
  if (!data) return null;
  const entry = render(data) as CmsData;
  if (!matchSlug(entry, slug, params)) return <NotFoundComponent />;
  return <Component {...extra} {...entry} />;
};

export default CmsEntry;
