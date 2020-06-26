import colors from "colors";
import emoji from "node-emoji";

export const log = (msg: string) => {
  console.log(colors.green(emoji.emojify(msg)));
};

export const err = (exc: any) => {
  console.log(colors.red(emoji.emojify(`:broken_heart: ${exc}`)));
};
