import {ApolloError} from "apollo-server-express";
import bcrypt from "bcryptjs";
import {IResolvers} from "graphql-tools";
import moment from "moment";

import Product from "./models/ProductModel";
import User, {IUser, UserRole} from "./models/UserModel";

enum ErrorCode {
  registeredWithSocial = "REGISTERED_WITH_SOCIAL_ERROR",
}

const resolvers: IResolvers = {
  Query: {
    currentUser: (_, {}, context) => context.getUser(),

    users: async (_, {first, skip}) => {
      const users = await User.find()
        .limit(first)
        .skip(skip);

      return users.map(user => user.toObject());
    },

    userById: async (_, {id}) => {
      const user = await User.findById(id);

      if (user) {
        return user.toObject();
      }
    },

    products: async () => await Product.find({}).limit(10),
  },

  Mutation: {
    signup: async (_, {input}, context) => {
      let user = await User.findOne({
        email: input.email,
      });

      if (user && user.social && user.social.facebookProvider) {
        throw new ApolloError(
          "You already have an account using Facebook Login. To avoid creating multiple accounts, login with Facebook",
          ErrorCode.registeredWithSocial,
        );
      }

      if (user) {
        throw new Error("User with this email already exists");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      user = await User.create({
        username: input.username,
        email: input.email,
        password: hashedPassword,
        role: UserRole.user,
        createdAt: moment.utc().unix(),
        updatedAt: moment.utc().unix(),
      });

      context.login(user);
      return user.toObject();
    },

    logout: (_, {}, context) => context.logout(),

    login: async (_, {input}, context) => {
      const {user} = await context.authenticate("graphql-local", {
        email: input.email,
      });

      const isValidPassword = await bcrypt.compare(
        input.password,
        user.password,
      );

      if (!isValidPassword) {
        throw new Error("Email and password don't match");
      }

      context.login(user);
      return user.toObject();
    },

    loginWithFacebook: async (_, {input: {accessToken}}, context) => {
      context.req.body = {
        ...context.req.body,
        access_token: accessToken,
      };

      const {user} = await context.authenticate("facebook-token");

      context.login(user);
      return user.toObject();
    },
  },
};

export default resolvers;
