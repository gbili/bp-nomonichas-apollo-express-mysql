import { readFileSync } from 'fs';
import { MysqlDump } from 'mysql-oh-wait';
import logger from 'saylo';

const schemaFilePath = `${__dirname}/schema.sql`;
const undumpSchema = async function() {
  logger.log('Undumping Schema');
  await MysqlDump.executeSqlFile({filePath: schemaFilePath, disconnectOnFinish: true});
};

(process.env.NODE_ENV === 'npmscript') && (async () => await undumpSchema())();

export { undumpSchema, schemaFilePath };
export default schemaFilePath;
