import UserAsPropsCapability from './UserAsPropsCapability';

export default class PasswordUser extends UserAsPropsCapability {

  constructor({ ID, username, email, cryptedPassword }) {
    super({ ID, username, email });
    this.cryptedPassword = cryptedPassword;
  }

}
