import {gql} from "apollo-server-express";

const productTypeDefs = gql`
  type Product {
    id: String!
    name: String!
    belongsToBrand: Int!
    description: String
    price: Float!
    color: String
    size: String!
    quantity: Int!
    image: String
    merchant: Merchant!
  }

  extend type Query {
    productById(id: String!): Product
    products(offset: Int, limit: Int): [Product]
  }
`;

export default productTypeDefs;
