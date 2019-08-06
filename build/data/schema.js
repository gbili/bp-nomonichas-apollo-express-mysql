"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.schemaFilePath = exports.undumpSchema = void 0;

var _fs = require("fs");

var _mysqlOhWait = require("mysql-oh-wait");

var _saylo = _interopRequireDefault(require("saylo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schemaFilePath = `${__dirname}/schema.sql`;
exports.schemaFilePath = schemaFilePath;

const undumpSchema = async function () {
  _saylo.default.log('Undumping Schema');

  await _mysqlOhWait.MysqlDump.executeSqlFile({
    filePath: schemaFilePath,
    disconnectOnFinish: true
  });
};

exports.undumpSchema = undumpSchema;
process.env.NODE_ENV === 'npmscript' && (async () => await undumpSchema())();
var _default = schemaFilePath;
exports.default = _default;