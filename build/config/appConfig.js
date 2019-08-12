"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  port: process.env.PORT || 3030,
  path: process.env.GRAPHQL_PATH || '/graphql'
};
exports.default = _default;