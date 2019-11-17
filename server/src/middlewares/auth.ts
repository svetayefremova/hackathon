import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import {GraphQLLocalStrategy} from "graphql-passport";
import moment from "moment";
import passport from "passport";
import FacebookTokenStrategy from "passport-facebook-token";
import uuid from "uuid/v4";

import User, {UserRole} from "../models/UserModel";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const app = express();

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const matchingUser = await User.findOne({
      email,
    });

    const error = matchingUser
      ? null
      : new Error("User with this email doesn't exist");

    done(error, matchingUser);
  }),
);

const FacebookTokenStrategyCallback = async (
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  let registeredUser = await User.findOne({
    facebookId: profile.id,
  });

  if (!registeredUser) {
    registeredUser = await User.create({
      username: profile.displayName,
      email: profile.emails[0].value,
      role: UserRole.user,
      facebookId: profile.id,
      createdAt: moment.utc().unix(),
      updatedAt: moment.utc().unix(),
    });
  }

  done(null, registeredUser);
};

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_APP_SECRET,
    },
    FacebookTokenStrategyCallback,
  ),
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
