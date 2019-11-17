import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {buildContext} from "graphql-passport";
import Mongoose from "mongoose";

import auth from "./middlewares/auth";
import User from "./models/UserModel";
import resolvers from "./resolvers";
import typeDefs from "./schema";
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
  typeDefs,
  resolvers,
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
