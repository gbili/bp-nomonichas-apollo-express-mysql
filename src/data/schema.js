import 'dotenv/config';
import { readFileSync } from 'fs';
import { MysqlDump } from 'mysql-oh-wait';
import logger from 'saylo';

logger.log('shema.js');

const schemaFilePath = `${__dirname}/schema.sql`;

if (process.env.NODE_ENV === 'npmscript') {
  (async function() {
    logger.log('npmscript');
    await MysqlDump.executeSqlFile({filePath: schemaFilePath, disconnectOnFinish: true});
  })();
}

export default schemaFilePath;
