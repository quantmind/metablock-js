import loadScript from "../lib/loadJs";

class TradingViewMiniChart extends HTMLElement {

  async connectedCallback() {
    const config = this.getConfig();
    const root = this.shadowRoot || this;
    root.innerHTML = `<div class="tradingview-widget-container">
    <div class="tradingview-widget-container__widget"></div>
    </div>`;
    await loadScript(
      {
        src: "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js",
        async: true,
        type: "text/javascript",
        content: config,
      },
      root.children[0] as HTMLElement
    );
  }

  getConfig() {
    return {
      width: "100%",
      height: "100%",
      symbol: "FX:EURUSD",
      dateRange: "12M",
      isTransparent: false,
      colorTheme: "dark",
      locale: "en",
    };
  }
}

export default TradingViewMiniChart;
