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

export const LOGIN_WITH_FACEBOOK = gql`
  mutation loginWithFacebook($input: AuthInput!) {
    loginWithFacebook(input: $input) {
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
