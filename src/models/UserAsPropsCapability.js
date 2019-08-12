import User from './User';

export default class UserAsPropsCapability {

  constructor({ user, ID, username, email }) {
    if (!user) {
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
