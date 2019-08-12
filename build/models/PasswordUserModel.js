"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestorCapability = _interopRequireDefault(require("./RequestorCapability"));

var _PasswordUser = _interopRequireDefault(require("./PasswordUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PasswordUserModel extends _RequestorCapability.default {
  static async create({
    username,
    email,
    cryptedPassword
  }) {
    const req = PasswordUserModel.getRequestor();
    const actionResult = await req.query({
      sql: 'INSERT INTO User (username, email, cryptedPassword) VALUES (?, ?, ?)',
      values: [username, email, cryptedPassword]
    });
    let passwordUser = null;

    if (actionResult.value !== null && !actionResult.error) {
      passwordUser = new _PasswordUser.default({
        ID: actionResult.value.insertId,
        username,
        email,
        cryptedPassword
      });
    }

    return passwordUser || null;
  }

  static async findOne({
    username,
    email
  }) {
    let passwordUsers = [];

    if (username) {
      passwordUsers = await PasswordUserModel._getPasswordUsersByUsername({
        username
      });
    } else if (email) {
      passwordUsers = await PasswordUserModel._getPasswordUsersByEmail({
        email
      });
    } else {
      throw new Error('must provide username or email');
    }

    return passwordUsers.length && passwordUsers[0] || null;
  }

  static async _all() {
    return await PasswordUserModel._getPasswordUsersBy({
      1: 1
    });
  }

  static async _getPasswordUsersByEmail(params) {
    const {
      email
    } = params;

    if (!email) {
      throw new Error('must provide email');
    }

    return await PasswordUserModel._getPasswordUsersBy(params);
  }

  static async _getPasswordUsersByUsername(params) {
    const {
      username
    } = params;

    if (!username) {
      throw new Error('must provide username');
    }

    return await PasswordUserModel._getPasswordUsersBy(params);
  }

  static async _getPasswordUsersBy(params) {
    let sql = 'SELECT ID, username, email, cryptedPassword FROM User WHERE ?';
    const req = PasswordUserModel.getRequestor();
    const actionResult = await req.query({
      sql,
      values: params,
      after: res => res.map(row => new _PasswordUser.default(row))
    });
    const passwordUsers = !actionResult.error && actionResult.value || null;
    return passwordUsers;
  }

}

exports.default = PasswordUserModel;