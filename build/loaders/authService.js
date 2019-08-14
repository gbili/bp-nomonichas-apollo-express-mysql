"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _argon = _interopRequireDefault(require("argon2"));

var _AuthService = _interopRequireDefault(require("../services/AuthService"));

var _models = require("../models");

var _tokenConfigGenerator = _interopRequireDefault(require("../config/tokenConfigGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  constructible: _AuthService.default,
  deps: {
    models: {
      TokenUser: _models.TokenUser
    },
    tokenConfig: (0, _tokenConfigGenerator.default)({
      expireTokensEveryNHours: 1
    }),
    hasher: _argon.default
  },
  locateDeps: {
    models: {
      PasswordUserModel: 'PasswordUserModel'
    },
    events: 'events'
  }
};
exports.default = _default;