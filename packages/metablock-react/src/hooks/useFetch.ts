import React from "react";

const useFetch = (observable: any, fetchData: () => Promise<any>) => {
  const [, render] = React.useState();
  const tries = React.useRef(0);
  const target = React.useRef(observable);
  if (target.current !== observable) {
    target.current = observable;
    tries.current = 0;
  }

  React.useEffect(() => {
    if (tries.current === 0) {
      tries.current += 1;
      fetchData().then(() => render({}));
    }
  });
};

export default useFetch;
