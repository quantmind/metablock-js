import HttpComponent from "./http";

class Photos extends HttpComponent {
  async get(photoId: string): Promise<Record<string, any>> {
    const response = await this.cli.get(`/.api/photo/${photoId}`, {});
    return response.data;
  }
}

export default Photos;
