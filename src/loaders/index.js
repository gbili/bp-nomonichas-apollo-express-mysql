import 'dotenv/config';
import mysql from 'mysql';
import logger from 'saylo';
import { MysqlInstantiatableReq } from 'mysql-oh-wait';
import express from 'express';
import DiContainer from 'di-why';
import argon2 from 'argon2';
import { ApolloServer } from 'apollo-server-express';

import { Book, PasswordUserModel, TokenUser } from '../models';
import AuthService from '../services/AuthService';
import AuthHeaderToken from '../services/AuthHeaderToken';

import appConfig from '../config/appConfig';
import templateStatusMessages from '../config/templateStatusMessages';
import tokenConfigGenerator from '../config/tokenConfigGenerator';
import grapqlSchema from '../graphql/schema';
import resolvers from '../graphql/resolvers';

const injectionDict = {

  'logger': {
    instance: logger,
  },

  'PasswordUserModel': {
    injectable: PasswordUserModel,
    locateDeps: {
      requestor: 'MysqlReq',
    },
  },

  'events': {
    instance: {
      emit(...params) {
        logger.log(params);
      },
    },
  },

  'authService': {
    constructible: AuthService,
    deps: {
      models: {
        TokenUser
      },
      tokenConfig: tokenConfigGenerator({ expireTokensEveryNHours: 1 }),
      hasher: argon2,
    },
    locateDeps: {
      models: {
        PasswordUserModel: 'PasswordUserModel',
      },
      events : 'events',
    },
  },

  'appConfig': {
    instance: appConfig
  },

  'MysqlReq': {
    constructible: MysqlInstantiatableReq,
    deps: {
      logger,
      adapter: mysql,
      connectionConfig: {
        multipleStatements: false,
        ...MysqlInstantiatableReq.extractConfigFromEnv(process.env),
      }
    },
    after: ({ me }) => {
      me.connect();
    },
  },

  'Book': {
    injectable: Book,
    locateDeps: { requestor: 'MysqlReq' },
  },

  'expressAuthMiddleware': {
    instance: function(req, res, next) {
      if (!req.headers || !req.headers.authorization) {
        return next();
      }

      const parts = req.headers.authorization.split(' ');

      if (parts.length == 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          res.locals.token = credentials
          return next();
        }
      }

      return next(new Error('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' }));
    },
    async after({ me, serviceLocator }) {
      const app = await serviceLocator.get('app');
      app.use(me);
    },
  },

  'apolloContext': {
    instance: AuthHeaderToken,
    async after({ me, serviceLocator }) {
      const context = {
        authService: await serviceLocator.get('authService'),
        models: {
          Book: await serviceLocator.get('Book'),
        },
        templateStatusMessages,
      };
      return me.getAsyncContextReqMethod(context);
    },
  },

  'app': {
    instance: express(),
    after: ({ me, serviceLocator }) => {
      logger.log('=============== Loaded express app ===============');
      logger.log(me);
    },
  },

  'apolloServer': {
    constructible: ApolloServer,
    deps: {
      typeDefs: grapqlSchema,
      resolvers,
    },
    locateDeps: {
      context: 'apolloContext',
    },
    async after({ me, serviceLocator }) {
      const app = (await serviceLocator.get('app'));
      const path = (await serviceLocator.get('appConfig')).path;
      const logger = (await serviceLocator.get('logger'));
      // use the express application as middleware in apollo server
      logger.log('Going to applyMiddleware');
      me.applyMiddleware({ app , path });
    },
  },

};

const di = new DiContainer({ logger, load: injectionDict });

export default di;
