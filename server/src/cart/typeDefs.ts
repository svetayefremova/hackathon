import {gql} from "apollo-server-express";

const cartTypeDefs = gql`
  type Cart {
    id: String!
    state: String!
    user: User
    deviceId: String
    items: [CartItem]
    createdAt: Date!
    lastModifiedAt: Date!
  }

  input AddProductToCartInput {
    productId: String!
    quantity: Int!
  }

  input RemoveItemFromCartInput {
    itemId: String!
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
