import getWindow from "../window";
import HttpComponent from "./httpComponent";

class Photos extends HttpComponent {
  async get(photoId: string): Promise<Record<string, any>> {
    const response = await this.cli.get(`/.api/photo/${photoId}`, {});
    return response.data;
  }

  fromStore(photoId: string): any | undefined {
    const w = getWindow();
    if (w) {
      const jsonStr = w.localStorage.getItem(`photo-${photoId}`);
      if (jsonStr) return JSON.parse(jsonStr);
    }
  }

  async getPhoto(photoId: string): Promise<Record<string, any>> {
    const data = this.fromStore(photoId);
    if (data) {
      return data;
    } else {
      const photo = await this.get(photoId);
      const w = getWindow();
      if (w) {
        window.localStorage.setItem(`photo-${photoId}`, JSON.stringify(photo));
      }
      return photo;
    }
  }

  async getPhotoUrl(photoId: string, url = "raw"): Promise<string> {
    const photo = await this.getPhoto(photoId);
    return photo.urls[url];
  }
}

export default Photos;
