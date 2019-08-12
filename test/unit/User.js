import { expect } from 'chai';
import { di } from '../bootstrap';
import User from '../../src/models/User';

let user = null;

describe('#+#+#+#+#+#+#+# User', function() {

  describe(`# # # # # # # # User.constructor({ID, username, email})`, function() {

    it('should return an instance of User', async function() {
      const fakeUsersDataWithID = await di.get('fake-users-with-id');
      user = new User(fakeUsersDataWithID[0]);
      expect(user).to.be.an.instanceof(User);
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

    it('should return a user without cryptedPassword', function() {
      expect(typeof user.cryptedPassword).to.be.equal('undefined');
    });

    it('should return a user without plainPassword', function() {
      expect(typeof user.plainPassword).to.be.equal('undefined');
    });

  });

});
