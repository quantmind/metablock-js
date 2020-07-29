import { HttpClientInterface } from "../http";
import urlQuery from "../url";

interface HttpClient extends HttpClientInterface {
  apiUrl: string;
  withToken: (headers?: Record<string, string>) => Record<string, string>;
}

class HttpComponent {
  // add metablock JWT header to the headers dictionary
  cli: HttpClient;

  constructor(cli: HttpClient) {
    this.cli = cli;
  }

  urlQuery(url: string, query: any): string {
    return urlQuery(url, query);
  }
}

export default HttpComponent;
