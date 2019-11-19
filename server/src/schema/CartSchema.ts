import {gql} from "apollo-server-express";

const cartTypeDefs = gql`
  type Cart {
    id: String!
    state: String!
    user: User
    deviceToken: String
    items: [CartItem]
    createdAt: Date!
    lastModifiedAt: Date!
  }

  input AddProductToCartInput {
    productId: String!
    quantity: Int!
    deviceToken: String
  }

  input RemoveItemFromCartInput {
    itemId: String!
    deviceToken: String
  }

  extend type Query {
    currentCart: Cart
  }

  extend type Mutation {
    addProductToCart(input: AddProductToCartInput!): Product
    removeItemFromCart(input: RemoveItemFromCartInput): String
  }
`;

export default cartTypeDefs;
