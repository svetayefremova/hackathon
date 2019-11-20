import {gql} from "apollo-server-express";

const typeDefs = gql`
  type CartItem {
    id: String!
    product: Product!
    quantity: Int!
    addedAt: Date!
  }
`;

export default typeDefs;
