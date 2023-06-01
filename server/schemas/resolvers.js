const {  User } = require('../models');
const bookSchema = require("../models/Book");

// added const signtoken from mern 21:
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        book: async () => {
            return await bookSchema.find({});
        },
        users: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
    },
    Mutation: { 
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
            // added ref mern 21: reduce friction for user, immedately signs a JSON web token and logs user in after they are created:
            const token = signToken(user);

            // added token to return ref mern 21: returns and `Auth` object that consists of the signed token and user's information: 

            return { token, user };
        },
        // added ref mern 21: 
        login: async (parent, { email, password }) => {
            // added ref mern 21: look up the user by the provided email address, since the email field is unique, we know that only one person will exist with that email:
            const user = await User.findOne({ email });

            // ref mern 21: if there is noo user with that email address, return an Autheiction error stating so:
            if(!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            // ref mern 21: if there is  a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided:
            const correctPw = await user.isCorrectpassword(password);

            // ref mer 21: if the password is incorrect, return an Authentication error stating so:
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // ref mern 21: if email and password are correct, sign user into the application with a JWT:
            const token = signToken(user);

            // ref mern 21: return an Auth object that consists of the signed token and user information:
            return { token, user };
        },
    },
    
};

module.exports = resolvers;


// model code added below for reference:

// const { Schema } = require('mongoose');

// // This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
// const bookSchema = new Schema({
//   authors: [
//     {
//       type: String,
//     },
//   ],
//   description: {
//     type: String,
//     required: true,
//   },
//   // saved book id from GoogleBooks
//   bookId: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = bookSchema;



// code from User model added below for reference:


// const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

// // import schema from Book.js
// const bookSchema = require('./Book');

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/.+@.+\..+/, 'Must use a valid email address'],
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     // set savedBooks to be an array of data that adheres to the bookSchema
//     savedBooks: [bookSchema],
//   },
//   // set this to use virtual below
//   {
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// // hash user password
// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// // custom method to compare and validate password for logging in
// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// // when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// userSchema.virtual('bookCount').get(function () {
//   return this.savedBooks.length;
// });

// const User = model('User', userSchema);

// module.exports = User;

