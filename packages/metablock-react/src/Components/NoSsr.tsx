import React, { ReactNode } from "react";

const NoSsr = (props: { children: ReactNode }) => {
  const { children } = props;
  return <>{isSsr() ? null : children}</>;
};

export const isSsr = () => {
  const params = new URL(location.href).searchParams;
  return params.get("_ssr") === "yes";
};

export default NoSsr;
