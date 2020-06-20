import { stringifyUrl } from "query-string";
import { HttpClientInterface } from "../http";

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
    return stringifyUrl({ url, query });
  }
}

export default HttpComponent;
