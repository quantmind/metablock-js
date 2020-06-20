import { action, observable } from "mobx";
import CommonStore from "./common";
import UserStore from "./user";

export interface Auth {
  inProgress: boolean;
  login: () => Promise<void>;
  setValue: (name: string, value: string) => void;
}

class AuthStore implements Auth {
  commonStore: CommonStore;
  userStore: UserStore;
  @observable inProgress = false;
  @observable errors = undefined;
  @observable values: Record<string, string> = {
    email: "",
    password: "",
  };

  constructor(commonStore: CommonStore, userStore: UserStore) {
    this.commonStore = commonStore;
    this.userStore = userStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  @action
  setValue(name: string, value: string) {
    this.values[name] = value;
  }

  @action
  async login(): Promise<void> {
    this.inProgress = true;
    this.errors = undefined;
    try {
      const jwt = await this.cli.auth.login({
        email: this.values.email,
        password: this.values.password,
      });
      this.commonStore.setToken(jwt);
      await this.userStore.getUser();
    } catch (err) {
      this.errors =
        err.response && err.response.body && err.response.body.errors;
      throw err;
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
