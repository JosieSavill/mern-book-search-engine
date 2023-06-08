import { gql } from 'apollo-server-express';

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
      savedBooks {
        _id
        name
        authors
        bookId
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedBooks {
        _id
        name
        authors
        bookId
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      username
      email
      savedBooks {
        _id
        name
        authors
        bookId
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;
