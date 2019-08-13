import UserAsPropsCapability from './UserAsPropsCapability';

export default class TokenUser extends UserAsPropsCapability {

  constructor({ userInfo, token }) {
    console.log(userInfo);
    super(userInfo);
    this.token = token;
  }

}
