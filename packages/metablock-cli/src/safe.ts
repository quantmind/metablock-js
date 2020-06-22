import colors from "colors";
import emoji from "node-emoji";

const safe = (method: any) => {
  return async (...args: any[]) => {
    try {
      await method(...args);
    } catch (exc) {
      console.log(colors.red(emoji.emojify(`:broken_heart: ${exc}`)));
      process.exit(1);
    }
  };
};

export default safe;
