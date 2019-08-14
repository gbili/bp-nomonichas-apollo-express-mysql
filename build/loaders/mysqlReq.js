"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _mysqlOhWait = require("mysql-oh-wait");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  constructible: _mysqlOhWait.MysqlInstantiatableReq,
  deps: {
    adapter: _mysql.default,
    connectionConfig: {
      multipleStatements: false,
      ..._mysqlOhWait.MysqlInstantiatableReq.extractConfigFromEnv(process.env)
    }
  },
  locateDeps: {
    logger: 'logger'
  },
  after: ({
    me
  }) => {
    me.connect();
  }
};
exports.default = _default;