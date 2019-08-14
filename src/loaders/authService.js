import argon2 from 'argon2';
import AuthService from '../services/AuthService';
import { TokenUser } from '../models';
import tokenConfigGenerator from '../config/tokenConfigGenerator';

export default {
  constructible: AuthService,
  deps: {
    models: {
      TokenUser
    },
    tokenConfig: tokenConfigGenerator({ expireTokensEveryNHours: 1 }),
    hasher: argon2,
  },
  locateDeps: {
    models: {
      PasswordUserModel: 'PasswordUserModel',
    },
    events : 'events',
  },
};
