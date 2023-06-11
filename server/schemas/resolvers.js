const { User } = require('../models');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    currentUser: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('Not authenticated');
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new UserInputError('Username or email already exists');
        }
        throw new Error('Failed to create user');
      }
    },
    savedBook: async (parent, args, context) => {
      if (context.user) {
        try {
          const { bookId, authors, description, image, link, title } = args;
          const user = await User.findById(context.user._id);
          const newBook = {
            bookId,
            authors,
            description,
            image,
            link,
            title
          };

          user.savedBooks.push(newBook);

          await user.save();

          return user;
        } catch (err) {
          throw new Error('Failed to save book');
        }
      } else {
        throw new AuthenticationError('Not authenticated');
      }
    },
    removeBook: async (parent, args, context) => {
      // Add your implementation to remove a book from a user here
    },
    login: async (parent, { email, password }, { req }) => {
      try {
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
      } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new UserInputError('Username or email already exists');
        }
        throw new Error('Failed to sign up user');
      }
    },
  },
};

module.exports = resolvers;
