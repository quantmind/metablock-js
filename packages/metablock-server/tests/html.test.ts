import { createContext, rawHtml } from "../src";

describe("Test html tools", () => {
  test("context", () => {
    const ctx = createContext();
    expect(ctx.web).toBeTruthy();
    expect(ctx.html).toBeTruthy();
    expect(ctx.html.head.length).toBe(0);
  });

  test("HTML", () => {
    const ctx = createContext({ title: "test" });
    expect(ctx.web.title).toBe("test");
    ctx.html.head.push('<meta charset="utf-8">');
    const html = rawHtml(ctx);
    const bits = html.split('<meta charset="utf-8">\n');
    expect(bits.length).toBe(2);
  });
});
