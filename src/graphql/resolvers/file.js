const resolver = {
  Query: {
    files: async (_, { input }, { authService, token, fileService, models }) => {
      const tokenUser = await authService.authenticate({ token });
      if (!tokenUser) {
        throw new Error('Authentication required for this operation');
      }
      const user = tokenUser.userInstance;

      const downloadableFiles = await fileService.getAllUserFiles({ user });
      return downloadableFiles;
    },
  },

  Mutation: {
    // parent refers to the parent resolver when
    // there are nested resolvers (not used here)
    generateUploadableFile: async (parent, { input }, { authService, token, fileService, models }) => {
      const tokenUser = await authService.authenticate({ token });
      if (!tokenUser) {
        throw new Error('Authentication required for this operation');
      }
      const user = tokenUser.userInstance;

      const { filename, contentType } = input;
      return await fileService.generateUploadableFile({ filename, contentType, user });
    },
  },
};

export default resolver;
