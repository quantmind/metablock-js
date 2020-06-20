class HttpResponse {
  data: any;
  response: any;
  errors: any;
  message: any;

  constructor(data: any, response: any) {
    this.response = response || new BadGateway();
    this.data = data || {};
    try {
      this.errors = data.errors || [];
      this.message = data.message || "";
    } catch (e) {
      this.errors = [];
      this.message = [];
    }
  }

  get status() {
    return this.response.status;
  }

  get headers() {
    return this.response.headers;
  }

  get links() {
    const links = this.response.headers.get("Links");
    return links ? JSON.parse(links) : null;
  }
}

class BadGateway {
  get status() {
    return 502;
  }
  get headers() {
    return new Map();
  }
}

export default HttpResponse;
