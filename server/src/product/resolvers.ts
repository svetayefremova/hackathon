import {IResolvers} from "graphql-tools";

import Product from "./model";

const resolvers: IResolvers = {
  Query: {
    productById: async (_, {id}) => {
      const product: any = await Product.findById(id);

      if (product) {
        return product.toObject();
      }
    },

    products: async (_, {limit, offset}) => {
      const products = await Product.find()
        .limit(limit)
        .skip(offset)
        .populate("merchant");

      if (products) {
        return products.map(product => product.toObject());
      }
    },
  },
};

export default resolvers;
