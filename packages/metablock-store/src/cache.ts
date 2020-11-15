import { HttpClient } from "@metablock/core";
import { action, makeObservable } from "mobx";

export interface Common {
  token: string;
  appLoaded: boolean;
  setToken: (token: string) => void;
  setAppLoaded: () => void;
}

class CacheStore {
  http = new HttpClient("metablock-cache-store");
  cache: Map<string, any>;

  constructor() {
    makeObservable(this, {
      get: action,
    });
    this.cache = new Map<string, any>();
  }

  async get(url: string) {
    const data = this.cache.get(url);
    if (data) return data;
    const response = await this.http.get(url);
    const newData = response.data;
    this.cache.set(url, newData);
    return newData;
  }
}

export default CacheStore;
