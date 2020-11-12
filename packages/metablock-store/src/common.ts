import { Metablock } from "@metablock/core";
import { action, makeObservable, observable } from "mobx";

export interface Common {
  token: string;
  appLoaded: boolean;
  setToken: (token: string) => void;
  setAppLoaded: () => void;
}

const tokenKey = "metablock-key";

class CommonStore {
  cli: Metablock;
  appLoaded = false;

  constructor(cli: Metablock) {
    makeObservable(this, {
      appLoaded: observable,
      setToken: action,
      setAppLoaded: action,
    });
    this.cli = cli;
    this.cli.jwt = window.localStorage.getItem(tokenKey) || "";
  }

  get token() {
    return this.cli.jwt;
  }

  setToken(token: string) {
    this.cli.jwt = token;
    if (token) {
      window.localStorage.setItem(tokenKey, token);
    } else {
      window.localStorage.removeItem(tokenKey);
    }
  }

  setAppLoaded() {
    this.appLoaded = true;
  }
}

export default CommonStore;
