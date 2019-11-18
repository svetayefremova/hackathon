import {gql} from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String
    password: String
    social: SocialProvider
    createdAt: Int
    updatedAt: Int
  }
  type Social {
    id: String
    token: String
  }
  type SocialProvider {
    facebookProvider: Social
  }
  input LoginInput {
    email: String!
    password: String
  }
  input AuthInput {
    accessToken: String
  }
  input SignupInput {
    email: String!
    password: String
    username: String
  }

  extend type Query {
    currentUser: User
    users(offset: Int, limit: Int): [User]
    userById(id: ID!): User
  }

  extend type Mutation {
    signup(input: SignupInput): User
    login(input: LoginInput): User
    loginWithFacebook(input: AuthInput): User
    logout: Boolean
  }
`;

export default userTypeDefs;
