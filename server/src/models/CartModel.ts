import mongoose, {Document, Schema} from "mongoose";

import {IProduct} from "./ProductModel";
import {IUser} from "./UserModel";

export interface IItems extends Document {
  product: [IProduct];
  quantity: number;
}

export interface ICart extends Document {
  state: string;
  user: IUser;
  items: [IItems];
  createdAt: Date;
  lastModifiedAt: Date;
}

const cartSchema: Schema = new Schema({
  state: {
    type: String,
    required: true,
    enum: ["active", "ordered"],
    default: "active",
  },
  user: {type: Schema.Types.ObjectId, ref: "User", required: true},
  items: [
    {
      product: {type: Schema.Types.ObjectId, ref: "Product", unique: true},
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 99999,
      },
    },
  ],
  createdAt: {type: Date, required: true, default: Date.now},
  lastModifiedAt: {type: Date, required: true, default: Date.now},
});

cartSchema.set("toObject", {getters: true, virtuals: true});

export default mongoose.model<ICart>("Cart", cartSchema);
