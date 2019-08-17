"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const {
  AWS_CLOUDFRONT_ACCESS_KEY_ID,
  AWS_CLOUDFRONT_PRIVATE_KEY,
  AWS_CLOUDFRONT_DOMAIN
} = process.env;
const requiredConfig = {
  AWS_CLOUDFRONT_ACCESS_KEY_ID,
  AWS_CLOUDFRONT_PRIVATE_KEY,
  AWS_CLOUDFRONT_DOMAIN
};
const missingConfig = Object.values(requiredConfig).filter(c => c === undefined);

if (missingConfig.length > 0) {
  throw new Error('Missing some AWS env vars, you must set: ' + Object.keys(requiredConfig).join(', '));
}

var _default = {
  scheme: 'https',
  privateKeyString: AWS_CLOUDFRONT_PRIVATE_KEY,
  keypairId: AWS_CLOUDFRONT_ACCESS_KEY_ID,
  domain: AWS_CLOUDFRONT_DOMAIN
};
exports.default = _default;