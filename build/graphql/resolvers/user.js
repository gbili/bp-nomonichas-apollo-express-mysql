"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const resolver = {
  Query: {
    // TODO remove this, it was just to verify that middleware was passing token and authService properly, and it works
    getLoggedInUser: async (_, __, {
      authService,
      token
    }) => {
      let tokenUser = null;

      try {
        tokenUser = await authService.authenticate({
          token
        });
      } catch (err) {
        throw err;
      }

      return tokenUser;
    }
  },
  Mutation: {
    registerUser: async (_, {
      input
    }, {
      authService,
      templateStatusMessages
    }) => {
      let user = null;

      try {
        user = await authService.register(input);
      } catch (err) {
        throw err;
      }

      const status = user && 'SUCCESS' || 'FAIL';
      const message = templateStatusMessages['USER_REGISTER'][status];
      return {
        status,
        message
      };
    },
    loginUserWithEmail: async (_, {
      input
    }, {
      authService
    }) => {
      let tokenUser = null;

      try {
        tokenUser = await authService.authenticate({
          loginInput: input
        });
      } catch (err) {
        throw err;
      }

      return tokenUser;
    },
    loginUserWithUsername: async (_, {
      input
    }, {
      authService
    }) => {
      let tokenUser = null;

      try {
        tokenUser = await authService.authenticate({
          loginInput: input
        });
      } catch (err) {
        throw err;
      }

      return tokenUser;
    }
  }
};
var _default = resolver;
exports.default = _default;