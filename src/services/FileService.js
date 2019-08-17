export default class FileService {

  constructor({ urlSignService, models, s3BucketName, fileNameMaxLength, mimeToFileSuffixDict }) {
    if (!urlSignService) {
      throw new Error('File service needs urlSignService to operate');
    }

    if (!models || !models.FileModel || !models.File) {
      throw new Error('File service needs models.FileModel and models.File to operate');
    }

    if (!s3BucketName) {
      throw new Error('File service needs s3BucketName to operate');
    }

    if (!fileNameMaxLength) {
      throw new Error('File service needs fileNameMaxLength to operate');
    }

    if (!mimeToFileSuffixDict) {
      throw new Error('File service needs mimeToFileSuffixDict to operate');
    }

    this.urlSignService = urlSignService;
    this.models = models;
    this.s3BucketName = s3BucketName;
    this.fileNameMaxLength = fileNameMaxLength;
    this.mimeToFileSuffixDict = mimeToFileSuffixDict;
  }

  async getAllUserFiles({ user }) {
    const { FileModel } = this.models;

    const files = await FileModel.all({ creatorID: user.ID });
    if (!files) {
      throw new Error('There was an error fetching files');
    }
    for (let file of files) {
      await this._addDlProps({ file });
    }
    return files;
  }

  async generateUploadableFile({ filename, contentType, user }) {
    const { FileModel } = this.models;

    contentType = this._getSanitizedMime({ dirtyMime: contentType });
    if (!contentType) {
      throw new Error('The supplied mime type is not supported');
    }

    const creatorID = user.ID;
    const sanitizedUserProvidedFilename = this._sanitizeUserProvidedFilename({ filename });
    const pathToObject = this._getUniqueFilename({ creatorID, sanitizedUserProvidedFilename });

    const file = await FileModel.create({
      creatorID,
      s3BucketName: this.s3BucketName,
      uploadStatus: false,
      userProvidedFilename: sanitizedUserProvidedFilename,
      pathToObject,
    });

    if (file === null) {
      throw new Error('There was an error creating the file');
    }

    await this._addUlProps({ file, pathToObject, contentType });
    await this._addDlProps({ file });

    return file;
  }

  async _addUlProps({ file, pathToObject, contentType }) {
    file.ulUrl = await this.urlSignService.getUploadUrl({ pathToObject, contentType });
    file.ulUrlValidUntil = this.urlSignService.getUploadExpirationTime();
  }

  async _addDlProps({ file }) {
    file.dlUrl = await this._getDownloadUrlWithoutCheckingCreator({file});
    file.dlUrlValidUntil = this.urlSignService.getDownloadExpirationTime();
  }

  _sanitizeUserProvidedFilename({ filename }) {
    return filename.replace(/[^A-Za-z0-9.]/g, '-').replace(/-{2,}/g, '-');
  }

  _getSanitizedMime({ dirtyMime }) {
    let sanitized = null;
    if (this.mimeToFileSuffixDict.hasOwnProperty(dirtyMime)) {
      sanitized = dirtyMime;
    }
    return sanitized;
  }

  _getUniqueFilename({ creatorID, sanitizedUserProvidedFilename }) {
    const time = (new Date()).getTime();
    return `${creatorID}-${sanitizedUserProvidedFilename}${time}`.substr(0, this.fileNameMaxLength);
  }

  _getDownloadUrlWithoutCheckingCreator({ file }) {
    return this.urlSignService.getDownloadUrl({ pathToObject: file.pathToObject });
  }

}
