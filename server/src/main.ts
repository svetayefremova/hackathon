import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {GraphQLDateTime} from "graphql-iso-date";
import {buildContext} from "graphql-passport";
import {merge} from "lodash";
import Mongoose from "mongoose";

import auth from "./middlewares/auth";
import seed from "./seed";

import User from "./models/UserModel";

import cartResolver from "./resolvers/CartResolver";
import merchantResolver from "./resolvers/MerchantResolver";
import productResolver from "./resolvers/ProductResolver";
import userResolver from "./resolvers/UserResolver";

import cartItemTypeDefs from "./schema/CartItemSchema";
import cartTypeDefs from "./schema/CartSchema";
import merchantTypeDefs from "./schema/MerchantSchema";
import productTypeDefs from "./schema/ProductSchema";
import rootTypeDefs from "./schema/RootSchema";
import userTypeDefs from "./schema/UserSchema";

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
    productTypeDefs,
    merchantTypeDefs,
    cartItemTypeDefs,
    cartTypeDefs,
    userTypeDefs,
  ],
  resolvers: merge(
    customScalarResolver,
    merchantResolver,
    productResolver,
    cartResolver,
    userResolver,
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
