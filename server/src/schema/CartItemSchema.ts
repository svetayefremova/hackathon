import {gql} from "apollo-server-express";

const cartItemTypeDefs = gql`
  type CartItem {
    id: String!
    product: Product!
    quantity: Int!
    addedAt: Date!
  }
`;

export default cartItemTypeDefs;
