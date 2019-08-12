"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jws = _interopRequireDefault(require("jws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nHoursFromNow = n => Math.floor(Date.now() / 1000) + 60 * 60 * n;

var _default = {
  engine: _jws.default,
  expiresIn: nHoursFromNow(1),
  algorithm: 'HS256',
  keys: {
    privateKey: process.env.JWT_KEY_PRIVATE
  }
};
exports.default = _default;