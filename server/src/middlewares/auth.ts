import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import {GraphQLLocalStrategy} from "graphql-passport";
import passport from "passport";
import uuid from "uuid/v4";

import User from "../models/UserModel";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

passport.use(
  new GraphQLLocalStrategy(async (email, done) => {
    const matchingUser = await User.findOne({
      email,
    });
    const error = matchingUser
      ? null
      : new Error("User with this email doesn't exist");
    done(error, matchingUser);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use(
  session({
    genid: () => uuid(),
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    // use for production environment
    // cookie: { secure: true }
  }),
);

app.use(passport.initialize());
app.use(passport.session());

export default app;
