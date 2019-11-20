import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {GraphQLDateTime} from "graphql-iso-date";
import {buildContext} from "graphql-passport";
import {merge} from "lodash";
import Mongoose from "mongoose";

import auth from "./authentication/auth";
import seed from "./seed";

import cart from "./cart";
import cartItem from "./cart/item";
import merchant from "./merchant";
import product from "./product";
import user from "./user";
import User from "./user/model";

import rootTypeDefs from "./rootTypeDefs";

dotenv.config();

Mongoose.Promise = global.Promise;
Mongoose.connect(
  process.env.MONGODB_URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) {
      return err;
    }
  },
);

// TODO: put me into ./resolvers/index.ts
const customScalarResolver = {
  Date: GraphQLDateTime,
};

const server = new ApolloServer({
  typeDefs: [
    rootTypeDefs,
    product.typeDefs,
    merchant.typeDefs,
    cartItem.typeDefs,
    cart.typeDefs,
    user.typeDefs,
  ],
  resolvers: merge(
    customScalarResolver,
    merchant.resolvers,
    product.resolvers,
    cart.resolvers,
    user.resolvers,
  ),
  context: ({req, res}) => buildContext({req, res, User}),
});

const app = express();

app.use(cors());
app.use(auth);

server.applyMiddleware({app});

seed();

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () =>
  console.log(
    `GraphQL Server is now running on http://${HOST}:${PORT}/graphql`,
  ),
);
