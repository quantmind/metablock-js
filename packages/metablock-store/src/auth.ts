import { HttpResponse } from "@metablock/core";
import { action, makeObservable, observable } from "mobx";
import CommonStore from "./common";
import UserStore from "./user";

class AuthStore {
  commonStore: CommonStore;
  userStore: UserStore;
  inProgress = false;
  errors?: HttpResponse = undefined;

  constructor(commonStore: CommonStore, userStore: UserStore) {
    makeObservable(this, {
      inProgress: observable,
      errors: observable,
      login: action,
      setJwt: action,
      logout: action,
    });
    this.commonStore = commonStore;
    this.userStore = userStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  async login(data: Record<string, string>): Promise<void> {
    this.inProgress = true;
    this.errors = undefined;
    try {
      const jwt = await this.cli.auth.login(data);
      this.commonStore.setToken(jwt);
      await this.userStore.getUser();
    } catch (errors: any) {
      this.errors = errors;
    } finally {
      this.inProgress = false;
    }
  }

  async setJwt(jwt: string) {
    this.inProgress = true;
    this.errors = undefined;
    try {
      this.commonStore.setToken(jwt);
      await this.userStore.getUser();
    } catch (errors: any) {
      this.errors = errors;
    } finally {
      this.inProgress = false;
    }
  }

  async logout() {
    await this.cli.user.logout();
    this.userStore.forgetUser();
    this.commonStore.setToken("");
  }
}

export default AuthStore;
