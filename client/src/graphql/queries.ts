import gql from "graphql-tag";

export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      username
      email
    }
  }
`;

export const USER_BY_ID = gql`
  query userById($id: ID!) {
    userById(id: $id) {
      id
      username
      email
    }
  }
`;

export const USERS = gql`
  query users($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      username
      email
    }
  }
`;

export const PRODUCTS = gql`
  query products($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset) {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`;
