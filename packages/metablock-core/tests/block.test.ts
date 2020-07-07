import { assetUrl, bundleUrl, deployUrl, getBlock, liveUrl } from "../src";
import { content } from "./state.json";

describe("Test block", () => {
  let meta: any;

  beforeAll(() => {
    meta = document.createElement("meta");
    meta.content = content;
    meta.name = "mb:state";
    document.getElementsByTagName("head")[0].appendChild(meta);
  });

  afterAll(() => {
    meta.parentNode.removeChild(meta);
  });

  test("block", async () => {
    const block = getBlock();
    expect(block.id).toBeTruthy();
    expect(block.title).toBe("Metablock");
    expect(block.assetsUrl).toBeTruthy();
    expect(block.liveUrl).toBeTruthy();
    expect(block.deployUrl).toBeTruthy();
    expect(window.__metablock__).toBe(block);
    expect(getBlock()).toBe(block);
  });

  test("urls", async () => {
    const block = getBlock();
    expect(bundleUrl()).toBeTruthy();
    expect(bundleUrl()).toBe(deployUrl());
    expect(deployUrl()).toBe(block.deployUrl);
    expect(liveUrl()).toBe(block.liveUrl);
    expect(assetUrl()).toBe(block.assetsUrl);
    expect(bundleUrl("test.js")).toBe(`${block.deployUrl}/test.js`);
    expect(deployUrl("test.js")).toBe(`${block.deployUrl}/test.js`);
    expect(liveUrl("test.js")).toBe(`${block.liveUrl}/test.js`);
    expect(assetUrl("test.js")).toBe(`${block.assetsUrl}/test.js`);
  });
});
