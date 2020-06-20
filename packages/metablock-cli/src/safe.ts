import colors from "colors";

const safe = (method: any) => {
  return (...args: any[]) => {
    try {
      method(...args);
    } catch (exc) {
      console.log(colors.red(`${exc}`));
      process.exit(1);
    }
  };
};

export default safe;
