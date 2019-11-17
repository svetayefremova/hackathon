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
  query users($first: Int, $skip: Int) {
    users(first: $first, skip: $skip) {
      id
      username
      email
    }
  }
`;
