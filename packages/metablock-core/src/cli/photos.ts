import HttpComponent from "./httpComponent";

class Photos extends HttpComponent {
  async get(photoId: string): Promise<Record<string, any>> {
    const response = await this.cli.get(`/.api/photo/${photoId}`, {});
    return response.data;
  }

  fromStore(photoId: string): any | undefined {
    if (global.window) {
      const jsonStr = window.localStorage.getItem(`photo-${photoId}`);
      if (jsonStr) return JSON.parse(jsonStr);
    }
  }

  async getPhoto(photoId: string): Promise<Record<string, any>> {
    const data = this.fromStore(photoId);
    if (data) {
      return data;
    } else {
      const photo = await this.get(photoId);
      if (global.window) {
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
