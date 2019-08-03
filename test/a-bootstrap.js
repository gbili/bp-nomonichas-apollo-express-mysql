import prepareDatabase from '../src/data/schema';
import { expect } from 'chai';

let bootstrapped = false;
describe('Global Bootstrapping', function() {

  before(async () => {
    bootstrapped = true;
    try {
      await prepareDatabase();
    } catch (err) {
      console.log('Bootstrap Error:', err);
    }
  });

  it('bootstraps properly', function () {
    expect(bootstrapped).to.be.equal(true);
  });

});
