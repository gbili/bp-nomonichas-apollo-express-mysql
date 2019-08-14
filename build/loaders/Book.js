"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _default = {
  injectable: _models.Book,
  locateDeps: {
    requestor: 'mysqlReq'
  }
};
exports.default = _default;