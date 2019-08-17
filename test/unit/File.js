import { expect } from 'chai';
import { di, bootstrap } from '../bootstrap';

import File from '../../src/models/File';

let file = null;

describe('File', function() {

  describe(`File.constructor({ ID, creatorID, pathToObject, s3BucketName, dateCreated, userProvidedFilename, uploadStatus })`, function() {

    it('should return an instance of File', async function() {
      const fakeFilesDataWithID = await di.get('fake-files-with-id');
      file = new File(fakeFilesDataWithID[0]);
      expect(file).to.be.an.instanceof(File);
    });

    it('should return a file with ID', function() {
      expect(typeof file.ID).to.not.be.equal('undefined');
    });

    it('should return a file with creatorID', function() {
      expect(file.creatorID).to.be.a('number');
    });

    it('should return a file with pathToObject', function() {
      expect(file.pathToObject).to.be.a('string');
    });

    it('should return a file with s3BucketName', function() {
      expect(file.s3BucketName).to.be.a('string');
    });

    it('should return a file with dateCreated', function() {
      expect(file.dateCreated).to.be.a('date');
    });

    it('should return a file with userProvidedFilename', function() {
      expect(file.userProvidedFilename).to.be.a('string');
    });

    it('should return a file with uploadStatus', function() {
      expect(file.uploadStatus).to.be.a('boolean');
    });

  });

});
