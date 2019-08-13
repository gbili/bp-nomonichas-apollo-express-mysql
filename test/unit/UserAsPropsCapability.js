import { expect } from 'chai';
import { di } from '../bootstrap';
import User from '../../src/models/User';
import UserAsPropsCapability from '../../src/models/UserAsPropsCapability';

let user = null;
let userAPC = null;

describe('UserAsPropsCapability', function() {

  describe(`UserAsPropsCapability.constructor({ user })`, function() {

    it('should return an instance of UserAsPropsCapability', async function() {
      const fakeUsersDataWithID = await di.get('fake-users-with-id');
      user = new User(fakeUsersDataWithID[0]);
      userAPC = new UserAsPropsCapability({ user });
      expect(userAPC).to.be.an.instanceof(UserAsPropsCapability);
    });

    it('should return a UserAsPropsCapability with ID', function() {
      expect(typeof userAPC.ID).to.not.be.equal('undefined');
    });

    it('should return a UserAsPropsCapability with email', function() {
      expect(userAPC.email).to.be.a('string');
    });

    it('should return a UserAsPropsCapability with username', function() {
      expect(userAPC.username).to.be.a('string');
    });

    it('should return a UserAsPropsCapability without cryptedPassword', function() {
      expect(typeof userAPC.cryptedPassword).to.be.equal('undefined');
    });

    it('should return a UserAsPropsCapability without plainPassword', function() {
      expect(typeof userAPC.plainPassword).to.be.equal('undefined');
    });

  });

  describe(`UserAsPropsCapability.constructor({ ID, username, email})`, function() {
    it('should return an instance of UserAsPropsCapability', async function() {
      const fakeUsersDataWithID = await di.get('fake-users-with-id');
      userAPC = new UserAsPropsCapability({ ...fakeUsersDataWithID[0] });
      expect(userAPC).to.be.an.instanceof(UserAsPropsCapability);
    });

    it('should return a UserAsPropsCapability with ID', function() {
      expect(typeof userAPC.ID).to.not.be.equal('undefined');
    });

    it('should return a UserAsPropsCapability with email', function() {
      expect(userAPC.email).to.be.a('string');
    });

    it('should return a UserAsPropsCapability with username', function() {
      expect(userAPC.username).to.be.a('string');
    });

    it('should return a UserAsPropsCapability without cryptedPassword', function() {
      expect(typeof userAPC.cryptedPassword).to.be.equal('undefined');
    });

    it('should return a UserAsPropsCapability without plainPassword', function() {
      expect(typeof userAPC.plainPassword).to.be.equal('undefined');
    });

  });


  describe(`UserAsPropsCapability.constructor({ ID })`, function() {
    it('should return an instance of UserAsPropsCapability', async function() {
      const fakeUsersDataWithID = await di.get('fake-users-with-id');
      let { ID } = fakeUsersDataWithID[0];
      userAPC = new UserAsPropsCapability({ ID });
      expect(userAPC).to.be.an.instanceof(UserAsPropsCapability);
    });

    it('should return a UserAsPropsCapability with ID', function() {
      expect(typeof userAPC.ID).to.not.be.equal('undefined');
    });

  });

  describe(`UserAsPropsCapability.constructor({ <no-id> })`, function() {
    it('should throw', async function() {
      const fakeUsersDataWithID = await di.get('fake-users-with-id');
      let { email, username } = fakeUsersDataWithID[0];
      const shouldThrow = _ => new UserAsPropsCapability({ email, username });
      expect(shouldThrow).to.throw();
    });
  });

});
