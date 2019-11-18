import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {buildContext} from "graphql-passport";
import {merge} from "lodash";
import Mongoose from "mongoose";

import auth from "./middlewares/auth";
import User from "./models/UserModel";
import cartResolver from "./resolvers/CartResolver";
import merchantResolver from "./resolvers/MerchantResolver";
import productResolver from "./resolvers/ProductResolver";
import userResolver from "./resolvers/UserResolver";
import cartTypeDefs from "./schema/CartSchema";
import merchantTypeDefs from "./schema/MerchantSchema";
import productTypeDefs from "./schema/ProductSchema";
import rootTypeDefs from "./schema/RootSchema";
import userTypeDefs from "./schema/UserSchema";
import seed from "./seed";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

Mongoose.Promise = global.Promise;
Mongoose.connect(
  "mongodb://localhost/vanhack-bonsai",
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
  err => {
    if (err) {
      return err;
    }
  },
);

app.use(cors());
app.use(auth);

const server = new ApolloServer({
  typeDefs: [
    cartTypeDefs,
    rootTypeDefs,
    productTypeDefs,
    merchantTypeDefs,
    userTypeDefs,
  ],
  resolvers: merge(
    cartResolver,
    merchantResolver,
    productResolver,
    userResolver,
  ),
  context: ({req, res}) => buildContext({req, res, User}),
  playground: {
    settings: {
      "request.credentials": "same-origin",
    },
  },
});
server.applyMiddleware({app});

seed();

app.listen(PORT, () =>
  console.log(
    `GraphQL Server is now running on http://localhost:${PORT}/graphql`,
  ),
);
