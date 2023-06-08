import { gql } from 'apollo-server-express';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
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

export const SAVE_BOOK = gql`
  mutation savedBook(
    $bookId: String!
    $authors: [String!]
    $description: String!
    $image: String
    $link: String
    $title: String!
  ) {
    savedBook(
      bookId: $bookId
      authors: $authors
      description: $description
      image: $image
      link: $link
      title: $title
    ) {
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

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;
