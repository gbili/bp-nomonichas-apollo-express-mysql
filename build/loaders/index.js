"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _mysql = _interopRequireDefault(require("mysql"));

var _saylo = _interopRequireDefault(require("saylo"));

var _mysqlOhWait = require("mysql-oh-wait");

var _express = _interopRequireDefault(require("express"));

var _diWhy = _interopRequireDefault(require("di-why"));

var _argon = _interopRequireDefault(require("argon2"));

var _apolloServerExpress = require("apollo-server-express");

var _models = require("../models");

var _Server = _interopRequireDefault(require("../Server"));

var _App = _interopRequireDefault(require("../App"));

var _AuthService = _interopRequireDefault(require("../services/AuthService"));

var _appConfig = _interopRequireDefault(require("../config/appConfig"));

var _tokenConfig = _interopRequireDefault(require("../config/tokenConfig"));

var _schema = _interopRequireDefault(require("../graphql/schema"));

var _resolvers = _interopRequireDefault(require("../graphql/resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const events = {
  emit(...params) {
    _saylo.default.log(params);
  }

};
const injectionDict = {
  'logger': {
    instance: _saylo.default
  },
  'PasswordUserModel': {
    injectable: _models.PasswordUserModel,
    locateDeps: {
      requestor: 'MysqlReq'
    }
  },
  'AuthService': {
    constructible: _AuthService.default,
    deps: {
      models: {
        TokenUser: _models.TokenUser
      },
      tokenConfig: _tokenConfig.default,
      hasher: _argon.default,
      events
    },
    locateDeps: {
      models: {
        PasswordUserModel: 'PasswordUserModel'
      }
    }
  },
  'appConfig': {
    instance: _appConfig.default
  },
  'MysqlReq': {
    constructible: _mysqlOhWait.MysqlInstantiatableReq,
    deps: {
      logger: _saylo.default,
      adapter: _mysql.default,
      connectionConfig: {
        multipleStatements: false,
        ..._mysqlOhWait.MysqlInstantiatableReq.extractConfigFromEnv(process.env)
      }
    },
    // TODO consider factories
    after: ({
      me
    }) => me.connect()
  },
  'Book': {
    injectable: _models.Book,
    locateDeps: {
      requestor: 'MysqlReq'
    }
  },
  'App': {
    injectable: _App.default,
    deps: {
      appProvider: _express.default,
      logger: _saylo.default
    }
  },
  'Server': {
    constructible: _apolloServerExpress.ApolloServer,
    deps: {
      typeDefs: _schema.default,
      resolvers: _resolvers.default
    },
    locateDeps: {
      context: {
        Book: 'Book',
        AuthService: 'AuthService'
      }
    },
    after: async ({
      me,
      serviceLocator
    }) => {
      const app = (await serviceLocator.get('App')).getInstance();
      const path = (await serviceLocator.get('appConfig')).path; // use the express application as middleware in apollo server

      _saylo.default.log('Going to applyMiddleware');

      me.applyMiddleware({
        app,
        path
      });
    }
  }
};
new _diWhy.default({
  logger: _saylo.default,
  load: injectionDict
});
var _default = _diWhy.default;
exports.default = _default;