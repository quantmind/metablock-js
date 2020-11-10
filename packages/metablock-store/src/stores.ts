import { Metablock } from "@metablock/core";
import AuthStore from "./auth";
import CommonStore from "./common";
import PhotoStore from "./photos";
import UserStore from "./user";

const createStores = (baseUrl: string, name?: string) => {
  const cli = new Metablock({ baseUrl, name });
  const commonStore = new CommonStore(cli);
  const userStore = new UserStore(commonStore);
  const authStore = new AuthStore(commonStore, userStore);
  const photoStore = new PhotoStore(commonStore);
  return {
    cli,
    commonStore,
    userStore,
    authStore,
    photoStore,
  };
};

export default createStores;
