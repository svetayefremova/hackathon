import {find, remove} from "lodash";

import Cart from "../models/CartModel";
import Product from "../models/ProductModel";

const cartResolver = {
  Query: {
    cart: async (_, {userId}) => {
      // TODO: adjust userId here available from session
      const cart: any = await Cart.findOne({user: userId, state: "active"})
        .populate("user")
        .exec()
        .then(userModel => {
          console.log(userModel);
        });

      if (cart) {
        return cart.toObject();
      }
    },

    carts: async () => {
      const carts: any = await Cart.find();

      if (carts) {
        carts.forEach(async cart => {
          cart.items = await Promise.all([
            cart.items.map(async item => {
              const product: any = await Product.findById(item.product);

              if (product) {
                item.product = product.toObject();

                return item;
              } else {
                // TODO: remove product from cart if there is no product
                return item;
              }
            }),
          ]);
        });

        return carts.map(cart => cart.toObject());
      }
    },
  },

  Mutation: {
    addItemToCart: async (_, {productId, quantity, userId}) => {
      const product: any = await Product.findById(productId);

      if (product) {
        // TODO: adjust userId here available from session
        let cart: any = await Cart.findOne({user: userId, state: "active"});

        if (cart) {
          const item: any = await find(cart.items, {product: productId});

          if (item) {
            // prevent adding quantities over stock quantity of current product
            if (quantity > product.quantity) {
              // TODO: add some meanigful error message
              return null;
            }

            item.quantity = quantity;
          } else {
            cart.items.push({
              product: productId,
              quantity,
            });
          }

          cart.lastModifiedAt = new Date().toISOString();
          await cart.save();
        } else {
          // create new cart document for current user logged in
          cart = await Cart.create({
            // TODO: adjust userId here available from session
            user: userId,
            items: [
              {
                product: productId,
                quantity,
              },
            ],
          });
        }

        return cart.toObject();
      }
    },

    removeItemFromCart: async (_, {productId, userId}) => {
      // TODO: adjust userId here available from session
      const cart: any = await Cart.findOne({user: userId, state: "active"});

      if (cart) {
        const product: any = await Product.findById(productId);
        const item: any = await find(cart.items, {product: productId});

        // TODO: if there is no such product any more, remove the item completely
        if (product && item) {
          await remove(cart.items, elem => {
            return elem._id === item._id;
          });

          cart.lastModifiedAt = new Date().toISOString();
          cart.markModified("items");

          await cart.save();
        }

        return cart.toObject();
      }
    },

    resetCart: async (_, {userId}) => {
      // TODO: adjust userId here available from session
      const cart: any = await Cart.findOne({user: userId, state: "active"});

      if (cart) {
        cart.remove();

        return cart._id;
      }
    },
  },
};

export default cartResolver;
