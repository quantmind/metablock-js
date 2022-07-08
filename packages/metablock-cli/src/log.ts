import colors from "colors";
import ne from "node-emoji";

export const info = (msg: any) => {
  console.info(colors.green(asMessage(msg)));
};

export const warning = (msg: any) => {
  console.warn(colors.yellow(asMessage(msg)));
};

export const error = (exc: any) => {
  console.error(colors.red(asMessage(exc, ":broken_heart:")));
};

const asMessage = (msg: any, emoji = ""): string => {
  if (msg.constructor === String) return ne.emojify(`${emoji}${msg}`);
  else return JSON.stringify(msg, null, 2);
};
