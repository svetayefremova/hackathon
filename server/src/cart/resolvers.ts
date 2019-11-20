import {IResolvers} from "graphql-tools";
import {find, remove} from "lodash";

import Product from "../product/model";
import Cart, {CartState} from "./model";

const resolvers: IResolvers = {
  Query: {
    currentCart: async (_, {}, context) => {
      const user: any = context.getUser();
      let cart: any = null;

      if (user) {
        const anonymousCart = await Cart.findOne({
          state: CartState.anonymous,
          user: null,
        });

        if (anonymousCart) {
          // check if user already has active cart
          const userCart = await Cart.findOne({
            user: user._id,
            state: CartState.active,
          });

          if (userCart) {
            // merge user and anonymous cart items
            cart = Object.assign(userCart, {
              items: [...userCart.items, ...anonymousCart.items],
            });
          } else {
            // update anonymous cart to active user cart
            cart = Object.assign(anonymousCart, {
              user: user._id,
              state: CartState.active,
            });
          }

          // add last updates to the cart
          cart.lastModifiedAt = new Date().toISOString();
          cart.markModified("items");
          await cart.save();

          // remove anonymous cart
          await anonymousCart.remove();
        } else {
          // find active cart if there is no anonymous cart
          cart = await Cart.findOne({
            user: user._id,
            state: CartState.active,
          });
        }
      } else {
        // if user is not logged in show cart anonymously
        cart = await Cart.findOne({
          state: CartState.anonymous,
          user: null,
        });
      }

      // populate cart
      if (cart) {
        await cart
          .populate("user")
          .populate("items.product")
          .execPopulate();

        return cart.toObject();
      }
    },
  },

  Mutation: {
    addProductToCart: async (_, {input}, context) => {
      const product: any = await Product.findOne({
        id: input.productId,
      });

      if (product) {
        // prevent adding quantities over stock quantity of current product
        if (input.quantity > product.quantity) {
          throw new Error(
            `You cannot add more then ${product.quantity} item(s).`,
          );
        }

        const user: any = context.getUser();
        let cart: any = null;

        // evaluate user based cart w/ active state
        if (user) {
          cart = await Cart.findOne({
            user: user._id,
            state: CartState.active,
          });
        } else {
          cart = await Cart.findOne({
            state: CartState.anonymous,
            user: null,
          });
        }

        if (cart) {
          const item: any = await find(cart.items, {
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
          } else {
            Object.assign(newCart, {
              state: CartState.anonymous,
              user: null,
            });
          }

          cart = await Cart.create(newCart);
        }

        // populate only after all logic happened
        await product.populate("merchant").execPopulate();

        return product.toObject();
      }
    },

    removeItemFromCart: async (_, {input}, context) => {
      const user: any = context.getUser();
      let cart: any = null;

      // evaluate user based cart w/ active state
      if (user) {
        cart = await Cart.findOne({
          user: user._id,
          state: CartState.active,
        });
      }
      // evaluate temporary and anonymous based cart
      else {
        cart = await Cart.findOne({
          state: CartState.anonymous,
          user: null,
        });
      }

      if (cart) {
        const item: any = await find(cart.items, {
          id: input.itemId,
        });

        if (item) {
          await remove(cart.items, elem => {
            return elem.id === item.id;
          });

          // remove entire cart if last element has been remove from item list
          if (!cart.items.length) {
            await cart.remove();
          } else {
            // TODO: check type of Date and not string
            cart.lastModifiedAt = new Date().toISOString();
            cart.markModified("items");

            await cart.save();
          }

          return item.id;
        }
      }
    },
  },
};

export default resolvers;
