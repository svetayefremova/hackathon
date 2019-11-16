import { ApolloServer } from "apollo-server-express";
import express from "express";
import Mongoose from "mongoose";

import resolvers from "./resolvers";
import typeDefs from "./schema";
import seed from "./seed";

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
const PORT = 8080;

server.applyMiddleware({app});

Mongoose.Promise = global.Promise;
Mongoose.connect(
  "mongodb://localhost/vanhack-bonsai",
  {useUnifiedTopology: true, useNewUrlParser: true},
  err => {
    if (err) {
      return err;
    }
  },
);

seed();

app.listen(PORT, () =>
  console.log(
    `GraphQL Server is now running on http://localhost:${PORT}/graphql`,
  ),
);
