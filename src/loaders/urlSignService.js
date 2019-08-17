import UrlSignService from '../services/UrlSignService';

export default {
  constructible: UrlSignService,
  locateDeps: {
    uploadWrapper: 's3Wrapper',
    downloadWrapper: 'cloudFrontSignWrapper',
  },
};
