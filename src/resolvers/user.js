const resolver = {
  Query: {
    getLoggedInUser: async (_, __, { loggedInUser, User }) => {
      return loggedInUser;
    },
  },

  Mutation: {
    registerUser: async (_, { input }, { User }) => {
      console.log('registering user resolver');
      let user;
      try {
      user = await User.register(input);
      console.log(user);
      } catch (err) {
        throw err;
      }
      return user;
    },
  },
};

export default resolver;
