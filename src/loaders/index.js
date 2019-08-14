import 'dotenv/config';
import { Logger, logger } from 'saylo';
import DiContainer from 'di-why';

import PasswordUserModel from './PasswordUserModel';
import apolloServer from './apolloServer';
import apolloContext from './apolloContext';
import authService from './authService';
import mysqlReq from './mysqlReq';
import Book from './Book';
import app from './app';
import appConfig from './appConfig';

const muteLogger = new Logger({log: false, debug: false});

const injectionDict = {

  'logger': {
    instance: logger,
  },
  'events': {
    // TODO create a di factory entry which calls the factory function with deps as params
    instance: {
      emit(...params) {
        muteLogger.log(params);
      },
    },
  },

  PasswordUserModel,
  apolloServer,
  apolloContext,
  authService,
  mysqlReq,
  Book,
  app,
  appConfig,

};

const di = new DiContainer({ logger: muteLogger, load: injectionDict });

export default di;
