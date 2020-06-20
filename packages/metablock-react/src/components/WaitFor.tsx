import React, { useEffect, useState } from "react";

interface WaitForProps {
  Component: any;
  children: React.ReactNode;
  [x: string]: any;
}

class Waitable {
  asyncCallable: () => Promise<any>;

  constructor(asyncCallable: () => Promise<any>) {
    this.asyncCallable = asyncCallable;
  }
}

export const waitable = (asyncCallable: () => Promise<any>) => {
  return new Waitable(asyncCallable);
};

const WaitFor = (props: WaitForProps) => {
  const { Component, children, ...extra } = props;
  const [componentProps, setComponentProps] = useState(
    {} as Record<string, any>
  );
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (waiting) {
      const toWait: any[] = [];
      Object.keys(extra).forEach((key: string) => {
        const value = props[key];
        if (value instanceof Waitable)
          toWait.push({ key, asyncCallable: value.asyncCallable });
        else componentProps[key] = value;
      });
      Promise.all(
        toWait.map(async (w: any) => {
          const data = await w.asyncCallable();
          componentProps[w.key] = data;
        })
      ).then(() => {
        setComponentProps(componentProps);
        setWaiting(false);
      });
    }
  });
  return waiting ? null : <Component {...componentProps}>{children}</Component>;
};

export default WaitFor;
