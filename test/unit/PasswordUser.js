import { expect } from 'chai';
import { di, bootstrap } from '../bootstrap';

import PasswordUser from '../../src/models/PasswordUser';
import User from '../../src/models/User';

describe('PasswordUser', function() {

  describe(`PasswordUser.constructor({ID, username, email})`, function() {

    let user = null;

    it('should return an instance of PasswordUser', async function() {
      const fakeUsersDataWithID = await di.get('fake-users-with-id');
      user = new PasswordUser(fakeUsersDataWithID[0]);
      expect(user).to.be.an.instanceof(PasswordUser);
    });

    it('should return a user with ID', function() {
      expect(typeof user.ID).to.not.be.equal('undefined');
    });

    it('should return a user with email', function() {
      expect(user.email).to.be.a('string');
    });

    it('should return a user with username', function() {
      expect(user.username).to.be.a('string');
    });

    it('should return a user with cryptedPassword', function() {
      expect(typeof user.cryptedPassword).to.be.a('string');
    });

    it('should return a user without plainPassword', function() {
      expect(typeof user.plainPassword).to.be.equal('undefined');
    });

    it('should return a user with property userInstance instance of User', function() {
      expect(user.userInstance).to.be.an.instanceof(User);
    });

  });

});
