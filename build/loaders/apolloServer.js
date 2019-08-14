"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("../graphql/schema"));

var _resolvers = _interopRequireDefault(require("../graphql/resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  constructible: _apolloServerExpress.ApolloServer,
  deps: {
    typeDefs: _schema.default,
    resolvers: _resolvers.default
  },
  locateDeps: {
    context: 'apolloContext'
  },

  async after({
    me,
    serviceLocator
  }) {
    const app = await serviceLocator.get('app');
    const path = (await serviceLocator.get('appConfig')).path;
    const logger = await serviceLocator.get('logger'); // use the express application as middleware in apollo server

    logger.log('Going to applyMiddleware');
    me.applyMiddleware({
      app,
      path
    });
  }

};
exports.default = _default;