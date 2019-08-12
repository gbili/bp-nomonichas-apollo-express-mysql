import 'dotenv/config';
import mysql from 'mysql';
import logger from 'saylo';
import { MysqlInstantiatableReq } from 'mysql-oh-wait';
import express from 'express';
import DiContainer from 'di-why';
import argon2 from 'argon2';
import { ApolloServer } from 'apollo-server-express';

import { Book, PasswordUserModel, TokenUser } from '../models';
import Server from '../Server';
import App from '../App';
import AuthService from '../services/AuthService';

import appConfig from '../config/appConfig';
import tokenConfig from '../config/tokenConfig';
import grapqlSchema from '../graphql/schema';
import resolvers from '../graphql/resolvers';

const events = {
  emit(...params) {
    logger.log(params);
  },
};

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
  'AuthService': {
    constructible: AuthService,
    deps: {
      models: {
        TokenUser
      },
      tokenConfig,
      hasher: argon2,
      events
    },
    locateDeps: {
      models: {
        PasswordUserModel: 'PasswordUserModel',
      },
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
    // TODO consider factories
    after: ({ me }) => me.connect(),
  },
  'Book': {
    injectable: Book,
    locateDeps: { requestor: 'MysqlReq' },
  },
  'App': {
    injectable: App,
    deps: { appProvider: express, logger, },
  },
  'Server': {
    constructible: ApolloServer,
    deps: {
      typeDefs: grapqlSchema,
      resolvers,
    },
    locateDeps: {
      context: { Book: 'Book', AuthService: 'AuthService' },
    },
    after: async ({ me, serviceLocator }) => {
      const app = (await serviceLocator.get('App')).getInstance();
      const path = (await serviceLocator.get('appConfig')).path;
      // use the express application as middleware in apollo server
      logger.log('Going to applyMiddleware');
      me.applyMiddleware({ app , path });
    },
  },
};

new DiContainer({ logger, load: injectionDict });

export default DiContainer;
