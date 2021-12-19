import { NotFound } from "@metablock/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CmsEntry from "./CmsEntry";
import CmsPaginate from "./CmsPaginate";

interface CmsProps {
  match: any;
  topic?: string;
  slug?: string[];
  NotFoundComponent?: any;
  ListComponent?: any;
  EntryComponent?: any;
  [x: string]: any;
}

const CmsRoute = (props: CmsProps) => {
  const {
    match,
    slug = ["slug"],
    NotFoundComponent = NotFound,
    ListComponent,
    EntryComponent,
    ...extra
  } = props;
  let { topic = "" } = props;
  if (!topic) topic = match.url.substring(1);
  const entryPath = slug.map((s: string) => `:${s}`).join("/");
  let path = match.url;
  if (path.substring(path.length - 1) === "/")
    path = path.substring(0, path.length - 1);

  const CmsPage = (props: any) => {
    const { match, params } = props;
    const cmsParams = { ...match.params, ...params };
    return (
      <CmsEntry
        params={cmsParams}
        topic={topic}
        slug={slug}
        Component={EntryComponent}
        NotFoundComponent={NotFoundComponent}
        {...extra}
      />
    );
  };

  return (
    <Routes>
      {ListComponent === false ? (
        <Route path={match.url}>
          <CmsPage params={{ slug: "index" }} />
        </Route>
      ) : (
        <Route path={path}>
          <CmsPaginate
            path={match.url}
            topic={topic}
            slug={slug}
            Component={ListComponent}
          />
        </Route>
      )}
      <Route path={`${path}/${entryPath}`}>
        <CmsPage />
      </Route>
      <Route element={NotFoundComponent} />
    </Routes>
  );
};

export default CmsRoute;
