import loadScript from "../lib/loadJs";

class TradingViewForexCross extends HTMLElement {

  async connectedCallback() {
    const config = this.getConfig();
    const root = this.shadowRoot || this;
    root.innerHTML = `<div class="tradingview-widget-container">
    <div class="tradingview-widget-container__widget"></div>
    </div>`;
    await loadScript(
      {
        src: "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js",
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
      currencies: [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD",
        "CNY",
        "TRY",
        "SEK",
        "NOK",
      ],
      isTransparent: false,
      colorTheme: "dark",
      locale: "en",
    };
  }
}

export default TradingViewForexCross;
