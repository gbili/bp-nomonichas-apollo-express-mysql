"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const resolver = {
  Query: {
    getLoggedInUser: async (_, __, {
      loggedInUser,
      User
    }) => {
      return loggedInUser;
    }
  },
  Mutation: {
    registerUser: async (_, {
      input
    }, {
      User
    }) => {
      try {
        const user = await User.register(input);
        return user;
      } catch (err) {
        console.log('error', err);
        throw err;
      }
    }
  }
};
var _default = resolver;
exports.default = _default;