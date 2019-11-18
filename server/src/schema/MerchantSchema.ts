import {gql} from "apollo-server-express";

const merchantTypeDefs = gql`
  type Merchant {
    id: String!
    name: String
    logo: String
    brands: [String]
    commissionFee: String
    companyDescription: String
    contactEmail: String
    phone: String
    address: String
    dateCreated: String
    publishedState: Boolean
    publishedDate: String
    publishedBy: User
    products: [Product]
  }

  extend type Query {
    merchantById(id: String!): Merchant
    merchants: [Merchant]
  }
`;

export default merchantTypeDefs;
