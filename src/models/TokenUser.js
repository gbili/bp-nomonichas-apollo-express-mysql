import UserAsPropsCapability from './UserAsPropsCapability';

export default class TokenUser extends UserAsPropsCapability {

  constructor({ userInfo, token }) {
    super(userInfo);
    this.token = token;
  }

}
