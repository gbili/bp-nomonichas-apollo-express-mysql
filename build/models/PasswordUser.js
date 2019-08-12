"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserAsPropsCapability = _interopRequireDefault(require("./UserAsPropsCapability"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PasswordUser extends _UserAsPropsCapability.default {
  constructor({
    ID,
    username,
    email,
    cryptedPassword
  }) {
    super({
      ID,
      username,
      email
    });
    this.cryptedPassword = cryptedPassword;
  }

}

exports.default = PasswordUser;