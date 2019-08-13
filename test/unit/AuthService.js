import { expect } from 'chai';
import AuthService  from '../../src/services/AuthService';
import TokenUser  from '../../src/models/TokenUser';
import User  from '../../src/models/User';
import { di, bootstrap } from '../bootstrap';

async function registerUser(n) {
  const authService = await di.get('authService');
  const fakeUsersData = await di.get('fake-users');
  const {username, email, plainPassword} = fakeUsersData[n];
  const user = await authService.register({ username, email, plainPassword });
  return user;
}

let user = null;
let authService = null;
let fakeUsersData = null;

describe('AuthService', function() {

  it('should make it available to following tests', async function() {
    authService = await di.get('authService');
    fakeUsersData = await di.get('fake-users');
    expect(authService).to.be.an.instanceof(AuthService);
    expect(fakeUsersData).to.be.an('array');
  });

  describe(`AuthService.register(non-existent-user)`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('AuthService')).to.be.equal(true);
    });

    it('should return a user if not already exists', async function() {
      user = await registerUser(0);
      expect(user).to.be.an.instanceof(User);
    });

    it('should return user if not already exists', async function() {
      user = await registerUser(1);
      expect(user).to.be.an.instanceof(User);
    });

    it('should return a user with ID', async function() {
      expect(user.ID).to.be.a('number');
    });

    it('should return a user with email', async function() {
      expect(user.email).to.be.a('string');
    });

    it('should return a user with username', async function() {
      expect(user.username).to.be.a('string');
    });

    it('should return a user without cryptedPassword', async function() {
      expect(typeof user.cryptedPassword).to.be.equal('undefined');
    });

  });

  describe(`AuthService.register(exising-user)`, function() {

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('AuthService')).to.be.equal(true);
    });

    it('should register a user to make it pre existing to following tests', async function() {
      expect(await registerUser(0)).to.be.an.instanceof(User);
    });

    it('should return null if user already exists', async function() {
      user = await registerUser(0);
      expect(user).to.be.equal(null);
    });

    it('should return null if username already exists', async function() {
      const {username} = fakeUsersData[0];
      const {email, plainPassword} = fakeUsersData[2];
      user = await authService.register({ username, email, plainPassword });
      expect(user).to.be.equal(null);
    });

    it('it should return null if email already exists', async function() {
      const {email} = fakeUsersData[0];
      const {username, plainPassword} = fakeUsersData[2];
      user = await authService.register({ username, email, plainPassword });
      expect(user).to.be.equal(null);
    });

  });

  describe(`AuthService.authenticate(params)`, function() {

    describe(`AuthService.authenticate({loginInput})`, function() {

      it('should BOOTSTRAP', async function() {
        expect(await bootstrap('AuthService')).to.be.equal(true);
      });

      it('should register a user to make it pre existing to following tests', async function() {
        expect(await registerUser(0)).to.be.an.instanceof(User);
      });

      it('it should return a token user if username exists and passwords match', async function() {
        const {username, plainPassword} = fakeUsersData[0];
        user = await authService.authenticate({ loginInput: { username, plainPassword }, });
        expect(user).to.be.an.instanceof(TokenUser);
      });

      it('it should return a token user if email exists and passwords match', async function() {
        const { email, plainPassword } = fakeUsersData[0];
        user = await authService.authenticate({ loginInput: { email, plainPassword }, });
        expect(user).to.be.an.instanceof(TokenUser);
      });

      it('it should return null if username does not exist', async function() {
        const {username, plainPassword} = fakeUsersData[3];
        user = await authService.authenticate({ loginInput: { username, plainPassword }, });
        expect(user).to.be.equal(null);
      });

      it('it should return null if email does not exist', async function() {
        const { email, plainPassword } = fakeUsersData[3];
        user = await authService.authenticate({ loginInput: { email, plainPassword }, });
        expect(user).to.be.equal(null);
      });

      it('it should return null if username exists but passwords dont match', async function() {
        const { username, badPassword } = fakeUsersData[0];
        user = await authService.authenticate({ loginInput: { username, plainPassword: badPassword }, });
        expect(user).to.be.equal(null);
      });

      it('it should return null if email exists but passwords dont match', async function() {
        const { email, badPassword } = fakeUsersData[0];
        user = await authService.authenticate({ loginInput: { email, plainPassword: badPassword }, });
        expect(user).to.be.equal(null);
      });

      it('it should return null if email exists but no password is provided', async function() {
        const { email } = fakeUsersData[1];
        user = await authService.authenticate({ loginInput: { email }, });
        expect(user).to.be.equal(null);
      });

      it('it should return null if username exists but no password is provided', async function() {
        const { username } = fakeUsersData[1];
        user = await authService.authenticate({ loginInput: { username }, });
        expect(user).to.be.equal(null);
      });

      it('it should return null if only password is provided', async function() {
        const { plainPassword } = fakeUsersData[1];
        user = await authService.authenticate({ loginInput: { plainPassword }, });
        expect(user).to.be.equal(null);
      });

    });

    describe(`AuthService.authenticate({token})`, function() {

      it('should BOOTSTRAP', async function() {
        expect(await bootstrap('AuthService')).to.be.equal(true);
      });

      it('should register a user to make it pre existing to following tests', async function() {
        expect(await registerUser(0)).to.be.an.instanceof(User);
      });

      it('it should return a token user if valid token', async function() {
        const {username, plainPassword} = fakeUsersData[0];
        const tokenUserFromLogin = await authService.authenticate({ loginInput: { username, plainPassword }, });
        const validToken = tokenUserFromLogin.token;
        const tokenUserFromTokenAuth = await authService.authenticate({ token: validToken, });
        expect(tokenUserFromTokenAuth).to.be.an.instanceof(TokenUser);
      });

      it('it should return a token user with same ID as that of user of valid token', async function() {
        const {username, plainPassword} = fakeUsersData[0];
        const tokenUserFromLogin = await authService.authenticate({ loginInput: { username, plainPassword }, });
        const validToken = tokenUserFromLogin.token;
        const tokenUserFromTokenAuth = await authService.authenticate({ token: validToken, });
        expect(tokenUserFromTokenAuth.ID).to.be.equal(tokenUserFromLogin.ID);
      });

      it('it should throw an error if invalid token', async function() {
        const {username, plainPassword} = fakeUsersData[0];
        const tokenUserFromLogin = await authService.authenticate({ loginInput: { username, plainPassword }, });
        const validToken = tokenUserFromLogin.token;
        const badToken = 'SjI' + validToken.substr(3, validToken.length)
        expect(authService.authenticate({ token: badToken, })).to.eventually.throw();
      });

    });

  });

  describe(`AuthService.verifyToken({token:<validToken>})`, function() {
    it('should return the json string payload on validToken', function() {
      const tokenPayload = {
        aud: 1,
        exp: 1565653902
      };
      const validToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOjEsImV4cCI6MTU2NTY1MzkwMn0.BEP82um_jdXq15Pe-6oqNJ_zfVufMOXCfzt-eFoyEuc';
      const stringPayload = JSON.stringify(tokenPayload);
      expect(authService.verifyToken({ token: validToken })).to.be.equal(stringPayload);
    });
  });

  describe(`AuthService.verifyToken({token:<badToken>})`, function() {
    it('should return false if token was signed with other secret', function() {
      const wrongSecretToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOjEsImV4cCI6MTU2NTY1MzkwMn0.L9qvgUDXAZCVV0iXuHNFVgAjI-HxMQePIGo6llR2H3c';
      expect(authService.verifyToken({ token: wrongSecretToken })).to.be.equal(false);
    });

    it('should return if token signature was tampered', function() {
      const tamperedSignature = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOjEsImV4cCI6MTU2NTY1MzkwMn0.AEP82um_jdXq15Pe-6oqNJ_zfVufMOXCfzt-eFoyEuc';
      expect(authService.verifyToken({ token: tamperedSignature })).to.be.equal(false);
    });

    it('should return false if token payload hash was tampered', function() {
      const tamperedPayloadHash = 'eyDhbGciOiJIUzI1NiJ9.eyJhdWQiOjEsImV4cCI6MTU2NTY1MzkwMn0.BEP82um_jdXq15Pe-6oqNJ_zfVufMOXCfzt-eFoyEuc';
      expect(authService.verifyToken({ token: tamperedPayloadHash })).to.be.equal(false);
    });
  });

});
