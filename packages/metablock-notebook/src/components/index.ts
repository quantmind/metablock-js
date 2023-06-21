import Clipboard from "./clipboard";
import { EditorComponent } from "./editor";
import GithubModule from "./github";
import Module from "./module";
import RawCode from "./rawcode";
import TradingViewForexCross from "./tv-forex-cross";
import TradingViewMiniChart from "./tv-mini-chart";

const installElements = () => {
  customElements.define("github-repo", GithubModule);
  customElements.define("module-component", Module);
  customElements.define("editor-component", EditorComponent);
  customElements.define("raw-code", RawCode);
  customElements.define("with-clipboard", Clipboard);
  customElements.define("tradingview-forex-cross", TradingViewForexCross);
  customElements.define("tradingview-mini-chart", TradingViewMiniChart);
};

export default installElements;
