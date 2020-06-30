import { error } from "./log";

const safe = (method: any) => {
  return async (...args: any[]) => {
    try {
      await method(...args);
    } catch (exc) {
      error(`:broken_heart: ${exc}`);
      process.exit(1);
    }
  };
};

export default safe;
