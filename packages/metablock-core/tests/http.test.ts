import fetch from "jest-fetch-mock";
import sinon from "sinon";
import { HttpClient } from "../src";

describe("Test http object", () => {
  let http: HttpClient;

  beforeEach(() => {
    http = new HttpClient();
    fetch.resetMocks();
  });

  test("testBadJSON", async () => {
    const loggerMock = sinon.mock(http.logger);
    loggerMock.expects("error").once();

    fetch.mockResponseOnce(async () => {
      return {
        body: "text",
        headers: { "X-Some-Response-Header": "Some header value" },
      };
    });
    const response = await http.get("/random");
    expect(response.data).toEqual({});
    expect(response.links).toBe(null);
    expect(response.headers.get("X-Some-Response-Header")).toBe(
      "Some header value"
    );
    loggerMock.verify();
  });

  test("testResponseFailure", async () => {
    const loggerMock = sinon.mock(http.logger);
    loggerMock.expects("error").once();
    fetch.mockReject(new Error("fake error message"));
    try {
      await http.get("/foo");
    } catch (exc: any) {
      expect(exc.status).toEqual(502);
    }
    loggerMock.verify();
  });
});
