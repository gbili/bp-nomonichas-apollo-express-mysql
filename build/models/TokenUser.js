"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserAsPropsCapability = _interopRequireDefault(require("./UserAsPropsCapability"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TokenUser extends _UserAsPropsCapability.default {
  constructor({
    userInfo,
    token
  }) {
    super(userInfo);
    this.token = token;
  }

}

exports.default = TokenUser;