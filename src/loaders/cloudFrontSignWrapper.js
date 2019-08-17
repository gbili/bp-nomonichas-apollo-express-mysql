import cloudFrontSign from 'aws-cloudfront-sign';

export default {
  factory: function({ cloudFrontSignConfig, _getExpirationTime }) {
    const { scheme, keypairId, privateKeyString, domain, secondsTTL } = cloudFrontSignConfig;
    return {
      cloudFrontSign,
      config: cloudFrontSignConfig,
      getExpirationTime() {
        return _getExpirationTime({ secondsTTL });
      },
      getUrl({ pathToObject }) {
        const options = { keypairId, privateKeyString, expireTime: this.getExpirationTime() };
        return cloudFrontSign.getSignedUrl(`${scheme}://${domain}/${pathToObject}`, options)
      },
    };
  },
  locateDeps: {
    cloudFrontSignConfig: 'cloudFrontSignConfig',
    _getExpirationTime: 'getExpirationTime',
  },
};
