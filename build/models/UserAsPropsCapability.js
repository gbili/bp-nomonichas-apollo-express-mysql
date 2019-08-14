"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAsPropsCapability {
  constructor({
    user,
    ID,
    username,
    email
  }) {
    if (!(user instanceof _User.default)) {
      if (!ID) {
        throw new Error('UserAsPropsCapability must receive either a User instance or an an ID on construction');
      }

      if (!username) {
        username = null;
      }

      if (!email) {
        email = null;
      }

      user = new _User.default({
        ID,
        username,
        email
      });
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

exports.default = UserAsPropsCapability;