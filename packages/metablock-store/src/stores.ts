import { Metablock } from "@metablock/core";
import AuthStore from "./auth";
import CacheStore from "./cache";
import CommonStore from "./common";
import MessageStore from "./messages";
import UserStore from "./user";

export interface MetablockStore {
  metablock: Metablock;
  cacheStore: CacheStore;
  commonStore: CommonStore;
  userStore: UserStore;
  authStore: AuthStore;
  messageStore: MessageStore;
}

export const createStores = (
  baseUrl: string,
  name?: string
): MetablockStore => {
  const metablock = new Metablock({ baseUrl, name });
  const cacheStore = new CacheStore();
  const commonStore = new CommonStore(metablock);
  const messageStore = new MessageStore();
  const userStore = new UserStore(commonStore);
  const authStore = new AuthStore(commonStore, userStore);
  return {
    metablock,
    cacheStore,
    commonStore,
    userStore,
    authStore,
    messageStore,
  };
};
