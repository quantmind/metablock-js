import { Metablock } from "@metablock/core";
import AuthStore from "./auth";
import CacheStore from "./cache";
import CommonStore from "./common";
import MessageStore from "./messages";
import PhotoStore from "./photos";
import UserStore from "./user";

const createStores = (baseUrl: string, name?: string): Record<string, any> => {
  const cli = new Metablock({ baseUrl, name });
  const cacheStore = new CacheStore();
  const commonStore = new CommonStore(cli);
  const messageStore = new MessageStore();
  const userStore = new UserStore(commonStore);
  const authStore = new AuthStore(commonStore, userStore);
  const photoStore = new PhotoStore(commonStore);
  return {
    cli,
    cacheStore,
    commonStore,
    userStore,
    authStore,
    photoStore,
    messageStore,
  };
};

export default createStores;
