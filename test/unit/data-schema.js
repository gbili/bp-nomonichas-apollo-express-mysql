import 'dotenv/config';
import logger from 'saylo';
import { undumpSchema } from '../../src/data/schema';
import { expect } from 'chai';

describe('data/schema.js', function () {
  describe(`undumpSchema()`, function() {
    it('should not be rejected', async function() {
      expect(undumpSchema()).to.eventually.not.be.rejected;
    });
  });
});

