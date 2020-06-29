import React from "react";

interface Props {
  target: any;
  onIntersect: any;
  threshold?: number;
  rootMargin?: string;
}

const useIntersectionObserver = (props: Props) => {
  const { target, onIntersect, threshold = 0.1, rootMargin = "0px" } = props;
  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    const current = target.current;

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  });
};

export default useIntersectionObserver;
