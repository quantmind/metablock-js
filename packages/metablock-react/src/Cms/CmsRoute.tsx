import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { NotFound } from "../views";
import CmsEntry from "./CmsEntry";
import CmsPaginate from "./CmsPaginate";

interface CmsProps {
  topic: string;
  slug?: string[];
  defaultSlug?: string;
  NotFoundComponent?: any;
  ListComponent?: any;
  EntryComponent?: any;
  [x: string]: any;
}

const CmsRoute = (props: CmsProps) => {
  const {
    slug = ["slug"],
    defaultSlug = "index",
    NotFoundComponent = NotFound,
    ListComponent,
    EntryComponent,
    topic,
    ...extra
  } = props;
  const entryPath = slug.map((s: string) => `:${s}`).join("/");
  //if (path.substring(path.length - 1) === "/")
  //  path = path.substring(0, path.length - 1);

  const CmsPage = (props: any) => {
    let { params } = props;
    const parameters = useParams();
    if (!params) {
      params = slug.reduce((o: any, s: string) => {
        if (s in parameters) o[s] = parameters[s];
        return o;
      }, {});
    }
    return (
      <CmsEntry
        params={params}
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
        <Route path="" element={<CmsPage params={{ slug: defaultSlug }} />} />
      ) : (
        <Route
          path=""
          element={
            <CmsPaginate topic={topic} slug={slug} Component={ListComponent} />
          }
        />
      )}
      <Route path={`/${entryPath}`} element={<CmsPage />} />
      <Route path="*" element={<NotFoundComponent />} />
    </Routes>
  );
};

export default CmsRoute;
