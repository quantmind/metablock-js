import { parseLinkHeader } from "../src";

describe("Test Metablock Client", () => {
  const link =
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100>; rel="next", ' +
    '<https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100>; rel="last"';

  test("full url", () => {
    const p = parseLinkHeader(link);
    expect(p).toEqual({
      next: "https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=2&per_page=100",
      last: "https://api.github.com/user/9287/repos?client_id=1&client_secret=2&page=3&per_page=100",
    });
  });
});
