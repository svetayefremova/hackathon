import express from "express";
import session from "express-session";
import {GraphQLLocalStrategy} from "graphql-passport";
import passport from "passport";
import uuid from "uuid/v4";

import User from "../models/UserModel";

const app = express();
const SECRET_KEY = "secret"; // hard-coded; TODO move to .env

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const matchingUser = await User.findOne({
      email,
    });
    const error = matchingUser
      ? null
      : new Error("User with email doesn't exist");
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
