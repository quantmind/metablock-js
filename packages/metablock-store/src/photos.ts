import { action, makeObservable } from "mobx";
import CommonStore from "./common";

class PhotoStore {
  commonStore: CommonStore;

  constructor(commonStore: CommonStore) {
    makeObservable(this, {
      getPhoto: action,
      getPhotoUrl: action,
    });
    this.commonStore = commonStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  async getPhoto(photoId: string): Promise<Record<string, any>> {
    //const jsonStr = window.localStorage.getItem(`photo-${photoId}`);
    const jsonStr = null;
    if (jsonStr) {
      return JSON.parse(jsonStr);
    } else {
      const payload = await this.cli.photos.get(photoId);
      const { photo } = payload;
      window.localStorage.setItem(`photo-${photoId}`, JSON.stringify(photo));
      return photo;
    }
  }

  async getPhotoUrl(photoId: string, url = "raw"): Promise<string> {
    const photo = await this.getPhoto(photoId);
    return photo.urls[url];
  }
}

export default PhotoStore;
