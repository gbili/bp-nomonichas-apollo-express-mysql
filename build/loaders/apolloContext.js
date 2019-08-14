"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthHeaderToken = _interopRequireDefault(require("../services/AuthHeaderToken"));

var _templateStatusMessages = _interopRequireDefault(require("../config/templateStatusMessages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  instance: _AuthHeaderToken.default,

  async after({
    me,
    serviceLocator
  }) {
    const context = {
      authService: await serviceLocator.get('authService'),
      models: {
        Book: await serviceLocator.get('Book')
      },
      templateStatusMessages: _templateStatusMessages.default
    };
    return me.getAsyncContextReqMethod(context);
  }

};
exports.default = _default;