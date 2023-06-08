const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

// added const signtoken from mern 21:
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Add your query resolvers here
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    currentUser: async (parent, args, context) => {
      // Add your implementation to retrieve the current user here
    },
  },
  Mutation: {
    // Add your mutation resolvers here
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    savedBook: async (parent, args, context) => {
      // Add your implementation to save a book for a user here
    },
    removeBook: async (parent, args, context) => {
      // Add your implementation to remove a book from a user here
    },
    login: async (parent, { email, password }, { req }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
