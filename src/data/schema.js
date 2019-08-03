import 'dotenv/config';
import { readFileSync } from 'fs';
import MysqlReq from '../utils/MysqlReq';
import logger from '../utils/logger';

logger.log('shema.js');
const executeSchemaOntoExistingConnection = async function () {
  logger.log('executeSchemaOntoExistingConnection');
  await MysqlReq.query({
    sql: readFileSync(`${__dirname}/schema.sql`, 'utf-8'),
  });
};

if (process.env.NODE_ENV === 'npmscript') {
  logger.log('npmscript');
  (async function() {
    MysqlReq.configureConnection({multipleStatements: true});
    await executeSchemaOntoExistingConnection();
    MysqlReq.disconnect();
  })();
}

async function prepareDatabase() {
  const config = {};
  if (process.env.TEST_DB_HOST) {
    config.host = process.env.TEST_DB_HOST;
  }
  if (process.env.TEST_DB_USER) {
    config.user = process.env.TEST_DB_USER;
  }
  if (process.env.TEST_DB_NAME) {
    config.database = process.env.TEST_DB_NAME;
  }
  if (process.env.TEST_DB_PASSWORD) {
    config.password = process.env.TEST_DB_PASSWORD;
  }
  MysqlReq.configureConnection({
    multipleStatements: true,
    ...config
  });
  await executeSchemaOntoExistingConnection();
}

export default prepareDatabase;
