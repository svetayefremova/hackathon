import {merchants} from "./mocks/mockMerchantData";
import Merchant from "./models/MerchantModel";
import Product from "./models/ProductModel";

const seed = async () => {
  if (
    (await Merchant.countDocuments()) === 0 &&
    (await Product.countDocuments()) === 0
  ) {
    merchants.forEach(({products, ...restMerchant}) => {
      const MerchantObject = new Merchant(restMerchant);
      MerchantObject.save(err => {
        if (err) {
          console.log(err);
        }
        console.log(`Merchant ${MerchantObject.name} inserted!`);
      });
      products.forEach(product => {
        const {
          belongsToBrand,
          id,
          name,
          price,
          description,
          color,
          size,
          quantity,
          image,
        } = product;
        const ProductObject = new Product({
          belongsToBrand,
          id,
          name,
          price,
          description,
          color,
          size,
          quantity,
          image,
          merchant: MerchantObject._id,
        });
        ProductObject.save(err => {
          if (err) {
            console.log(err);
          }
          console.log(`Product ${ProductObject.name} inserted!`);
        });
      });
    });
  }
};

export default seed;
