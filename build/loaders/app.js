"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  instance: (0, _express.default)(),

  async after({
    me,
    serviceLocator
  }) {
    const logger = await serviceLocator.get('logger');
    logger.log('=============== Loaded express app ===============');
    logger.log(me);
  }

};
exports.default = _default;