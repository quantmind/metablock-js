import fetch from "jest-fetch-mock";
import request from "supertest";
import { mockApi, mockApp } from "./mockers";

describe("Test html tools", () => {
  const app = mockApp();

  beforeEach(() => {
    fetch.resetMocks();
    mockApi();
  });

  test("app", () => {
    expect(app.get("services")).toBeTruthy();
  });

  test("./api/config", async () => {
    const response = await request(app).get("/.api/config");
    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toBeTruthy();
  });

  test("html", async () => {
    const response = await request(app).get("/foo");
    const { status, text, headers } = response;
    expect(status).toBe(200);
    expect(headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(text.includes("<title>metablock</title>")).toBeTruthy();
  });

  test("seo", async () => {
    const response = await request(app).get("/robots.txt");
    const { status, body, headers } = response;
    expect(status).toBe(200);
    expect(body).toBeTruthy();
    expect(headers["content-type"]).toBe("text/plain; charset=utf-8");
  });
});
