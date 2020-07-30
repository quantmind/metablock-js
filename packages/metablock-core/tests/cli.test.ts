import { Metablock } from "../src";

describe("Test Metablock Client", () => {
  test("constructor", () => {
    const cli = new Metablock();
    expect(cli.baseUrl).toBe("https://api.metablock.io");
    expect(cli.name).toBe("metablock");
    expect(cli.apiUrl).toBe("https://api.metablock.io/v1");
  });

  test("constructor custom", () => {
    const cli = new Metablock({ name: "test", token: "abc" });
    expect(cli.baseUrl).toBe("https://api.metablock.io");
    expect(cli.name).toBe("test");
    expect(cli.token).toBe("abc");
  });
});
