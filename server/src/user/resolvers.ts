import {ApolloError} from "apollo-server-express";
import bcrypt from "bcryptjs";
import {IResolvers} from "graphql-tools";

import Cart, {CartState} from "../cart/model";
import {ErrorCode} from "../types";
import User from "./model";

const mergeCarts = async (user: any, deviceToken: string) => {
  // first try to find user's anonymous cart; if anonymous cart exists and user
  //  has already a cart, the two cart will be merged as convenient feature;
  //  otherwise the anonymous cart of the user will be converted to a user cart
  const anonymousCart: any = await Cart.findOne({
    user: null,
    state: CartState.anonymous,
    deviceToken,
  }).populate("items.product");

  if (anonymousCart) {
    // try to find user's cart if it already exists, e.g. from previous logins
    const userCart: any = await Cart.findOne({
      user: user._id,
      state: CartState.active,
    }).populate("items.product");

    if (userCart) {
      // add all items from anonymous cart to user's cart if there it exist,
      //  and remove anonymous cart afterwards

      // TODO: merge quantities of duplicate products from user and anonymous cart

      // TODO: check type of Date and not string
      userCart.lastModifiedAt = new Date().toISOString();
      userCart.items = [...userCart.items, ...anonymousCart.items];

      userCart.markModified("items");
      userCart.save();
      anonymousCart.remove();
    } else {
      anonymousCart.user = user._id;
      anonymousCart.state = CartState.active;
      anonymousCart.deviceToken = null;

      anonymousCart.save();
    }
  }
};

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

      if (user && user.social && user.social.facebookProvider.token) {
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

      const isSocialRegistered =
        user && user.social && user.social.facebookProvider;

      if (!input.password && isSocialRegistered) {
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

      await context.login(user);
      await mergeCarts(user, input.deviceToken);

      return user.toObject();
    },

    loginWithFacebook: async (
      _,
      {input: {accessToken, deviceToken}},
      context,
    ) => {
      context.req.body = {
        ...context.req.body,
        access_token: accessToken,
      };

      const {user}: {user: any} = await context.authenticate("facebook-token");

      await context.login(user);
      await mergeCarts(user, deviceToken);

      return user.toObject();
    },
  },
};

export default resolvers;
