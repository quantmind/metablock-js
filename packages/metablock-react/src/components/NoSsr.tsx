import React, { ReactNode } from "react";

const NoSsr = (props: { children: ReactNode }) => {
  const { children } = props;
  const params = new URL(location.href).searchParams;
  const ssr = params.get("_ssr") === "yes";
  return <>{ssr ? null : children}</>;
};

export default NoSsr;
