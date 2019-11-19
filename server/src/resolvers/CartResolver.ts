import {IResolvers} from "graphql-tools";
import {find, remove} from "lodash";
import {Model} from "mongoose";

import {ICartItem} from "../models/CartItemModel";
import Cart, {CartState, ICart} from "../models/CartModel";
import Product, {IProduct} from "../models/ProductModel";
import User, {IUser} from "../models/UserModel";

const cartResolver: IResolvers = {
  Query: {
    // TODO: refactor and make it anonymous ready
    currentCart: async (_, {input}, context) => {
      const user: Model<IUser> = context.getUser();
      let cart: Model<ICart> = null;

      if (user) {
        cart = await Cart.findOne({user: user._id, state: CartState.active})
          .populate("user")
          .populate("items.product");
      } else if (input.deviceToken) {
        cart = await Cart.findOne({
          deviceToken: input.deviceToken,
          state: CartState.anonymous,
        })
          .populate("user")
          .populate("items.product");
      }

      if (cart) {
        return cart.toObject();
      }
    },
  },

  Mutation: {
    addProductToCart: async (_, {input}, context) => {
      const product: Model<IProduct> = await Product.findOne({
        id: input.productId,
      });

      if (product) {
        // prevent adding quantities over stock quantity of current product
        if (input.quantity > product.quantity) {
          throw new Error(
            `You cannot add more then ${product.quantity} item(s).`,
          );
        }

        const user: Model<IUser> = context.getUser();

        // const user: IUser = await User.findOne({id: currentUser.id});
        let cart: Model<ICart> = null;

        // evaluate user based cart w/ active state
        if (user) {
          cart = await Cart.findOne({
            user: user._id,
            state: CartState.active,
          });
          // evaluate temporary and anonymous based cart using clients device token
        } else if (input.deviceToken) {
          cart = await Cart.findOne({
            deviceToken: input.deviceToken,
            state: CartState.anonymous,
          });
        } else {
          throw new Error("Please log in first to proceed.");
        }

        if (cart) {
          const item: Model<ICartItem> = await find(cart.items, {
            product: product._id,
          });

          if (item) {
            item.quantity = input.quantity;
          } else {
            cart.items.push({
              product: product._id,
              quantity: input.quantity,
            });
          }

          // TODO: check type of Date and not string
          cart.lastModifiedAt = new Date().toISOString();
          cart.markModified("items");

          await cart.save();
        } else {
          const newCart: object = {
            items: [
              {
                product: product._id,
                quantity: input.quantity,
              },
            ],
          };

          if (user) {
            Object.assign(newCart, {
              user: user._id,
              state: CartState.active,
            });
          } else if (input.deviceToken) {
            Object.assign(newCart, {
              deviceToken: input.deviceToken,
              state: CartState.anonymous,
            });
          } else {
            throw new Error("Please log in first to proceed.");
          }

          // create new cart document for current user logged in or
          //  any kind of anonymous user with a specifc device token
          cart = await Cart.create(newCart);
        }

        await product.populate("mechant").execPopulate();

        return product.toObject();
      }
    },

    removeItemFromCart: async (_, {input}, context) => {
      const user: Model<IUser> = context.getUser();
      let cart: Model<ICart> = null;

      // evaluate user based cart w/ active state
      if (user) {
        cart = await Cart.findOne({
          user: user._id,
          state: CartState.active,
        });
      }
      // evaluate temporary and anonymous based cart using clients device token
      else if (input.deviceToken) {
        cart = await Cart.findOne({
          deviceToken: input.deviceToken,
          state: CartState.anonymous,
        });
      }

      if (cart) {
        const item: Model<ICartItem> = await find(cart.items, {
          id: input.itemId,
        });

        if (item) {
          await remove(cart.items, elem => {
            return elem.id === item.id;
          });

          // remove entire cart if last element has been remove from item list
          if (cart.items.length === 0) {
            await cart.remove();

            return null;
          }

          // TODO: check type of Date and not string
          cart.lastModifiedAt = new Date().toISOString();
          cart.markModified("items");

          await cart.save();
        }

        return item.id;
      }
    },
  },
};

export default cartResolver;
