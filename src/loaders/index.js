import 'dotenv/config';
import { Logger } from 'saylo';
import DiContainer from 'di-why';

import logger from './logger';
import events from './events';
import PasswordUserModel from './PasswordUserModel';
import apolloServer from './apolloServer';
import apolloContext from './apolloContext';
import authService from './authService';
import mysqlReq from './mysqlReq';
import appConfig from './appConfig';
import app from './app';
import s3Config from './s3Config';
import s3Wrapper from './s3Wrapper';
import cloudFrontSignConfig from './cloudFrontSignConfig';
import cloudFrontSignWrapper from './cloudFrontSignWrapper';
import urlSignService from './urlSignService';
import FileModel from './FileModel';
import fileService from './fileService';
import mimeTypesConfig from './mimeTypesConfig';
import getExpirationTime from './getExpirationTime';

const injectionDict = {
  logger,
  events,
  PasswordUserModel,
  apolloServer,
  apolloContext,
  authService,
  mysqlReq,
  appConfig,
  app,
  s3Config,
  s3Wrapper,
  cloudFrontSignConfig,
  cloudFrontSignWrapper,
  urlSignService,
  FileModel,
  fileService,
  mimeTypesConfig,
  getExpirationTime,
};

const di = new DiContainer({ logger: new Logger({log: false, debug: false}), load: injectionDict });

export default di;
