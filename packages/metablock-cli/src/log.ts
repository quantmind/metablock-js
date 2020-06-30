import colors from "colors";
import emoji from "node-emoji";

export const info = (msg: string) => {
  console.info(colors.green(emoji.emojify(msg)));
};

export const warning = (msg: string) => {
  console.warn(colors.yellow(emoji.emojify(msg)));
};

export const error = (exc: any) => {
  console.error(colors.red(emoji.emojify(`:broken_heart: ${exc}`)));
};
