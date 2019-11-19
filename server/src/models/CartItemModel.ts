import {Document, Schema} from "mongoose";
import uuidv4 from "uuid/v4";

import {IProduct} from "./ProductModel";

export interface ICartItem extends Document {
  id: string;
  product: IProduct;
  quantity: number;
  addedAt: Date;
}

const cartItemSchema = {
  id: {type: String, required: true, default: uuidv4},
  product: {type: Schema.Types.ObjectId, ref: "Product"},
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
    max: 99999,
  },
  addedAt: {type: Date, required: true, default: Date.now},
};

export default cartItemSchema;
