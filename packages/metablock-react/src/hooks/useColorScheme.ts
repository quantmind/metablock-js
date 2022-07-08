import { useEffect, useState } from "react";

const isClient = typeof window === "object";

const windowColorScheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)");

export const getColorScheme = (): string => {
  if (!isClient) return "light";
  return windowColorScheme().matches ? "dark" : "light";
};

// Hook
const useColorScheme = (): string => {
  const [colorScheme, setColorScheme] = useState<string>(getColorScheme);

  useEffect(() => {
    if (!isClient) return;

    const handleColor = (event: any) => {
      setColorScheme(event.matches ? "dark" : "light");
    };

    windowColorScheme().addEventListener("change", handleColor);

    return () => windowColorScheme().removeEventListener("resize", handleColor);
  });

  return colorScheme;
};

export default useColorScheme;
