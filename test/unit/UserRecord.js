import 'dotenv/config';
import logger from 'saylo';
import { expect } from 'chai';
import { UserRecord } from '../../src/models/User';

describe('UserRecord', function() {
  describe(`UserRecord._getUserRecordsByEmail(no-email)`, function() {
    it('it should throw an error', function() {
      expect(UserRecord._getUserRecordsByEmail({ username: 'JohnDoe' })).to.eventually.be.rejectedWith('must provide email');
    });
  });
  describe(`UserRecord._getUserRecordsByUsername(no-username)`, function() {
    it('it should throw an error', function() {
      expect(UserRecord._getUserRecordsByUsername({ email: 'john@gmail.com' })).to.eventually.be.rejectedWith('must provide username');
    });
  });
  describe(`UserRecord.ID`, function() {
    it('it should return a number', async function() {
      const userRecords = await UserRecord._getUserRecordsByEmail({ email: 'john@gmail.com' });
      expect(userRecords[0].ID).to.be.a('number');
    });
  });
  describe(`UserRecord.username`, function() {
    it('it should return a string', async function() {
      const userRecords = await UserRecord._getUserRecordsByEmail({ email: 'john@gmail.com' });
      expect(userRecords[0].username).to.be.equal('JohnDoe');
    });
  });
  describe(`UserRecord.email`, function() {
    it('it should return a string', async function() {
      const userRecords = await UserRecord._getUserRecordsByUsername({ username: 'JohnDoe' });
      expect(userRecords[0].email).to.be.equal('john@gmail.com');
    });
  });
});
