import { expect } from 'chai';
import DiContainer from '../src/DiContainer';

let poststrapped = false;
describe('Global teardown', function() {

  before(async () => { 
    poststrapped = true;
    try {
      (await DiContainer.get('MysqlReqTestForDump')).disconnect();
      (await DiContainer.get('MysqlReqTest')).disconnect();
    } catch (err) {
      console.log('Teardown Error:', err);
    }
  });

  it('tears down properly', function () {
    expect(poststrapped).to.be.equal(true);
  });

});
