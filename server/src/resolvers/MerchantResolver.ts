import {IResolvers} from "graphql-tools";

import Merchant from "../models/MerchantModel";

const merchantResolver: IResolvers = {
  Query: {
    merchantById: async (_, {id}) => {
      const merchant: any = await Merchant.findById(id);

      if (merchant) {
        return merchant.toObject();
      }
    },

    merchants: async () => {
      const merchants: any = await Merchant.find().limit(10);

      if (merchants) {
        return merchants.map(merchant => merchant.toObject());
      }
    },
  },
};

export default merchantResolver;
