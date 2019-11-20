import {ApolloError} from "apollo-server-express";
import bcrypt from "bcryptjs";
import {IResolvers} from "graphql-tools";

import {ErrorCode} from "../types";
import User from "./model";

const resolvers: IResolvers = {
  Query: {
    currentUser: (_, {}, context) => context.getUser(),

    users: async (_, {limit, offset}) => {
      const users: any = await User.find()
        .limit(limit)
        .skip(offset);

      return users.map(user => user.toObject());
    },

    userById: async (_, {id}) => {
      const user: any = await User.findById(id);

      if (user) {
        return user.toObject();
      }
    },
  },

  Mutation: {
    signup: async (_, {input}, context) => {
      let user: any = await User.findOne({
        email: input.email,
      });

      if (user && user.social && user.social.facebookProvider) {
        throw new ApolloError(
          "You already have an account using on Facebook. To avoid creating multiple accounts, please log in with Facebook.",
          ErrorCode.registeredWithSocial,
        );
      }

      if (user) {
        throw new Error("User with this email already exists");
      }

      const hashedPassword: string = await bcrypt.hash(input.password, 10);

      user = await User.create({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });

      context.login(user);
      return user.toObject();
    },

    logout: (_, {}, context) => context.logout(),

    login: async (_, {input}, context) => {
      const {user}: {user: any} = await context.authenticate("graphql-local", {
        email: input.email,
      });

      if (
        !input.password &&
        user &&
        user.social &&
        user.social.facebookProvider
      ) {
        throw new ApolloError(
          "You are using Facebook to login. Please continue to log in with Facebook.",
          ErrorCode.registeredWithSocial,
        );
      }

      const isValidPassword: boolean = await bcrypt.compare(
        input.password,
        user.password,
      );

      if (!isValidPassword) {
        throw new Error("Email and password don't match.");
      }

      context.login(user);
      return user.toObject();
    },

    loginWithFacebook: async (_, {input: {accessToken}}, context) => {
      context.req.body = {
        ...context.req.body,
        access_token: accessToken,
      };

      const {user}: {user: any} = await context.authenticate("facebook-token");

      context.login(user);
      return user.toObject();
    },
  },
};

export default resolvers;
