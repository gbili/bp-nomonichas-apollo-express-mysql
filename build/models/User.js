"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class User {
  constructor({
    ID,
    username,
    email
  }) {
    this.ID = ID;
    this.username = username;
    this.email = email;
  }

}

exports.default = User;