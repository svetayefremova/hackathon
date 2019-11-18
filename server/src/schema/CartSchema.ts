import {gql} from "apollo-server-express";

const cartTypeDefs = gql`
  type Item {
    product: Product
    quantity: Int
  }

  type Cart {
    id: String!
    # state: String
    user: User
    # items: [Item]
    # createdAt: Date
    # lastModifiedAt: Date
  }

  extend type Query {
    cart: Cart
    # getCartById(id: String!): Cart
    carts: [Cart]
  }

  extend type Mutation {
    addItemToCart(productId: String!, quantity: Int!): Cart
    removeItemFromCart(productId: String!): Cart
    resetCart: String!
  }
`;

export default cartTypeDefs;
