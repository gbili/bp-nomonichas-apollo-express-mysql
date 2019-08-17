import AWS from 'aws-sdk';

export default {
  factory: function({ AWS, s3Config, _getExpirationTime }) {
    const { accessKeyId, secretAccessKey, signatureVersion, region, Bucket, secondsTTL, ACL } = s3Config;

    const s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
      signatureVersion,
      region
    });

    return {
      s3,
      config: s3Config,
      getExpirationTime() {
        return _getExpirationTime({ secondsTTL });
      },
      async getUrl({ contentType, pathToObject }){
        return await s3.getSignedUrl('putObject', {
          Bucket,
          Expires: secondsTTL,
          ACL,
          Key: pathToObject,
          ContentType: contentType
        });
      },
    };
  },

  deps: {
    AWS,
  },
  locateDeps: {
    s3Config: 's3Config',
    _getExpirationTime: 'getExpirationTime',
  },
};
