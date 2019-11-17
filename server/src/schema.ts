import {gql} from "apollo-server-express";

const typeDefs = gql`
  type Merchant {
    index: Int
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [String]
    name: String
    products: [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: User
    companyDescription: String
  }
  type Product {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
  }
  enum UserRole {
    admin
    user
  }
  type Social {
    id: String
    token: String
  }
  type SocialProvider {
    facebookProvider: Social
  }
  type User {
    id: ID!
    email: String!
    username: String
    password: String
    role: UserRole
    social: SocialProvider
    createdAt: Int
    updatedAt: Int
  }

  # the schema allows the following query:
  type Query {
    currentUser: User
    users(offset: Int, limit: Int): [User]
    userById(id: ID!): User
    products(offset: Int, limit: Int): [Product]
  }

  # the schema allows the following mutation:
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
    role: UserRole
  }
  type Mutation {
    signup(input: SignupInput): User
    login(input: LoginInput): User
    loginWithFacebook(input: AuthInput): User
    logout: Boolean
    editMerchant(publishedState: Boolean!): Merchant
  }
`;

export default typeDefs;
