import Product from "./models/ProductModel";

const resolvers = {
  Query: {
    products: async () => await Product.find({}).limit(10),
  },
};

export default resolvers;
