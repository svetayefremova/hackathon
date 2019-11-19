import dotenv from "dotenv";
import moment from "moment";

import Merchant from "./models/MerchantModel";
import Product from "./models/ProductModel";

import {merchants} from "./mocks/mockMerchantData";

dotenv.config();

if (process.env.DEBUG) {
  Merchant.collection.drop();
  Product.collection.drop();
}

const seed = async () => {
  if (
    (await Merchant.countDocuments()) === 0 &&
    (await Product.countDocuments()) === 0
  ) {
    merchants.forEach(({products, ...restMerchant}) => {
      // do some adjustments to current mocked merchant data (like remove index, map guid to id)
      // delete Object.assign(restMerchant, { _id: restMerchant.guid }).guid;
      delete Object.assign(restMerchant, {id: restMerchant.guid}).guid;
      delete restMerchant.index;

      // converting iso dates w/ UTC offset to iso dates w/o offset
      restMerchant.dateCreated = moment(
        restMerchant.dateCreated.replace(" ", ""),
      ).toISOString();
      restMerchant.publishedDate = moment(
        restMerchant.publishedDate.replace(" ", ""),
      ).toISOString();

      const merchantObject = new Merchant(restMerchant);

      merchantObject.save(err => {
        console.log(
          err ||
            `Merchant ${merchantObject.name} with ID ${merchantObject.id} inserted!`,
        );
      });

      products.forEach(product => {
        // do some adjustments to current mocked prodcut data (like map id to guid, add merchant._id as ref)
        // delete Object.assign(product, { _id: product.id }).id;
        Object.assign(product, {merchant: merchantObject._id});

        const productObject = new Product(product);

        productObject.save(err => {
          console.log(
            err ||
              `Product ${productObject.name} with ID ${productObject.id} inserted!`,
          );
        });
      });
    });
  }
};

export default seed;
