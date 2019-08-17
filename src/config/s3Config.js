const {
  FILE_URL_UPLOAD_TTL_IN_SECONDS,
  AWS_IAM_USER_KEY_ID,
  AWS_IAM_USER_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
  AWS_S3_SIGNATURE_VERSION,
  AWS_S3_REGION,
  AWS_S3_ACL,
  AWS_S3_FILENAME_MAX_LENGTH,
} = process.env;

const requiredConfig = {
  FILE_URL_UPLOAD_TTL_IN_SECONDS,
  AWS_IAM_USER_KEY_ID,
  AWS_IAM_USER_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
  AWS_S3_SIGNATURE_VERSION,
  AWS_S3_REGION,
  AWS_S3_ACL,
  AWS_S3_FILENAME_MAX_LENGTH,
};

const missingConfig = Object.keys(requiredConfig).filter(k => typeof requiredConfig[k] === undefined);

if (missingConfig.length > 0) {
  throw new Error('Missing some AWS env vars, you must set: ' + Object.keys(requiredConfig).join(', '));
}

export default {
  secondsTTL: parseInt(FILE_URL_UPLOAD_TTL_IN_SECONDS),
  accessKeyId: AWS_IAM_USER_KEY_ID,
  secretAccessKey: AWS_IAM_USER_SECRET_ACCESS_KEY,
  Bucket: AWS_S3_BUCKET_NAME,
  ACL: AWS_S3_ACL,
  signatureVersion: AWS_S3_SIGNATURE_VERSION,
  region: AWS_S3_REGION,
  fileNameMaxLength: AWS_S3_FILENAME_MAX_LENGTH,
};
