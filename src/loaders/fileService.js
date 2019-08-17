import FileService from '../services/FileService';
import { File } from '../models';

export default {
  constructible: FileService,
  async before({ deps, serviceLocator }) {
    const config = await serviceLocator.get('s3Config');
    if (!config.Bucket) {
      throw new Error('fileService needs s3Config to have a Bucket entry');
    }
    deps.s3BucketName = config.Bucket;
    if (!config.fileNameMaxLength) {
      throw new Error('fileService needs s3Config to have a fileNameMaxLength entry');
    }
    deps.fileNameMaxLength = config.fileNameMaxLength;
    return deps;
  },
  deps: {
    models: {
      File,
    },
  },
  locateDeps: {
    urlSignService: 'urlSignService',
    models: {
      FileModel: 'FileModel',
    },
    mimeToFileSuffixDict: 'mimeTypesConfig',
  },
};
