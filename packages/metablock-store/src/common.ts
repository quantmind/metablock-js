import { Metablock } from "@metablock/core";
import { action, observable, reaction } from "mobx";

export interface Common {
  token: string;
  appLoaded: boolean;
  setToken: (token: string) => void;
  setAppLoaded: () => void;
}

const tokenKey = "metablock-key";

class CommonStore {
  cli: Metablock;

  @observable
  token: string = window.localStorage.getItem(tokenKey) || "";

  @observable
  appLoaded = false;

  constructor(cli: Metablock) {
    this.cli = cli;
    this.cli.jwt = this.token;

    reaction(
      () => this.token,
      (token: string) => {
        this.cli.jwt = this.token;
        if (token) {
          window.localStorage.setItem(tokenKey, token);
        } else {
          window.localStorage.removeItem(tokenKey);
        }
      }
    );
  }

  @action
  setToken(token: string) {
    this.token = token;
  }

  @action
  setAppLoaded() {
    this.appLoaded = true;
  }
}

export default CommonStore;
