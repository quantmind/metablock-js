import {
  ApiToken,
  CurrentUser,
  HttpResponse,
  Paginated,
  paginatedResponse,
} from "@metablock/core";
import { action, observable } from "mobx";
import CommonStore from "./common";

export interface User {
  current?: CurrentUser;
  loading: boolean;
  updating: boolean;
  updatingErrors: boolean;
  getUser: () => Promise<void>;
}

class UserStore {
  commonStore: CommonStore;
  @observable current?: CurrentUser;
  @observable tokens?: Paginated<ApiToken>;
  @observable loading = false;
  @observable updating = false;
  @observable errors?: HttpResponse = undefined;

  constructor(commonStore: CommonStore) {
    this.commonStore = commonStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  @action
  async getUser() {
    this.loading = true;
    try {
      this.current = await this.cli.user.getUser();
    } finally {
      this.loading = false;
    }
  }

  @action
  async updateUser(body: any) {
    this.updating = true;
    this.errors = undefined;
    try {
      this.current = await this.cli.user.update(body);
    } catch (errors) {
      this.errors = errors;
    } finally {
      this.updating = false;
    }
  }

  @action
  async getTokens() {
    this.loading = true;
    try {
      const response = await this.cli.user.getTokens();
      this.tokens = paginatedResponse<ApiToken>(response);
    } finally {
      this.loading = false;
    }
  }

  @action forgetUser() {
    this.current = undefined;
  }
}

export default UserStore;
