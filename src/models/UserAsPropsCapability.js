import User from './User';

export default class UserAsPropsCapability {

  constructor({ user, ID, username, email }) {

    if (!(user instanceof User)) {
      if (!ID) {
        throw new Error('UserAsPropsCapability must receive either a User instance or an an ID on construction');
      }

      if (!username) {
        username = null;
      }

      if (!email) {
        email = null;
      }
      user = new User({ ID, username, email });
    }

    this.userInstance = user;
  }

  get ID() {
    return this.userInstance.ID;
  }

  get username() {
    return this.userInstance.username;
  }

  get email() {
    return this.userInstance.email;
  }

}
