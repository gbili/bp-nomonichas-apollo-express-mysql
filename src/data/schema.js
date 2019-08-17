import 'dotenv/config';
import { readFileSync, existsSync } from 'fs';
import logger from 'saylo';
import DiContainer from 'di-why';
import mysql from 'mysql';
import { MysqlInstantiatableReq, MysqlDump } from 'mysql-oh-wait';

const schemaFilePath = `${__dirname}/schema.sql`;

if ((process.env.NODE_ENV === 'npmscript')) {
  const envVarNames = {
    host: 'DB_HOST',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_NAME',
  };
  const di = new DiContainer({
    load: {
      'MysqlReq': {
        constructible: MysqlInstantiatableReq,
        deps: {
          adapter: mysql,
          logger,
          connectionConfig: {
            ...MysqlInstantiatableReq.extractConfigFromEnv(process.env, envVarNames),
            multipleStatements: true,
          },
        },
        async after({me, serviceLocator}) {
          await me.connect();
        },
      },

      'MysqlDump': {
        injectable: MysqlDump,
        deps: {
          logger: logger,
          readFileSync,
          existsSync
        },
        locateDeps: {
          requestor: 'MysqlReq'
        },
      },
    },
  });

  (async function () {
    await di.loadAll();
    await (await di.get('MysqlDump')).executeSqlFileOnExistingConnection({filePath: schemaFilePath, disconnectOnFinish: true});
  })();
}

const undumpSchema = async function() {
  logger.log('Undumping Schema');
  await MysqlDump.executeSqlFile({filePath: schemaFilePath, disconnectOnFinish: true});
};

export { undumpSchema, schemaFilePath };
export default schemaFilePath;
