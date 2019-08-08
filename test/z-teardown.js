import { expect } from 'chai';
import DiContainer from 'di-why';

let poststrapped = false;
describe('Global teardown', function() {

  before(async () => { 
    poststrapped = true;
    try {
      const di = DiContainer.getLatestContainer();
      (await di.get('MysqlReqTestForDump')).disconnect();
      (await di.get('MysqlReqTest')).disconnect();
    } catch (err) {
      console.log('Teardown Error:', err);
    }
  });

  it('tears down properly', function () {
    expect(poststrapped).to.be.equal(true);
  });

});
