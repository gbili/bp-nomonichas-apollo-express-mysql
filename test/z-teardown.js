import { expect } from 'chai';
import { MysqlReq } from 'mysql-oh-wait';

let poststrapped = false;
describe('Global teardown', function() {

  before(async () => { 
    poststrapped = true;
    try {
      await MysqlReq.disconnect();
    } catch (err) {
      console.log('Teardown Error:', err);
    }
  });

  it('tears down properly', function () {
    expect(poststrapped).to.be.equal(true);
  });

});
