import 'dotenv/config';

import chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import mysql from 'mysql';
import logger from 'saylo';
import DiContainer from 'di-why';
import { MysqlDump, MysqlInstantiatableReq } from 'mysql-oh-wait';
import { readFileSync, existsSync } from 'fs';
import argon2 from 'argon2';

import schemaFilePath from '../src/data/schema';

import { UserRecord } from '../src/models/User';
import { Book, User } from '../src/models';

const envVarNames = {
  host: 'TEST_DB_HOST',
  user: 'TEST_DB_USER',
  password: 'TEST_DB_PASSWORD',
  database: 'TEST_DB_NAME',
};

const injectionDict = {
  'MysqlReqTestForDump': {
    constructible: MysqlInstantiatableReq,
    deps: {
      adapter: mysql,
      logger,
      connectionConfig: {
        ...MysqlInstantiatableReq.extractConfigFromEnv(process.env, envVarNames),
        multipleStatements: true,
      },
    },
  },
  'MysqlReqTest': {
    constructible: MysqlInstantiatableReq,
    deps: {
      logger,
      adapter: mysql,
      env: process.env,
      connectionConfig: {
        ...MysqlInstantiatableReq.extractConfigFromEnv(process.env, envVarNames),
        multipleStatements: false,
      },
    },
  },
  'MysqlDmp': {
    injectable: MysqlDump,
    deps: { logger, readFileSync, existsSync },
    locateDeps: { requestor: 'MysqlReqTestForDump' },
    after: async function({ me, serviceLocator }) {
      try {
        await me.executeSqlFileOnExistingConnection({ filePath: schemaFilePath, disconnectOnFinish: true, });
      } catch (err) {
        console.log('Bootstrap Error err:', err);
      }
    },
  },
  'Book': {
    injectable: Book,
    locateDeps: { requestor: 'MysqlReqTest' },
  },
  'UserRecord': {
    injectable: UserRecord,
    deps: { hasher: argon2 },
    locateDeps: { requestor: 'MysqlReqTest' },
  },
};

let bootstrapped = false;
describe('Global Bootstrapping', function() {

  before(async () => {
    bootstrapped = true;

    chai.use(chaiAsPromised);

    const di = new DiContainer({ logger, load: injectionDict });
    await di.loadAll();
  });

  it('bootstraps properly', function () {
    expect(bootstrapped).to.be.equal(true);
  });

});
