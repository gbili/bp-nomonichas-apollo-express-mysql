export default class UrlSignService {
  constructor({ uploadWrapper, downloadWrapper }) {
    if (!uploadWrapper || typeof uploadWrapper.getUrl !== 'function') {
      throw new Error('UrlSignService needs uploadWrapper to operate');
    }
    if (!downloadWrapper || typeof downloadWrapper.getUrl !== 'function') {
      throw new Error('UrlSignService needs downloadWrapper to operate');
    }
    this.up = uploadWrapper;
    this.down = downloadWrapper;
  }

  getUploadExpirationTime() {
    return this.up.getExpirationTime();
  }

  async getUploadUrl({ contentType, pathToObject}) {
    const url = await this.up.getUrl({ contentType, pathToObject});
    return url;
  }

  getDownloadExpirationTime() {
    return this.down.getExpirationTime();
  }

  getDownloadUrl({ pathToObject }) {
    const url = this.down.getUrl({ pathToObject });
    return url;
  }
}
