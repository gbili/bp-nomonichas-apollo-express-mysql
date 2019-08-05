import { expect } from 'chai';
import User from '../../src/models/User';

describe('User', function() {
  describe(`User.register()`, function() {
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
});
