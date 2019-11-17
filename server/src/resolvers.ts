import bcrypt from "bcryptjs";
import {IResolvers} from "graphql-tools";
import moment from "moment";

import Product from "./models/ProductModel";
import User, {IUser, UserRole} from "./models/UserModel";

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

      const isValid = await bcrypt.compare(input.password, user.password);

      if (!isValid) {
        throw new Error("Email and password don't match");
      }

      context.login(user);
      return user;
    },
  },
};

export default resolvers;
