import 'dotenv/config';

import chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import mysql from 'mysql';
import { logger, Logger } from 'saylo';
import DiContainer from 'di-why';
import { MysqlDump, MysqlInstantiatableReq } from 'mysql-oh-wait';
import { readFileSync, existsSync } from 'fs';
import argon2 from 'argon2';

import schemaFilePath from '../src/data/schema';
import tokenConfig from '../src/config/tokenConfig';

import { Book, PasswordUserModel, TokenUser } from '../src/models';
import AuthService from '../src/services/AuthService';

const prepareDi = function({ eventsLogger, diLogger, mysqlDumpLogger, mysqlReqForDumpLogger, mysqlReqLogger }) {

  const events = {
    emit(...params) {
      eventsLogger.log(params);
    },
  };

  const envVarNames = {
    host: 'TEST_DB_HOST',
    user: 'TEST_DB_USER',
    password: 'TEST_DB_PASSWORD',
    database: 'TEST_DB_NAME',
  };

  const injectionDict = {
    'mysql': {
      instance: mysql,
      async onTestsFinished({serviceLocator, params}) {
      },
    },
    'fake-users-with-id': {
      instance: [
        {
          ID: '23',
          username: 'Al',
          email: 'a@gmail.com',
          plainPassword: 'password',
          badPassword: 'bad-password',
          cryptedPassword: 'crypted',
        },
        {
          ID: '15',
          username: 'Bob',
          email: 'b@gmail.com',
          plainPassword: 'password',
          badPassword: 'bad-password',
          cryptedPassword: 'crypted',
        },
      ],
    },

    'fake-users': {
      instance: [
        {
          username: 'Al',
          email: 'al@gmail.com',
          plainPassword: 'password',
          badPassword: 'bad-password',
          cryptedPassword: 'crypted',
        },
        {
          username: 'Bob',
          email: 'bob@gmail.com',
          plainPassword: 'password',
          badPassword: 'bad-password',
          cryptedPassword: 'crypted',
        },
        {
          username: 'Carmen',
          email: 'carmen@gmail.com',
          plainPassword: 'password',
          badPassword: 'bad-password',
          cryptedPassword: 'crypted',
        },
        {
          username: 'Dan',
          email: 'dan@gmail.com',
          plainPassword: 'password',
          badPassword: 'bad-password',
          cryptedPassword: 'crypted',
        },
        {
          username: 'Emilio',
          email: 'emilio@gmail.com',
          plainPassword: 'password',
          badPassword: 'bad-password',
          cryptedPassword: 'crypted',
        },
      ],
    },

    'MysqlReqTestForDump': {
      constructible: MysqlInstantiatableReq,
      deps: {
        adapter: mysql,
        logger: mysqlReqForDumpLogger,
        connectionConfig: {
          ...MysqlInstantiatableReq.extractConfigFromEnv(process.env, envVarNames),
          multipleStatements: true,
        },
      },
      async after({me, serviceLocator}) {
        await me.connect();
      },
      async onTestsFinished({serviceLocator, params}) {
        await (await serviceLocator.get('MysqlReqTestForDump')).removeConnection();
      },
    },

    'MysqlReqTest': {
      constructible: MysqlInstantiatableReq,
      deps: {
        adapter: mysql,
        logger: mysqlReqLogger,
        connectionConfig: {
          ...MysqlInstantiatableReq.extractConfigFromEnv(process.env, envVarNames),
          multipleStatements: false,
        },
      },
      async after({me, serviceLocator}) {
        await me.connect();
      },
      async onTestsFinished({serviceLocator, params}) {
        await (await serviceLocator.get('MysqlReqTest')).disconnect();
      }
    },

    'MysqlDump': {
      injectable: MysqlDump,
      deps: {
        logger: mysqlDumpLogger,
        readFileSync,
        existsSync
      },
      locateDeps: {
        requestor: 'MysqlReqTestForDump'
      },
    },

    'emptyEmptyStorageTables': {
      instance: async function({serviceLocator}) {
        try {
          const me = await serviceLocator.get('MysqlDump');
          await me.executeSqlFileOnExistingConnection({ filePath: schemaFilePath, disconnectOnFinish: false, });
        } catch (err) {
          console.log('Building database tables error:', err);
        }
      },
    },

    'authService': {
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

    'Book': {
      injectable: Book,
      locateDeps: { requestor: 'MysqlReqTest' },
    },

    'PasswordUserModel': {
      injectable: PasswordUserModel,
      locateDeps: { requestor: 'MysqlReqTest' },
    },
  };

  const di = new DiContainer({ logger: diLogger, load: injectionDict });
  return di;
};

chai.use(chaiAsPromised);

const muteLogger = new Logger({log: false, debug: false});
const di = prepareDi({
  eventsLogger: muteLogger,
  diLogger: muteLogger,
  mysqlDumpLogger: muteLogger,
  mysqlReqForDumpLogger: muteLogger,
  mysqlReqLogger: muteLogger
});

const tablesBootstraper = function(di) {
  return async function (where) {
    where = where || 'nowhere';
    await di.loadAll();
    const emptyEmptyStorageTables = await di.get('emptyEmptyStorageTables');
    await emptyEmptyStorageTables({ serviceLocator: di });
    return true;
  };
};

const bootstrap = tablesBootstraper(di);

export { di, bootstrap } ;
export default DiContainer;
