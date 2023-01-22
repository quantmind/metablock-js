import camelCase from "../src/lib/camelCase";

describe("Test lib", () => {
  test("camelCase", async () => {
    expect(camelCase("bla-foo")).toEqual("blaFoo");
  });
});
