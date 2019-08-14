import mysql from 'mysql';
import { MysqlInstantiatableReq } from 'mysql-oh-wait';

export default {
  constructible: MysqlInstantiatableReq,
  deps: {
    adapter: mysql,
    connectionConfig: {
      multipleStatements: false,
      ...MysqlInstantiatableReq.extractConfigFromEnv(process.env),
    }
  },
  locateDeps: {
    logger: 'logger',
  },
  after: ({ me }) => {
    me.connect();
  },
};
