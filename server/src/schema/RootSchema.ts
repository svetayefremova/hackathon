import {gql} from "apollo-server-express";

const rootTypeDefs = gql`
  scalar Date

  type Query

  type Mutation

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default rootTypeDefs;
