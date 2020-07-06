import { BrowserManager } from "../src";

test("BrowserManager", async () => {
  const manager = new BrowserManager();
  const browsers = await Promise.all([
    manager.getBrowser(),
    manager.getBrowser(),
  ]);
  expect(browsers.length).toBe(2);
  expect(browsers[0]).toBe(browsers[1]);
  const endpoint = await manager.getWsEndpoint();
  expect(typeof endpoint).toBe("string");
  const endpoint2 = await manager.getWsEndpoint();
  expect(endpoint).toBe(endpoint2);
  await manager.close();
});
