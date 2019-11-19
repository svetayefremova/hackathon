import {Document, model, Schema} from "mongoose";
import uuidv4 from "uuid/v4";

import CartItem, {ICartItem} from "./CartItemModel";
import {IUser} from "./UserModel";

export enum CartState {
  active = "active",
  anonymous = "anonymous",
  ordered = "ordered",
}

export interface ICart extends Document {
  id: string;
  state: string;
  user: IUser;
  deviceToken: string;
  items: [ICartItem];
  createdAt: Date;
  lastModifiedAt: Date;
}

const cartSchema: Schema = new Schema({
  id: {type: String, required: true, default: uuidv4},
  state: {
    type: String,
    required: true,
    enum: ["active", "anonymous", "ordered"],
    default: "anonymous",
  },
  user: {type: Schema.Types.ObjectId, ref: "User"},
  deviceToken: String,
  items: [CartItem],
  createdAt: {type: Date, required: true, default: Date.now},
  lastModifiedAt: {type: Date, required: true, default: Date.now},
});

cartSchema.set("toObject", {getters: true, virtuals: true});

export default model<ICart>("Cart", cartSchema);
