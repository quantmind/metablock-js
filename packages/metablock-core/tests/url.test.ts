import { urlQuery } from "../src";

describe("Test Metablock Client", () => {
  test("full url", () => {
    const url = urlQuery("https://example.com/foo", { name: "test" });
    expect(url).toBe("https://example.com/foo?name=test");
  });

  test("url no origin", () => {
    const url = urlQuery("/foo", { name: "test" });
    expect(url).toBe("http://localhost/foo?name=test");
  });
});
