import { Metablock } from "@metablock/core";
import AuthStore from "./auth";
import CommonStore from "./common";
import PhotoStore from "./photos";
import UserStore from "./user";

const createStores = (apiUrl: string, name?: string) => {
  const cli = new Metablock(apiUrl, name);
  const commonStore = new CommonStore(cli);
  const userStore = new UserStore(commonStore);
  const authStore = new AuthStore(commonStore, userStore);
  const photoStore = new PhotoStore(commonStore);
  return {
    commonStore,
    userStore,
    authStore,
    photoStore,
  };
};

export default createStores;
