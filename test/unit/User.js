import { expect } from 'chai';
import User from '../../src/models/User';

describe('User', function() {
  describe(`User.register(non-existent-user)`, function() {
    it('it should return a user if not already exists', async function() {
      const user = await User.register({ username: 'JohnDoe', email: 'john@gmail.com', plainPassword: 'password'});
      expect(user).to.be.an.instanceof(User);
    });
    it('it should return a user with ID', async function() {
      const user = await User.register({ username: 'SamPerkins', email: 'sam@gmail.com', plainPassword: 'password'});
      expect(user.ID).to.be.a('number');
    });
    it('it should return a user with email', async function() {
      const user = await User.register({ username: 'MykeKevs', email: 'myke@gmail.com', plainPassword: 'password'});
      expect(user.email).to.be.a('string');
    });
    it('it should return a user with username', async function() {
      const user = await User.register({ username: 'AlphieRon', email: 'al@gmail.com', plainPassword: 'password'});
      expect(user.username).to.be.a('string');
    });
    it('it should return a user without cryptedPassword', async function() {
      const user = await User.register({ username: 'AllieMac', email: 'allie@gmail.com', plainPassword: 'password'});
      expect(typeof user.cryptedPassword).to.be.equal('undefined');
    });
  });
  describe(`User.register(exising-user)`, function() {
    it('it should return null if username already exists', async function() {
      const user = await User.register({ username: 'JohnDoe', email: 'unknown@gmail.com', plainPassword: 'password'});
      expect(user).to.be.equal(null);
    });
    it('it should return null if email already exists', async function() {
      const user = await User.register({ username: 'Unknown', email: 'john@gmail.com', plainPassword: 'password'});
      expect(user).to.be.equal(null);
    });
  });

  describe(`User.authenticate(all params)`, function() {
    it('it should return a user if exists and passwords match', async function() {
      const user = await User.authenticate({ username: 'JohnDoe', email: 'john@gmail.com', plainPassword: 'password'});
      expect(user).to.be.an.instanceof(User);
    });
    it('it should return null if user does not exist', async function() {
      const user = await User.authenticate({ username: 'Unknown', email: 'unknown@gmail.com', plainPassword: 'password'});
      expect(user).to.be.equal(null);
    });

    it('it should return null if user and password do not match', async function() {
      const user = await User.authenticate({ username: 'JohnDoe', email: 'john@gmail.com', plainPassword: 'wrong-password'});
      expect(user).to.be.equal(null);
    });
  });

  describe(`User.authenticate(username, password)`, function() {
    it('it should return a user if exists and passwords match', async function() {
      const user = await User.authenticate({ username: 'JohnDoe', plainPassword: 'password'});
      expect(user).to.be.an.instanceof(User);
    });
    it('it should return null if user does not exist', async function() {
      const user = await User.authenticate({ username: 'Unknown', plainPassword: 'password'});
      expect(user).to.be.equal(null);
    });

    it('it should return null if user and password do not match', async function() {
      const user = await User.authenticate({ username: 'JohnDoe', plainPassword: 'wrong-password'});
      expect(user).to.be.equal(null);
    });
  });

  describe(`User.authenticate(email, password)`, function() {
    it('it should return a user if exists and passwords match', async function() {
      const user = await User.authenticate({ email: 'john@gmail.com', plainPassword: 'password'});
      expect(user).to.be.an.instanceof(User);
    });
    it('it should return null if user does not exist', async function() {
      const user = await User.authenticate({ email: 'unknown@gmail.com', plainPassword: 'password'});
      expect(user).to.be.equal(null);
    });

    it('it should return null if user and password do not match', async function() {
      const user = await User.authenticate({ email: 'john@gmail.com', plainPassword: 'wrong-password'});
      expect(user).to.be.equal(null);
    });
  });

  describe(`User.authenticate(email, no-password )`, function() {
    it('it should throw an error asking for password', async function() {
      expect(User.authenticate({ email: 'john@gmail.com' })).to.eventually.be.rejectedWith('must provide plainPassword');
    });
  });

  describe(`User.authenticate( no-username nor-email )`, function() {
    it('it should throw an error asking to provide either username or email', async function() {
      expect(User.authenticate({ plainPassword: 'password' })).to.eventually.be.rejectedWith('must provide username or email');
    });
  });

  describe(`User.all()`, function() {
    it('it should return a list', async function() {
      expect(await User.all()).to.be.an('array');
    });

    it('it should return a list of users when not empty', async function() {
      const users = await User.all();
      expect(users.length).to.not.be.equal(0);
      expect(users[0]).to.be.an.instanceof(User);
    });
  });
});
