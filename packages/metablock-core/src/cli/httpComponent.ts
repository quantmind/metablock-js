import urlQuery from "../url";
import Metablock from "./cli";

class HttpComponent {
  cli: Metablock;

  constructor(cli: Metablock) {
    this.cli = cli;
  }

  urlQuery(url: string, query: any): string {
    return urlQuery(url, query);
  }
}

export default HttpComponent;
