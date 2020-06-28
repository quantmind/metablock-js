import { HttpResponse } from "@metablock/core";
import { action, observable } from "mobx";
import CommonStore from "./common";
import UserStore from "./user";

class AuthStore {
  commonStore: CommonStore;
  userStore: UserStore;
  @observable inProgress = false;
  @observable errors?: HttpResponse = undefined;

  constructor(commonStore: CommonStore, userStore: UserStore) {
    this.commonStore = commonStore;
    this.userStore = userStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  @action
  async login(data: Record<string, string>): Promise<void> {
    this.inProgress = true;
    this.errors = undefined;
    try {
      const jwt = await this.cli.auth.login(data);
      this.commonStore.setToken(jwt);
      await this.userStore.getUser();
    } catch (errors) {
      this.errors = errors;
    } finally {
      this.inProgress = false;
    }
  }

  @action
  async logout() {
    await this.cli.user.logout();
    this.userStore.forgetUser();
    this.commonStore.setToken("");
  }
}

export default AuthStore;
