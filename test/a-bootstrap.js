import 'dotenv/config';
import schemaFilePath from '../src/data/schema';
import { MysqlDump } from 'mysql-oh-wait';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';

async function loadSchemaIntoDatabase() {
    const connectionConfig = {
      envVarNames : {
        host: 'TEST_DB_HOST',
        user: 'TEST_DB_USER',
        password: 'TEST_DB_PASSWORD',
        database: 'TEST_DB_NAME',
      },
    };
    try {
      await MysqlDump.executeSqlFile({filePath: schemaFilePath, connectionConfig, disconnectOnFinish: false});
    } catch (err) {
      console.log('Bootstrap Error:', err);
    }
}
let bootstrapped = false;
describe('Global Bootstrapping', function() {

  before(async () => {
    bootstrapped = true;

    chai.use(chaiAsPromised);

    await loadSchemaIntoDatabase();
  });

  it('bootstraps properly', function () {
    expect(bootstrapped).to.be.equal(true);
  });

});
