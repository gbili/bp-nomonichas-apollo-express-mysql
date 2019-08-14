import 'dotenv/config';
import { Logger, logger } from 'saylo';
import DiContainer from 'di-why';

import pum from './PasswordUserModel';
import apols from './apolloServer';
import apolc from './apolloContext';
import auths from './authService';
import mysqlr from './mysqlReq';
import book from './Book';
import app from './app';
import appco from './appConfig';

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

  ...pum,
  ...apols,
  ...apolc,
  ...auths,
  ...mysqlr,
  ...book,
  ...app,
  ...appco,

};

const di = new DiContainer({ logger: muteLogger, load: injectionDict });

export default di;
