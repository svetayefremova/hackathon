import {gql} from "apollo-server-express";

const typeDefs = gql`
  type Merchant {
    id: String!
    name: String!
    logo: String
    brands: [String]
    commissionFee: String
    companyDescription: String
    contactEmail: String
    phone: String
    address: String
    dateCreated: Date
    publishedState: Boolean
    publishedDate: Date
    publishedBy: User
    products: [Product]
  }

  extend type Query {
    merchantById(id: String!): Merchant
    merchants: [Merchant]
  }

  extend type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
  }
`;

export default typeDefs;
