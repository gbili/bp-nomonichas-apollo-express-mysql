export default class File {
  constructor({ ID, creatorID, pathToObject, s3BucketName, dateCreated, userProvidedFilename, uploadStatus }) {
    Object.assign(this, { ID, creatorID, pathToObject, s3BucketName, dateCreated, userProvidedFilename, uploadStatus });
  }
}
