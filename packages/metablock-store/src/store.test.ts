import fetch from "jest-fetch-mock";
import { createStores } from "./index";

describe("Test MobX stores", () => {
  const stores = createStores("https://api.com");
  const { authStore, commonStore, userStore } = stores;

  beforeEach(() => {
    fetch.resetMocks();
  });

  test("Create stores", () => {
    expect(Object.keys(stores).length).toBe(4);
    expect(stores.commonStore.token).toBe("");
  });

  test("login/logout", async () => {
    fetch.mockResponse(async (req) => {
      if (req.url === "/.api/login") return JSON.stringify({ jwt: "abc" });
      else if (req.url === "https://api.com/v1/user")
        return JSON.stringify({ username: "pippo", email: "pippo@foo.com" });
      else if (req.url === "https://api.com/v1/user/jwt")
        return { status: 204 };
      else {
        return {
          body: JSON.stringify({ message: "Not Found" }),
          status: 404,
        };
      }
    });
    authStore.setValue("username", "pippo");
    authStore.setValue("password", "hcvdhgcvds");

    await authStore.login();
    expect(commonStore.token).toBe("abc");
    expect(userStore.current?.username).toBe("pippo");

    await authStore.logout();
    expect(commonStore.token).toBe("");
    expect(userStore.current).toBe(undefined);
  });
});
