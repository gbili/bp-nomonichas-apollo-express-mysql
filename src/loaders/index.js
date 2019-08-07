import 'dotenv/config';
import mysql from 'mysql';
import logger from 'saylo';
import argon2 from 'argon2';
import { MysqlReq } from 'mysql-oh-wait';
import express from 'express';
import cors from 'cors';

import DiContainer from '../DiContainer';
import { UserRecord } from '../models/User';
import { Book, User } from '../models';
import { ApolloServer } from 'apollo-server-express';
import Server from '../Server';
import App from '../App';

import appConfig from '../config/app';
import schema from '../schema';
import resolvers from '../resolvers';

const injectionDict = {
  'logger': {
    instance: logger,
  },
  'appConfig': {
    instance: appConfig
  },
  'MysqlReq': {
    injectable: MysqlReq,
    deps: { logger, adapter: mysql, env: process.env, connectionConfig: { multipleStatements: false } },
    // TODO consider factories
    after: ({ me }) => me.connect(),
  },
  'Book': {
    injectable: Book,
    deps: { requestor: MysqlReq },
  },
  'UserRecord': {
    injectable: UserRecord,
    deps: { requestor: MysqlReq, hasher: argon2 },
  },
  'App': {
    injectable: App,
    deps: { appProvider: express, logger, cors: cors() },
  },
  'Server': {
    injectable: Server,
    deps: {
      classRef: ApolloServer,
      constructorParams: [{
        typeDefs: schema,
        resolvers,
        context: { Book, User }
      }],
    },
    after: async ({ me, serviceLocator }) => {
      const app = (await serviceLocator.get('App')).getInstance();
      const path = (await serviceLocator.get('appConfig')).path;
      // use the express application as middleware in apollo server
      logger.log('Going to applyMiddleware');
      me.getInstance().applyMiddleware({ app , path });
    },
  },
};

DiContainer.inject({ logger });
DiContainer.cleanLoad(injectionDict);

export default DiContainer;
