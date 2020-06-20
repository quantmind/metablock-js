import { action, observable } from "mobx";
import CommonStore from "./common";

export interface Photos {
  loading: boolean;
  updating: boolean;
  updatingErrors: boolean;
  getUser: () => Promise<void>;
}

class PhotoStore {
  commonStore: CommonStore;
  @observable photos: Record<string, any> = {};
  @observable loading = false;
  @observable updatingErrors = false;

  constructor(commonStore: CommonStore) {
    this.commonStore = commonStore;
  }

  get cli() {
    return this.commonStore.cli;
  }

  @action
  async getPhoto(photoId: string): Promise<Record<string, any>> {
    const jsonStr = window.localStorage.getItem(`photo-${photoId}`);
    if (jsonStr) {
      const photo = JSON.parse(jsonStr);
      this.photos[photoId] = photo;
      return photo;
    } else {
      this.loading = true;
      try {
        const photo = await this.cli.photos.get(photoId);
        window.localStorage.setItem(`photo-${photoId}`, JSON.stringify(photo));
        this.photos[photoId] = photo;
        return photo;
      } finally {
        this.loading = false;
      }
    }
  }

  @action
  async getPhotoUrl(photoId: string, url = "raw"): Promise<string> {
    const photo = await this.getPhoto(photoId);
    return photo.urls[url];
  }
}

export default PhotoStore;
