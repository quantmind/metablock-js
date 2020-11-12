import {
  ApiToken,
  HttpResponse,
  paginatedResponse,
  User,
} from "@metablock/core";
import { action, makeObservable, observable } from "mobx";
import CommonStore from "./common";

class UserStore {
  commonStore: CommonStore;
  current?: User = undefined;
  errors?: HttpResponse = undefined;

  constructor(commonStore: CommonStore) {
    makeObservable(this, {
      current: observable,
      errors: observable,
      getUser: action,
      updateUser: action,
      getTokens: action,
      forgetUser: action,
    });
    this.commonStore = commonStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  async getUser() {
    this.errors = undefined;
    try {
      this.current = await this.cli.user.getUser();
    } catch (errors) {
      this.errors = errors;
    }
  }

  async updateUser(body: any) {
    this.errors = undefined;
    try {
      this.current = await this.cli.user.update(body);
    } catch (errors) {
      this.errors = errors;
    }
  }

  async getTokens() {
    const response = await this.cli.user.getTokens();
    return paginatedResponse<ApiToken>(response);
  }

  forgetUser() {
    this.current = undefined;
  }
}

export default UserStore;
