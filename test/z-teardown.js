import { expect } from 'chai';
import DiContainer from './bootstrap';

describe('Global teardown', function() {

  it('tears down properly', async function () {
    const poststrapped = true;
    try {
      const dis = DiContainer.getContainers();
      for (let di of dis) {
        await di.emit('onTestsFinished', 'param');
      }
    } catch (err) {
      console.log('Teardown Error:', err);
    }
    expect(poststrapped).to.be.equal(true);
  });

});
