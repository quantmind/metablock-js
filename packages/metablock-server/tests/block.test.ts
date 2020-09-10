import fetch from "jest-fetch-mock";
import request from "supertest";
import { mockApp, mockApi } from "./mockers";

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
});
