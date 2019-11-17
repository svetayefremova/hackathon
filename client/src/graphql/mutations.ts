import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      id
      email
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      email
      username
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
