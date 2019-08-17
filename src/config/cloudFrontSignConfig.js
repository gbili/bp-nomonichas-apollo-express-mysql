const {
  AWS_CLOUDFRONT_ACCESS_KEY_ID,
  AWS_CLOUDFRONT_PRIVATE_KEY,
  AWS_CLOUDFRONT_DOMAIN,
  FILE_URL_DOWNLOAD_TTL_IN_SECONDS,
} = process.env;

const requiredConfig = {
  AWS_CLOUDFRONT_ACCESS_KEY_ID,
  AWS_CLOUDFRONT_PRIVATE_KEY,
  AWS_CLOUDFRONT_DOMAIN,
  FILE_URL_DOWNLOAD_TTL_IN_SECONDS,
};

const missingConfig = Object.keys(requiredConfig).filter(k => typeof requiredConfig[k] === undefined);

if (missingConfig.length > 0) {
  throw new Error('Missing some AWS env vars, you must set: ' + Object.keys(requiredConfig).join(', '));
}

export default {
  scheme: 'https',
  privateKeyString: AWS_CLOUDFRONT_PRIVATE_KEY.split('\\n').join("\n"),
  keypairId: AWS_CLOUDFRONT_ACCESS_KEY_ID,
  domain: AWS_CLOUDFRONT_DOMAIN,
  secondsTTL: parseInt(FILE_URL_DOWNLOAD_TTL_IN_SECONDS), // number of seconds before it expires
};
