import colors from "colors";
import emoji from "node-emoji";

const log = (msg: string) => {
  console.log(colors.green(emoji.emojify(msg)));
};

export default log;
