"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _saylo = require("saylo");

var _diWhy = _interopRequireDefault(require("di-why"));

var _PasswordUserModel = _interopRequireDefault(require("./PasswordUserModel"));

var _apolloServer = _interopRequireDefault(require("./apolloServer"));

var _apolloContext = _interopRequireDefault(require("./apolloContext"));

var _authService = _interopRequireDefault(require("./authService"));

var _mysqlReq = _interopRequireDefault(require("./mysqlReq"));

var _Book = _interopRequireDefault(require("./Book"));

var _app = _interopRequireDefault(require("./app"));

var _appConfig = _interopRequireDefault(require("./appConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const muteLogger = new _saylo.Logger({
  log: false,
  debug: false
});
const injectionDict = {
  'logger': {
    instance: _saylo.logger
  },
  'events': {
    // TODO create a di factory entry which calls the factory function with deps as params
    instance: {
      emit(...params) {
        muteLogger.log(params);
      }

    }
  },
  PasswordUserModel: _PasswordUserModel.default,
  apolloServer: _apolloServer.default,
  apolloContext: _apolloContext.default,
  authService: _authService.default,
  mysqlReq: _mysqlReq.default,
  Book: _Book.default,
  app: _app.default,
  appConfig: _appConfig.default
};
const di = new _diWhy.default({
  logger: muteLogger,
  load: injectionDict
});
var _default = di;
exports.default = _default;