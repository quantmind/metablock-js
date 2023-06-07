import React, { ReactNode } from "react";

const NoSsr = ({ children }: { children?: ReactNode }) => {
  if (!children) return null;
  return <>{isSsr() ? null : children}</>;
};

export const isSsr = () => {
  const params = new URL(location.href).searchParams;
  return params.get("_ssr") === "yes";
};

export default NoSsr;
