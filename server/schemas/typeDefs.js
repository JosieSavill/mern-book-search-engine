const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        name: String!
        authors: [String!]
        bookId: String!
        description: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        savedBooks: [Book]
        bookCount: Int
    }

    type Query {
        users: [User]
        user(username: String!): User
        currentUser: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        savedBook(
            bookId: String!
            authors: [String!]
            description: String!
            image: String
            link: String
            title: String!
        ): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
