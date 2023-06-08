const {  User } = require('../models');
const bookSchema = require("../models/Book");
const { AuthenticationError } = require('apollo-server-express');


// added const signtoken from mern 21:
const { signToken } = require('../utils/auth');

const resolvers = {
    
    Mutation: { 
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        
        login: async (parent, { email, password }, { req }) => {
           
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const token = signToken(user);
            
            return { token, user };
        },
    },
    
};

module.exports = resolvers;


