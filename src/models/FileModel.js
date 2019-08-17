import RequestorCapability from './RequestorCapability';
import File from './File';

export default class FileModel extends RequestorCapability {

  static async create({ creatorID, s3BucketName, pathToObject, userProvidedFilename, uploadStatus }) {
    const req = FileModel.getRequestor();

    const actionResult = await req.query({
      sql: 'INSERT INTO File (dateCreated, creatorID, s3BucketName, pathToObject, userProvidedFilename, uploadStatus) VALUES (NOW(), ?, ?, ?, ?, ?)',
      values: [ creatorID, s3BucketName, pathToObject, userProvidedFilename, uploadStatus, ],
    });

    let file = null;

    if (actionResult.value !== null && !actionResult.error) {
      file = new File({
        ID: actionResult.value.insertId,
        creatorID,
        s3BucketName,
        pathToObject,
        userProvidedFilename,
        uploadStatus,
        dateCreated: new Date(),
      });
    }

    return file || null;
  }

  static async getFileByIdFromCreator({ ID, creatorID }) {
    const req = FileModel.getRequestor();

    if (!creatorID) {
      throw new Error('Provide creatorID, you are not allowed to query files belonging to someone else');
    }

    const actionResult = await req.query({
      sql: 'SELECT * FROM File WHERE ID = ?, creatorID = ?',
      values: [ ID, creatorID, ],
    });

    if (actionResult.error) {
      return null;
    }

    const res = actionResult.value;

    return (res && res.length && new File(res[0])) || null;
  }

  static async all({ creatorID }) {
    const req = FileModel.getRequestor();

    if (!creatorID) {
      throw new Error('Provide creatorID, you are not allowed to query files belonging to someone else');
    }

    const actionResult = await req.query({
      sql: 'SELECT * FROM File WHERE creatorID = ?',
      values: [ creatorID, ],
    });

    if (actionResult.error) {
      return null;
    }

    return actionResult.value;
  }

}
