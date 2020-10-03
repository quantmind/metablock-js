import { HttpResponse, Org, UserOrg } from "@metablock/core";
import { action, observable } from "mobx";
import CommonStore from "./common";
import UserStore from "./user";

class UserOrgStore {
  userStore: UserStore;
  @observable orgs?: UserOrg[];
  @observable currentOrg?: Org;
  @observable errors?: HttpResponse = undefined;
  @observable loading = false;
  @observable updating = false;
  @observable updatingErrors = false;

  constructor(userStore: UserStore) {
    this.userStore = userStore;
  }

  get commonStore(): CommonStore {
    return this.userStore.commonStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  @action
  async getOrgs() {
    this.loading = true;
    this.errors = undefined;
    try {
      this.orgs = await this.cli.user.getOrgs();
    } finally {
      this.loading = false;
    }
  }

  @action
  async getOrg(org_name_or_id: string) {
    this.loading = true;
    this.errors = undefined;
    try {
      this.currentOrg = await this.cli.orgs.get(org_name_or_id);
    } catch (errors) {
      this.errors = errors;
    } finally {
      this.loading = false;
    }
  }

  @action
  async updateOrg(org_name_or_id: string, body: Record<string, any>) {
    this.loading = true;
    this.errors = undefined;
    try {
      this.currentOrg = await this.cli.orgs.update(org_name_or_id, body);
    } catch (errors) {
      this.errors = errors;
    } finally {
      this.loading = false;
    }
  }

  @action forgetOrg() {
    this.currentOrg = undefined;
  }

  @action forgetOrgs() {
    this.currentOrg = undefined;
    this.orgs = undefined;
  }
}

export default UserOrgStore;
