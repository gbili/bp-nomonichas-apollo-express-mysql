import { expect } from 'chai';
import PasswordUser from '../../src/models/PasswordUser';
import { di, bootstrap } from '../bootstrap';

async function createUser(n) {
  const PasswordUserModel = await di.get('PasswordUserModel');
  const fakeUsersData = await di.get('fake-users');
  const { username, email, cryptedPassword } = fakeUsersData[n];
  return await PasswordUserModel.create({ username, email, cryptedPassword });
}

let PasswordUserModel = null;
let fakeUsersData = null;
let user = null;

describe('#+#+#+#+#+#+#+# PasswordUserModel', function() {

  it('should fetch dependencies to make it available to following tests', async function() {
    PasswordUserModel = await di.get('PasswordUserModel');
    fakeUsersData = await di.get('fake-users');
    expect(PasswordUserModel.create).to.be.a('function');
    expect(fakeUsersData).to.be.an('array');
  });

  describe(`# # # # # # # # PasswordUserModel requestor`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('PasswordUserModel')).to.be.equal(true);
    });

    it('should accept being injected a requestor and return it', async function() {
      const PasswordUserModel = require('../../src/models/PasswordUserModel').default;
      const req = await di.get('MysqlReqTest');
      PasswordUserModel.inject({ requestor: req });
      expect(PasswordUserModel.getRequestor()).to.be.equal(req);
    });

  });

  describe(`# # # # # # # # PasswordUserModel.create(non-existent-user)`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('PasswordUserModel')).to.be.equal(true);
    });

    it('should return a user if not already exists', async function() {
      user = await createUser(0);
      expect(user).to.be.an.instanceof(PasswordUser);
    });

    it('should return user if not already exists', async function() {
      user = await createUser(1);
      expect(user).to.be.an.instanceof(PasswordUser);
    });

  });

  describe(`# # # # # # # # PasswordUserModel.create(exising-user)`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('PasswordUserModel')).to.be.equal(true);
    });

    it('should create a user to make it pre existing to following tests', async function() {
      expect(await createUser(0)).to.be.an.instanceof(PasswordUser);
    });

    it('should return null if user already exists', async function() {
      user = await createUser(0);
      expect(user).to.be.equal(null);
    });

    it('should return null if username already exists', async function() {
      const {username} = fakeUsersData[0];
      const {email, cryptedPassword} = fakeUsersData[3];
      user = await PasswordUserModel.create({ username, email, cryptedPassword });
      expect(user).to.be.equal(null);
    });

    it('it should return null if email already exists', async function() {
      const {email} = fakeUsersData[0];
      const {username, cryptedPassword} = fakeUsersData[3];
      user = await PasswordUserModel.create({ username, email, cryptedPassword });
      expect(user).to.be.equal(null);
    });

  });


  describe(`# # # # # # # # PasswordUserModel.findOne( username, email )`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('PasswordUserModel')).to.be.equal(true);
    });

    it('should create a user to make it pre existing to following tests', async function() {
      expect(await createUser(0)).to.be.an.instanceof(PasswordUser);
    });

    it('it should return a password user if username exists', async function() {
      const { username } = fakeUsersData[0];
      user = await PasswordUserModel.findOne({ username });
      expect(user).to.be.an.instanceof(PasswordUser);
    });

    it('it should return a password user if email exists and passwords match', async function() {
      const { email } = fakeUsersData[0];
      user = await PasswordUserModel.findOne({ email });
      expect(user).to.be.an.instanceof(PasswordUser);
    });

    it('it should return null if username does not exist', async function() {
      const { username } = fakeUsersData[3];
      user = await PasswordUserModel.findOne({ username });
      expect(user).to.be.equal(null);
    });

    it('it should return null if email does not exist', async function() {
      const { email } = fakeUsersData[3];
      user = await PasswordUserModel.findOne({ email });
      expect(user).to.be.equal(null);
    });

  });


  describe(`# # # # # # # # PasswordUserModel._getPasswordUsersByEmail()`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('PasswordUserModel')).to.be.equal(true);
    });

    it('should create a user to make it pre existing to following tests', async function() {
      expect(await createUser(0)).to.be.an.instanceof(PasswordUser);
    });

    it('should throw an error when no email param is passed', function() {
      expect(PasswordUserModel._getPasswordUsersByEmail({ username: 'JohnDoe' })).to.eventually.be.rejectedWith('must provide email');
    });

    it('should return an array if provided email', async function() {
      let users = await PasswordUserModel._getPasswordUsersByEmail({ email: fakeUsersData[0].email });
      expect(users).to.be.an('array');
    });

    it('should return an array with a password user in it if provided email', async function() {
      let users = await PasswordUserModel._getPasswordUsersByEmail({ email: fakeUsersData[0].email });
      expect(users[0]).to.be.an.instanceof(PasswordUser);
    });

    it('should return an array with a password user having an ID', async function() {
      let users = await PasswordUserModel._getPasswordUsersByEmail({ email: fakeUsersData[0].email });
      expect(typeof users[0].ID).to.not.be.equal('undefined');
    });

    it('should return an array with a password user having a cryptedPassword', async function() {
      let users = await PasswordUserModel._getPasswordUsersByEmail({ email: fakeUsersData[0].email });
      expect(users[0].cryptedPassword).to.be.a('string');
    });

  });


  describe(`# # # # # # # # PasswordUserModel._getPasswordUsersByUsername()`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('PasswordUserModel')).to.be.equal(true);
    });

    it('should create a user to make it pre existing to following tests', async function() {
      expect(await createUser(0)).to.be.an.instanceof(PasswordUser);
    });

    it('should throw an error when no username param is passed', function() {
      expect(PasswordUserModel._getPasswordUsersByUsername({ email: 'marvin@gave.com' })).to.eventually.be.rejectedWith('must provide username');
    });

    it('should return an array if provided username', async function() {
      let users = await PasswordUserModel._getPasswordUsersByUsername({ username: fakeUsersData[0].username });
      expect(users).to.be.an('array');
    });

    it('should return an array with a password user in it if provided username', async function() {
      let users = await PasswordUserModel._getPasswordUsersByUsername({ username: fakeUsersData[0].username });
      expect(users[0]).to.be.an.instanceof(PasswordUser);
    });

    it('should return an array with a password user having an ID', async function() {
      let users = await PasswordUserModel._getPasswordUsersByUsername({ username: fakeUsersData[0].username });
      expect(typeof users[0].ID).to.not.be.equal('undefined');
    });

    it('should return an array with a password user having a cryptedPassword', async function() {
      let users = await PasswordUserModel._getPasswordUsersByUsername({ username: fakeUsersData[0].username });
      expect(users[0].cryptedPassword).to.be.a('string');
    });

  });

});
