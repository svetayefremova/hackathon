import {gql} from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: String!
    email: String!
    name: String
    password: String
    social: SocialProvider
    createdAt: Date!
    lastModifiedAt: Date!
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
    name: String
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

export default typeDefs;
