import { useEffect, useState } from "react";

const isClient = typeof window === "object";

export const getWindowSize = (): Record<string, number | undefined> => ({
  width: isClient ? window.innerWidth : undefined,
  height: isClient ? window.innerHeight : undefined,
});

// Hook
const useWindowSize = (transform?: any): any => {
  const getSize = (): any => {
    const size = getWindowSize();
    return transform ? transform(size) : size;
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return windowSize;
};

export default useWindowSize;
