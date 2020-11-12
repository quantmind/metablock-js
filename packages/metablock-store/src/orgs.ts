import { HttpResponse, Org, UserOrg } from "@metablock/core";
import { action, makeObservable, observable } from "mobx";
import CommonStore from "./common";
import UserStore from "./user";

class UserOrgStore {
  userStore: UserStore;
  orgs?: UserOrg[] = undefined;
  currentOrg?: Org = undefined;
  errors?: HttpResponse = undefined;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      orgs: observable,
      currentOrg: observable,
      getOrgs: action,
      getOrg: action,
      updateOrg: action,
      forgetOrg: action,
      forgetOrgs: action,
    });
    this.userStore = userStore;
  }

  get commonStore(): CommonStore {
    return this.userStore.commonStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  async getOrgs() {
    this.orgs = await this.cli.user.getOrgs();
    return this.orgs;
  }

  async getOrg(org_name_or_id: string) {
    this.currentOrg = await this.cli.orgs.get(org_name_or_id);
    return this.currentOrg;
  }

  async updateOrg(org_name_or_id: string, body: Record<string, any>) {
    this.currentOrg = await this.cli.orgs.update(org_name_or_id, body);
  }

  forgetOrg() {
    this.currentOrg = undefined;
  }

  forgetOrgs() {
    this.currentOrg = undefined;
    this.orgs = undefined;
  }
}

export default UserOrgStore;
